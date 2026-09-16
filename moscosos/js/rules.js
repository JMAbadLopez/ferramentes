/**
 * Motor de Regles Normatives per al Gaudi de Dies Moscosos
 * Conselleria d'Educació (GVA) - IES Camp de Morvedre
 */

window.MOSCOSO_RULES = {
  // Límits bàsics
  MAX_DIES_LECTIUS: 3,
  MAX_DIES_NO_LECTIUS: 3,
  MAX_TOTAL_DIES: 6,
  ANTELACIO_MINIMA_DIES: 15, // dies naturals mínims abans de la data
  ANTELACIO_MAXIMA_MESOS: 2,  // mesos màxims d'antelació

  // Escala de quota màxima simultània segons plantilla del centre (torn de matí)
  getQuotaPerPlantilla: function(numDocents) {
    if (numDocents <= 20) return 1;
    if (numDocents <= 40) return 2;
    if (numDocents <= 60) return 3;
    if (numDocents <= 80) return 4;
    return 5; // Més de 81 docents (torn de matí a l'IES Camp de Morvedre)
  },

  // Quotes específiques IES Camp de Morvedre
  QUOTA_MATI_CENTRE: 5,
  QUOTA_VESPRADA_CENTRE: 2,
  QUOTA_TOTAL_CENTRE: 7, // Màxim conjunt centre (5 matí + 2 vesprada)

  // Motius de no disponibilitat amb traducció
  reasons: {
    "15_primers_dies": {
      val: "Dins dels 15 primers dies lectius del curs escolar (prohibit expressament per normativa GVA).",
      es: "Dentro de los 15 primeros días lectivos del curso escolar (prohibido expresamente por normativa GVA)."
    },
    "15_ultims_dies": {
      val: "Dins dels 15 últims dies lectius del curs escolar (prohibit expressament per normativa GVA).",
      es: "Dentro de los 15 últimos días lectivos del curso escolar (prohibido expresamente por normativa GVA)."
    },
    "15_primers_dies_i_avaluacio": {
      val: "15 primers dies lectius del curs i coincidència amb avaluacions inicials.",
      es: "15 primeros días lectivos del curso y coincidencia con evaluaciones iniciales."
    },
    "15_ultims_dies_i_avaluacio": {
      val: "15 últims dies lectius del curs i període d'avaluacions finals / proves oficials (EBAU/Extraordinàries).",
      es: "15 últimos días lectivos del curso y período de evaluaciones finales / pruebas oficiales (EBAU/Extraordinarias)."
    },
    "set_dies_abans_nadal": {
      val: "Dins dels 7 dies previs a les vacances de Nadal (restricció normativa GVA).",
      es: "Dentro de los 7 días previos a las vacaciones de Navidad (restricción normativa GVA)."
    },
    "set_dies_despres_nadal": {
      val: "Dins dels 7 dies posteriors a les vacances de Nadal (restricció normativa GVA).",
      es: "Dentro de los 7 días posteriores a las vacaciones de Navidad (restricción normativa GVA)."
    },
    "set_dies_abans_falles": {
      val: "Dins dels 7 dies previs a les festes de Falles (restricció normativa GVA).",
      es: "Dentro de los 7 días previos a las fiestas de Fallas (restricción normativa GVA)."
    },
    "set_dies_abans_pasqua": {
      val: "Dins dels 7 dies previs a les vacances de Pasqua (restricció normativa GVA).",
      es: "Dentro de los 7 días previos a las vacaciones de Pascua (restricción normativa GVA)."
    },
    "set_dies_despres_pasqua": {
      val: "Dins dels 7 dies posteriors a les vacances de Pasqua (restricció normativa GVA).",
      es: "Dentro de los 7 días posteriores a las vacaciones de Pascua (restricción normativa GVA)."
    },
    "avaluacio": {
      val: "Període d'avaluacions escolars ordinàries o de seguiment (bloquejat per normativa de centre).",
      es: "Período de evaluaciones escolares ordinarias o de seguimiento (bloqueado por normativa de centro)."
    },
    "avaluacio_i_pre_nadal": {
      val: "Sessions d'avaluació del 1r trimestre i 7 dies previs a Nadal.",
      es: "Sesiones de evaluación del 1er trimestre y 7 días previos a Navidad."
    },
    "avaluacio_i_falles": {
      val: "Sessions d'avaluació del 2n trimestre i 7 dies previs a Falles.",
      es: "Sesiones de evaluación del 2º trimestre y 7 días previos a Fallas."
    },
    "avaluacio_i_pre_pasqua": {
      val: "Sessions d'avaluació i dies immediatament anteriors a Pasqua.",
      es: "Sesiones de evaluación y días inmediatamente anteriores a Pascua."
    },
    "avaluacio_final": {
      val: "Període d'avaluació final ordinària d'ESO, Batxillerat i FP (no concedible entre ordinària i extraordinària).",
      es: "Período de evaluación final ordinaria de ESO, Bachillerato y FP (no concedible entre ordinaria y extraordinaria)."
    },
    "proves_extraordinaries": {
      val: "Convocatòria extraordinària d'exàmens i avaluacions.",
      es: "Convocatoria extraordinaria de exámenes y evaluaciones."
    },
    "avaluacio_extraordinaria": {
      val: "Sessions d'avaluació extraordinària i reclamacions.",
      es: "Sesiones de evaluación extraordinaria y reclamaciones."
    },
    "fi_curs_lectiu": {
      val: "Últim dia oficial de classe amb alumnat.",
      es: "Último día oficial de clase con alumnado."
    }
  },

  /**
   * Calcula la finestra temporal legal de presentació de sol·licitud
   * Mínim: 15 dies naturals abans
   * Màxim: 2 mesos abans
   */
  calculateApplicationWindow: function(dateStr) {
    const targetDate = new Date(dateStr + "T00:00:00");
    
    // Data límit màxima per demanar-lo (15 dies naturals abans)
    const deadlineDate = new Date(targetDate);
    deadlineDate.setDate(deadlineDate.getDate() - this.ANTELACIO_MINIMA_DIES);

    // Data d'inici del termini (2 mesos abans)
    const earliestDate = new Date(targetDate);
    earliestDate.setMonth(earliestDate.getMonth() - this.ANTELACIO_MAXIMA_MESOS);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isExpired = today > deadlineDate;
    const isTooEarly = today < earliestDate;

    return {
      targetDate: targetDate,
      deadlineDate: deadlineDate,
      earliestDate: earliestDate,
      isExpired: isExpired,
      isTooEarly: isTooEarly,
      deadlineFormatted: this.formatDate(deadlineDate),
      earliestFormatted: this.formatDate(earliestDate)
    };
  },

  /**
   * Comprova si dues dates són consecutives (en dies de calendari o en dies laborals)
   */
  areConsecutive: function(dateStr1, dateStr2) {
    const d1 = new Date(dateStr1 + "T00:00:00");
    const d2 = new Date(dateStr2 + "T00:00:00");
    
    // Assegurar ordre
    const [early, late] = d1 < d2 ? [d1, d2] : [d2, d1];
    
    const diffTime = late.getTime() - early.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    
    // Consecutius purs (dilluns-dimarts, dijous-divendres)
    if (diffDays === 1) return true;
    
    // Consecutius a través de cap de setmana (divendres a dilluns)
    if (early.getDay() === 5 && late.getDay() === 1 && diffDays === 3) {
      return true;
    }

    return false;
  },

  /**
   * Valida un conjunt de dies seleccionats per un docent
   */
  validateSelection: function(selectedDates, profile = "eso_bat") {
    const errors = [];
    const warnings = [];

    let countLectius = 0;
    let countNoLectius = 0;

    // Ordenar dates cronològicament
    const sorted = [...selectedDates].sort();

    // 1. Comptatge i comprovació d'estat
    const calDataObj = (typeof window !== "undefined" ? window.CALENDAR_DATA_2026_2027 : (typeof global !== "undefined" ? global.CALENDAR_DATA_2026_2027 : null));
    for (const dateStr of sorted) {
      let dayData = null;
      if (calDataObj) {
        if (typeof calDataObj.getDayDataForProfile === "function") {
          dayData = calDataObj.getDayDataForProfile(dateStr, profile);
        } else if (calDataObj.days) {
          dayData = calDataObj.days[dateStr];
        }
      }
      if (!dayData) continue;

      if (dayData.status === "disponible") {
        countLectius++;
      } else if (dayData.status === "no-lectiu") {
        countNoLectius++;
      } else if (dayData.status === "no-disponible") {
        errors.push({
          type: "blocked_day",
          date: dateStr,
          msgVal: `El dia ${dateStr} no està permès: ${dayData.desc}`,
          msgEs: `El día ${dateStr} no está permitido: ${dayData.desc}`
        });
      } else if (dayData.status === "festiu" || dayData.status === "cap-de-setmana") {
        errors.push({
          type: "holiday",
          date: dateStr,
          msgVal: `El dia ${dateStr} és festiu o cap de setmana, no cal demanar moscós.`,
          msgEs: `El día ${dateStr} es festivo o fin de semana, no procede pedir moscoso.`
        });
      }
    }

    // 2. Límit de 3 lectius
    if (countLectius > this.MAX_DIES_LECTIUS) {
      errors.push({
        type: "max_lectius",
        msgVal: `Has seleccionat ${countLectius} dies lectius (el màxim permès és de 3 dies lectius).`,
        msgEs: `Has seleccionado ${countLectius} días lectivos (el máximo permitido es de 3 días lectivos).`
      });
    }

    // 3. Límit de 3 no lectius
    if (countNoLectius > this.MAX_DIES_NO_LECTIUS) {
      errors.push({
        type: "max_no_lectius",
        msgVal: `Has seleccionat ${countNoLectius} dies no lectius (el màxim permès és de 3 dies no lectius).`,
        msgEs: `Has seleccionado ${countNoLectius} días no lectivos (el máximo permitido es de 3 días no lectivos).`
      });
    }

    // 4. Consecutivitat
    for (let i = 0; i < sorted.length - 1; i++) {
      if (this.areConsecutive(sorted[i], sorted[i + 1])) {
        errors.push({
          type: "consecutive",
          dates: [sorted[i], sorted[i + 1]],
          msgVal: `Els dies ${sorted[i]} i ${sorted[i + 1]} són consecutius. La normativa prohibeix explícitament gaudir de moscosos de forma consecutiva.`,
          msgEs: `Los días ${sorted[i]} y ${sorted[i + 1]} son consecutivos. La normativa prohíbe explícitamente disfrutar de moscosos de forma consecutiva.`
        });
      }
    }

    // 5. Terminis d'antelació per a cada data
    for (const dateStr of sorted) {
      const win = this.calculateApplicationWindow(dateStr);
      if (win.isExpired) {
        warnings.push({
          type: "deadline_passed",
          date: dateStr,
          msgVal: `Atenció per al ${dateStr}: falten menys de 15 dies naturals (la data límit de sol·licitud era el ${win.deadlineFormatted}). Direcció podria denegar-lo per fora de termini.`,
          msgEs: `Atención para el ${dateStr}: quedan menos de 15 días naturales (la fecha límite de solicitud era el ${win.deadlineFormatted}). Dirección podría denegarlo por fuera de plazo.`
        });
      }
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
      warnings: warnings,
      countLectius: countLectius,
      countNoLectius: countNoLectius,
      countTotal: countLectius + countNoLectius
    };
  },

  /**
   * Calculadora de proporcionalitat per a personal interí o substitucions
   * Curs complet = 365 dies (1 setembre a 31 agost) = 6 dies (3 lectius + 3 no lectius)
   */
  calculateProportionality: function(startDateStr, endDateStr) {
    const start = new Date(startDateStr + "T00:00:00");
    const end = new Date(endDateStr + "T00:00:00");

    if (end < start) {
      return { error: "La data de fi ha de ser posterior a la d'inici." };
    }

    const diffDays = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
    const totalYearDays = 365;

    // Càlcul teòric proporcional
    const ratio = Math.min(1, Math.max(0, diffDays / totalYearDays));
    const totalDaysRaw = ratio * this.MAX_TOTAL_DIES;
    
    // Arredoniment típic administratiu (a l'enter més proper amb mínim)
    const totalDaysRounded = Math.round(totalDaysRaw);
    
    // Repartiment estimat entre lectius i no lectius
    const lectius = Math.min(this.MAX_DIES_LECTIUS, Math.ceil(totalDaysRounded / 2));
    const noLectius = Math.max(0, totalDaysRounded - lectius);

    return {
      daysWorked: diffDays,
      percentage: Math.round(ratio * 100),
      totalMoscosos: totalDaysRounded,
      lectius: lectius,
      noLectius: noLectius,
      rawScore: totalDaysRaw.toFixed(2)
    };
  },

  formatDate: function(d) {
    if (!d) return "";
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }
};
