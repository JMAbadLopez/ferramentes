/**
 * Aplicació Interactiva del Calendari de Moscosos
 * IES CAMP DE MORVEDRE (Curs 2026-2027)
 * Vista anual exclusiva i separació de perfils: ESO/Batxillerat vs Formació Professional (FP).
 */

document.addEventListener("DOMContentLoaded", () => {
  // Emmagatzematge resilient (evita bloquejos per polítiques de seguretat en GitHub Pages / iframes)
  const safeStorage = {
    _mem: {},
    getItem(key, fallback = null) {
      try {
        if (typeof window !== "undefined" && window.localStorage) {
          const val = window.localStorage.getItem(key);
          return val !== null ? val : fallback;
        }
      } catch (e) {
        // En cas de restriccions de privadesa del navegador o entorn sandboxed
      }
      return this._mem[key] !== undefined ? this._mem[key] : fallback;
    },
    setItem(key, val) {
      this._mem[key] = val;
      try {
        if (typeof window !== "undefined" && window.localStorage) {
          window.localStorage.setItem(key, val);
        }
      } catch (e) {
        // Fallback transparent en memòria
      }
    }
  };

  // Notificacions no bloquejants (permet ús en entorns protegits i iframes de GitHub Pages)
  function showToast(msg, type = "info") {
    let toast = document.getElementById("appToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "appToast";
      toast.className = "app-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.className = `app-toast active ${type}`;
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove("active");
    }, 3500);
  }

  // Estat de l'aplicació
  const state = {
    lang: safeStorage.getItem("ies_morvedre_lang", "val"),
    profile: safeStorage.getItem("ies_morvedre_profile", "eso_bat"), // "eso_bat" | "fp"
    activeFilter: "all",
    selectedDates: JSON.parse(safeStorage.getItem("ies_morvedre_selected_dates", "[]")),
    selectedDayModal: null
  };

  const calData = window.CALENDAR_DATA_2026_2027;
  const rules = window.MOSCOSO_RULES;

  // Carregar el logotip a la capçalera si està disponible
  const logoEl = document.getElementById("headerLogoImg");
  if (logoEl && window.CAMP_LOGO_DATA_URI) {
    logoEl.src = window.CAMP_LOGO_DATA_URI;
  }

  // Diccionari bilingüe (Valencià / Castellà)
  const i18n = {
    val: {
      appTitle: "Calendari de Dies Moscosos",
      appSubtitle: "IES Camp de Morvedre · Curs 2026-2027 · Normativa GVA",
      tabCalendar: "Calendari Anual Docent",
      tabCalculators: "Calculadores i Terminis",
      tabNormative: "Normativa i FAQ",
      profileTitle: "Perfil docent seleccionat:",
      profileSubtitle: "Aplica el calendari d'avaluacions oficial de l'IES Camp de Morvedre:",
      profileEsoBat: "ESO i Batxillerat",
      profileFp: "Formació Professional (FP)",
      bannerTitle: "Permís per assumptes particulars (Instrucció DG Personal Docent)",
      bannerDesc: "Fins a 6 dies retribuïts: 3 en període lectiu i 3 en període no lectiu. Antelació: mínim 7 dies naturals i màxim 1 mes.",
      badgeQuotaText: "Quota màx centre: 8 docents/dia (6 matí + 2 vesprada)",
      badgeQuotaTarde: "FP Torn vesprada: màx 2 docents/dia",
      legendTitle: "Codi de colors del calendari anual",
      legDisponible: "Disponible (Lectiu)",
      legBloquejat: "No disponible (Normativa / Avaluacions)",
      legFestiu: "Festiu / Vacances",
      legNoLectiu: "No lectiu (3 dies no lectius)",
      legCapDeSetmana: "Cap de setmana",
      legSeleccionat: "El meu dia seleccionat",
      filterAll: "Tots els dies",
      filterAvailable: "Només disponibles",
      filterNoLectius: "Dies no lectius",
      filterBlocked: "Dies bloquejats",
      filterHolidays: "Festius",
      weekDays: ["Dl", "Dm", "Dc", "Dj", "Dv", "Ds", "Dg"],
      selectionBarTitle: "Els meus dies moscosos:",
      countLectiusLabel: "Lectius:",
      countNoLectiusLabel: "No lectius:",
      btnClearSelection: "Buidar selecció",
      modalDetailsTitle: "Detalls de la data",
      modalStatusLabel: "Estat:",
      modalReasonLabel: "Motiu de la restricció:",
      modalDeadlinesLabel: "Terminis de sol·licitud i resolució:",
      modalEarliestLabel: "Obertura de sol·licitud (1 mes abans):",
      modalDeadlineLabel: "Data límit recomanada (7 dies naturals abans):",
      modalResolutionNote: "* La Direcció resoldrà dins dels 6 dies naturals previs a la data. Tramitació i gravació prèvia en ITACA.",
      modalPlanNotice: "Recordatori: És obligatori deixar un pla d'activitats per a l'alumnat a Prefectura d'Estudis.",
      btnAddSelection: "Afegir a la meua selecció",
      btnRemoveSelection: "Eliminar de la selecció",
      btnClose: "Tancar",
      alertConsecutive: "No es poden gaudir dies de moscosos de manera consecutiva.",
      alertMaxLectius: "Màxim 3 dies lectius assolits.",
      alertMaxNoLectius: "Màxim 3 dies no lectius assolits.",
      alertOutsideDeadline: "Atenció: Aquesta data està a menys de 7 dies naturals de distància.",
      emptySelectionNotice: "Encara no has seleccionat cap data. Fes clic sobre qualsevol dia disponible per a afegir-lo a la teua planificació.",
      calcTitle1: "Calculadora de Finestra de Sol·licitud",
      calcTitle2: "Calculadora de Proporcionalitat (Interins / Substitucions)",
      calcTitle3: "Taula de Quotes per Plantilla (Ordre Oficial GVA)",
      calcDesc1: "Indica el dia que voldries gaudir com a moscós per a saber quan has d'enviar la sol·licitud com a molt tard (mínim 7 dies naturals) i quan s'obri el termini (màxim 1 mes).",
      calcDesc2: "Si no tens nomenament per a tot el curs escolar complet (1 setembre a 31 agost), calcula quants dies et pertoquen proporcionalment segons la fórmula oficial de la Resolució de 19/10/2026.",
      lblTargetDate: "Data desitjada per al permís:",
      lblStartDate: "Data d'inici del nomenament:",
      lblEndDate: "Data de finalització del nomenament:",
      btnCalculateProp: "Calcular dies que em pertoquen",
      calcWinPlaceholder: "Tria una data per a veure els terminis d'antelació (mínim 7 dies naturals i màxim 1 mes).",
      quotaDesc: "La concessió està supeditada a les necessitats del servei educatiu. La plantilla docent del centre es pren amb referència a data 1 de setembre de cada curs escolar (Resolució 19/10/2026):",
      quotaThStaff: "Plantilla docent del centre (a 1 de setembre)",
      quotaThMax: "Màxim simultani de docents per dia lectiu",
      quotaR1Staff: "Fins a 20 docents",
      quotaR1Max: "1 docent",
      quotaR2Staff: "De 21 a 40 docents",
      quotaR2Max: "2 docents",
      quotaR3Staff: "De 41 a 60 docents",
      quotaR3Max: "3 docents",
      quotaR4Staff: "De 61 a 80 docents",
      quotaR4Max: "4 docents",
      quotaR5Staff: "Més de 81 docents",
      quotaR5Max: "5 docents",
      quotaCriteria: `<strong>Criteris oficials de prelació en cas de concurrència per al mateix dia (Resolució 19/10/2026):</strong>
          <p style="margin-top: 0.35rem; margin-bottom: 0.35rem;">Quan el nombre de sol·licituds supere la quota màxima autoritzada per al centre o per torn, l'adjudicació s'ordenarà segons els criteris vinculants següents:</p>
          <ol style="margin-left: 1.25rem; font-size: 0.82rem; line-height: 1.5;">
            <li><strong>Menor nombre de dies gaudits:</strong> Tindrà prioritat qui haja gaudit de menor nombre de dies d'assumptes particulars en el curs escolar actual.</li>
            <li><strong>Antiguitat en el centre:</strong> Major temps de serveis prestats a l'IES Camp de Morvedre (se sumen períodes interromputs).</li>
            <li><strong>Antiguitat en el cos docent:</strong> Major temps de serveis prestats en el cos docent (se sumen períodes interromputs).</li>
            <li><strong>Edat o discapacitat:</strong> Tindre 55 anys o més, o bé tindre reconegut un grau de discapacitat igual o superior al 33%.</li>
            <li><strong>Criteri de desempat subsidiari:</strong> Si persisteix l'empat, s'aplicarà el criteri establert pels òrgans col·legiats del centre (Claustre i Consell Escolar).</li>
          </ol>`,
      quotaTardeNotice: "<strong><svg class=\"ui-icon ui-icon-inline\" viewBox=\"0 0 24 24\"><path d=\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z\"/><circle cx=\"12\" cy=\"10\" r=\"3\"/></svg>Quota específica de l'IES Camp de Morvedre (Distribució per torns):</strong> Per a la plantilla del centre (entre 141 i 160 docents a 1 de setembre) i atenent a l'organització en dos torns lectius, el contingent màxim és de <strong>8 docents al dia</strong>: <strong>6 docents pel torn de matí</strong> i <strong>2 professors/es pel torn de vesprada</strong> (FP). En cap cas podran coincidir més de 2 docents de vesprada el mateix dia.",
      normativeSummaryTitle: "Resum de la Normativa Oficial de Dies Moscosos (Instrucció 1/2026 i Resolució 19/10/2026)",
      normativeSummaryBody: `<p><strong>1. Concepte i dies màxims:</strong> Permís retribuït per assumptes particulars sense necessitat de justificació. El professorat disposa de fins a <strong>6 dies per curs escolar</strong> (de l'1 de setembre al 31 d'agost de l'any següent), distribuïts en un màxim de <strong>3 dies en període lectiu</strong> i <strong>3 dies en període no lectiu</strong>.</p>
          <br>
          <p><strong>2. Retribució i pla pedagògic inexcusable:</strong> Els sis dies són amb dret íntegre a retribucions. El docent té l'<strong>obligació d'elaborar i deixar dipositat a la Prefectura d'Estudis un pla d'activitats per a l'alumnat</strong> amb antelació per garantir la continuïtat pedagògica.</p>
          <br>
          <p><strong>3. Gravació obligatòria en ITACA (Punt 1 Resolució 19/10/2026):</strong> Totes les sol·licituds i el seu gaudi han de quedar registrats en la plataforma ITACA. El centre educatiu selecciona aquest permís com a «assumptes particulars» per justificar les absències.</p>
          <br>
          <p><strong>4. Sol·licitud i resolució per la Direcció (Punt 2 Resolució 19/10/2026):</strong></p>
          <ul style="margin-left: 1.5rem; margin-top: 0.25rem;">
            <li><strong>Termini de presentació:</strong> Davant la Direcció amb una antelació mínima de <strong>7 dies naturals</strong> i màxima d'<strong>un mes</strong> respecte a la data sol·licitada.</li>
            <li><strong>Termini de resolució:</strong> La Direcció del centre emetrà la resolució favorable <strong>dins dels 6 dies naturals previs a la data</strong> d'efecte del permís (per permetre que, en cas de denegació o renúncia, altres companys/es puguen sol·licitar el dia).</li>
            <li><strong>Motivació i silenci:</strong> La resolució denegatòria serà motivada per raons justificades del servei educatiu. El silenci administratiu té caràcter <strong>desestimatori (negatiu)</strong>.</li>
          </ul>
          <br>
          <p><strong>5. Plantilla de referència i quotes del centre (Punt 3 Resolució 19/10/2026):</strong> El contingent màxim de docents es determina per la plantilla docent del centre a data <strong>1 de setembre de cada curs escolar</strong>. A l'IES Camp de Morvedre (plantilla entre 141 i 160 docents), la quota és de <strong>8 docents al dia: 6 docents pel torn de matí i 2 professors/es pel torn de vesprada</strong> (FP). En cap cas podran coincidir més de dos docents del torn de vesprada en una mateixa data.</p>
          <br>
          <p><strong>6. Criteris oficials de prelació per concurrència (Punt 4 Resolució 19/10/2026):</strong> Si es supera la quota per a un mateix dia, l'ordre de prioritat vinculant és: 1r Menor nombre de dies moscosos gaudits en el curs; 2n Major antiguitat en el centre; 3r Major antiguitat en el cos docent; 4t Tindre 55 anys o més o discapacitat ≥ 33%; 5è Desempat subsidiari acordat pels òrgans col·legiats del centre.</p>
          <br>
          <p><strong>7. Personal interí, vacants i proporcionalitat (Punt 5 Resolució 19/10/2026):</strong></p>
          <ul style="margin-left: 1.5rem; margin-top: 0.25rem;">
            <li><strong>Fórmula oficial:</strong> Per a cadascuna de les modalitats (lectius i no lectius): <code>round(3 · X / 365)</code>, on X són els dies de servei actiu acumulats en el curs.</li>
            <li><strong>Vacants adjudicades abans de l'1 de novembre:</strong> 3 dies lectius + 3 no lectius (6 dies d'entrada, gaudi immediat).</li>
            <li><strong>Vacants adjudicades a partir de l'1 de novembre:</strong> 2 dies lectius + 2 no lectius (4 dies d'entrada; ampliable a 3+3 si s'acredita un còmput global de 305 dies amb substitucions prèvies).</li>
            <li><strong>Substitucions per dies acumulats:</strong> Menys de 61 dies: 0 dies; de 61 a 182 dies: 2 dies (1 lectiu + 1 no lectiu); de 183 a 304 dies: 4 dies (2 lectius + 2 no lectius); a partir de 305 dies: 6 dies (3 lectius + 3 no lectius).</li>
          </ul>
          <br>
          <p><strong>8. Professorat itinerant, religió i especialistes d'FP (Punts 6, 7 i 8 Resolució 19/10/2026):</strong></p>
          <ul style="margin-left: 1.5rem; margin-top: 0.25rem;">
            <li><strong>Itinerants:</strong> Se sol·licita a la direcció del centre d'adscripció i requereix el vistiplau de la direcció de l'altre centre compartit si té docència assignada en eixa data.</li>
            <li><strong>Religió i especialistes/experts de sectors productius d'FP:</strong> Idèntic règim (amb contracte indefinit s'equiparen a funcionaris de carrera, amb contracte temporal s'equiparen a interins amb còmput proporcional).</li>
          </ul>
          <br>
          <p><strong>9. Prohibicions i exclusions expresses:</strong></p>
          <ul style="margin-left: 1.5rem; margin-top: 0.25rem;">
            <li>Durant els <strong>7 primers dies lectius</strong> del curs (del 9 al 17 de setembre de 2026).</li>
            <li>Durant els <strong>7 últims dies lectius</strong> del curs (del 10 al 18 de juny de 2027).</li>
            <li>Dins dels <strong>7 dies previs o posteriors a les vacances</strong> escolars de Nadal, Falles i Pasqua.</li>
            <li>En <strong>períodes d'avaluació</strong> escolars (segons el calendari oficial d'avaluacions d'ESO/Batxillerat o FP), ni entre l'avaluació ordinària i extraordinària de final de curs.</li>
            <li><strong>No es poden gaudir de manera consecutiva</strong> (tampoc divendres i dilluns).</li>
          </ul>`,
      faqSectionTitle: "Preguntes Freqüents (FAQ)",
      faqQ1: "Puc ajuntar dos dies moscosos si un és dijous i l'altre divendres?",
      faqA1: "No. La normativa estableix de manera taxativa que <em>\"no podran gaudir-se de manera consecutiva\"</em>. Tampoc és permés demanar divendres i dilluns consecutius, ja que es consideren dies laborals consecutius.",
      faqQ2: "Per què hi ha dies bloquejats diferents entre FP i ESO/Batxillerat?",
      faqA2: "Perquè la normativa de la Conselleria d'Educació prohibeix expressament gaudir de dies moscosos durant els períodes d'avaluacions. Com que les dates de les sessions d'avaluació inicial, 1a, 2a, final i extraordinària dels Cicles Formatius (FPB, Grau Mitjà, Grau Superior, Cursos d'Especialització) no coincideixen exactament amb les d'ESO i Batxillerat, hem incorporat el calendari oficial específic d'avaluacions de l'IES Camp de Morvedre perquè pugues consultar amb total precisió els teus dies hàbils segons les teues etapes educatives.",
      faqQ3: "Puc demanar un moscós lectiu el mes de setembre?",
      faqA3: "A partir del 18 de setembre. Els 7 primers dies lectius amb alumnat (del 9 al 17 de setembre de 2026) estan bloquejats per normativa. Els dies de l'1 al 8 de setembre són període no lectiu, on es podria sol·licitar un dels 3 dies no lectius.",
      faqQ4: "Què passa si dos o més companys del mateix departament demanem el mateix dia?",
      faqA4: "La concessió està supeditada a les necessitats del servei educatiu. Segons la Resolució de 19 d'octubre de 2026 de la DG de Personal Docent, si es supera la quota màxima s'aplica el següent ordre vinculant de prelació: 1r) Menor nombre de dies moscosos gaudits en el curs actual; 2n) Major antiguitat en el centre; 3r) Major antiguitat en el cos docent; 4t) Tindre 55 anys o més o una discapacitat igual o superior al 33%; 5è) Criteri de desempat fixat pels òrgans col·legiats del centre (Claustre i Consell Escolar).",
      faqQ5: "Sóc interí/na i tinc una vacant o substitució temporal. Quants dies em toquen?",
      faqA5: "Segons la Resolució de 19 d'octubre de 2026, la fórmula oficial per a cadascuna de les modalitats (lectius i no lectius) és: <code>round(3 · X / 365)</code>. Per a substitucions: menys de 61 dies treballats = 0 dies; de 61 a 182 dies = 2 dies (1 lectiu + 1 no lectiu); de 183 a 304 dies = 4 dies (2 lectius + 2 no lectius); a partir de 305 dies = 6 dies (3 lectius + 3 no lectius). A més, si tens una vacant adjudicada abans de l'1 de novembre, et pertoquen directament els 6 dies (3+3); i si s'adjudica a partir de l'1 de novembre, 4 dies (2+2). En cas de successió de nomenaments en el mateix curs escolar, conserves els dies pendents de gaudi!",
      faqQ6: "Si no gaste els dies d'aquest curs, els puc acumular per al curs vinent?",
      faqA6: "No. Els dies no gaudits abans de la finalització del curs escolar caduquen i no són acumulables en cap cas.",
      faqQ7: "Com s'aplica el límit de dies moscosos per al professorat del torn de vesprada d'FP?",
      faqA7: "A l'IES Camp de Morvedre s'aplica una distribució diferenciada per torns (plantilla de 141-160 docents): el contingent màxim és de <strong>6 docents pel torn de matí</strong> i de <strong>2 docents pel torn de vesprada</strong>. Per tant, <strong>mai podran gaudir de permís per assumptes particulars més de dos professors o professores del torn de vesprada el mateix dia</strong>, i el total del centre mai podrà superar els <strong>8 docents diaris (6 de matí + 2 de vesprada)</strong>, garantint sempre la correcta atenció educativa.",
      faqQ8: "Com es tramita la sol·licitud en ITACA i en quin termini ha de resoldre la Direcció?",
      faqA8: "Segons la Resolució de 19 d'octubre de 2026 (Punts 1 i 2), la sol·licitud i concessió s'ha de gravar obligatòriament en ITACA, seleccionant el permís per «assumptes particulars». La Direcció del centre emetrà la resolució favorable <strong>dins dels 6 dies naturals previs a la data sol·licitada</strong>. Aquest marge de 6 dies garanteix que, si es denega o la persona sol·licitant hi renuncia, altres docents puguen aprofitar la vacant en la quota. Les denegacions han de ser sempre motivades i el silenci té caràcter desestimatori.",
      faqQ9: "Com s'aplica el permís al professorat itinerant, de religió o especialistes d'FP?",
      faqA9: "Segons els punts 6, 7 i 8 de la Resolució de 19 d'octubre de 2026: <strong>1) Docents itinerants:</strong> han de presentar la sol·licitud a la direcció del seu centre d'adscripció i, si el dia sol·licitat tenen jornada lectiva en l'altre centre compartit, caldrà el vistiplau previ d'aquest altre centre; <strong>2) Professorat de religió i persones expertes/especialistes de sectors productius d'FP:</strong> s'aplica el mateix règim que a la resta del personal docent (si tenen contracte indefinit, l'equivalent a funcionaris de carrera; si tenen contracte temporal, l'equivalent a funcionaris interins amb dret proporcional segons la durada del nomenament).",
      footerText1: "IES Camp de Morvedre · Sagunt (València) · Eina desenvolupada per a la planificació docent del curs 2026-2027.",
      footerText2: "D'acord amb la normativa i instruccions de la Direcció General de Personal Docent (Conselleria d'Educació, GVA)."
    },
    es: {
      appTitle: "Calendario de Días Moscosos",
      appSubtitle: "IES Camp de Morvedre · Curso 2026-2027 · Normativa GVA",
      tabCalendar: "Calendario Anual Docente",
      tabCalculators: "Calculadoras y Plazos",
      tabNormative: "Normativa y FAQ",
      profileTitle: "Perfil docente seleccionado:",
      profileSubtitle: "Aplica el calendario de evaluaciones oficial del IES Camp de Morvedre:",
      profileEsoBat: "ESO y Bachillerato",
      profileFp: "Formación Profesional (FP)",
      bannerTitle: "Permiso por asuntos particulares (Instrucción DG Personal Docente)",
      bannerDesc: "Hasta 6 días retribuidos: 3 en período lectivo y 3 en período no lectivo. Antelación: mínimo 7 días naturales y máximo 1 mes.",
      badgeQuotaText: "Cupo máx centro: 8 docentes/día (6 mañana + 2 tarde)",
      badgeQuotaTarde: "FP Turno tarde: máx 2 docentes/día",
      legendTitle: "Código de colores del calendario anual",
      legDisponible: "Disponible (Lectivo)",
      legBloquejat: "No disponible (Normativa / Evaluaciones)",
      legFestiu: "Festivo / Vacaciones",
      legNoLectiu: "No lectivo (3 días no lectivos)",
      legCapDeSetmana: "Fin de semana",
      legSeleccionat: "Mi día seleccionado",
      filterAll: "Todos los días",
      filterAvailable: "Solo disponibles",
      filterNoLectius: "Días no lectivos",
      filterBlocked: "Días bloqueados",
      filterHolidays: "Festivos",
      weekDays: ["L", "M", "X", "J", "V", "S", "D"],
      selectionBarTitle: "Mis días moscosos:",
      countLectiusLabel: "Lectivos:",
      countNoLectiusLabel: "No lectivos:",
      btnClearSelection: "Vaciar selección",
      modalDetailsTitle: "Detalles de la fecha",
      modalStatusLabel: "Estado:",
      modalReasonLabel: "Motivo de la restricción:",
      modalDeadlinesLabel: "Plazos de solicitud y resolución:",
      modalEarliestLabel: "Apertura de solicitud (1 mes antes):",
      modalDeadlineLabel: "Fecha límite recomendada (7 días naturales antes):",
      modalResolutionNote: "* La Dirección resolverá dentro de los 6 días naturales previos a la fecha. Tramitación y grabación previa en ITACA.",
      modalPlanNotice: "Recordatorio: Es obligatorio dejar un plan de actividades para el alumnado en Jefatura de Estudios.",
      btnAddSelection: "Añadir a mi selección",
      btnRemoveSelection: "Eliminar de la selección",
      btnClose: "Cerrar",
      alertConsecutive: "No se pueden disfrutar días de moscosos de forma consecutiva.",
      alertMaxLectius: "Máximo 3 días lectivos alcanzados.",
      alertMaxNoLectius: "Máximo 3 días no lectivos alcanzados.",
      alertOutsideDeadline: "Atención: Esta fecha está a menos de 7 días naturales de distancia.",
      emptySelectionNotice: "Todavía no has seleccionado ninguna fecha. Haz clic sobre cualquier día disponible para añadirlo a tu planificación.",
      calcTitle1: "Calculadora de Ventana de Solicitud",
      calcTitle2: "Calculadora de Proporcionalidad (Interinos / Sustituciones)",
      calcTitle3: "Tabla de Cupos por Plantilla (Orden Oficial GVA)",
      calcDesc1: "Indica el día que desearías disfrutar como moscoso para conocer cuándo debes enviar la solicitud como muy tarde (mínimo 7 días naturales) y cuándo se abre el plazo (máximo 1 mes).",
      calcDesc2: "Si no tienes nombramiento para todo el curso escolar completo (1 septiembre a 31 agosto), calcula cuántos días te corresponden proporcionalmente según la fórmula oficial de la Resolución de 19/10/2026.",
      lblTargetDate: "Fecha deseada para el permiso:",
      lblStartDate: "Fecha de inicio del nombramiento:",
      lblEndDate: "Fecha de finalización del nombramiento:",
      btnCalculateProp: "Calcular días que me corresponden",
      calcWinPlaceholder: "Elige una fecha para ver los plazos de antelación (mínimo 7 días naturales y máximo 1 mes).",
      quotaDesc: "La concesión está supeditada a las necesidades del servicio educativo. La plantilla docente del centro se computa con referencia a fecha 1 de septiembre de cada curso escolar (Resolución 19/10/2026):",
      quotaThStaff: "Plantilla docente del centro (a 1 de septiembre)",
      quotaThMax: "Máximo simultáneo de docentes por día lectivo",
      quotaR1Staff: "Hasta 20 docentes",
      quotaR1Max: "1 docente",
      quotaR2Staff: "De 21 a 40 docentes",
      quotaR2Max: "2 docentes",
      quotaR3Staff: "De 41 a 60 docentes",
      quotaR3Max: "3 docentes",
      quotaR4Staff: "De 61 a 80 docentes",
      quotaR4Max: "4 docentes",
      quotaR5Staff: "Más de 81 docentes",
      quotaR5Max: "5 docentes",
      quotaCriteria: `<strong>Criterios oficiales de prelación en caso de concurrencia para el mismo día (Resolución 19/10/2026):</strong>
          <p style="margin-top: 0.35rem; margin-bottom: 0.35rem;">Cuando el número de solicitudes supere el cupo máximo autorizado para el centro o por turno, la adjudicación se ordenará según los siguientes criterios vinculantes:</p>
          <ol style="margin-left: 1.25rem; font-size: 0.82rem; line-height: 1.5;">
            <li><strong>Menor número de días disfrutados:</strong> Tendrá prioridad quien haya disfrutado de menor número de días de asuntos particulares en el curso escolar actual.</li>
            <li><strong>Antigüedad en el centro:</strong> Mayor tiempo de servicios prestados en el IES Camp de Morvedre (se suman períodos interrumpidos).</li>
            <li><strong>Antigüedad en el cuerpo docente:</strong> Mayor tiempo de servicios prestados en el cuerpo docente (se suman períodos interrumpidos).</li>
            <li><strong>Edad o discapacidad:</strong> Tener 55 años o más, o bien tener reconocido un grado de discapacidad igual o superior al 33%.</li>
            <li><strong>Criterio de desempate subsidiario:</strong> Si persiste el empate, se aplicará el criterio establecido por los órganos colegiados del centro (Claustro y Consejo Escolar).</li>
          </ol>`,
      quotaTardeNotice: "<strong><svg class=\"ui-icon ui-icon-inline\" viewBox=\"0 0 24 24\"><path d=\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z\"/><circle cx=\"12\" cy=\"10\" r=\"3\"/></svg>Cupo específico del IES Camp de Morvedre (Distribución por turnos):</strong> Para la plantilla del centro (entre 141 y 160 docentes a 1 de septiembre) y atendiendo a la organización en dos turnos lectivos, el cupo máximo es de <strong>8 docentes al día</strong>: <strong>6 docentes para el turno de mañana</strong> y <strong>2 profesores/as para el turno de tarde</strong> (FP). En ningún caso podrán coincidir más de 2 docentes de tarde el mismo día.",
      normativeSummaryTitle: "Resumen de la Normativa Oficial de Días Moscosos (Instrucción 1/2026 y Resolución 19/10/2026)",
      normativeSummaryBody: `<p><strong>1. Concepto y días máximos:</strong> Permiso retribuido por asuntos particulares sin necesidad de justificación. El profesorado dispone de hasta <strong>6 días por curso escolar</strong> (del 1 de septiembre al 31 de agosto del año siguiente), distribuidos en un máximo de <strong>3 días en período lectivo</strong> y <strong>3 días en período no lectivo</strong>.</p>
          <br>
          <p><strong>2. Retribución y plan pedagógico inexcusable:</strong> Los seis días son con derecho íntegro a retribuciones. El docente tiene la <strong>obligación de elaborar y dejar depositado en Jefatura de Estudios un plan de actividades para el alumnado</strong> con antelación para garantizar la continuidad pedagógica.</p>
          <br>
          <p><strong>3. Grabación obligatoria en ITACA (Punto 1 Resolución 19/10/2026):</strong> Todas las solicitudes y su disfrute deben quedar registrados en la plataforma ITACA. El centro educativo selecciona este permiso como «asuntos particulares» para justificar las ausencias.</p>
          <br>
          <p><strong>4. Solicitud y resolución por la Dirección (Punto 2 Resolución 19/10/2026):</strong></p>
          <ul style="margin-left: 1.5rem; margin-top: 0.25rem;">
            <li><strong>Plazo de presentación:</strong> Ante la Dirección con una antelación mínima de <strong>7 días naturales</strong> y máxima de <strong>un mes</strong> respecto a la fecha solicitada.</li>
            <li><strong>Plazo de resolución:</strong> La Dirección del centro emitirá la resolución favorable <strong>dentro de los 6 días naturales previos a la fecha</strong> de efecto del permiso (para permitir que, en caso de denegación o renuncia, otros compañeros/as puedan solicitar el día).</li>
            <li><strong>Motivación y silencio:</strong> La resolución denegatoria será motivada por razones justificadas del servicio educativo. El silencio administrativo tiene carácter <strong>desestimatorio (negativo)</strong>.</li>
          </ul>
          <br>
          <p><strong>5. Plantilla de referencia y cupos del centro (Punto 3 Resolución 19/10/2026):</strong> El cupo máximo de docentes se determina por la plantilla docente del centro a fecha <strong>1 de septiembre de cada curso escolar</strong>. En el IES Camp de Morvedre (plantilla entre 141 y 160 docentes), el cupo es de <strong>8 docentes al día: 6 docentes para el turno de mañana y 2 profesores/as para el turno de tarde</strong> (FP). En ningún caso podrán coincidir más de dos docentes del turno de tarde en una misma fecha.</p>
          <br>
          <p><strong>6. Criterios oficiales de prelación por concurrencia (Punto 4 Resolución 19/10/2026):</strong> Si se supera el cupo para un mismo día, el orden de prioridad vinculante es: 1º Menor número de días moscosos disfrutados en el curso; 2º Mayor antigüedad en el centro; 3º Mayor antigüedad en el cuerpo docente; 4º Tener 55 años o más o discapacidad ≥ 33%; 5º Desempate subsidiario acordado por los órganos colegiados del centro.</p>
          <br>
          <p><strong>7. Personal interino, vacantes y proporcionalidad (Punto 5 Resolución 19/10/2026):</strong></p>
          <ul style="margin-left: 1.5rem; margin-top: 0.25rem;">
            <li><strong>Fórmula oficial:</strong> Para cada una de las modalidades (lectivos y no lectivos): <code>round(3 · X / 365)</code>, donde X son los días de servicio activo acumulados en el curso.</li>
            <li><strong>Vacantes adjudicadas antes del 1 de noviembre:</strong> 3 días lectivos + 3 no lectivos (6 días de entrada, disfrute inmediato).</li>
            <li><strong>Vacantes adjudicadas a partir del 1 de noviembre:</strong> 2 días lectivos + 2 no lectivos (4 días de entrada; ampliable a 3+3 si se acredita un cómputo global de 305 días con sustituciones previas).</li>
            <li><strong>Sustituciones por días acumulados:</strong> Menos de 61 días: 0 días; de 61 a 182 días: 2 días (1 lectivo + 1 no lectivo); de 183 a 304 días: 4 días (2 lectivos + 2 no lectivos); a partir de 305 días: 6 días (3 lectivos + 3 no lectivos).</li>
          </ul>
          <br>
          <p><strong>8. Profesorado itinerante, religión y especialistas de FP (Puntos 6, 7 y 8 Resolución 19/10/2026):</strong></p>
          <ul style="margin-left: 1.5rem; margin-top: 0.25rem;">
            <li><strong>Itinerantes:</strong> Se solicita a la dirección del centro de adscripción y requiere el visto bueno de la dirección del otro centro compartido si tiene docencia asignada en esa fecha.</li>
            <li><strong>Religión y especialistas/expertos de sectores productivos de FP:</strong> Idéntico régimen (con contrato indefinido se equiparan a funcionarios de carrera, con contrato temporal se equiparan a interinos con cómputo proporcional).</li>
          </ul>
          <br>
          <p><strong>9. Prohibiciones y exclusiones expresas:</strong></p>
          <ul style="margin-left: 1.5rem; margin-top: 0.25rem;">
            <li>Durante los <strong>7 primeros días lectivos</strong> del curso (del 9 al 17 de septiembre de 2026).</li>
            <li>Durante los <strong>7 últimos días lectivos</strong> del curso (del 10 al 18 de junio de 2027).</li>
            <li>Dentro de los <strong>7 días previos o posteriores a las vacaciones</strong> escolares de Navidad, Fallas y Pascua.</li>
            <li>En <strong>períodos de evaluación</strong> escolares (según el calendario oficial de evaluaciones de ESO/Bachillerato o FP), ni entre la evaluación ordinaria y extraordinaria de final de curso.</li>
            <li><strong>No se pueden disfrutar de manera consecutiva</strong> (tampoco viernes y lunes).</li>
          </ul>`,
      faqSectionTitle: "Preguntas Frecuentes (FAQ)",
      faqQ1: "¿Puedo juntar dos días moscosos si uno es jueves y el otro viernes?",
      faqA1: "No. La normativa establece de manera taxativa que <em>\"no podrán disfrutarse de manera consecutiva\"</em>. Tampoco está permitido pedir viernes y lunes consecutivos, ya que se consideran días laborables consecutivos.",
      faqQ2: "¿Por qué hay días bloqueados diferentes entre FP y ESO/Bachillerato?",
      faqA2: "Porque la normativa de la Conselleria de Educación prohíbe expresamente disfrutar de días moscosos durante los períodos de evaluación. Dado que las fechas de las sesiones de evaluación inicial, 1ª, 2ª, final y extraordinaria de los Ciclos Formativos (FPB, Grado Medio, Grado Superior, Cursos de Especialización) no coinciden exactamente con las de ESO y Bachillerato, hemos incorporado el calendario oficial específico de evaluaciones del IES Camp de Morvedre para que puedas consultar con total precisión tus días hábiles según tus etapas educativas.",
      faqQ3: "¿Puedo pedir un moscoso lectivo en el mes de septiembre?",
      faqA3: "A partir del 18 de septiembre. Los 7 primeros días lectivos con alumnado (del 9 al 17 de septiembre de 2026) están bloqueados por normativa. Los días del 1 al 8 de septiembre son período no lectivo, donde se podría solicitar uno de los 3 días no lectivos.",
      faqQ4: "¿Qué ocurre si dos o más compañeros del mismo departamento pedimos el mismo día?",
      faqA4: "La concesión está supeditada a las necesidades del servicio educativo. Según la Resolución de 19 de octubre de 2026 de la DG de Personal Docente, si se supera el cupo máximo se aplica el siguiente orden vinculante de prelación: 1º) Menor número de días moscosos disfrutados en el curso actual; 2º) Mayor antigüedad en el centro; 3º) Mayor antigüedad en el cuerpo docente; 4º) Tener 55 años o más o una discapacidad igual o superior al 33%; 5º) Criterio de desempate fijado por los órganos colegiados del centro (Claustro y Consejo Escolar).",
      faqQ5: "¿Soy interino/a y tengo una vacante o sustitución temporal. ¿Cuántos días me tocan?",
      faqA5: "Según la Resolución de 19 de octubre de 2026, la fórmula oficial para cada una de las modalidades (lectivos y no lectivos) es: <code>round(3 · X / 365)</code>. Para sustituciones: menos de 61 días trabajados = 0 días; de 61 a 182 días = 2 días (1 lectivo + 1 no lectivo); de 183 a 304 días = 4 días (2 lectivos + 2 no lectivos); a partir de 305 días = 6 días (3 lectivos + 3 no lectivos). Además, si tienes una vacante adjudicada antes del 1 de noviembre, te corresponden directamente los 6 días (3+3); y si se adjudica a partir de 1 de noviembre, 4 días (2+2). En caso de sucesión de nombramientos en el mismo curso escolar, ¡conservas los días pendientes de disfrute!",
      faqQ6: "¿Si no gasto los días de este curso, los puedo acumular para el curso siguiente?",
      faqA6: "No. Los días no disfrutados antes de la finalización del curso escolar caducan y no son acumulables en ningún caso.",
      faqQ7: "¿Cómo se aplica el límite de días moscosos para el profesorado del turno de tarde de FP?",
      faqA7: "En el IES Camp de Morvedre se aplica una distribución diferenciada por turnos (plantilla de 141-160 docentes): el cupo máximo es de <strong>6 docentes para el turno de mañana</strong> y de <strong>2 profesores/as para el turno de tarde</strong>. Por tanto, <strong>nunca podrán disfrutar de permiso por asuntos particulares más de dos profesores o profesoras del turno de tarde el mismo día</strong>, y el total del centro nunca podrá superar los <strong>8 docentes diarios (6 de mañana + 2 de tarde)</strong>, garantizando siempre la debida atención educativa.",
      faqQ8: "¿Cómo se tramita la solicitud en ITACA y en qué plazo debe resolver la Dirección?",
      faqA8: "Según la Resolución de 19 de octubre de 2026 (Puntos 1 y 2), la solicitud y concesión debe grabarse obligatoriamente en ITACA, seleccionando el permiso por «asuntos particulares». La Dirección del centro emitirá la resolución favorable <strong>dentro de los 6 días naturales previos a la fecha solicitada</strong>. Este margen de 6 días garantiza que, si se deniega o la persona solicitante renuncia, otros docentes puedan aprovechar la vacante en el cupo. Las denegaciones deben ser siempre motivadas y el silencio tiene carácter desestimatorio.",
      faqQ9: "¿Cómo se aplica el permiso al profesorado itinerante, de religión o especialistas de FP?",
      faqA9: "Según los puntos 6, 7 y 8 de la Resolución de 19 de octubre de 2026: <strong>1) Docentes itinerantes:</strong> deben presentar la solicitud a la dirección de su centro de adscripción y, si el día solicitado tienen jornada lectiva en el otro centro compartido, se requerirá el visto bueno previo de este otro centro; <strong>2) Profesorado de religión y personas expertas/especialistas de sectores productivos de FP:</strong> se aplica el mismo régimen que al resto del personal docente (si tienen contrato indefinido, el equivalente a funcionarios de carrera; si tienen contrato temporal, el equivalente a funcionarios interinos con derecho proporcional según la duración del nombramiento).",
      footerText1: "IES Camp de Morvedre · Sagunto (Valencia) · Herramienta desarrollada para la planificación docente del curso 2026-2027.",
      footerText2: "De acuerdo con la normativa e instrucciones de la Dirección General de Personal Docente (Conselleria de Educación, GVA)."
    }
  };

  // Cache elements
  const elNavTabs = document.querySelectorAll(".nav-tab");
  const elTabPanels = document.querySelectorAll(".tab-panel");
  const elLangBtns = document.querySelectorAll(".lang-btn");
  const elYearGrid = document.getElementById("yearGridContainer");
  const elProfileBtns = document.querySelectorAll(".profile-btn");
  const elFilterPills = document.querySelectorAll(".filter-pill");
  const elCountLectius = document.getElementById("countLectius");
  const elCountNoLectius = document.getElementById("countNoLectius");
  const elSelectedChips = document.getElementById("selectedChips");
  const elSelectionAlerts = document.getElementById("selectionAlerts");
  const elBtnClearSelection = document.getElementById("btnClearSelection");

  // Modal elements
  const elDayModal = document.getElementById("dayModal");
  const elModalDateTitle = document.getElementById("modalDateTitle");
  const elModalStatusBadge = document.getElementById("modalStatusBadge");
  const elModalDescription = document.getElementById("modalDescription");
  const elModalRestrictionSec = document.getElementById("modalRestrictionSec");
  const elModalRestrictionText = document.getElementById("modalRestrictionText");
  const elModalEarliest = document.getElementById("modalEarliest");
  const elModalDeadline = document.getElementById("modalDeadline");
  const elModalBtnToggle = document.getElementById("modalBtnToggle");
  const elModalBtnClose = document.getElementById("modalBtnClose");

  // Calculators elements
  const elCalcTargetDate = document.getElementById("calcTargetDate");
  const elCalcWinResult = document.getElementById("calcWinResult");
  const elCalcStart = document.getElementById("calcStart");
  const elCalcEnd = document.getElementById("calcEnd");
  const elBtnDoCalcProp = document.getElementById("btnDoCalcProp");
  const elPropResult = document.getElementById("propResult");

  function t(key) {
    const currentDict = i18n[state.lang] || i18n["val"];
    return currentDict[key] || key;
  }

  function updateI18n() {
    // Text pla
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const val = t(key);
      if (val !== undefined && val !== key) {
        el.textContent = val;
      }
    });

    // Contingut HTML ric (llistes, negreta, etc.)
    document.querySelectorAll("[data-i18n-html]").forEach(el => {
      const key = el.getAttribute("data-i18n-html");
      const val = t(key);
      if (val !== undefined && val !== key) {
        el.innerHTML = val;
      }
    });

    elLangBtns.forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === state.lang);
    });

    updateProfileButtons();
    renderYearView();
    renderSelectionBar();

    // Actualitzar el modal si està obert
    if (state.selectedDayModal) {
      openDayModal(state.selectedDayModal.dateKey, state.selectedDayModal.dayData);
    }

    // Actualitzar càlcul de finestra si n'hi ha data
    if (elCalcTargetDate && elCalcTargetDate.value) {
      elCalcTargetDate.dispatchEvent(new Event("change"));
    }
  }

  function updateProfileButtons() {
    elProfileBtns.forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-profile") === state.profile);
    });
  }

  // Navegació de pestanyes
  elNavTabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      const btn = e.currentTarget;
      const targetId = btn.getAttribute("data-target");
      if (!targetId) return;

      elNavTabs.forEach(t => t.classList.remove("active"));
      elTabPanels.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add("active");
    });
  });

  // Selector d'idioma
  elLangBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      state.lang = btn.getAttribute("data-lang");
      safeStorage.setItem("ies_morvedre_lang", state.lang);
      updateI18n();
    });
  });

  // Selector de Perfil (FP vs ESO/BAT)
  elProfileBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      state.profile = btn.getAttribute("data-profile");
      safeStorage.setItem("ies_morvedre_profile", state.profile);
      updateProfileButtons();
      renderYearView();
      renderSelectionBar();
    });
  });

  // Filtres
  elFilterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      elFilterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      state.activeFilter = pill.getAttribute("data-filter");
      renderYearView();
    });
  });

  function matchesFilter(status) {
    if (state.activeFilter === "all") return true;
    if (state.activeFilter === "disponible") return status === "disponible";
    if (state.activeFilter === "no-lectiu") return status === "no-lectiu";
    if (state.activeFilter === "no-disponible") return status === "no-disponible";
    if (state.activeFilter === "festiu") return status === "festiu";
    return true;
  }

  // RENDERITZACIÓ DE LA VISTA ANUAL COMPLETA
  function renderYearView() {
    elYearGrid.innerHTML = "";

    calData.months.forEach((month) => {
      const card = document.createElement("div");
      card.className = "mini-month-card";

      // Títol del mes
      const title = document.createElement("div");
      title.className = "mini-month-title";
      title.textContent = state.lang === "val" ? month.nomVal : month.nomEs;
      card.appendChild(title);

      // Dies de la setmana
      const wHeader = document.createElement("div");
      wHeader.className = "mini-calendar-weekdays";
      const wDays = state.lang === "val" ? i18n.val.weekDays : i18n.es.weekDays;
      wDays.forEach(wd => {
        const d = document.createElement("div");
        d.textContent = wd;
        wHeader.appendChild(d);
      });
      card.appendChild(wHeader);

      // Grid de dies
      const mGrid = document.createElement("div");
      mGrid.className = "mini-calendar-days";

      // Offset inicial del mes (Dilluns=1, Diumenge=7)
      let offset = month.firstDayOfWeek === 0 ? 6 : month.firstDayOfWeek - 1;
      for (let o = 0; o < offset; o++) {
        const empty = document.createElement("div");
        empty.className = "mini-day-cell empty";
        mGrid.appendChild(empty);
      }

      for (let d = 1; d <= month.daysInMonth; d++) {
        const dayStr = String(d).padStart(2, "0");
        const dateKey = `${month.id}-${dayStr}`;
        // Dades dinàmiques segons perfil actiu (FP vs ESO/BAT)
        const dayData = calData.getDayDataForProfile(dateKey, state.profile);

        const mCell = document.createElement("div");
        const isSelected = state.selectedDates.includes(dateKey);
        mCell.className = `mini-day-cell ${dayData.status} ${isSelected ? "selected" : ""}`;
        mCell.textContent = d;
        mCell.title = `${dateKey}: ${dayData.title} (${dayData.desc})`;

        if (!matchesFilter(dayData.status)) {
          mCell.style.opacity = "0.2";
        }

        mCell.addEventListener("click", () => {
          openDayModal(dateKey, dayData);
        });

        mGrid.appendChild(mCell);
      }

      card.appendChild(mGrid);
      elYearGrid.appendChild(card);
    });
  }

  // Modal de detalls del dia
  function openDayModal(dateKey, dayData) {
    state.selectedDayModal = { dateKey, dayData };

    const dateObj = new Date(dateKey + "T00:00:00");
    const formattedDate = rules.formatDate(dateObj);
    elModalDateTitle.textContent = `${formattedDate} · ${dayData.title}`;

    // Status badge
    elModalStatusBadge.className = `day-detail-status ${dayData.status}`;
    elModalStatusBadge.textContent = getStatusText(dayData.status);

    // Descripció
    elModalDescription.textContent = dayData.desc || "";

    // Restricció
    if (dayData.status === "no-disponible") {
      elModalRestrictionSec.style.display = "block";
      const rObj = rules.reasons[dayData.reason];
      if (rObj) {
        elModalRestrictionText.textContent = state.lang === "val" ? rObj.val : rObj.es;
      } else {
        elModalRestrictionText.textContent = dayData.desc;
      }
    } else {
      elModalRestrictionSec.style.display = "none";
    }

    // Finestra legal de sol·licitud (15 dies naturals a 2 mesos)
    const win = rules.calculateApplicationWindow(dateKey);
    elModalEarliest.textContent = win.earliestFormatted;
    elModalDeadline.textContent = win.deadlineFormatted;

    // Botó afegir/eliminar
    const isSelected = state.selectedDates.includes(dateKey);
    const canSelect = dayData.status === "disponible" || dayData.status === "no-lectiu";

    if (!canSelect && !isSelected) {
      elModalBtnToggle.style.display = "none";
    } else {
      elModalBtnToggle.style.display = "inline-flex";
      elModalBtnToggle.textContent = isSelected ? t("btnRemoveSelection") : t("btnAddSelection");
      elModalBtnToggle.className = isSelected ? "btn-outline" : "btn-primary";
    }

    elDayModal.classList.add("active");
  }

  function closeDayModal() {
    elDayModal.classList.remove("active");
    state.selectedDayModal = null;
  }

  elModalBtnClose.addEventListener("click", closeDayModal);
  elDayModal.addEventListener("click", (e) => {
    if (e.target === elDayModal) closeDayModal();
  });

  elModalBtnToggle.addEventListener("click", () => {
    if (!state.selectedDayModal) return;
    const { dateKey, dayData } = state.selectedDayModal;
    toggleDateSelection(dateKey, dayData);
    closeDayModal();
  });

  function getStatusText(status) {
    if (status === "disponible") return state.lang === "val" ? "Disponible (Lectiu)" : "Disponible (Lectivo)";
    if (status === "no-disponible") return state.lang === "val" ? "No disponible (Restricció normativa)" : "No disponible (Restricción normativa)";
    if (status === "no-lectiu") return state.lang === "val" ? "Període No Lectiu (3 dies possibles)" : "Período No Lectivo (3 días posibles)";
    if (status === "festiu") return state.lang === "val" ? "Festiu / Vacances" : "Festivo / Vacaciones";
    if (status === "cap-de-setmana") return state.lang === "val" ? "Cap de setmana" : "Fin de semana";
    return status;
  }

  // Gestió de la selecció de dies
  function toggleDateSelection(dateKey, dayData) {
    const idx = state.selectedDates.indexOf(dateKey);
    if (idx >= 0) {
      state.selectedDates.splice(idx, 1);
    } else {
      if (dayData.status === "no-disponible") {
        showToast(state.lang === "val" ? "Aquest dia està expressament prohibit per normativa o per sessions d'avaluació." : "Este día está expresamente prohibido por normativa o sesiones de evaluación.", "danger");
        return;
      }
      if (dayData.status === "festiu" || dayData.status === "cap-de-setmana") {
        showToast(state.lang === "val" ? "No cal demanar permís en dies festius o caps de setmana." : "No procede solicitar permiso en días festivos o fines de semana.", "info");
        return;
      }

      state.selectedDates.push(dateKey);
      state.selectedDates.sort();
    }

    // Desar selecció de manera segura
    safeStorage.setItem("ies_morvedre_selected_dates", JSON.stringify(state.selectedDates));
    renderYearView();
    renderSelectionBar();
  }

  // Barra inferior de selecció
  function renderSelectionBar() {
    const validation = rules.validateSelection(state.selectedDates, state.profile);

    elCountLectius.textContent = `${validation.countLectius} / ${rules.MAX_DIES_LECTIUS}`;
    elCountNoLectius.textContent = `${validation.countNoLectius} / ${rules.MAX_DIES_NO_LECTIUS}`;

    // Renderitzar xips de dates
    elSelectedChips.innerHTML = "";
    if (state.selectedDates.length === 0) {
      elSelectedChips.innerHTML = `<span style="font-size: 0.8rem; color: #94a3b8;">${t("emptySelectionNotice")}</span>`;
    } else {
      state.selectedDates.forEach(dateStr => {
        const dObj = new Date(dateStr + "T00:00:00");
        const chip = document.createElement("div");
        chip.className = "date-chip";
        chip.innerHTML = `
          <span>${rules.formatDate(dObj)}</span>
          <span class="date-chip-remove" title="Eliminar">×</span>
        `;
        chip.querySelector(".date-chip-remove").addEventListener("click", (e) => {
          e.stopPropagation();
          const dayData = calData.getDayDataForProfile(dateStr, state.profile);
          toggleDateSelection(dateStr, dayData);
        });
        elSelectedChips.appendChild(chip);
      });
    }

    // Avisos i alertes
    elSelectionAlerts.innerHTML = "";
    validation.errors.forEach(err => {
      const box = document.createElement("div");
      box.className = "alert-box danger";
      box.innerHTML = `<svg class="ui-icon ui-icon-danger" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> <span>${state.lang === "val" ? err.msgVal : err.msgEs}</span>`;
      elSelectionAlerts.appendChild(box);
    });

    validation.warnings.forEach(warn => {
      const box = document.createElement("div");
      box.className = "alert-box warning";
      box.innerHTML = `<svg class="ui-icon ui-icon-warning" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> <span>${state.lang === "val" ? warn.msgVal : warn.msgEs}</span>`;
      elSelectionAlerts.appendChild(box);
    });
  }

  elBtnClearSelection.addEventListener("click", () => {
    state.selectedDates = [];
    safeStorage.setItem("ies_morvedre_selected_dates", JSON.stringify(state.selectedDates));
    renderYearView();
    renderSelectionBar();
    showToast(state.lang === "val" ? "S'ha buidat la selecció de dates." : "Se ha vaciado la selección de fechas.", "info");
  });

  // Calculadora de Terminis
  elCalcTargetDate.addEventListener("change", () => {
    const dateVal = elCalcTargetDate.value;
    if (!dateVal) return;

    const win = rules.calculateApplicationWindow(dateVal);
    const isVal = state.lang === "val";

    elCalcWinResult.innerHTML = `
      <div style="font-weight: 800; margin-bottom: 0.5rem; color: var(--brand-dark);">
        ${isVal ? "Resultat per al dia:" : "Resultado para el día:"} ${rules.formatDate(win.targetDate)}
      </div>
      <div style="font-size: 0.88rem; line-height: 1.6;">
        <svg class="ui-icon ui-icon-inline" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg><strong>${isVal ? "Obertura del termini (1 mes abans):" : "Apertura del plazo (1 mes antes):"}</strong> ${win.earliestFormatted}<br>
        <svg class="ui-icon ui-icon-inline" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><strong>${isVal ? "Data límit de presentació (7 dies naturals abans):" : "Fecha límite de presentación (7 días naturales antes):"}</strong> <span style="color: #b91c1c; font-weight: bold;">${win.deadlineFormatted}</span><br>
        <svg class="ui-icon ui-icon-inline" viewBox="0 0 24 24"><path d="M12 3v18M6 8l6-5 6 5M3 13l3-5 3 5a3 3 0 0 1-6 0zM15 13l3-5 3 5a3 3 0 0 1-6 0z"/><path d="M4 21h16"/></svg><strong>${isVal ? "Termini de resolució per la Direcció:" : "Plazo de resolución por la Dirección:"}</strong> <span style="color: var(--brand-teal-dark); font-weight: 700;">${isVal ? "Dins dels 6 dies naturals previs a la data (gravació en ITACA)" : "Dentro de los 6 días naturales previos a la fecha (grabación en ITACA)"}</span>
      </div>
      ${win.isExpired
        ? `<div class="alert-box danger" style="margin-top: 0.75rem;"><svg class="ui-icon ui-icon-danger" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> ${isVal ? "Aquest dia està a menys de 7 dies naturals o ja ha vençut el termini." : "Este día está a menos de 7 días naturales o ya ha vencido el plazo."}</div>`
        : `<div class="alert-box info" style="margin-top: 0.75rem;"><svg class="ui-icon ui-icon-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg> ${isVal ? "Pots presentar la sol·licitud en qualsevol moment dins d'aquesta finestra temporal." : "Puedes presentar la solicitud en cualquier momento dentro de esta ventana temporal."}</div>`
      }
    `;
  });

  // Calculadora de Proporcionalitat
  elBtnDoCalcProp.addEventListener("click", () => {
    const startVal = elCalcStart.value;
    const endVal = elCalcEnd.value;

    if (!startVal || !endVal) {
      elPropResult.innerHTML = `<div class="alert-box danger" style="margin-top: 0.75rem;"><svg class="ui-icon ui-icon-danger" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> ${state.lang === "val" ? "Indica tant la data d'inici com la de fi del nomenament." : "Indica tanto la fecha de inicio como la de fin del nombramiento."}</div>`;
      return;
    }

    const res = rules.calculateProportionality(startVal, endVal);
    if (res.error) {
      elPropResult.innerHTML = `<div class="alert-box danger" style="margin-top: 0.75rem;"><svg class="ui-icon ui-icon-danger" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> ${res.error}</div>`;
      return;
    }

    const isVal = state.lang === "val";

    let bracketExplanation = "";
    if (res.bracketKey === "menys_61") {
      bracketExplanation = isVal
        ? "Menys de 61 dies acumulats: la Resolució de 19/10/2026 exigeix un mínim de 61 dies de servei actiu per a generar el primer dia de permís (0 dies lectius i 0 no lectius)."
        : "Menos de 61 días acumulados: la Resolución de 19/10/2026 exige un mínimo de 61 días de servicio activo para generar el primer día de permiso (0 días lectivos y 0 no lectivos).";
    } else if (res.bracketKey === "61_182") {
      bracketExplanation = isVal
        ? "Tram de 61 a 182 dies de serveis prestats: corresponen 2 dies moscosos (1 lectiu + 1 no lectiu)."
        : "Tramo de 61 a 182 días de servicios prestados: corresponden 2 días moscosos (1 lectivo + 1 no lectivo).";
    } else if (res.bracketKey === "183_304") {
      bracketExplanation = isVal
        ? "Tram de 183 a 304 dies de serveis prestats: corresponen 4 dies moscosos (2 lectius + 2 no lectius)."
        : "Tramo de 183 a 304 días de servicios prestados: corresponden 4 días moscosos (2 lectivos + 2 no lectivos).";
    } else {
      bracketExplanation = isVal
        ? "Tram de 305 dies o més: s'assoleix el contingent màxim complet del curs escolar: 6 dies moscosos (3 lectius + 3 no lectius)."
        : "Tramo de 305 días o más: se alcanza el cupo máximo completo del curso escolar: 6 días moscosos (3 lectivos + 3 no lectivos).";
    }

    elPropResult.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.65rem; margin-top: 0.75rem;">
        <div style="background: #f1f5f9; padding: 0.65rem; border-radius: 6px; text-align: center; border: 1px solid #e2e8f0;">
          <div style="font-size: 0.72rem; color: var(--gva-text-muted); font-weight: 600;">${isVal ? "Dies treballats" : "Días trabajados"}</div>
          <div style="font-size: 1.15rem; font-weight: 800; color: var(--brand-dark);">${res.daysWorked} dies</div>
          <div style="font-size: 0.68rem; color: #64748b;">(${res.percentage}% del curs)</div>
        </div>
        <div style="background: var(--brand-teal-light); border: 1px solid var(--brand-teal-border); padding: 0.65rem; border-radius: 6px; text-align: center;">
          <div style="font-size: 0.72rem; color: var(--brand-teal-dark); font-weight: 700;">${isVal ? "Total moscosos" : "Total moscosos"}</div>
          <div style="font-size: 1.35rem; font-weight: 900; color: var(--brand-teal-dark);">${res.totalMoscosos}</div>
        </div>
        <div style="background: #d1fae5; padding: 0.65rem; border-radius: 6px; text-align: center;">
          <div style="font-size: 0.72rem; color: #047857; font-weight: 600;">${isVal ? "En període lectiu" : "En período lectivo"}</div>
          <div style="font-size: 1.15rem; font-weight: 800; color: #047857;">${res.lectius}</div>
        </div>
        <div style="background: #fef3c7; padding: 0.65rem; border-radius: 6px; text-align: center;">
          <div style="font-size: 0.72rem; color: #b45309; font-weight: 600;">${isVal ? "En període no lectiu" : "En período no lectivo"}</div>
          <div style="font-size: 1.15rem; font-weight: 800; color: #b45309;">${res.noLectius}</div>
        </div>
      </div>
      
      <div class="alert-box info" style="margin-top: 0.75rem; font-size: 0.8rem; line-height: 1.45;">
        <svg class="ui-icon ui-icon-teal" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
        <div>
          <strong>${isVal ? "Criteri de còmput oficial (Resolució 19/10/2026):" : "Criterio de cómputo oficial (Resolución 19/10/2026):"}</strong><br>
          ${isVal ? "Fórmula per modalitat:" : "Fórmula por modalidad:"} <code>round(3 · ${res.daysWorked} / 365) = ${res.lectius}</code>.<br>
          ${bracketExplanation}
        </div>
      </div>

      <div style="background: #f8fafc; border: 1px solid var(--gva-border); border-radius: 6px; padding: 0.65rem 0.85rem; margin-top: 0.5rem; font-size: 0.78rem; color: var(--gva-text-main); line-height: 1.45;">
        <svg class="ui-icon ui-icon-inline" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg><strong>${isVal ? "Dret d'entrada per vacants:" : "Derecho de entrada por vacantes:"}</strong>
        ${isVal
          ? "Si el nomenament és per <strong>vacant adjudicada abans de l'1 de novembre</strong>, corresponen directament <strong>6 dies (3 lectius + 3 no lectius)</strong> de gaudi immediat. Si s'adjudica a partir de l'1 de novembre, corresponen <strong>4 dies (2 lectius + 2 no lectius)</strong> d'entrada (ampliable a 3+3 si s'acredita un còmput global de 305 dies amb substitucions prèvies en el curs)."
          : "Si el nombramiento es por <strong>vacante adjudicada antes del 1 de noviembre</strong>, corresponden directamente <strong>6 días (3 lectivos + 3 no lectivos)</strong> de disfrute inmediato. Si se adjudica a partir del 1 de noviembre, corresponden <strong>4 días (2 lectivos + 2 no lectivos)</strong> de entrada (ampliable a 3+3 si se acredita un cómputo global de 305 días con sustituciones previas en el curso)."}
      </div>
    `;
  });

  // FAQ Accordion
  document.querySelectorAll(".faq-question").forEach(q => {
    q.addEventListener("click", () => {
      const item = q.parentElement;
      item.classList.toggle("open");
      const icon = q.querySelector(".faq-toggle-icon");
      if (icon) {
        icon.textContent = item.classList.contains("open") ? "−" : "+";
      }
    });
  });

  // Inicialització
  updateI18n();
  renderYearView();
  renderSelectionBar();
});
