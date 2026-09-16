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
      profileEsoBat: "🎓 ESO i Batxillerat",
      profileFp: "⚙️ Formació Professional (FP)",
      bannerTitle: "Permís per assumptes particulars (Instrucció DG Personal Docent)",
      bannerDesc: "Fins a 6 dies retribuïts: 3 en període lectiu i 3 en període no lectiu. Antelació mínima: 15 dies naturals.",
      badgeQuotaText: "Quota màx centre: 7 docents/dia (5 matí + 2 vesprada)",
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
      modalDeadlinesLabel: "Terminis legals de sol·licitud:",
      modalEarliestLabel: "Obertura de sol·licitud (2 mesos abans):",
      modalDeadlineLabel: "Data límit recomanada (15 dies naturals abans):",
      modalPlanNotice: "Recordatori: És obligatori deixar un pla d'activitats per a l'alumnat a Prefectura d'Estudis.",
      btnAddSelection: "Afegir a la meua selecció",
      btnRemoveSelection: "Eliminar de la selecció",
      btnClose: "Tancar",
      alertConsecutive: "No es poden gaudir dies de moscosos de manera consecutiva.",
      alertMaxLectius: "Màxim 3 dies lectius assolits.",
      alertMaxNoLectius: "Màxim 3 dies no lectius assolits.",
      alertOutsideDeadline: "Atenció: Aquesta data està a menys de 15 dies naturals de distància.",
      emptySelectionNotice: "Encara no has seleccionat cap data. Fes clic sobre qualsevol dia disponible per a afegir-lo a la teua planificació.",
      calcTitle1: "Calculadora de Finestra de Sol·licitud",
      calcTitle2: "Calculadora de Proporcionalitat (Interins / Substitucions)",
      calcTitle3: "Taula de Quotes per Plantilla (IES Camp de Morvedre)",
      calcDesc1: "Indica el dia que voldries gaudir com a moscós per a saber quan has d'enviar la sol·licitud com a molt tard i quan s'obri el termini.",
      calcDesc2: "Si no tens nomenament per a tot el curs escolar complet (1 setembre a 31 agost), calcula quants dies et pertoquen proporcionalment.",
      lblTargetDate: "Data desitjada per al permís:",
      lblStartDate: "Data d'inici del nomenament:",
      lblEndDate: "Data de finalització del nomenament:",
      btnCalculateProp: "Calcular dies que em pertoquen",
      calcWinPlaceholder: "Tria una data per a veure els terminis legals d'antelació (mínim 15 dies naturals i màxim 2 mesos).",
      quotaDesc: "La concessió està supeditada a les necessitats del servei educatiu. El nombre màxim de docents en el centre als quals podrà concedir-se aquest permís per a un mateix dia lectiu s'ajusta a l'escala oficial:",
      quotaThStaff: "Plantilla docent del centre",
      quotaThMax: "Màxim simultani de docents per dia lectiu",
      quotaR1Staff: "Fins a 20 docents",
      quotaR1Max: "1 docent",
      quotaR2Staff: "De 21 a 40 docents",
      quotaR2Max: "2 docents",
      quotaR3Staff: "De 41 a 60 docents",
      quotaR3Max: "3 docents",
      quotaR4Staff: "De 61 a 80 docents",
      quotaR4Max: "4 docents",
      quotaR5Staff: "<strong>Més de 81 docents (IES Camp de Morvedre)</strong>",
      quotaR5Max: "<strong>5 matí + 2 vesprada (Màx 7 docents/dia)</strong>",
      quotaCriteria: `<strong>Criteris de prelació en cas de concurrència per al mateix dia:</strong>
          <ol style="margin-left: 1.25rem; margin-top: 0.35rem;">
            <li>1r: Preferència per a aquells docents que <strong>no hagen gaudit de cap dia</strong> de permís en el present curs escolar.</li>
            <li>2n: En cas d'empat, es resoldrà mitjançant <strong>sorteig públic</strong>.</li>
          </ol>`,
      quotaTardeNotice: "<strong>ℹ️ Distribució de quotes per torns (IES Camp de Morvedre):</strong> El contingent màxim del centre és de <strong>5 docents pel torn de matí</strong> i de <strong>2 professors/es pel torn de vesprada</strong> (FP). Per tant, el màxim simultani permès al centre sumant ambdós torns és de <strong>7 docents al dia</strong> (5 matí + 2 vesprada). En cap cas podran coincidir més de 2 docents de vesprada el mateix dia.",
      normativeSummaryTitle: "Resum de la Instrucció de la DG de Personal Docent (GVA)",
      normativeSummaryBody: `<p><strong>1. Nombre de dies:</strong> El personal docent pot sol·licitar fins a un màxim de <strong>6 dies d'assumptes particulars</strong> per curs escolar:</p>
          <ul style="margin-left: 1.5rem; margin-top: 0.25rem;">
            <li>Fins a <strong>3 dies en períodes lectius</strong> (amb presència d'alumnat a l'aula).</li>
            <li>Fins a <strong>3 dies en períodes no lectius</strong> (juliol, setembre abans de l'inici de curs, jornades formatives o períodes sense activitat lectiva).</li>
          </ul>
          <br>
          <p><strong>2. Retribució:</strong> Els sis dies són amb dret íntegre a retribucions.</p>
          <br>
          <p><strong>3. Condició pedagògica inexcusable:</strong> El docent que obtinga aquest permís té l'<strong>obligació d'elaborar i deixar depositat un pla d'activitats per a l'alumnat</strong> a la Prefectura d'Estudis per a garantir la continuïtat pedagògica.</p>
          <br>
          <p><strong>4. Sol·licitud i terminis:</strong> S'ha de presentar davant la Direcció del centre amb una antelació mínima de <strong>15 dies naturals</strong> i una antelació màxima de <strong>dos mesos</strong> respecte a la data sol·licitada.</p>
          <br>
          <p><strong>5. Resolució:</strong> Competència exclusiva del Director o Directora de l'institut. El silenci administratiu té caràcter <strong>desestimatori (negatiu)</strong>.</p>
          <br>
          <p><strong>6. Prohibicions i exclusions expresses:</strong></p>
          <ul style="margin-left: 1.5rem; margin-top: 0.25rem;">
            <li>Durant els <strong>15 primers dies lectius</strong> del curs (del 9 al 29 de setembre de 2026).</li>
            <li>Durant els <strong>15 últims dies lectius</strong> del curs (del 31 de maig al 18 de juny de 2027).</li>
            <li>En el període de <strong>7 dies abans o després de les vacances</strong> de Nadal, Falles, Pasqua i Sant Joan.</li>
            <li>En <strong>períodes d'avaluació</strong> escolars (segons el calendari oficial d'avaluacions del centre per a FP o ESO/Batxillerat), ni entre l'avaluació ordinària i l'extraordinària de final de curs.</li>
            <li><strong>No es poden gaudir de manera consecutiva</strong>.</li>
          </ul>
          <br>
          <p><strong>7. Contingent per torns (Matí i Vesprada d'FP):</strong> A l'IES Camp de Morvedre, el contingent màxim és de <strong>5 docents pel torn de matí</strong> i de <strong>2 professors/es pel torn de vesprada</strong>. Per tant, el màxim simultani permès al centre entre ambdós torns és de <strong>7 docents al dia (5 de matí + 2 de vesprada)</strong>. Mai podran coincidir més de dos docents del torn de vesprada en una mateixa data.</p>`,
      faqSectionTitle: "Preguntes Freqüents (FAQ)",
      faqQ1: "Puc ajuntar dos dies moscosos si un és dijous i l'altre divendres?",
      faqA1: "No. La normativa estableix de manera taxativa que <em>\"no podran gaudir-se de manera consecutiva\"</em>. Tampoc és permés demanar divendres i dilluns consecutius, ja que es consideren dies laborals consecutius.",
      faqQ2: "Per què hi ha dies bloquejats diferents entre FP i ESO/Batxillerat?",
      faqA2: "Perquè la normativa de la Conselleria d'Educació prohibeix expressament gaudir de dies moscosos durant els períodes d'avaluacions. Com que les dates de les sessions d'avaluació inicial, 1a, 2a, final i extraordinària dels Cicles Formatius (FPB, Grau Mitjà, Grau Superior, Cursos d'Especialització) no coincideixen exactament amb les d'ESO i Batxillerat, hem incorporat el calendari oficial específic d'avaluacions de l'IES Camp de Morvedre perquè pugues consultar amb total precisió els teus dies hàbils segons les teues etapes educatives.",
      faqQ3: "Puc demanar un moscós lectiu el mes de setembre?",
      faqA3: "Només a partir del 30 de setembre. Els 15 primers dies lectius amb alumnat (del 9 al 29 de setembre de 2026) estan bloquejats per normativa. Els dies de l'1 al 8 de setembre són període no lectiu, on es podria sol·licitar un dels 3 dies no lectius.",
      faqQ4: "Què passa si dos o més companys del mateix departament demanem el mateix dia?",
      faqA4: "La concessió està condicionada a les necessitats del servei educatiu. A l'IES Camp de Morvedre el contingent màxim és de 5 docents pel torn de matí i 2 docents pel torn de vesprada (sumant un màxim de 7 docents al dia). Si hi ha coincidència en un mateix departament o torn que impossibilite l'atenció de l'alumnat, Prefectura i Direcció prioritzaran el docent que no haja gaudit cap dia aquest curs o realitzaran sorteig.",
      faqQ5: "Sóc interí/na i tinc una vacant o substitució temporal. Quants dies em toquen?",
      faqA5: "El nombre de dies és estrictament proporcional al temps de servei en el curs escolar. Pots utilitzar la nostra pestanya de <em>Calculadores</em> per a comprovar els teus dies exactes. A més, si cesses i et tornen a nomenar en el mateix curs, conserves els dies pendents de gaudi!",
      faqQ6: "Si no gaste els dies d'aquest curs, els puc acumular per al curs vinent?",
      faqA6: "No. Els dies no gaudits abans de la finalització del curs escolar caduquen i no són acumulables en cap cas.",
      faqQ7: "Com s'aplica el límit de dies moscosos per al professorat del torn de vesprada d'FP?",
      faqA7: "A l'IES Camp de Morvedre s'aplica una distribució diferenciada per torns: el contingent màxim és de <strong>5 docents pel torn de matí</strong> i de <strong>2 docents pel torn de vesprada</strong>. Per tant, <strong>mai podran gaudir de permís per assumptes particulars més de dos professors o professores del torn de vesprada el mateix dia</strong>, i el total del centre mai podrà superar els <strong>7 docents diaris (5 de matí + 2 de vesprada)</strong>, garantint sempre la correcta atenció educativa.",
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
      profileEsoBat: "🎓 ESO y Bachillerato",
      profileFp: "⚙️ Formación Profesional (FP)",
      bannerTitle: "Permiso por asuntos particulares (Instrucción DG Personal Docente)",
      bannerDesc: "Hasta 6 días retribuidos: 3 en período lectivo y 3 en período no lectivo. Antelación mínima: 15 días naturales.",
      badgeQuotaText: "Cupo máx centro: 7 docentes/día (5 mañana + 2 tarde)",
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
      modalDeadlinesLabel: "Plazos legales de solicitud:",
      modalEarliestLabel: "Apertura de solicitud (2 meses antes):",
      modalDeadlineLabel: "Fecha límite recomendada (15 días naturales antes):",
      modalPlanNotice: "Recordatorio: Es obligatorio dejar un plan de actividades para el alumnado en Jefatura de Estudios.",
      btnAddSelection: "Añadir a mi selección",
      btnRemoveSelection: "Eliminar de la selección",
      btnClose: "Cerrar",
      alertConsecutive: "No se pueden disfrutar días de moscosos de forma consecutiva.",
      alertMaxLectius: "Máximo 3 días lectivos alcanzados.",
      alertMaxNoLectius: "Máximo 3 días no lectivos alcanzados.",
      alertOutsideDeadline: "Atención: Esta fecha está a menos de 15 días naturales de distancia.",
      emptySelectionNotice: "Todavía no has seleccionado ninguna fecha. Haz clic sobre cualquier día disponible para añadirlo a tu planificación.",
      calcTitle1: "Calculadora de Ventana de Solicitud",
      calcTitle2: "Calculadora de Proporcionalidad (Interinos / Sustituciones)",
      calcTitle3: "Tabla de Cupos por Plantilla (IES Camp de Morvedre)",
      calcDesc1: "Indica el día que desearías disfrutar como moscoso para conocer cuándo debes enviar la solicitud como muy tarde y cuándo se abre el plazo.",
      calcDesc2: "Si no tienes nombramiento para todo el curso escolar completo (1 septiembre a 31 agosto), calcula cuántos días te corresponden proporcionalmente.",
      lblTargetDate: "Fecha deseada para el permiso:",
      lblStartDate: "Fecha de inicio del nombramiento:",
      lblEndDate: "Fecha de finalización del nombramiento:",
      btnCalculateProp: "Calcular días que me corresponden",
      calcWinPlaceholder: "Elige una fecha para ver los plazos legales de antelación (mínimo 15 días naturales y máximo 2 meses).",
      quotaDesc: "La concesión está supeditada a las necesidades del servicio educativo. El número máximo de docentes en el centro a los que podrá concederse este permiso para un mismo día lectivo se ajusta a la escala oficial:",
      quotaThStaff: "Plantilla docente del centro",
      quotaThMax: "Máximo simultáneo de docentes por día lectivo",
      quotaR1Staff: "Hasta 20 docentes",
      quotaR1Max: "1 docente",
      quotaR2Staff: "De 21 a 40 docentes",
      quotaR2Max: "2 docentes",
      quotaR3Staff: "De 41 a 60 docentes",
      quotaR3Max: "3 docentes",
      quotaR4Staff: "De 61 a 80 docentes",
      quotaR4Max: "4 docentes",
      quotaR5Staff: "<strong>Más de 81 docentes (IES Camp de Morvedre)</strong>",
      quotaR5Max: "<strong>5 mañana + 2 tarde (Máx 7 docentes/día)</strong>",
      quotaCriteria: `<strong>Criterios de prelación en caso de concurrencia para el mismo día:</strong>
          <ol style="margin-left: 1.25rem; margin-top: 0.35rem;">
            <li>1º: Preferencia para aquellos docentes que <strong>no hayan disfrutado de ningún día</strong> de permiso en el presente curso escolar.</li>
            <li>2º: En caso de empate, se resolverá mediante <strong>sorteo público</strong>.</li>
          </ol>`,
      quotaTardeNotice: "<strong>ℹ️ Distribución de cupos por turnos (IES Camp de Morvedre):</strong> El cupo máximo del centro es de <strong>5 docentes para el turno de mañana</strong> y de <strong>2 profesores/as para el turno de tarde</strong> (FP). Por tanto, el máximo simultáneo permitido en el centro sumando ambos turnos es de <strong>7 docentes al día</strong> (5 mañana + 2 tarde). En ningún caso podrán coincidir más de 2 docentes de tarde el mismo día.",
      normativeSummaryTitle: "Resumen de la Instrucción de la DG de Personal Docente (GVA)",
      normativeSummaryBody: `<p><strong>1. Número de días:</strong> El personal docente puede solicitar hasta un máximo de <strong>6 días de asuntos particulares</strong> por curso escolar:</p>
          <ul style="margin-left: 1.5rem; margin-top: 0.25rem;">
            <li>Hasta <strong>3 días en períodos lectivos</strong> (con presencia de alumnado en el aula).</li>
            <li>Hasta <strong>3 días en períodos no lectivos</strong> (julio, septiembre antes del inicio de curso, jornadas formativas o períodos sin actividad lectiva).</li>
          </ul>
          <br>
          <p><strong>2. Retribución:</strong> Los seis días son con derecho íntegro a retribuciones.</p>
          <br>
          <p><strong>3. Condición pedagógica inexcusable:</strong> El docente que obtenga este permiso tiene la <strong>obligación de elaborar y dejar depositado un plan de actividades para el alumnado</strong> en la Jefatura de Estudios para garantizar la continuidad pedagógica.</p>
          <br>
          <p><strong>4. Solicitud y plazos:</strong> Debe presentarse ante la Dirección del centro con una antelación mínima de <strong>15 días naturales</strong> y una antelación máxima de <strong>dos meses</strong> respecto a la fecha solicitada.</p>
          <br>
          <p><strong>5. Resolución:</strong> Competencia exclusiva del Director o Directora del instituto. El silencio administrativo tiene carácter <strong>desestimatorio (negativo)</strong>.</p>
          <br>
          <p><strong>6. Prohibiciones y exclusiones expresas:</strong></p>
          <ul style="margin-left: 1.5rem; margin-top: 0.25rem;">
            <li>Durante los <strong>15 primeros días lectivos</strong> del curso (del 9 al 29 de septiembre de 2026).</li>
            <li>Durante los <strong>15 últimos días lectivos</strong> del curso (del 31 de mayo al 18 de junio de 2027).</li>
            <li>En el período de <strong>7 días antes o después de las vacaciones</strong> de Navidad, Fallas, Pascua y San Juan.</li>
            <li>En <strong>períodos de evaluación</strong> escolares (según el calendario oficial de evaluaciones del centro para FP o ESO/Bachillerato), ni entre la evaluación ordinaria y la extraordinaria de final de curso.</li>
            <li><strong>No se pueden disfrutar de manera consecutiva</strong>.</li>
          </ul>
          <br>
          <p><strong>7. Cupo por turnos (Mañana y Tarde de FP):</strong> En el IES Camp de Morvedre, el cupo máximo es de <strong>5 docentes para el turno de mañana</strong> y de <strong>2 profesores/as para el turno de tarde</strong>. Por tanto, el máximo simultáneo permitido en el centro sumando ambos turnos es de <strong>7 docentes al día (5 de mañana + 2 de tarde)</strong>. Nunca podrán coincidir más de dos docentes del turno de tarde en una misma fecha.</p>`,
      faqSectionTitle: "Preguntas Frecuentes (FAQ)",
      faqQ1: "¿Puedo juntar dos días moscosos si uno es jueves y el otro viernes?",
      faqA1: "No. La normativa establece de manera taxativa que <em>\"no podrán disfrutarse de manera consecutiva\"</em>. Tampoco está permitido pedir viernes y lunes consecutivos, ya que se consideran días laborables consecutivos.",
      faqQ2: "¿Por qué hay días bloqueados diferentes entre FP y ESO/Bachillerato?",
      faqA2: "Porque la normativa de la Conselleria de Educación prohíbe expresamente disfrutar de días moscosos durante los períodos de evaluación. Dado que las fechas de las sesiones de evaluación inicial, 1ª, 2ª, final y extraordinaria de los Ciclos Formativos (FPB, Grado Medio, Grado Superior, Cursos de Especialización) no coinciden exactamente con las de ESO y Bachillerato, hemos incorporado el calendario oficial específico de evaluaciones del IES Camp de Morvedre para que puedas consultar con total precisión tus días hábiles según tus etapas educativas.",
      faqQ3: "¿Puedo pedir un moscoso lectivo en el mes de septiembre?",
      faqA3: "Solo a partir del 30 de septiembre. Los 15 primeros días lectivos con alumnado (del 9 al 29 de septiembre de 2026) están bloqueados por normativa. Los días del 1 al 8 de septiembre son período no lectivo, donde se podría solicitar uno de los 3 días no lectivos.",
      faqQ4: "¿Qué ocurre si dos o más compañeros del mismo departamento pedimos el mismo día?",
      faqA4: "La concesión está condicionada a las necesidades del servicio educativo. En el IES Camp de Morvedre el cupo máximo es de 5 docentes para el turno de mañana y 2 docentes para el turno de tarde (sumando un máximo de 7 docentes al día). Si hay coincidencia en un mismo departamento o turno que imposibilite la atención del alumnado, Jefatura y Dirección priorizarán al docente que no haya disfrutado ningún día este curso o realizarán sorteo.",
      faqQ5: "¿Soy interino/a y tengo una vacante o sustitución temporal. ¿Cuántos días me tocan?",
      faqA5: "El número de días es estrictamente proporcional al tiempo de servicio en el curso escolar. Puedes utilizar nuestra pestaña de <em>Calculadoras</em> para comprobar tus días exactos. Además, ¡si cesas y te vuelven a nombrar en el mismo curso, conservas los días pendientes de disfrute!",
      faqQ6: "¿Si no gasto los días de este curso, los puedo acumular para el curso siguiente?",
      faqA6: "No. Los días no disfrutados antes de la finalización del curso escolar caducan y no son acumulables en ningún caso.",
      faqQ7: "¿Cómo se aplica el límite de días moscosos para el profesorado del turno de tarde de FP?",
      faqA7: "En el IES Camp de Morvedre se aplica una distribución diferenciada por turnos: el cupo máximo es de <strong>5 docentes para el turno de mañana</strong> y de <strong>2 profesores/as para el turno de tarde</strong>. Por tanto, <strong>nunca podrán disfrutar de permiso por asuntos particulares más de dos profesores o profesoras del turno de tarde el mismo día</strong>, y el total del centro nunca podrá superar los <strong>7 docentes diarios (5 de mañana + 2 de tarde)</strong>, garantizando siempre la debida atención educativa.",
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
      box.innerHTML = `<span>⚠️</span> <span>${state.lang === "val" ? err.msgVal : err.msgEs}</span>`;
      elSelectionAlerts.appendChild(box);
    });

    validation.warnings.forEach(warn => {
      const box = document.createElement("div");
      box.className = "alert-box warning";
      box.innerHTML = `<span>⏳</span> <span>${state.lang === "val" ? warn.msgVal : warn.msgEs}</span>`;
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
      <div style="font-size: 0.9rem; line-height: 1.6;">
        📅 <strong>${isVal ? "Data d'obertura del termini (2 mesos abans):" : "Fecha de apertura del plazo (2 meses antes):"}</strong> ${win.earliestFormatted}<br>
        ⏰ <strong>${isVal ? "Data límit recomanada (15 dies naturals abans):" : "Fecha límite recomendada (15 días naturales antes):"}</strong> <span style="color: #b91c1c; font-weight: bold;">${win.deadlineFormatted}</span>
      </div>
      ${win.isExpired
        ? `<div class="alert-box danger" style="margin-top: 0.75rem;">⚠️ ${isVal ? "Aquest dia està a menys de 15 dies naturals o ja ha vençut el termini." : "Este día está a menos de 15 días naturales o ya ha vencido el plazo."}</div>`
        : `<div class="alert-box info" style="margin-top: 0.75rem;">ℹ️ ${isVal ? "Pots presentar la sol·licitud en qualsevol moment dins d'aquesta finestra temporal." : "Puedes presentar la solicitud en cualquier momento dentro de esta ventana temporal."}</div>`
      }
    `;
  });

  // Calculadora de Proporcionalitat
  elBtnDoCalcProp.addEventListener("click", () => {
    const startVal = elCalcStart.value;
    const endVal = elCalcEnd.value;

    if (!startVal || !endVal) {
      elPropResult.innerHTML = `<div class="alert-box danger" style="margin-top: 0.75rem;">⚠️ ${state.lang === "val" ? "Indica tant la data d'inici com la de fi del nomenament." : "Indica tanto la fecha de inicio como la de fin del nombramiento."}</div>`;
      return;
    }

    const res = rules.calculateProportionality(startVal, endVal);
    if (res.error) {
      elPropResult.innerHTML = `<div class="alert-box danger" style="margin-top: 0.75rem;">⚠️ ${res.error}</div>`;
      return;
    }

    const isVal = state.lang === "val";
    elPropResult.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0.75rem; margin-top: 0.75rem;">
        <div style="background: #f1f5f9; padding: 0.75rem; border-radius: 6px; text-align: center; border: 1px solid #e2e8f0;">
          <div style="font-size: 0.75rem; color: var(--gva-text-muted); font-weight: 600;">${isVal ? "Dies treballats" : "Días trabajados"}</div>
          <div style="font-size: 1.25rem; font-weight: 800; color: var(--brand-dark);">${res.daysWorked} dies</div>
          <div style="font-size: 0.7rem; color: #64748b;">(${res.percentage}% del curs)</div>
        </div>
        <div style="background: var(--brand-teal-light); border: 1px solid var(--brand-teal-border); padding: 0.75rem; border-radius: 6px; text-align: center;">
          <div style="font-size: 0.75rem; color: var(--brand-teal-dark); font-weight: 700;">${isVal ? "Total moscosos" : "Total moscosos"}</div>
          <div style="font-size: 1.5rem; font-weight: 900; color: var(--brand-teal-dark);">${res.totalMoscosos}</div>
        </div>
        <div style="background: #d1fae5; padding: 0.75rem; border-radius: 6px; text-align: center;">
          <div style="font-size: 0.75rem; color: #047857; font-weight: 600;">${isVal ? "En període lectiu" : "En período lectivo"}</div>
          <div style="font-size: 1.25rem; font-weight: 800; color: #047857;">${res.lectius}</div>
        </div>
        <div style="background: #fef3c7; padding: 0.75rem; border-radius: 6px; text-align: center;">
          <div style="font-size: 0.75rem; color: #b45309; font-weight: 600;">${isVal ? "En període no lectiu" : "En período no lectivo"}</div>
          <div style="font-size: 1.25rem; font-weight: 800; color: #b45309;">${res.noLectius}</div>
        </div>
      </div>
      <p style="font-size: 0.8rem; color: #64748b; margin-top: 0.75rem;">
        * ${isVal
          ? "Càlcul proporcional exacte sobre els 6 dies anuals màxims. En cas de successió de nomenaments durant el mateix curs, es conserven els dies pendents de gaudi."
          : "Cálculo proporcional exacto sobre los 6 días anuales máximos. En caso de sucesión de nombramientos durante el mismo curso, se conservan los días pendientes de disfrute."}
      </p>
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
