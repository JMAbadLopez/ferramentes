/**
 * Base de dades del Calendari Escolar 2026-2027
 * IES CAMP DE MORVEDRE (Sagunt / Port de Sagunt)
 * Basat en el calendari oficial de Conselleria d'Educació (GVA)
 * i el calendari oficial d'avaluacions de l'IES Camp de Morvedre per a FP i ESO/Batxillerat.
 */

window.CALENDAR_DATA_2026_2027 = {
  curs: "2026-2027",
  centre: "IES Camp de Morvedre",
  municipi: "Sagunt / Port de Sagunt",
  iniciLectiu: "2026-09-09",
  fiLectiu: "2027-06-18",
  
  // Festius locals específics de Sagunt
  festiusLocals: [
    { data: "2026-12-07", nom: "Festiu Local Específic / Pont de la Constitució" },
    { data: "2027-03-17", nom: "Falles de Sagunt (Festiu Local)" },
    { data: "2027-03-18", nom: "Falles de Sagunt (Festiu Local)" }
  ],

  // Vacances escolars
  vacances: {
    nadal: { inici: "2026-12-23", fi: "2027-01-06", nom: "Vacances de Nadal" },
    pasqua: { inici: "2027-03-25", fi: "2027-04-05", nom: "Vacances de Pasqua / Setmana Santa" }
  },

  // Mesos del curs escolar (Setembre 2026 a Juliol 2027)
  months: [
    { id: "2026-09", nomVal: "Setembre 2026", nomEs: "Septiembre 2026", any: 2026, mes: 8, daysInMonth: 30, firstDayOfWeek: 2 },
    { id: "2026-10", nomVal: "Octubre 2026", nomEs: "Octubre 2026", any: 2026, mes: 9, daysInMonth: 31, firstDayOfWeek: 4 },
    { id: "2026-11", nomVal: "Novembre 2026", nomEs: "Noviembre 2026", any: 2026, mes: 10, daysInMonth: 30, firstDayOfWeek: 0 },
    { id: "2026-12", nomVal: "Desembre 2026", nomEs: "Diciembre 2026", any: 2026, mes: 11, daysInMonth: 31, firstDayOfWeek: 2 },
    { id: "2027-01", nomVal: "Gener 2027", nomEs: "Enero 2027", any: 2027, mes: 0, daysInMonth: 31, firstDayOfWeek: 5 },
    { id: "2027-02", nomVal: "Febrer 2027", nomEs: "Febrero 2027", any: 2027, mes: 1, daysInMonth: 28, firstDayOfWeek: 1 },
    { id: "2027-03", nomVal: "Març 2027", nomEs: "Marzo 2027", any: 2027, mes: 2, daysInMonth: 31, firstDayOfWeek: 1 },
    { id: "2027-04", nomVal: "Abril 2027", nomEs: "Abril 2027", any: 2027, mes: 3, daysInMonth: 30, firstDayOfWeek: 4 },
    { id: "2027-05", nomVal: "Maig 2027", nomEs: "Mayo 2027", any: 2027, mes: 4, daysInMonth: 31, firstDayOfWeek: 6 },
    { id: "2027-06", nomVal: "Juny 2027", nomEs: "Junio 2027", any: 2027, mes: 5, daysInMonth: 30, firstDayOfWeek: 2 },
    { id: "2027-07", nomVal: "Juliol 2027", nomEs: "Julio 2027", any: 2027, mes: 6, daysInMonth: 31, firstDayOfWeek: 4 }
  ],

  // Avaluacions específiques de l'IES Camp de Morvedre segons document oficial
  avaluacions: {
    eso_bat: {
      // Avaluació Inicial
      "2026-10-01": { title: "Avaluació Inicial ESO/BAT", desc: "Avaluació Inicial ESO i Batxillerat presencial." },
      "2026-10-05": { title: "Avaluació Inicial ESO/BAT", desc: "Avaluació Inicial ESO i Batxillerat presencial." },
      "2026-10-06": { title: "Avaluació Inicial ESO/BAT", desc: "Avaluació Inicial ESO i Batxillerat presencial." },
      "2026-10-07": { title: "Avaluació Inicial ESO/BAT", desc: "Avaluació Inicial ESO i Batxillerat presencial." },
      
      // 1a Avaluació
      "2026-11-30": { title: "1a Avaluació ESO i Batxillerat", desc: "Sessions de la 1a Avaluació d'ESO i Batxillerat." },
      "2026-12-01": { title: "1a Avaluació ESO i Batxillerat", desc: "Sessions de la 1a Avaluació d'ESO i Batxillerat." },
      "2026-12-02": { title: "1a Avaluació ESO i Batxillerat", desc: "Sessions de la 1a Avaluació d'ESO i Batxillerat." },
      "2026-12-03": { title: "1a Avaluació ESO i Batxillerat", desc: "Sessions de la 1a Avaluació d'ESO i Batxillerat." },
      
      // 2a Avaluació
      "2027-03-08": { title: "2a Avaluació ESO i Batxillerat", desc: "Sessions de la 2a Avaluació d'ESO i Batxillerat." },
      "2027-03-09": { title: "2a Avaluació ESO i Batxillerat", desc: "Sessions de la 2a Avaluació d'ESO i Batxillerat." },
      "2027-03-10": { title: "2a Avaluació ESO i Batxillerat", desc: "Sessions de la 2a Avaluació d'ESO i Batxillerat." },
      "2027-03-11": { title: "2a Avaluació ESO i Batxillerat", desc: "Sessions de la 2a Avaluació d'ESO i Batxillerat." },

      // 3a Avaluació i Finals
      "2027-04-23": { title: "Avaluació Pendents Batxillerat", desc: "Proves i avaluació de pendents de Batxillerat." },
      "2027-05-14": { title: "Avaluació Pendents ESO", desc: "Avaluació de matèries pendents d'ESO." },
      "2027-05-17": { title: "Avaluació Final 2n Batxillerat", desc: "Avaluació Final de 2n de Batxillerat." },
      "2027-06-07": { title: "Avaluació Final 1r Batxillerat", desc: "Avaluació Final ordinària de 1r de Batxillerat." },
      "2027-06-09": { title: "Avaluació Final ESO", desc: "Sessions d'Avaluació Final d'ESO." },
      "2027-06-10": { title: "Avaluació Final ESO / Extra 2BAT", desc: "Avaluació Final ESO i Convocatòria Extraordinària 2n BAT." },
      "2027-06-14": { title: "Avaluació Final ESO", desc: "Sessions d'Avaluació Final d'ESO." },
      "2027-06-15": { title: "Avaluació Final ESO", desc: "Sessions d'Avaluació Final d'ESO." },

      // Convocatòria Extraordinària
      "2027-06-21": { title: "Avaluació Extraordinària 1r BAT", desc: "Sessions d'Avaluació Extraordinària de 1r de Batxillerat." }
    },

    fp: {
      // Avaluació Inicial
      "2026-10-01": { title: "Avaluació Inicial CF Presencial", desc: "Avaluació Inicial Cicles Formatius Presencial." },
      "2026-10-05": { title: "Avaluació Inicial CF Presencial", desc: "Avaluació Inicial Cicles Formatius Presencial." },
      "2026-10-06": { title: "Avaluació Inicial CF Presencial", desc: "Avaluació Inicial Cicles Formatius Presencial." },
      "2026-10-07": { title: "Avaluació Inicial CF Presencial / Semipresencial", desc: "Avaluació Inicial Cicles Formatius Presencial i Semipresencial." },

      // 1a Avaluació
      "2026-11-30": { title: "1a Av. CF 2n GM/GS", desc: "1a Avaluació 2n Curs Grau Mitjà i Grau Superior." },
      "2026-12-01": { title: "1a Av. CF 2n GM/GS", desc: "1a Avaluació 2n Curs Grau Mitjà i Grau Superior." },
      "2026-12-02": { title: "1a Av. CF 1r GM/GS/FPB", desc: "1a Avaluació 1r Grau Mitjà, Grau Superior i FPB." },
      "2026-12-03": { title: "1a Av. CF 1r GM/GS/FPB", desc: "1a Avaluació 1r Grau Mitjà, Grau Superior i FPB." },

      // 2a Avaluació
      "2027-01-28": { title: "2a Av. CE CIBER", desc: "2a Avaluació Curs d'Especialització en Ciberseguretat." },
      "2027-02-23": { title: "2a Av. CF 2n GM/GS", desc: "2a Avaluació 2n Curs Grau Mitjà i Grau Superior." },
      "2027-02-24": { title: "2a Av. CF 2n GM/GS", desc: "2a Avaluació 2n Curs Grau Mitjà i Grau Superior." },
      "2027-03-08": { title: "2a Av. CF 1r GM/GS/FPB", desc: "2a Avaluació 1r Grau Mitjà, Grau Superior i FPB." },
      "2027-03-09": { title: "2a Av. CF 1r GM/GS/FPB", desc: "2a Avaluació 1r Grau Mitjà, Grau Superior i FPB." },

      // 3a Avaluació i Final
      "2027-05-27": { title: "Avaluació Final CETI", desc: "Avaluació Final Curs d'Especialització CETI." },
      "2027-06-08": { title: "Avaluació Final CF 2n GM/GS/FPB", desc: "Avaluació Final ordinària 2n Curs GM/GS i FPB." },
      "2027-06-09": { title: "Avaluació Final CF 2n GM/GS/FPB", desc: "Avaluació Final ordinària 2n Curs GM/GS i FPB." },
      "2027-06-16": { title: "Avaluació Final CF 1r GM/GS/FPB", desc: "Avaluació Final ordinària 1r Curs GM/GS i FPB." },
      "2027-06-17": { title: "Avaluació Final CF 1r GM/GS/FPB", desc: "Avaluació Final ordinària 1r Curs GM/GS i FPB." },

      // Convocatòria Extraordinària
      "2027-06-16": { title: "Av. Extraordinària CE CIBER", desc: "Avaluació Extraordinària CE CIBER." },
      "2027-06-21": { title: "Av. Extraordinària CF 2n GM/GS", desc: "Avaluació Extraordinària 2n Grau Mitjà i Grau Superior." },
      "2027-06-28": { title: "Av. Extraordinària CF 1r GM/GS/FPB", desc: "Avaluació Extraordinària 1r Grau Mitjà, Grau Superior i FPB." }
    }
  },

  // Base de dades general de tots els dies amb la normativa GVA
  daysBase: {
    // SETEMBRE 2026
    "2026-09-01": { status: "no-lectiu", title: "Preparació de curs", desc: "Període laboral no lectiu (apte per als 3 dies no lectius)." },
    "2026-09-02": { status: "no-lectiu", title: "Preparació de curs", desc: "Període laboral no lectiu (apte per als 3 dies no lectius)." },
    "2026-09-03": { status: "no-lectiu", title: "Preparació de curs", desc: "Període laboral no lectiu (apte per als 3 dies no lectius)." },
    "2026-09-04": { status: "no-lectiu", title: "Preparació de curs", desc: "Període laboral no lectiu (apte per als 3 dies no lectius)." },
    "2026-09-05": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2026-09-06": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2026-09-07": { status: "no-lectiu", title: "Preparació de curs", desc: "Període laboral no lectiu (apte per als 3 dies no lectius)." },
    "2026-09-08": { status: "no-lectiu", title: "Preparació de curs", desc: "Període laboral no lectiu (apte per als 3 dies no lectius)." },
    "2026-09-09": { status: "no-disponible", reason: "15_primers_dies", title: "Inici de classes (Dia lectiu 1)", desc: "15 primers dies lectius del curs escolar. Bloquejat per normativa GVA." },
    "2026-09-10": { status: "no-disponible", reason: "15_primers_dies", title: "Dia lectiu 2", desc: "15 primers dies lectius del curs escolar. Bloquejat per normativa GVA." },
    "2026-09-11": { status: "no-disponible", reason: "15_primers_dies", title: "Dia lectiu 3", desc: "15 primers dies lectius del curs escolar. Bloquejat per normativa GVA." },
    "2026-09-12": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2026-09-13": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2026-09-14": { status: "no-disponible", reason: "15_primers_dies", title: "Dia lectiu 4", desc: "15 primers dies lectius del curs escolar. Bloquejat per normativa GVA." },
    "2026-09-15": { status: "no-disponible", reason: "15_primers_dies", title: "Dia lectiu 5", desc: "15 primers dies lectius del curs escolar. Bloquejat per normativa GVA." },
    "2026-09-16": { status: "no-disponible", reason: "15_primers_dies", title: "Dia lectiu 6", desc: "15 primers dies lectius del curs escolar. Bloquejat per normativa GVA." },
    "2026-09-17": { status: "no-disponible", reason: "15_primers_dies", title: "Dia lectiu 7", desc: "15 primers dies lectius del curs escolar. Bloquejat per normativa GVA." },
    "2026-09-18": { status: "no-disponible", reason: "15_primers_dies", title: "Dia lectiu 8", desc: "15 primers dies lectius del curs escolar. Bloquejat per normativa GVA." },
    "2026-09-19": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2026-09-20": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2026-09-21": { status: "no-disponible", reason: "15_primers_dies", title: "Dia lectiu 9", desc: "15 primers dies lectius del curs escolar. Bloquejat per normativa GVA." },
    "2026-09-22": { status: "no-disponible", reason: "15_primers_dies", title: "Dia lectiu 10", desc: "15 primers dies lectius del curs escolar. Bloquejat per normativa GVA." },
    "2026-09-23": { status: "no-disponible", reason: "15_primers_dies", title: "Dia lectiu 11", desc: "15 primers dies lectius del curs escolar. Bloquejat per normativa GVA." },
    "2026-09-24": { status: "no-disponible", reason: "15_primers_dies", title: "Dia lectiu 12", desc: "15 primers dies lectius del curs escolar. Bloquejat per normativa GVA." },
    "2026-09-25": { status: "no-disponible", reason: "15_primers_dies", title: "Dia lectiu 13", desc: "15 primers dies lectius del curs escolar. Bloquejat per normativa GVA." },
    "2026-09-26": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2026-09-27": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2026-09-28": { status: "no-disponible", reason: "15_primers_dies", title: "Dia lectiu 14", desc: "15 primers dies lectius del curs escolar. Bloquejat per normativa GVA." },
    "2026-09-29": { status: "no-disponible", reason: "15_primers_dies", title: "Dia lectiu 15", desc: "15è i darrer dels primers 15 dies lectius. Bloquejat per normativa GVA." },
    "2026-09-30": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },

    // OCTUBRE 2026
    "2026-10-01": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-10-02": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-10-03": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2026-10-04": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2026-10-05": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-10-06": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-10-07": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-10-08": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-10-09": { status: "festiu", title: "Dia de la Comunitat Valenciana", desc: "Festiu autonòmic (Nou d'Octubre)." },
    "2026-10-10": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2026-10-11": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2026-10-12": { status: "festiu", title: "Festa Nacional d'Espanya", desc: "Festiu nacional (12 d'octubre)." },
    "2026-10-13": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-10-14": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-10-15": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-10-16": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-10-17": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2026-10-18": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2026-10-19": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-10-20": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-10-21": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-10-22": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-10-23": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-10-24": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2026-10-25": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2026-10-26": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-10-27": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-10-28": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-10-29": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-10-30": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-10-31": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },

    // NOVEMBRE 2026
    "2026-11-01": { status: "festiu", title: "Tots Sants", desc: "Festiu nacional (Diumenge)." },
    "2026-11-02": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-11-03": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-11-04": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-11-05": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-11-06": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-11-07": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2026-11-08": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2026-11-09": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-11-10": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-11-11": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-11-12": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-11-13": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-11-14": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2026-11-15": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2026-11-16": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-11-17": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-11-18": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-11-19": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-11-20": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-11-21": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2026-11-22": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2026-11-23": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-11-24": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-11-25": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-11-26": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-11-27": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-11-28": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2026-11-29": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2026-11-30": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },

    // DESEMBRE 2026
    "2026-12-01": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-12-02": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-12-03": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-12-04": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-12-05": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2026-12-06": { status: "festiu", title: "Dia de la Constitució", desc: "Festiu nacional (Diumenge)." },
    "2026-12-07": { status: "festiu", title: "Festiu Local Específic", desc: "Festiu escolar Sagunt / Pont de la Constitució." },
    "2026-12-08": { status: "festiu", title: "Immaculada Concepció", desc: "Festiu nacional." },
    "2026-12-09": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-12-10": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-12-11": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2026-12-12": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2026-12-13": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2026-12-14": { status: "no-disponible", reason: "set_dies_abans_nadal", title: "Pre-vacances Nadal", desc: "Dins dels 7 dies lectius previs a Nadal. Bloquejat per normativa GVA." },
    "2026-12-15": { status: "no-disponible", reason: "set_dies_abans_nadal", title: "Pre-vacances Nadal", desc: "Dins dels 7 dies lectius previs a Nadal. Bloquejat per normativa GVA." },
    "2026-12-16": { status: "no-disponible", reason: "set_dies_abans_nadal", title: "Pre-vacances Nadal", desc: "Dins dels 7 dies lectius previs a Nadal. Bloquejat per normativa GVA." },
    "2026-12-17": { status: "no-disponible", reason: "set_dies_abans_nadal", title: "Pre-vacances Nadal", desc: "Dins dels 7 dies lectius previs a Nadal. Bloquejat per normativa GVA." },
    "2026-12-18": { status: "no-disponible", reason: "set_dies_abans_nadal", title: "Pre-vacances Nadal", desc: "Dins dels 7 dies lectius previs a Nadal. Bloquejat per normativa GVA." },
    "2026-12-19": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2026-12-20": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2026-12-21": { status: "no-disponible", reason: "set_dies_abans_nadal", title: "Pre-vacances Nadal", desc: "Dins dels 7 dies lectius previs a Nadal. Bloquejat per normativa GVA." },
    "2026-12-22": { status: "no-disponible", reason: "set_dies_abans_nadal", title: "Darrer dia previ a Nadal", desc: "Dia immediatament anterior a vacances de Nadal. Bloquejat per normativa GVA." },
    "2026-12-23": { status: "festiu", title: "Vacances de Nadal", desc: "Període vacacional escolar." },
    "2026-12-24": { status: "festiu", title: "Vacances de Nadal", desc: "Període vacacional escolar (Nit de Nadal)." },
    "2026-12-25": { status: "festiu", title: "Nadal", desc: "Festiu nacional (Dia de Nadal)." },
    "2026-12-26": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2026-12-27": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2026-12-28": { status: "festiu", title: "Vacances de Nadal", desc: "Període vacacional escolar." },
    "2026-12-29": { status: "festiu", title: "Vacances de Nadal", desc: "Període vacacional escolar." },
    "2026-12-30": { status: "festiu", title: "Vacances de Nadal", desc: "Període vacacional escolar." },
    "2026-12-31": { status: "festiu", title: "Vacances de Nadal", desc: "Període vacacional escolar (Cap d'Any)." },

    // GENER 2027
    "2027-01-01": { status: "festiu", title: "Any Nou", desc: "Festiu nacional (Cap d'Any)." },
    "2027-01-02": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2027-01-03": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2027-01-04": { status: "festiu", title: "Vacances de Nadal", desc: "Període vacacional escolar." },
    "2027-01-05": { status: "festiu", title: "Vacances de Nadal", desc: "Període vacacional escolar (Cavalcada de Reis)." },
    "2027-01-06": { status: "festiu", title: "Epifania / Reis", desc: "Festiu nacional (Dia de Reis)." },
    "2027-01-07": { status: "no-disponible", reason: "set_dies_despres_nadal", title: "Tornada de Nadal (Dia lectiu 1)", desc: "Dins dels 7 dies lectius posteriors a vacances de Nadal. Bloquejat per normativa GVA." },
    "2027-01-08": { status: "no-disponible", reason: "set_dies_despres_nadal", title: "Dia lectiu 2 post-Nadal", desc: "Dins dels 7 dies lectius posteriors a vacances de Nadal. Bloquejat per normativa GVA." },
    "2027-01-09": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2027-01-10": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2027-01-11": { status: "no-disponible", reason: "set_dies_despres_nadal", title: "Dia lectiu 3 post-Nadal", desc: "Dins dels 7 dies lectius posteriors a vacances de Nadal. Bloquejat per normativa GVA." },
    "2027-01-12": { status: "no-disponible", reason: "set_dies_despres_nadal", title: "Dia lectiu 4 post-Nadal", desc: "Dins dels 7 dies lectius posteriors a vacances de Nadal. Bloquejat per normativa GVA." },
    "2027-01-13": { status: "no-disponible", reason: "set_dies_despres_nadal", title: "Dia lectiu 5 post-Nadal", desc: "Dins dels 7 dies lectius posteriors a vacances de Nadal. Bloquejat per normativa GVA." },
    "2027-01-14": { status: "no-disponible", reason: "set_dies_despres_nadal", title: "Dia lectiu 6 post-Nadal", desc: "Dins dels 7 dies lectius posteriors a vacances de Nadal. Bloquejat per normativa GVA." },
    "2027-01-15": { status: "no-disponible", reason: "set_dies_despres_nadal", title: "Dia lectiu 7 post-Nadal", desc: "7è dia lectiu posterior a vacances de Nadal. Bloquejat per normativa GVA." },
    "2027-01-16": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2027-01-17": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2027-01-18": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-01-19": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-01-20": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-01-21": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-01-22": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-01-23": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2027-01-24": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2027-01-25": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-01-26": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-01-27": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-01-28": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-01-29": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-01-30": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2027-01-31": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },

    // FEBRER 2027
    "2027-02-01": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-02-02": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-02-03": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-02-04": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-02-05": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-02-06": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2027-02-07": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2027-02-08": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-02-09": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-02-10": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-02-11": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-02-12": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-02-13": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2027-02-14": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2027-02-15": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-02-16": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-02-17": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-02-18": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-02-19": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-02-20": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2027-02-21": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2027-02-22": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-02-23": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-02-24": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-02-25": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-02-26": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-02-27": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2027-02-28": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },

    // MARÇ 2027
    "2027-03-01": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-03-02": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-03-03": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-03-04": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-03-05": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-03-06": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2027-03-07": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2027-03-08": { status: "no-disponible", reason: "set_dies_abans_falles", title: "Pre-Falles (7 dies)", desc: "Dins del període de 7 dies previs a les festes de Falles. Bloquejat per normativa GVA." },
    "2027-03-09": { status: "no-disponible", reason: "set_dies_abans_falles", title: "Pre-Falles (7 dies)", desc: "Dins del període de 7 dies previs a les festes de Falles. Bloquejat per normativa GVA." },
    "2027-03-10": { status: "no-disponible", reason: "set_dies_abans_falles", title: "Pre-Falles (7 dies)", desc: "Dins del període de 7 dies previs a les festes de Falles. Bloquejat per normativa GVA." },
    "2027-03-11": { status: "no-disponible", reason: "set_dies_abans_falles", title: "Pre-Falles (7 dies)", desc: "Dins del període de 7 dies previs a les festes de Falles. Bloquejat per normativa GVA." },
    "2027-03-12": { status: "no-disponible", reason: "set_dies_abans_falles", title: "Pre-Falles (7 dies)", desc: "Dins del període de 7 dies previs a Falles. Bloquejat per normativa GVA." },
    "2027-03-13": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2027-03-14": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2027-03-15": { status: "no-disponible", reason: "set_dies_abans_falles", title: "Setmana de Falles", desc: "Dins dels 7 dies previs a les festes de Falles. Bloquejat per normativa GVA." },
    "2027-03-16": { status: "no-disponible", reason: "set_dies_abans_falles", title: "Planta de Falles", desc: "Dia immediatament anterior a festius de Falles. Bloquejat per normativa GVA." },
    "2027-03-17": { status: "festiu", title: "Falles de Sagunt", desc: "Festiu local específic de Sagunt." },
    "2027-03-18": { status: "festiu", title: "Falles de Sagunt", desc: "Festiu local específic de Sagunt." },
    "2027-03-19": { status: "festiu", title: "Sant Josep / Falles", desc: "Festiu autonòmic de la Comunitat Valenciana." },
    "2027-03-20": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2027-03-21": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2027-03-22": { status: "no-disponible", reason: "set_dies_abans_pasqua", title: "Pre-vacances de Pasqua", desc: "Període immediatament previ a vacances de Pasqua (inici 25 març). Bloquejat per normativa GVA." },
    "2027-03-23": { status: "no-disponible", reason: "set_dies_abans_pasqua", title: "Pre-vacances de Pasqua", desc: "Període immediatament previ a vacances de Pasqua (inici 25 març). Bloquejat per normativa GVA." },
    "2027-03-24": { status: "no-disponible", reason: "set_dies_abans_pasqua", title: "Darrer dia abans de Pasqua", desc: "Darrer dia lectiu abans de les vacances de Pasqua. Bloquejat per normativa GVA." },
    "2027-03-25": { status: "festiu", title: "Dijous Sant", desc: "Vacances escolars de Pasqua / Setmana Santa." },
    "2027-03-26": { status: "festiu", title: "Divendres Sant", desc: "Festiu nacional (Setmana Santa)." },
    "2027-03-27": { status: "cap-de-setmana", title: "Dissabte de Glòria", desc: "Cap de setmana." },
    "2027-03-28": { status: "cap-de-setmana", title: "Diumenge de Pasqua", desc: "Cap de setmana." },
    "2027-03-29": { status: "festiu", title: "Dilluns de Pasqua", desc: "Festiu autonòmic (Pasqua)." },
    "2027-03-30": { status: "festiu", title: "Vacances de Pasqua", desc: "Període vacacional escolar." },
    "2027-03-31": { status: "festiu", title: "Vacances de Pasqua", desc: "Període vacacional escolar." },

    // ABRIL 2027
    "2027-04-01": { status: "festiu", title: "Vacances de Pasqua", desc: "Període vacacional escolar." },
    "2027-04-02": { status: "festiu", title: "Vacances de Pasqua", desc: "Període vacacional escolar." },
    "2027-04-03": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2027-04-04": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2027-04-05": { status: "festiu", title: "Sant Vicent Ferrer / Pasqua", desc: "Festiu escolar / Sant Vicent Ferrer." },
    "2027-04-06": { status: "no-disponible", reason: "set_dies_despres_pasqua", title: "Tornada de Pasqua (Dia 1)", desc: "Dins dels 7 dies lectius posteriors a vacances de Pasqua. Bloquejat per normativa GVA." },
    "2027-04-07": { status: "no-disponible", reason: "set_dies_despres_pasqua", title: "Dia lectiu 2 post-Pasqua", desc: "Dins dels 7 dies lectius posteriors a vacances de Pasqua. Bloquejat per normativa GVA." },
    "2027-04-08": { status: "no-disponible", reason: "set_dies_despres_pasqua", title: "Dia lectiu 3 post-Pasqua", desc: "Dins dels 7 dies lectius posteriors a vacances de Pasqua. Bloquejat per normativa GVA." },
    "2027-04-09": { status: "no-disponible", reason: "set_dies_despres_pasqua", title: "Dia lectiu 4 post-Pasqua", desc: "Dins dels 7 dies lectius posteriors a vacances de Pasqua. Bloquejat per normativa GVA." },
    "2027-04-10": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2027-04-11": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2027-04-12": { status: "no-disponible", reason: "set_dies_despres_pasqua", title: "Dia lectiu 5 post-Pasqua", desc: "Dins dels 7 dies lectius posteriors a vacances de Pasqua. Bloquejat per normativa GVA." },
    "2027-04-13": { status: "no-disponible", reason: "set_dies_despres_pasqua", title: "Dia lectiu 6 post-Pasqua", desc: "Dins dels 7 dies lectius posteriors a vacances de Pasqua. Bloquejat per normativa GVA." },
    "2027-04-14": { status: "no-disponible", reason: "set_dies_despres_pasqua", title: "Dia lectiu 7 post-Pasqua", desc: "7è dia lectiu posterior a vacances de Pasqua. Bloquejat per normativa GVA." },
    "2027-04-15": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-04-16": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-04-17": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2027-04-18": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2027-04-19": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-04-20": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-04-21": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-04-22": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-04-23": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-04-24": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2027-04-25": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2027-04-26": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-04-27": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-04-28": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-04-29": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-04-30": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },

    // MAIG 2027
    "2027-05-01": { status: "festiu", title: "Festa del Treball", desc: "Festiu nacional (Dissabte)." },
    "2027-05-02": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2027-05-03": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-05-04": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-05-05": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-05-06": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-05-07": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-05-08": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2027-05-09": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2027-05-10": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-05-11": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-05-12": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-05-13": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-05-14": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-05-15": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2027-05-16": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2027-05-17": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-05-18": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-05-19": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-05-20": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-05-21": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-05-22": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2027-05-23": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2027-05-24": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-05-25": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-05-26": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-05-27": { status: "disponible", title: "Dia lectiu", desc: "Disponible per a sol·licitar com a moscós lectiu." },
    "2027-05-28": { status: "disponible", title: "Darrer dia lectiu hàbil", desc: "Darrer dia lectiu abans del bloc dels 15 últims dies de curs." },
    "2027-05-29": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2027-05-30": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2027-05-31": { status: "no-disponible", reason: "15_ultims_dies", title: "15 últims dies lectius de curs", desc: "Inici dels 15 darrers dies lectius del curs escolar. Bloquejat per normativa GVA." },

    // JUNY 2027
    "2027-06-01": { status: "no-disponible", reason: "15_ultims_dies", title: "15 últims dies lectius", desc: "Dins dels 15 darrers dies lectius del curs escolar. Bloquejat per normativa GVA." },
    "2027-06-02": { status: "no-disponible", reason: "15_ultims_dies", title: "15 últims dies lectius", desc: "Dins dels 15 darrers dies lectius del curs escolar. Bloquejat per normativa GVA." },
    "2027-06-03": { status: "no-disponible", reason: "15_ultims_dies", title: "15 últims dies lectius", desc: "Dins dels 15 darrers dies lectius del curs escolar. Bloquejat per normativa GVA." },
    "2027-06-04": { status: "no-disponible", reason: "15_ultims_dies", title: "15 últims dies lectius", desc: "Dins dels 15 darrers dies lectius del curs escolar. Bloquejat per normativa GVA." },
    "2027-06-05": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2027-06-06": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2027-06-07": { status: "no-disponible", reason: "15_ultims_dies", title: "15 últims dies lectius", desc: "Dins dels 15 darrers dies lectius del curs escolar. Bloquejat per normativa GVA." },
    "2027-06-08": { status: "no-disponible", reason: "15_ultims_dies", title: "15 últims dies lectius", desc: "Dins dels 15 darrers dies lectius del curs escolar. Bloquejat per normativa GVA." },
    "2027-06-09": { status: "no-disponible", reason: "15_ultims_dies", title: "15 últims dies lectius", desc: "Dins dels 15 darrers dies lectius del curs escolar. Bloquejat per normativa GVA." },
    "2027-06-10": { status: "no-disponible", reason: "15_ultims_dies", title: "15 últims dies lectius", desc: "Dins dels 15 darrers dies lectius del curs escolar. Bloquejat per normativa GVA." },
    "2027-06-11": { status: "no-disponible", reason: "15_ultims_dies", title: "15 últims dies lectius", desc: "Dins dels 15 darrers dies lectius del curs escolar. Bloquejat per normativa GVA." },
    "2027-06-12": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2027-06-13": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2027-06-14": { status: "no-disponible", reason: "15_ultims_dies", title: "15 últims dies lectius", desc: "Dins dels 15 darrers dies lectius del curs escolar. Bloquejat per normativa GVA." },
    "2027-06-15": { status: "no-disponible", reason: "15_ultims_dies", title: "15 últims dies lectius", desc: "Dins dels 15 darrers dies lectius del curs escolar. Bloquejat per normativa GVA." },
    "2027-06-16": { status: "no-disponible", reason: "15_ultims_dies", title: "15 últims dies lectius", desc: "Dins dels 15 darrers dies lectius del curs escolar. Bloquejat per normativa GVA." },
    "2027-06-17": { status: "no-disponible", reason: "15_ultims_dies", title: "Penúltim dia lectiu", desc: "Dins dels 15 darrers dies lectius del curs escolar. Bloquejat per normativa GVA." },
    "2027-06-18": { status: "no-disponible", reason: "fi_curs_lectiu", title: "Últim dia de curs lectiu", desc: "Finalització oficial de les classes amb alumnat. Bloquejat per normativa GVA." },
    "2027-06-19": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2027-06-20": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2027-06-21": { status: "no-lectiu", title: "Període no lectiu", desc: "Període laboral sense docència d'alumnat (apte per a moscosos no lectius)." },
    "2027-06-22": { status: "no-lectiu", title: "Període no lectiu", desc: "Període laboral sense docència d'alumnat (apte per a moscosos no lectius)." },
    "2027-06-23": { status: "no-lectiu", title: "Període no lectiu", desc: "Període laboral sense docència d'alumnat (apte per a moscosos no lectius)." },
    "2027-06-24": { status: "festiu", title: "Sant Joan", desc: "Festiu autonòmic de la Comunitat Valenciana." },
    "2027-06-25": { status: "no-lectiu", title: "Període no lectiu", desc: "Període laboral sense docència d'alumnat (apte per a moscosos no lectius)." },
    "2027-06-26": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2027-06-27": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2027-06-28": { status: "no-lectiu", title: "Període no lectiu", desc: "Període laboral sense docència d'alumnat (apte per a moscosos no lectius)." },
    "2027-06-29": { status: "no-lectiu", title: "Període no lectiu", desc: "Període laboral sense docència d'alumnat (apte per a moscosos no lectius)." },
    "2027-06-30": { status: "no-lectiu", title: "Final de Curs Laboral", desc: "Període laboral sense docència d'alumnat (apte per a moscosos no lectius)." },

    // JULIOL 2027
    "2027-07-01": { status: "no-lectiu", title: "Juliol no lectiu", desc: "Període laboral no lectiu per a tasques d'organització de curs." },
    "2027-07-02": { status: "no-lectiu", title: "Juliol no lectiu", desc: "Període laboral no lectiu per a tasques d'organització de curs." },
    "2027-07-03": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2027-07-04": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2027-07-05": { status: "no-lectiu", title: "Juliol no lectiu", desc: "Període laboral no lectiu." },
    "2027-07-06": { status: "no-lectiu", title: "Juliol no lectiu", desc: "Període laboral no lectiu." },
    "2027-07-07": { status: "no-lectiu", title: "Juliol no lectiu", desc: "Període laboral no lectiu." },
    "2027-07-08": { status: "no-lectiu", title: "Juliol no lectiu", desc: "Període laboral no lectiu." },
    "2027-07-09": { status: "no-lectiu", title: "Juliol no lectiu", desc: "Període laboral no lectiu." },
    "2027-07-10": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2027-07-11": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2027-07-12": { status: "no-lectiu", title: "Juliol no lectiu", desc: "Període laboral no lectiu." },
    "2027-07-13": { status: "no-lectiu", title: "Juliol no lectiu", desc: "Període laboral no lectiu." },
    "2027-07-14": { status: "no-lectiu", title: "Juliol no lectiu", desc: "Període laboral no lectiu." },
    "2027-07-15": { status: "no-lectiu", title: "Juliol no lectiu", desc: "Període laboral no lectiu." },
    "2027-07-16": { status: "no-lectiu", title: "Juliol no lectiu", desc: "Període laboral no lectiu." },
    "2027-07-17": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2027-07-18": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2027-07-19": { status: "no-lectiu", title: "Juliol no lectiu", desc: "Període laboral no lectiu." },
    "2027-07-20": { status: "no-lectiu", title: "Juliol no lectiu", desc: "Període laboral no lectiu." },
    "2027-07-21": { status: "no-lectiu", title: "Juliol no lectiu", desc: "Període laboral no lectiu." },
    "2027-07-22": { status: "no-lectiu", title: "Juliol no lectiu", desc: "Període laboral no lectiu." },
    "2027-07-23": { status: "no-lectiu", title: "Juliol no lectiu", desc: "Període laboral no lectiu." },
    "2027-07-24": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." },
    "2027-07-25": { status: "cap-de-setmana", title: "Diumenge", desc: "Cap de setmana." },
    "2027-07-26": { status: "no-lectiu", title: "Juliol no lectiu", desc: "Període laboral no lectiu." },
    "2027-07-27": { status: "no-lectiu", title: "Juliol no lectiu", desc: "Període laboral no lectiu." },
    "2027-07-28": { status: "no-lectiu", title: "Juliol no lectiu", desc: "Període laboral no lectiu." },
    "2027-07-29": { status: "no-lectiu", title: "Juliol no lectiu", desc: "Període laboral no lectiu." },
    "2027-07-30": { status: "no-lectiu", title: "Juliol no lectiu", desc: "Període laboral no lectiu." },
    "2027-07-31": { status: "cap-de-setmana", title: "Dissabte", desc: "Cap de setmana." }
  },

  /**
   * Obté la informació dinàmica d'un dia segons el perfil docent actiu:
   * @param {string} dateKey Format YYYY-MM-DD
   * @param {string} profile 'eso_bat' o 'fp'
   */
  getDayDataForProfile: function(dateKey, profile) {
    const base = this.daysBase[dateKey] || { status: "disponible", title: "Dia hàbil", desc: "" };
    
    // Si és festiu o cap de setmana o no-lectiu, manté estat base
    if (base.status === "festiu" || base.status === "cap-de-setmana") {
      return base;
    }

    // Comprovar si té avaluació en el perfil seleccionat
    const profKey = (profile === "fp") ? "fp" : "eso_bat";
    const evalSpecific = this.avaluacions[profKey] && this.avaluacions[profKey][dateKey];

    if (evalSpecific) {
      return {
        status: "no-disponible",
        reason: "avaluacio",
        title: evalSpecific.title,
        desc: `${evalSpecific.desc} La normativa prohibeix dies moscosos en sessions d'avaluació.`
      };
    }

    // Si no té avaluació en aquest perfil, retorna l'estat base (15 primers/últims dies, pre/post vacances o disponible)
    return base;
  }
};
