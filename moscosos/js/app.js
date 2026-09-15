/**
 * Aplicació Interactiva del Calendari de Moscosos
 * IES CAMP DE MORVEDRE (Curs 2026-2027)
 */

document.addEventListener("DOMContentLoaded", () => {
  // Estat de l'aplicació
  const state = {
    lang: localStorage.getItem("ies_morvedre_lang") || "val",
    viewMode: "month", // "month" | "year"
    currentMonthIdx: 0, // 0 = Setembre 2026
    activeFilter: "all",
    selectedDates: JSON.parse(localStorage.getItem("ies_morvedre_selected_dates") || "[]"),
    docentInfo: JSON.parse(localStorage.getItem("ies_morvedre_docent_info") || JSON.stringify({
      nom: "",
      dni: "",
      departament: "",
      cos: "Secundària / FP",
      substitucio: false
    })),
    selectedDayModal: null
  };

  // Carregar el logotip a la capçalera si està disponible
  const logoEl = document.getElementById("headerLogoImg");
  if (logoEl && window.CAMP_LOGO_DATA_URI) {
    logoEl.src = window.CAMP_LOGO_DATA_URI;
  }

  // Diccionari bilingüe (Valencià / Castellà) - Sense duplicació d'icones a les pestanyes
  const i18n = {
    val: {
      appTitle: "Calendari de Dies Moscosos",
      appSubtitle: "IES Camp de Morvedre · Curs 2026-2027 · Normativa GVA",
      tabCalendar: "Calendari Docent",
      tabRequest: "Generar Sol·licitud",
      tabCalculators: "Calculadores i Terminis",
      tabNormative: "Normativa i FAQ",
      bannerTitle: "Permís per assumptes particulars (Instrucció DG Personal Docent)",
      bannerDesc: "Fins a 6 dies retribuïts: 3 en període lectiu i 3 en període no lectiu. Antelació mínima: 15 dies naturals.",
      badgeQuotaText: "Quota màxima centre: 5 docents/dia (>81 docents)",
      legendTitle: "Codi de colors del calendari",
      legDisponible: "Disponible (Lectiu)",
      legBloquejat: "No disponible (Normativa)",
      legFestiu: "Festiu / Vacances",
      legNoLectiu: "No lectiu (3 dies no lectius)",
      legCapDeSetmana: "Cap de setmana",
      legSeleccionat: "El meu dia seleccionat",
      viewMonth: "Vista mensual",
      viewYear: "Vista anual completa",
      filterAll: "Tots els dies",
      filterAvailable: "Només disponibles",
      filterNoLectius: "Dies no lectius",
      filterBlocked: "Dies bloquejats",
      filterHolidays: "Festius",
      weekDays: ["Dl", "Dm", "Dc", "Dj", "Dv", "Ds", "Dg"],
      badgeLectiu: "Lectiu hàbil",
      badgeBloquejat: "Bloquejat",
      badgeFestiu: "Festiu",
      badgeNoLectiu: "No lectiu",
      badgeCapDeSetmana: "Cap de setmana",
      prevMonth: "← Mes anterior",
      nextMonth: "Mes següent →",
      selectionBarTitle: "Els meus dies moscosos:",
      countLectiusLabel: "Lectius:",
      countNoLectiusLabel: "No lectius:",
      btnClearSelection: "Buidar selecció",
      btnGenerateDoc: "Tramitar Sol·licitud →",
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
      emptySelectionNotice: "Encara no has seleccionat cap data. Fes clic sobre els dies disponibles en verd (lectius) o taronja (no lectius) del calendari.",
      docHeading: "SOL·LICITUD DE PERMÍS PER ASSUMPTES PARTICULARS SENSE JUSTIFICACIÓ (DIES MOSCOSSOS)",
      docToDirector: "A LA DIRECCIÓ DE L'IES CAMP DE MORVEDRE (SAGUNT)",
      btnPrint: "Imprimir / Guardar en PDF",
      btnCopyText: "Copiar text oficial",
      copiedSuccess: "Text copiat al porta-retalls amb èxit!",
      calcTitle1: "Calculadora de Finestra de Sol·licitud",
      calcTitle2: "Calculadora de Proporcionalitat (Interins / Substitucions)",
      calcTitle3: "Taula de Quotes per Plantilla (IES Camp de Morvedre)",
      calcDesc1: "Indica el dia que voldries gaudir com a moscós per a saber quan has d'enviar la sol·licitud com a molt tard i quan s'obri el termini.",
      calcDesc2: "Si no tens nomenament per a tot el curs escolar complet (1 setembre a 31 agost), calcula quants dies et pertoquen proporcionalment.",
      lblTargetDate: "Data desitjada per al permís:",
      lblCalcResult: "Finestra de tramitació legal:",
      lblStartDate: "Data d'inici del nomenament:",
      lblEndDate: "Data de finalització del nomenament:",
      btnCalculateProp: "Calcular dies que em pertoquen",
      propResultDaysWorked: "Dies de contracte / nomenament:",
      propResultTotal: "Total dies moscosos reconeguts:",
      propResultLectius: "Dies màxims en període lectiu:",
      propResultNoLectius: "Dies màxims en període no lectiu:"
    },
    es: {
      appTitle: "Calendario de Días Moscosos",
      appSubtitle: "IES Camp de Morvedre · Curso 2026-2027 · Normativa GVA",
      tabCalendar: "Calendario Docente",
      tabRequest: "Generar Solicitud",
      tabCalculators: "Calculadoras y Plazos",
      tabNormative: "Normativa y FAQ",
      bannerTitle: "Permiso por asuntos particulares (Instrucción DG Personal Docente)",
      bannerDesc: "Hasta 6 días retribuidos: 3 en período lectivo y 3 en período no lectivo. Antelación mínima: 15 días naturales.",
      badgeQuotaText: "Cupo máximo centro: 5 docentes/día (>81 docentes)",
      legendTitle: "Código de colores del calendario",
      legDisponible: "Disponible (Lectivo)",
      legBloquejat: "No disponible (Normativa)",
      legFestiu: "Festivo / Vacaciones",
      legNoLectiu: "No lectivo (3 días no lectivos)",
      legCapDeSetmana: "Fin de semana",
      legSeleccionat: "Mi día seleccionado",
      viewMonth: "Vista mensual",
      viewYear: "Vista anual completa",
      filterAll: "Todos los días",
      filterAvailable: "Solo disponibles",
      filterNoLectius: "Días no lectivos",
      filterBlocked: "Días bloqueados",
      filterHolidays: "Festivos",
      weekDays: ["L", "M", "X", "J", "V", "S", "D"],
      badgeLectiu: "Lectivo hábil",
      badgeBloquejat: "Bloqueado",
      badgeFestiu: "Festivo",
      badgeNoLectiu: "No lectivo",
      badgeCapDeSetmana: "Fin de semana",
      prevMonth: "← Mes anterior",
      nextMonth: "Mes siguiente →",
      selectionBarTitle: "Mis días moscosos:",
      countLectiusLabel: "Lectivos:",
      countNoLectiusLabel: "No lectivos:",
      btnClearSelection: "Vaciar selección",
      btnGenerateDoc: "Tramitar Solicitud →",
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
      emptySelectionNotice: "Todavía no has seleccionado ninguna fecha. Haz clic sobre los días disponibles en verde (lectivos) o naranja (no lectivos) del calendario.",
      docHeading: "SOLICITUD DE PERMISO POR ASUNTOS PARTICULARES SIN JUSTIFICACIÓN (DÍAS MOSCOSOS)",
      docToDirector: "A LA DIRECCIÓN DEL IES CAMP DE MORVEDRE (SAGUNT)",
      btnPrint: "Imprimir / Guardar en PDF",
      btnCopyText: "Copiar texto oficial",
      copiedSuccess: "¡Texto copiado al portapapeles con éxito!",
      calcTitle1: "Calculadora de Ventana de Solicitud",
      calcTitle2: "Calculadora de Proporcionalidad (Interinos / Sustituciones)",
      calcTitle3: "Tabla de Cupos por Plantilla (IES Camp de Morvedre)",
      calcDesc1: "Indica el día que desearías disfrutar como moscoso para conocer cuándo debes enviar la solicitud como muy tarde y cuándo se abre el plazo.",
      calcDesc2: "Si no tienes nombramiento para todo el curso escolar completo (1 septiembre a 31 agosto), calcula cuántos días te corresponden proporcionalmente.",
      lblTargetDate: "Fecha deseada para el permiso:",
      lblCalcResult: "Ventana de tramitación legal:",
      lblStartDate: "Fecha de inicio del nombramiento:",
      lblEndDate: "Fecha de finalización del nombramiento:",
      btnCalculateProp: "Calcular días que me corresponden",
      propResultDaysWorked: "Días de contrato / nombramiento:",
      propResultTotal: "Total días moscosos reconocidos:",
      propResultLectius: "Días máximos en período lectivo:",
      propResultNoLectius: "Días máximos en período no lectivo:"
    }
  };

  const calData = window.CALENDAR_DATA_2026_2027;
  const rules = window.MOSCOSO_RULES;

  // Cache elements
  const elNavTabs = document.querySelectorAll(".nav-tab");
  const elTabPanels = document.querySelectorAll(".tab-panel");
  const elLangBtns = document.querySelectorAll(".lang-btn");
  const elMonthGrid = document.getElementById("monthGridContainer");
  const elYearGrid = document.getElementById("yearGridContainer");
  const elCurrentMonthTitle = document.getElementById("currentMonthTitle");
  const elPrevMonthBtn = document.getElementById("prevMonthBtn");
  const elNextMonthBtn = document.getElementById("nextMonthBtn");
  const elViewMonthBtn = document.getElementById("viewMonthBtn");
  const elViewYearBtn = document.getElementById("viewYearBtn");
  const elFilterPills = document.querySelectorAll(".filter-pill");
  const elCountLectius = document.getElementById("countLectius");
  const elCountNoLectius = document.getElementById("countNoLectius");
  const elSelectedChips = document.getElementById("selectedChips");
  const elSelectionAlerts = document.getElementById("selectionAlerts");
  const elBtnClearSelection = document.getElementById("btnClearSelection");
  const elBtnGoToRequest = document.getElementById("btnGoToRequest");

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

  // Sol·licitud elements
  const elDocName = document.getElementById("docName");
  const elDocDni = document.getElementById("docDni");
  const elDocDept = document.getElementById("docDept");
  const elDocPreview = document.getElementById("docPreview");
  const elBtnPrintDoc = document.getElementById("btnPrintDoc");
  const elBtnCopyDoc = document.getElementById("btnCopyDoc");
  const elCopyFeedback = document.getElementById("copyFeedback");

  // Calculators elements
  const elCalcTargetDate = document.getElementById("calcTargetDate");
  const elCalcWinResult = document.getElementById("calcWinResult");
  const elCalcStart = document.getElementById("calcStart");
  const elCalcEnd = document.getElementById("calcEnd");
  const elBtnDoCalcProp = document.getElementById("btnDoCalcProp");
  const elPropResult = document.getElementById("propResult");

  // Funció de traducció
  function t(key) {
    const currentDict = i18n[state.lang] || i18n["val"];
    return currentDict[key] || key;
  }

  // Actualitzar text de la interfície segons idioma
  function updateI18n() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      el.textContent = t(key);
    });

    elLangBtns.forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === state.lang);
    });

    updateMonthTitle();
    renderSelectionBar();
    renderDocPreview();
  }

  // Navegació de pestanyes ROBUSTA amb comutació visual
  elNavTabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      const btn = e.currentTarget;
      const targetId = btn.getAttribute("data-target");
      if (!targetId) return;

      elNavTabs.forEach(t => t.classList.remove("active"));
      elTabPanels.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add("active");
      }

      if (targetId === "panel-sollicitud") {
        renderDocPreview();
      }
    });
  });

  // Selector d'idioma
  elLangBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      state.lang = btn.getAttribute("data-lang");
      localStorage.setItem("ies_morvedre_lang", state.lang);
      updateI18n();
      renderCurrentView();
    });
  });

  // Canvi de vista (mensual / anual)
  elViewMonthBtn.addEventListener("click", () => {
    state.viewMode = "month";
    elViewMonthBtn.classList.add("active");
    elViewYearBtn.classList.remove("active");
    elMonthGrid.style.display = "block";
    elYearGrid.style.display = "none";
    document.getElementById("monthNavigationControls").style.display = "flex";
    renderMonthView();
  });

  elViewYearBtn.addEventListener("click", () => {
    state.viewMode = "year";
    elViewYearBtn.classList.add("active");
    elViewMonthBtn.classList.remove("active");
    elMonthGrid.style.display = "none";
    elYearGrid.style.display = "grid";
    document.getElementById("monthNavigationControls").style.display = "none";
    renderYearView();
  });

  // Navegació entre mesos
  elPrevMonthBtn.addEventListener("click", () => {
    if (state.currentMonthIdx > 0) {
      state.currentMonthIdx--;
      renderMonthView();
    }
  });

  elNextMonthBtn.addEventListener("click", () => {
    if (state.currentMonthIdx < calData.months.length - 1) {
      state.currentMonthIdx++;
      renderMonthView();
    }
  });

  function updateMonthTitle() {
    const m = calData.months[state.currentMonthIdx];
    if (!m) return;
    elCurrentMonthTitle.textContent = state.lang === "val" ? m.nomVal : m.nomEs;
    elPrevMonthBtn.disabled = state.currentMonthIdx === 0;
    elNextMonthBtn.disabled = state.currentMonthIdx === calData.months.length - 1;
  }

  // Filtres
  elFilterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      elFilterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      state.activeFilter = pill.getAttribute("data-filter");
      renderCurrentView();
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

  // Renderització del mes detallat
  function renderMonthView() {
    updateMonthTitle();
    const month = calData.months[state.currentMonthIdx];
    const daysGrid = document.getElementById("calendarDaysGrid");
    daysGrid.innerHTML = "";

    // Capçalera dels dies de la setmana
    const weekdaysContainer = document.getElementById("calendarWeekdays");
    weekdaysContainer.innerHTML = "";
    const wDays = state.lang === "val" ? i18n.val.weekDays : i18n.es.weekDays;
    wDays.forEach(wd => {
      const div = document.createElement("div");
      div.textContent = wd;
      weekdaysContainer.appendChild(div);
    });

    // Càlcul de buits inicials (Dilluns = 1, Diumenge = 7)
    let offset = month.firstDayOfWeek === 0 ? 6 : month.firstDayOfWeek - 1;

    for (let i = 0; i < offset; i++) {
      const emptyCell = document.createElement("div");
      emptyCell.className = "calendar-cell empty";
      daysGrid.appendChild(emptyCell);
    }

    // Dies del mes
    for (let d = 1; d <= month.daysInMonth; d++) {
      const dayStr = String(d).padStart(2, "0");
      const dateKey = `${month.id}-${dayStr}`;
      const dayData = calData.days[dateKey] || { status: "disponible", title: "Dia hàbil", desc: "" };

      const cell = document.createElement("div");
      const isSelected = state.selectedDates.includes(dateKey);
      const isFilteredOut = !matchesFilter(dayData.status);

      cell.className = `calendar-cell ${dayData.status} ${isSelected ? "selected" : ""}`;
      if (isFilteredOut) {
        cell.style.opacity = "0.2";
      }

      // Contingut cel·la
      const numDiv = document.createElement("div");
      numDiv.className = "cell-day-number";
      numDiv.textContent = d;

      const badgeDiv = document.createElement("div");
      badgeDiv.className = "cell-badge";
      badgeDiv.textContent = getBadgeLabel(dayData.status, dayData.title);

      cell.appendChild(numDiv);
      cell.appendChild(badgeDiv);

      cell.addEventListener("click", () => {
        openDayModal(dateKey, dayData);
      });

      daysGrid.appendChild(cell);
    }
  }

  function getBadgeLabel(status, title) {
    if (status === "disponible") return state.lang === "val" ? "Disponible" : "Disponible";
    if (status === "no-disponible") return state.lang === "val" ? "Bloquejat" : "Bloqueado";
    if (status === "no-lectiu") return state.lang === "val" ? "No lectiu" : "No lectivo";
    if (status === "festiu") return title || (state.lang === "val" ? "Festiu" : "Festivo");
    if (status === "cap-de-setmana") return "";
    return "";
  }

  // Renderització de la vista anual completa
  function renderYearView() {
    elYearGrid.innerHTML = "";

    calData.months.forEach((month, idx) => {
      const card = document.createElement("div");
      card.className = "mini-month-card";

      const title = document.createElement("div");
      title.className = "mini-month-title";
      title.textContent = state.lang === "val" ? month.nomVal : month.nomEs;
      card.appendChild(title);

      // Weekdays
      const wHeader = document.createElement("div");
      wHeader.className = "mini-calendar-weekdays";
      const wDays = state.lang === "val" ? i18n.val.weekDays : i18n.es.weekDays;
      wDays.forEach(wd => {
        const d = document.createElement("div");
        d.textContent = wd;
        wHeader.appendChild(d);
      });
      card.appendChild(wHeader);

      // Grid
      const mGrid = document.createElement("div");
      mGrid.className = "mini-calendar-days";

      let offset = month.firstDayOfWeek === 0 ? 6 : month.firstDayOfWeek - 1;
      for (let o = 0; o < offset; o++) {
        const empty = document.createElement("div");
        empty.className = "mini-day-cell empty";
        mGrid.appendChild(empty);
      }

      for (let d = 1; d <= month.daysInMonth; d++) {
        const dayStr = String(d).padStart(2, "0");
        const dateKey = `${month.id}-${dayStr}`;
        const dayData = calData.days[dateKey] || { status: "disponible", title: "Dia hàbil", desc: "" };

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

  function renderCurrentView() {
    if (state.viewMode === "month") {
      renderMonthView();
    } else {
      renderYearView();
    }
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
      // Validar si pot afegir-se
      if (dayData.status === "no-disponible") {
        alert(state.lang === "val" ? "Aquest dia està expressament prohibit per normativa." : "Este día está expresamente prohibido por normativa.");
        return;
      }
      if (dayData.status === "festiu" || dayData.status === "cap-de-setmana") {
        alert(state.lang === "val" ? "No cal demanar permís en dies festius o caps de setmana." : "No procede solicitar permiso en días festivos o fines de semana.");
        return;
      }

      state.selectedDates.push(dateKey);
      state.selectedDates.sort();
    }

    // Desar
    localStorage.setItem("ies_morvedre_selected_dates", JSON.stringify(state.selectedDates));
    renderCurrentView();
    renderSelectionBar();
    renderDocPreview();
  }

  // Barra inferior de selecció
  function renderSelectionBar() {
    const validation = rules.validateSelection(state.selectedDates);

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
          const dayData = calData.days[dateStr] || {};
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
      renderCurrentView();
      renderSelectionBar();
      renderDocPreview();
    }
  });

  elBtnGoToRequest.addEventListener("click", () => {
    // Canvia a la pestanya de sol·licitud
    document.querySelector('[data-target="panel-sollicitud"]').click();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Generador de document oficial (Instància)
  function renderDocPreview() {
    const isVal = state.lang === "val";
    const nom = elDocName.value || state.docentInfo.nom || (isVal ? "[NOM I COGNOMS DEL DOCENT]" : "[NOMBRE Y APELLIDOS DEL DOCENTE]");
    const dni = elDocDni.value || state.docentInfo.dni || "[DNI/NIE]";
    const dept = elDocDept.value || state.docentInfo.departament || (isVal ? "[DEPARTAMENT DIDÀCTIC]" : "[DEPARTAMENTO DIDÁCTICO]");

    let datesFormattedList = "";
    if (state.selectedDates.length === 0) {
      datesFormattedList = `<p style="color: #ef4444; font-weight: bold;">${isVal ? "⚠️ No has seleccionat cap data al calendari." : "⚠️ No has seleccionado ninguna fecha en el calendario."}</p>`;
    } else {
      datesFormattedList = "<ul>";
      state.selectedDates.forEach(dStr => {
        const dObj = new Date(dStr + "T00:00:00");
        const dayInfo = calData.days[dStr] || {};
        const isLectiu = dayInfo.status === "disponible";
        const tipusStr = isLectiu ? (isVal ? "Període lectiu" : "Período lectivo") : (isVal ? "Període no lectiu" : "Período no lectivo");
        datesFormattedList += `<li><strong>${rules.formatDate(dObj)}</strong> (${tipusStr})</li>`;
      });
      datesFormattedList += "</ul>";
    }

    const todayFormatted = rules.formatDate(new Date());

    const docHTML = `
      <div class="official-doc-wrapper" id="printableOfficialDoc">
        <table class="doc-header-table">
          <tr>
            <td style="width: 25%; text-align: center; vertical-align: middle;">
              ${window.CAMP_LOGO_DATA_URI 
                ? `<img src="${window.CAMP_LOGO_DATA_URI}" alt="Logo IES Camp de Morvedre" style="max-height: 52px; width: auto; display: block; margin: 0 auto 4px auto;">` 
                : `<div style="font-weight: 900; font-size: 1.2rem; color: #111827;">CA/MP</div>`
              }
              <div style="font-size: 0.72rem; font-weight: 700; color: #111827;">IES CAMP DE MORVEDRE</div>
            </td>
            <td style="width: 50%; text-align: center; vertical-align: middle;">
              <div style="font-weight: 800; font-size: 1.05rem;">GENERALITAT VALENCIANA</div>
              <div style="font-size: 0.8rem; color: #475569;">Conselleria d'Educació, Cultura i Universitats</div>
              <div style="font-size: 0.75rem; margin-top: 4px; font-weight: 600;">SOL·LICITUD DE PERMÍS PER ASSUMPTES PARTICULARS</div>
            </td>
            <td style="width: 25%; font-size: 0.75rem; vertical-align: top;">
              <strong>Registre d'Entrada:</strong><br>
              Data:<br>
              Núm.:
            </td>
          </tr>
        </table>

        <div class="doc-section">
          <div class="doc-section-title">${isVal ? "1. DADES DEL DOCENT SOL·LICITANT" : "1. DATOS DEL DOCENTE SOLICITANTE"}</div>
          <p><strong>${isVal ? "Nom i cognoms:" : "Nombre y apellidos:"}</strong> ${nom}</p>
          <p><strong>${isVal ? "DNI/NIE:" : "DNI/NIE:"}</strong> ${dni} &nbsp;&nbsp;&nbsp;&nbsp; <strong>${isVal ? "Departament Didàctic:" : "Departamento Didáctico:"}</strong> ${dept}</p>
          <p><strong>${isVal ? "Centre de destinació:" : "Centro de destino:"}</strong> IES CAMP DE MORVEDRE (Sagunt)</p>
        </div>

        <div class="doc-section">
          <div class="doc-section-title">${isVal ? "2. EXPOSA" : "2. EXPONE"}</div>
          <div class="doc-body-text">
            ${isVal
              ? `Que d'acord amb la <em>Instrucció de la Direcció General de Personal Docent de la Generalitat Valenciana</em> sobre el permís per assumptes particulars sense justificació per al personal docent no universitari, i tenint en compte les instruccions d'organització de curs i el calendari escolar 2026-2027 aprovat per a l'IES Camp de Morvedre.`
              : `Que de acuerdo con la <em>Instrucción de la Dirección General de Personal Docente de la Generalitat Valenciana</em> sobre el permiso por asuntos particulares sin justificación para el personal docente no universitario, y teniendo en cuenta las instrucciones de organización de curso y el calendario escolar 2026-2027 aprobado para el IES Camp de Morvedre.`
            }
          </div>
        </div>

        <div class="doc-section">
          <div class="doc-section-title">${isVal ? "3. SOL·LICITA" : "3. SOLICITA"}</div>
          <div class="doc-body-text">
            ${isVal
              ? `Que li siga concedit el permís retribuït per assumptes particulars per a la/les següent/s data/es:`
              : `Que le sea concedido el permiso retribuido por asuntos particulares para la/s siguiente/s fecha/s:`
            }
            <div style="margin: 0.75rem 0; padding-left: 1rem;">
              ${datesFormattedList}
            </div>
          </div>
        </div>

        <div class="doc-section">
          <div class="doc-section-title">${isVal ? "4. DECLARACIÓ RESPONSABLE" : "4. DECLARACIÓN RESPONSABLE"}</div>
          <div class="doc-body-text" style="font-size: 0.875rem;">
            ${isVal
              ? `El/la docent sotasignant declara sota la seua responsabilitat:<br>
                 1. Que ha preparat i dipositat en la Prefectura d'Estudis el corresponent <strong>pla d'activitats pedagògiques</strong> per a l'atenció de l'alumnat durant el seu període d'absència.<br>
                 2. Que la sol·licitud s'ajusta als terminis preceptius (antelació mínima de 15 dies naturals) i a les condicions generals establertes per la normativa de la Conselleria d'Educació.`
              : `El/la docente abajo firmante declara bajo su responsabilidad:<br>
                 1. Que ha preparado y depositado en la Jefatura de Estudios el correspondiente <strong>plan de actividades pedagógicas</strong> para la atención del alumnado durante su período de ausencia.<br>
                 2. Que la solicitud se ajusta a los plazos preceptivos (antelación mínima de 15 días naturales) y a las condiciones generales establecidas por la normativa de la Conselleria de Educación.`
            }
          </div>
        </div>

        <div style="margin-top: 1.5rem; font-size: 0.9rem;">
          Sagunt, a ${todayFormatted}
        </div>

        <div class="doc-signature-area">
          <div class="signature-box">
            ${isVal ? "Signatura del docent sol·licitant" : "Firma del docente solicitante"}<br><br><br>
            Fdo.: ${nom}
          </div>
          <div class="signature-box">
            ${isVal ? "Vist i plau Direcció / Resolució" : "Visto bueno Dirección / Resolución"}<br><br><br>
            ${isVal ? "Direcció de l'IES Camp de Morvedre" : "Dirección del IES Camp de Morvedre"}
          </div>
        </div>
      </div>
    `;

    elDocPreview.innerHTML = docHTML;
  }

  // Guardar dades del docent
  [elDocName, elDocDni, elDocDept].forEach(input => {
    input.addEventListener("input", () => {
      state.docentInfo.nom = elDocName.value;
      state.docentInfo.dni = elDocDni.value;
      state.docentInfo.departament = elDocDept.value;
      localStorage.setItem("ies_morvedre_docent_info", JSON.stringify(state.docentInfo));
      renderDocPreview();
    });
  });

  // Carregar valors previs
  if (state.docentInfo.nom) elDocName.value = state.docentInfo.nom;
  if (state.docentInfo.dni) elDocDni.value = state.docentInfo.dni;
  if (state.docentInfo.departament) elDocDept.value = state.docentInfo.departament;

  // Imprimir sol·licitud
  elBtnPrintDoc.addEventListener("click", () => {
    window.print();
  });

  // Copiar sol·licitud al porta-retalls
  elBtnCopyDoc.addEventListener("click", () => {
    const isVal = state.lang === "val";
    const nom = elDocName.value || "[NOM I COGNOMS]";
    const dni = elDocDni.value || "[DNI]";
    const dept = elDocDept.value || "[DEPARTAMENT]";

    let datesText = "";
    state.selectedDates.forEach(d => {
      const dObj = new Date(d + "T00:00:00");
      datesText += ` - ${rules.formatDate(dObj)}\n`;
    });

    const textToCopy = `${isVal ? "SOL·LICITUD DE PERMÍS PER ASSUMPTES PARTICULARS (DIES MOSCOSSOS)" : "SOLICITUD DE PERMISO POR ASUNTOS PARTICULARES (DÍAS MOSCOSOS)"}
IES CAMP DE MORVEDRE (SAGUNT)

${isVal ? "Dades del docent:" : "Datos del docente:"}
${isVal ? "Nom:" : "Nombre:"} ${nom}
DNI: ${dni}
${isVal ? "Departament:" : "Departamento:"} ${dept}

${isVal ? "Dates sol·licitades:" : "Fechas solicitadas:"}
${datesText || " (Cap data seleccionada)\n"}
${isVal
  ? "Declara responsablement que ha deixat preparat el pla d'activitats per a l'alumnat a Prefectura d'Estudis."
  : "Declara responsablemente que ha dejado preparado el plan de actividades para el alumnado en Jefatura de Estudios."}

${isVal ? "Data de la sol·licitud:" : "Fecha de la solicitud:"} ${rules.formatDate(new Date())}
`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      elCopyFeedback.style.display = "block";
      setTimeout(() => {
        elCopyFeedback.style.display = "none";
      }, 3000);
    }).catch(err => {
      alert("Error al copiar: " + err);
    });
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
  renderCurrentView();
  renderSelectionBar();
  renderDocPreview();
});
