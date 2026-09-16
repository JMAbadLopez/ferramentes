/**
 * Aplicació Interactiva del Calendari de Moscosos
 * IES CAMP DE MORVEDRE (Curs 2026-2027)
 * Vista anual exclusiva i separació de perfils: ESO/Batxillerat vs Formació Professional (FP).
 */

document.addEventListener("DOMContentLoaded", () => {
  // Estat de l'aplicació
  const state = {
    lang: localStorage.getItem("ies_morvedre_lang") || "val",
    profile: localStorage.getItem("ies_morvedre_profile") || "eso_bat", // "eso_bat" | "fp"
    activeFilter: "all",
    selectedDates: JSON.parse(localStorage.getItem("ies_morvedre_selected_dates") || "[]"),
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
      badgeQuotaText: "Quota màxima centre: 5 docents/dia (>81 docents)",
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
      btnCalculateProp: "Calcular dies que em pertoquen"
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
      badgeQuotaText: "Cupo máximo centro: 5 docentes/día (>81 docentes)",
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
      btnCalculateProp: "Calcular días que me corresponden"
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
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      el.textContent = t(key);
    });

    elLangBtns.forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === state.lang);
    });

    updateProfileButtons();
    renderYearView();
    renderSelectionBar();
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
      localStorage.setItem("ies_morvedre_lang", state.lang);
      updateI18n();
    });
  });

  // Selector de Perfil (FP vs ESO/BAT)
  elProfileBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      state.profile = btn.getAttribute("data-profile");
      localStorage.setItem("ies_morvedre_profile", state.profile);
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
        alert(state.lang === "val" ? "Aquest dia està expressament prohibit per normativa o per sessions d'avaluació." : "Este día está expresamente prohibido por normativa o sesiones de evaluación.");
        return;
      }
      if (dayData.status === "festiu" || dayData.status === "cap-de-setmana") {
        alert(state.lang === "val" ? "No cal demanar permís en dies festius o caps de setmana." : "No procede solicitar permiso en días festivos o fines de semana.");
        return;
      }

      state.selectedDates.push(dateKey);
      state.selectedDates.sort();
    }

    // Desar selecció
    localStorage.setItem("ies_morvedre_selected_dates", JSON.stringify(state.selectedDates));
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
    if (confirm(state.lang === "val" ? "Vols buidar la teua selecció de dates?" : "¿Deseas vaciar tu selección de fechas?")) {
      state.selectedDates = [];
      localStorage.setItem("ies_morvedre_selected_dates", JSON.stringify(state.selectedDates));
      renderYearView();
      renderSelectionBar();
    }
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
      alert(state.lang === "val" ? "Indica tant la data d'inici com la de fi del nomenament." : "Indica tanto la fecha de inicio como la de fin del nombramiento.");
      return;
    }

    const res = rules.calculateProportionality(startVal, endVal);
    if (res.error) {
      alert(res.error);
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
