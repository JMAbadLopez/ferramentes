# Calendari de Dies Moscosos · IES CAMP DE MORVEDRE (Curs 2026-2027)

Web interactiva i intuïtiva dissenyada per a facilitar al professorat de l'**IES Camp de Morvedre** (Sagunt / Port de Sagunt) la planificació dels seus dies de permís per assumptes particulars ("dies moscosos"), d'acord amb la **Instrucció 1/2026** i la **Resolució de 19 d'octubre de 2026 de la Direcció General de Personal Docent (GVA)** i el calendari oficial d'avaluacions del centre.

---

## Característiques Principals

1. **Calendari Anual Docent (Curs 2026-2027)**:
   - **Vista anual completa, neta i compacta**: Els 10 mesos del curs escolar a la vista (setembre a juny/juliol), amb mides de cel·la i tipografies optimitzades per a una visualització còmoda i sense recarregaments en ordinador, tauleta o mòbil.
   - **Disseny modern amb icones vectorials SVG**: Sistema d'icones vectorials integrat de manera nativa (sense dependències externes de servidors CDN ni càrregues de tercers), garantint màxima compatibilitat, rapidesa i aspecte professional.
   - **Separació de perfils docents**: Commuta entre perfils d'ESO/Batxillerat i Formació Professional (FP). Les dates d'avaluació inicial, 1a, 2a, final i extraordinàries s'adapten fidelment al calendari oficial de l'IES Camp de Morvedre.
   - **Codi de colors semàfor**:
     - Verd: Dia lectiu disponible per a demanar moscós lectiu.
     - Roig: Dia bloquejat per normativa (7 primers i 7 últims dies lectius, 7 dies al voltant de vacances de Nadal, Falles i Pasqua, sessions d'avaluació segons perfil).
     - Blau: Festius oficials (Festius locals de Sagunt: 7 Desembre, 16, 17 i 18 Març; festius autonòmics i nacionals).
     - Taronja/Groc: Períodes no lectius laborals (vàlids per als 3 dies no lectius).
     - Gris: Caps de setmana.
   - **Filtres ràpids**: Tots els dies, Només disponibles, Dies no lectius, Dies bloquejats, Festius.

2. **Detall i Inspector de Dia (Modal)**:
   - En fer clic a qualsevol dia s'obri un panell amb l'explicació detallada.
   - Si està bloquejat, especifica el motiu exacte de la normativa GVA o avaluació.
   - Mostra la **finestra de tramitació** (obertura 1 mes abans, data límit 7 dies naturals abans i **resolució de la Direcció dins dels 6 dies naturals previs**).
   - Recordatori de gravació obligatòria prèvia en **ITACA** i pla pedagògic a Prefectura d'Estudis.
   - Botó per afegir o eliminar de la selecció personal.

3. **Planificador Personal i Comprovació en Temps Real**:
   - Barra flotant persistent que compta els dies triats (Lectius: fins a 3, No lectius: fins a 3).
   - **Detecció automàtica d'infraccions**:
     - Avisa si s'intenten agafar dies consecutius (prohibit per normativa, incloent divendres i dilluns).
     - Avisa si se superen els 3 dies màxims.
     - Avisa si falten menys de 7 dies naturals respecte a la data sol·licitada.
   - Les preferències es guarden automàticament de manera resilient (`safeStorage`).

4. **Regles de Quota del Centre i Distribució per Torns**:
   - **Plantilla de referència**: Fixada a data **1 de setembre** de cada curs escolar (Resolució 19/10/2026).
   - **Quota torn de matí**: Màxim **6 docents al dia** (plantilla d'entre 141 i 160 docents).
   - **Quota torn de vesprada (FP)**: Màxim **2 docents al dia** per a garantir la cobertura dels cicles formatius vespertins.
   - **Quota total del centre**: Màxim conjunt de **8 docents al dia** (6 de matí + 2 de vesprada).
   - **Criteris oficials de prelació per concurrència (Resolució 19/10/2026)**:
     1. Menor nombre de dies moscosos gaudits en el curs escolar actual.
     2. Major antiguitat en el centre educatiu (se sumen períodes interromputs).
     3. Major antiguitat en el cos docent (se sumen períodes interromputs).
     4. Tindre 55 anys o més o reconegut grau de discapacitat ≥ 33%.
     5. Desempat subsidiari acordat pels òrgans col·legiats del centre (Claustre i Consell Escolar).

5. **Calculadores Específiques Adaptades a la Resolució 19/10/2026**:
   - **Calculadora de terminis**: Tria qualsevol data i obtén la data límit (7 dies naturals abans), obertura del termini (1 mes abans) i termini de resolució de la Direcció (dins dels 6 dies previs).
   - **Calculadora de proporcionalitat exacta**:
     - Aplica la fórmula oficial per modalitat: `round(3 · X / 365)`.
     - Llindars de substitucions: < 61 dies (0 dies), 61-182 dies (1L + 1NL = 2 dies), 183-304 dies (2L + 2NL = 4 dies), ≥ 305 dies (3L + 3NL = 6 dies).
     - Regla de vacants: 3L + 3NL d'entrada si s'adjudica abans de l'1 de novembre; 2L + 2NL d'entrada a partir de l'1 de novembre.
   - **Taula de quotes per plantilla**: Escala oficial GVA amb menció de la data de referència (1 de setembre) i especificitat de l'IES Camp de Morvedre.

6. **Bilingüe 100% (Valencià / Castellà)**:
   - Paritat total de traducció instantània en tota la interfície, incloent calendari, calculadores, normativa i 9 preguntes freqüents (FAQ).

---

## 🚀 Desplegament en GITHUB PAGES

Aquesta web és **100% estàtica (Client-Side)** i està expressament optimitzada per a funcionar de forma immediata, robusta i sense dependències en **GitHub Pages**:

- **Fitxer `.nojekyll` inclòs**: Evita que GitHub Pages execute innecessàriament el motor de processament Jekyll, accelerant el desplegament i assegurant que tots els fitxers i scripts es publiquen directament tal qual.
- **Pàgina d'error `404.html` personalitzada**: Si s'accedeix a una ruta incorrecta o un enllaç trencat, GitHub Pages serveix automàticament aquesta pàgina corporativa amb redirecció automàtica a `index.html`.
- **Rutes estrictament relatives (`./`)**: Funciona tant a l'arrel d'un domini (`https://<usuari>.github.io/`) com en qualsevol subdirectori de projecte (`https://<usuari>.github.io/<repositori>/`).
- **Sense codi de servidor**: Només HTML5 semàntic, CSS3 natiu i Vanilla JS modern.
- **Zero dependències externes**: Sense crides a CDNs de tercers (com ara fonts o icones externes) que puguen fallar en xarxes escolars protegides o amb tallafocs.
- **Sense codi insegur ni bloquejant**: Notificacions basades en interfície integrada (*toasts* no bloquejants), sense crides a `alert()`, `confirm()` o APIs no permeses en entorns aïllats o iframes educatius (Moodle, Aules, Teams).
- **Emmagatzematge aïllat resilient (`safeStorage`)**: Protegit amb control d'errors per si l'usuari navega en mode d'incògnit o té restringides les galetes de tercers.

### Passos per activar GitHub Pages:
1. Puja aquest repositori a GitHub.
2. Ves a **Settings** > **Pages** dins del teu repositori.
3. A l'apartat **Build and deployment** > **Source**, selecciona **Deploy from a branch**.
4. Tria la branca `main` (o `master`) i la carpeta `/ (root)`.
5. Fes clic a **Save**. En un minut, la web estarà publicada i accessible a tothom!

---

## 📁 Estructura del Projecte

```
calendario-moscosos/
├── .nojekyll             # Indicador per a GitHub Pages (desactiva Jekyll i acelera la publicació)
├── 404.html              # Pàgina 404 personalitzada amb redirecció automàtica al calendari
├── index.html            # Pàgina principal amb vista anual, selector de perfils i bilingüe
├── css/
│   └── styles.css        # Estils corporatius IES Camp de Morvedre i disseny responsive
├── js/
│   ├── logo-data.js      # Logotip oficial del centre en format lleuger
│   ├── calendar-data.js  # Base de dades del curs 2026-2027 i avaluacions d'FP i ESO/BAT
│   ├── rules.js          # Motor de regles normatives GVA, quotes i terminis
│   └── app.js            # Controlador interactiu, inspector de dia i emmagatzematge segur
└── README.md             # Documentació de l'aplicació
```
