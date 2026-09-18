# Calendari de Dies Moscosos · IES CAMP DE MORVEDRE (Curs 2026-2027)

Web interactiva i intuïtiva dissenyada per a facilitar al professorat de l'**IES Camp de Morvedre** (Sagunt / Port de Sagunt) la planificació dels seus dies de permís per assumptes particulars ("dies moscosos"), d'acord amb la normativa de la **Conselleria d'Educació de la Generalitat Valenciana (GVA)** (Instrucció 1/2026 de la DG de Personal Docent) i el calendari oficial d'avaluacions del centre.

---

## 📌 Característiques Principals

1. **Calendari Anual Docent (Curs 2026-2027)**:
   - **Vista anual completa i neta**: Els 10 mesos del curs escolar a la vista (setembre a juny/juliol), adaptable a qualsevol pantalla (ordinador, tauleta o mòbil).
   - **Separació de perfils docents**: Commuta entre `🎓 ESO i Batxillerat` i `⚙️ Formació Professional (FP)`. Les dates d'avaluació inicial, 1a, 2a, final i extraordinàries s'adapten fidelment al calendari oficial de l'IES Camp de Morvedre.
   - **Codi de colors semàfor**:
     - 🟢 **Verd**: Dia lectiu disponible per a demanar moscós lectiu.
     - 🔴 **Roig**: Dia bloquejat per normativa (15 primers/últims dies lectius, 7 dies al voltant de vacances de Nadal, Falles, Pasqua i Sant Joan, sessions d'avaluació segons perfil).
     - 🔵 **Blau**: Festius oficials (Festius locals de Sagunt: 7 Desembre, 16, 17 i 18 Març; festius autonòmics i nacionals).
     - 🟡 **Taronja/Groc**: Períodes no lectius laborals (vàlids per als 3 dies no lectius).
     - ⚫ **Gris**: Caps de setmana.
   - **Filtres ràpids**: Tots els dies, Només disponibles, Dies no lectius, Dies bloquejats, Festius.

2. **Detall i Inspector de Dia (Modal)**:
   - En fer clic a qualsevol dia s'obri un panell amb l'explicació detallada.
   - Si està bloquejat, especifica el motiu exacte de la normativa GVA o avaluació.
   - Mostra la **finestra de tramitació** (obertura 1 mes abans i data límit recomanada 7 dies naturals abans).
   - Botó per afegir o eliminar de la selecció personal.

3. **Planificador Personal i Comprovació en Temps Real**:
   - Barra flotant persistent que compta els dies triats (Lectius: fins a 3, No lectius: fins a 3).
   - **Detecció automàtica d'infraccions**:
     - Avisa si s'intenten agafar dies consecutius (prohibit per normativa, incloent divendres i dilluns).
     - Avisa si se superen els 3 dies màxims.
     - Avisa si falten menys de 7 dies naturals respecte a la data sol·licitada.
   - Les preferències es guarden automàticament de manera resilient (`safeStorage`).

4. **Regles de Quota del Centre i Distribució per Torns**:
   - **Quota torn de matí**: Màxim **6 docents al dia** (plantilla d'entre 141 i 160 docents).
   - **Quota torn de vesprada (FP)**: Màxim **2 docents al dia** per a garantir la cobertura dels cicles formatius vespertins.
   - **Quota total del centre**: Màxim conjunt de **8 docents al dia** (6 de matí + 2 de vesprada).
   - Criteris de concurrència: Pendent d'actualització segons l'acord del Claustre i del Consell Escolar.

5. **Calculadores Específiques**:
   - **Calculadora de terminis**: Tria qualsevol data i obtén la data límit (7 dies naturals abans) i data d'obertura del termini (1 mes abans).
   - **Calculadora de proporcionalitat**: Per a personal interí o contractes temporals que s'incorporen durant el curs.
   - **Taula de quotes per plantilla**: Escala oficial GVA (fins a >81 docents: 5) amb indicació expressa de la quota específica del centre (8 docents: 6 matí + 2 vesprada per a 141-160 docents).

6. **Bilingüe 100% (Valencià / Castellà)**:
   - Traducció completa instantània de tota la interfície, incloent calendari, calculadores, normativa i preguntes freqüents (FAQ).

---

## 🚀 Desplegament en GITHUB PAGES

Aquesta web és **100% estàtica (Client-Side)** i està optimitzada per a funcionar immediatament en **GitHub Pages**:

- **Sense codi de servidor**: Només HTML5, CSS3 i JavaScript natiu (Vanilla JS).
- **Sense dependències ni compiladors**: No requereix Node.js, ni `npm install`, ni passos de build.
- **Rutes relatives (`./`)**: Funciona correctament tant a l'arrel d'un domini com sota un subdirectori de repositori (`https://<usuari>.github.io/<nom-repositori>/`).
- **Sense codi insegur ni bloquejant**: Notificacions basades en interfície integrada (*toasts* no bloquejants), sense crides a `alert()`, `confirm()` o APIs no permeses en entorns aïllats o iframes educatius (Moodle, Aules, Teams).
- **Emmagatzematge aïllat**: Protegit amb control d'errors per si l'usuari navega en mode d'incògnit o té restringides les galetes de tercers.

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
├── index.html            # Pàgina principal amb vista anual i bilingüe
├── css/
│   └── styles.css        # Estils corporatius IES Camp de Morvedre i disseny responsive
├── js/
│   ├── logo-data.js      # Logotip oficial del centre en format lleuger
│   ├── calendar-data.js  # Base de dades del curs 2026-2027 i avaluacions d'FP i ESO/BAT
│   ├── rules.js          # Motor de regles normatives GVA, quotes i terminis
│   └── app.js            # Controlador interactiu, inspector de dia i emmagatzematge segur
└── README.md             # Documentació de l'aplicació
```
