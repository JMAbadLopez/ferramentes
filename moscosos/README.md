# Calendari de Dies Moscosos · IES CAMP DE MORVEDRE (Curs 2026-2027)

Web interactiva i intuïtiva dissenyada per a facilitar al professorat de l'**IES Camp de Morvedre** (Sagunt / Port de Sagunt) la planificació i sol·licitud dels seus dies de permís per assumptes particulars ("dies moscosos"), d'acord amb la normativa de la **Conselleria d'Educació de la Generalitat Valenciana (GVA)** i les instruccions de la Direcció General de Personal Docent.

---

## 📌 Característiques Principals

1. **Calendari Docent Interactiu (Curs 2026-2027)**:
   - **Vista mensual detallada** amb navegació de mesos i dies de la setmana.
   - **Vista anual completa** per a una visió panoràmica de tot el curs.
   - **Codi de colors semàfor**:
     - 🟢 **Verd**: Dia lectiu disponible per a demanar moscós lectiu.
     - 🔴 **Roig**: Dia bloquejat per normativa (15 primers/últims dies lectius, 7 dies al voltant de vacances de Nadal, Falles, Pasqua i Sant Joan, sessions d'avaluació).
     - 🔵 **Blau**: Festius oficials (Festius locals de Sagunt: 7 Desembre, 17 i 18 Març; festius autonòmics i nacionals).
     - 🟡 **Taronja/Groc**: Períodes no lectius laborals (vàlids per als 3 dies no lectius).
     - ⚫ **Gris**: Caps de setmana.
   - **Filtres ràpids**: Tots els dies, Només disponibles, Dies no lectius, Dies bloquejats, Festius.

2. **Detall i Inspector de Dia (Modal)**:
   - En fer clic a qualsevol dia s'obri un panell amb l'explicació detallada.
   - Si està bloquejat, especifica el motiu exacte de la normativa GVA.
   - Mostra la **finestra legal de tramitació** (obertura 2 mesos abans i data límit recomanada 15 dies naturals abans).
   - Botó per afegir o eliminar de la selecció personal.

3. **Planificador Personal i Comprovació en Temps Real**:
   - Barra flotant persistent que compta els dies triats (Lectius: fins a 3, No lectius: fins a 3).
   - **Detecció automàtica d'infraccions**:
     - Avisa si s'intenten agafar dies consecutius (prohibit per normativa).
     - Avisa si se superen els 3 dies màxims.
     - Avisa si falten menys de 15 dies naturals respecte a la data sol·licitada.
   - Les dates es guarden automàticament al teu dispositiu (`localStorage`).

4. **Generador de la Instància Oficial per a Direcció**:
   - Genera el document formal oficial adaptat per a l'IES Camp de Morvedre amb el format de la Generalitat Valenciana.
   - Inclou la declaració responsable de dipòsit del pla d'activitats pedagògiques per a l'alumnat a Prefectura d'Estudis.
   - Botó per a **Imprimir o guardar directament en PDF** (amb estils nets d'impressió oficial A4).
   - Botó per a **Copiar el text** per a correus o tràmits telemàtics.

5. **Calculadores Específiques**:
   - **Calculadora de terminis**: Tria qualsevol data i obtén la data límit i data d'obertura.
   - **Calculadora de proporcionalitat**: Per a personal interí o contractes temporals que s'incorporen durant el curs.
   - **Taula de quotes per plantilla**: Límit de 5 docents al dia per a l'IES Camp de Morvedre (>81 docents) i criteris de desempat (no haver gaudit cap dia > sorteig).

6. **Bilingüe (Valencià / Castellà)**:
   - Commutador ràpid a la capçalera per a consultar la web en la llengua desitjada.

---

## 🚀 Com Utilitzar o Desplegar

Aquesta aplicació està construïda amb tecnologies web estàndard (HTML5, CSS3, JavaScript ES6) **sense necessitat de servidors ni instal·lacions complexes**:

1. **Ús directe local**:
   - Obre directament el fitxer `index.html` en qualsevol navegador web modern (Chrome, Safari, Firefox, Edge).
2. **Allotjament en la web del centre**:
   - Puja la carpeta del projecte a l'espai web de l'institut (PortalEdu / servidor web del centre) o comparteix-lo en la xarxa interna de la sala de professorat.

---

## 📁 Estructura del Projecte

```
calendario-moscosos/
├── index.html            # Pàgina principal estructurada i bilingüe
├── css/
│   └── styles.css        # Estils visuals, disseny responsive i regles @media print
├── js/
│   ├── calendar-data.js  # Base de dades del curs 2026-2027 amb la catalogació de cada dia
│   ├── rules.js          # Motor de regles normatives, validacions i terminis
│   └── app.js            # Lògica interactiva, modal, gestor de selecció i instància oficial
└── README.md             # Documentació de l'aplicació
```
