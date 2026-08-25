# Übergabe

Alles, was jemand wissen muss, der hier weiterarbeitet — Entscheide samt
Begründung, damit niemand sie versehentlich rückgängig macht.

## Wofür die Seite da ist

Maurizio Zulli, Luzern, macht Ton: Sounddesign und Mischung für Film, er baut
Recording-Rigs für DJ-Booths, legt selber auf, baut an einem Festival in den
Bergen mit und nimmt auf Gletschern auf.

`mauriziozulli.com` ist seine Arbeitsseite: ruhig, cremefarben, für
Auftraggeber. **Diese Seite hier ist bewusst das Gegenteil.** Sie ist kein
Portfolio und will keine Aufträge einwerben — sie zeigt eine Haltung. Aufträge
entstehen als Nebenwirkung, nicht als Ziel.

Der Einstieg läuft über **runde Aufkleber**, die er an Festivals, im Studio und
an Filmsets verteilt und auf seine Cases klebt. Wer einen sieht, denkt „hier
war jemand" und tippt die Adresse ab. Die Seite muss dann beweisen, dass dieser
Jemand es ernst meint.

**Der inhaltliche Kern:** nicht was er anbietet, sondern dass seine Welten
zusammenhängen. Der Veranstalter soll merken, dass der Rig-Bauer selber auflegt.
Der Videograf soll merken, dass der Filmtonmann auf Gletscher steigt. Darum hat
jeder Abschnitt genau einen Satz, der die Verbindung zu den anderen nennt.
**Diese Sätze sind der Punkt der Seite — nicht wegkürzen.**

## Aufbau

Fünf bildschirmfüllende Abschnitte, danach eine zweite Ebene für
Vertiefungen.

| | Abschnitt | Wort im Balken | Spur | Balken / Wort | Weiter |
|---|---|---|---|---|---|
| 00 | Sound Matters | Sound | Pegel | Verdigris / Knochen | — |
| 01 | Field Recording | Field | Spektrogramm | Knochen / Tiefgrün | → Ebene |
| 02 | Custom Gear | Custom | Sternvierer | Verdigris / Knochen | → Ebene |
| 03 | Film | Film | Bild und Ton | Ocker / Russ | ↗ weg |
| 04 | Musik | Musik | Spektrum mit Kick | Rost / Knochen | ↗ weg |

**Die Reihenfolge ist nicht nach Umsatz sortiert, und das ist Absicht.**
Filmton ist das Hauptgeschäft, stand aber einmal auf 01 und ist bewusst
nach hinten gerückt. Drei Gründe, alle nachprüfbar:

1. **Was selten ist, führt.** Filmton machen viele. Dass jemand ein
   Hydrophon auf einen Gletscher schleppt, seine Kabel selber lötet und
   seit fünfzehn Jahren auflegt — diese Kombination gibt es woanders
   nicht. Sie verdient die Aufmerksamkeit, die man am Anfang geschenkt
   bekommt.
2. **Die Ausgänge liegen hinten.** Die zwei Abschnitte mit → bleiben auf
   der Seite und stehen vorn; die zwei mit ↗ führen weg und stehen
   hinten. Vorher war der erste inhaltliche Abschnitt ausgerechnet der
   Ausgang zu `mauriziozulli.com`.
3. **Es ist die Reihenfolge des Handwerks.** Erst aufnehmen, dann bauen,
   wozu es das Rig braucht, dann mischen. «Kein Mix rettet eine
   schlechte Aufnahme» in 01 bereitet den Filmton-Abschnitt vor, statt
   ihn zu wiederholen.

Wer Filmton wieder nach vorne holen will, soll wissen, was er dafür
aufgibt. Und: Filmleute sind auf Bildschirm eins trotzdem angesprochen —
der Satz in 01 nennt das Filmset ausdrücklich.

**Die Seite spricht die Sprache des Aufklebers.** Der Balken mit dem
ausgesparten Wort, die harte Kontur, die Mono-Zeile, die gedruckten
Farben — alles von dort. Kein Aufkleber liegt auf der Seite: es geht um
die Sprache, nicht um die Nachahmung. Ein erster Entwurf hat Kleber
nachgebaut und wurde verworfen — Kleber auf einer Seite bleiben Kleber.

**Neu ist, was der Balken tut.** Ein Balken heisst in dieser Branche
Pegel, also zeigt er einen. Was im Balken läuft, gehört zum Thema des
Abschnitts; beschrieben ist jede Spur in `src/scripts/spuren.ts`.

Zwischenzeitlich hatte jeder Abschnitt eine **eigene Schriftfamilie**
(fünf Stück), **keine Farbe kam zweimal vor**, und hinter der Schrift lag
ein **im Browser abstrahiertes Foto**. Alles drei ist zurückgenommen: Der
Kleber spricht eine Sprache, fünf Schriften sprechen fünf. Jetzt trägt
eine Leitschrift die Seite, Ocker und Verdigris führen — sie dürfen sich
wiederholen, weil sie die gedruckten Fassungen sind —, und die Fläche
trägt Farbe statt Bild.

Unterschieden werden die Abschnitte über **Farbe und Spur**, nicht über
die Schriftfamilie. Nicht wieder auseinanderziehen.

## Die zwei Regeln

1. **Höchstens zwei Ebenen.** Plakat → Detail. Nie tiefer. Sobald man innerhalb
   einer Ebene weiternavigiert, ist ein Menü entstanden — und Menüs waren
   ausdrücklich unerwünscht.
2. **Pro Ebene ein Ausgang und höchstens eine Weiterführung.** Oben
   „Schliessen", unten höchstens eine Handlung. Keine Reiter, keine
   Unterpunkte. **«Höchstens» heisst auch: keine.** `handlung` ist optional,
   und beide Ebenen kommen ohne aus.

Dazu die Pfeil-Konvention: **↗ führt von der Seite weg, → öffnet die Ebene
darüber.** Damit weiss man vorher, ob man soundmatters.audio verlässt.

## Wie die Detail-Ebenen funktionieren

Ein Klick legt die Ebene über das Plakat und schreibt die Adresse mit (`/rig`,
`/aufnahmen`). Damit ist sie verschickbar — „schau mal, wie der das gebaut hat"
ist die Nachricht, über die sich die Seite verbreitet, und ein reines Popup
könnte man nicht verlinken. Die Zurück-Taste schliesst, und wer die Adresse
direkt öffnet, landet sofort dort: zu jeder Ebene ist eine echte Seite
vorgebaut (`src/pages/[ebene].astro`). Ohne JavaScript bleiben es normale
Links, es lädt dann neu statt zu überblenden.

## Farben

**Der Aufkleber gibt die Farben vor, nicht die Seite.** Der Einstieg läuft
über den Kleber, also bestimmt er die Palette. Wer Farben ändern will, fängt
dort an.

Die Familie ist entsättigt und ins Warme gezogen — aus Rot wird Rost, aus
Weiss wird Knochen. So knallt sie auf dunklem Grund, ohne neon zu sein. Ein
Ton je Abschnitt, keine Farbe zweimal. **Kontrast läuft immer über den
Hellwert** — Tinte auf Farbe, Knochen auf Dunkel, nie Ton auf Ton. Höchstens
drei Farben gleichzeitig. Alles Übergreifende (Zeiger, Fokus, Fuss) läuft auf
Knochen statt auf einer Leitfarbe.

Ausführlich samt Herleitung in `FARBEN.md`. Werte stehen in
`src/styles/tokens.css` und nirgends sonst.

## Bilder

**Die Abschnitte haben keine.** Die Fläche trägt die Farbe, der Balken
trägt die Spur. Die fünf abstrahierten Platzhalterfotos und das Skript
dazu sind entfernt; die Geschichte steht in `QUELLEN.md`.

Fotos gibt es nur noch auf den Ebenen, bei den einzelnen Stücken. Alle im
Format 4:3 quer — wie man sie hinzufügt, steht weiter unten.

Der nächste Schritt, falls eigene Fotos dazukommen sollen: **als Grund
hinter den Balken**, nicht als Ersatz für ihn. Dann trägt das Bild die
Fläche und der Pegel die Schrift. Noch nicht gebaut.

## Fallen, die schon einmal zugeschlagen haben

Die meisten davon kosten nur dann Zeit, wenn man sie nicht kennt. Alle sind
hier wirklich passiert.

**Am Balken und am Canvas**

- **Mit Zugabe malen.** `clientWidth` rundet auf ganze Pixel, die wirkliche
  Fläche ist oft einen Bruchteil breiter. Wer exakt bis zur Breite füllt,
  bekommt am Rand eine helle Haarlinie, durch die der Untergrund des
  Balkens scheint. `malen()` malt darum zwei Pixel über jeden Rand hinaus —
  dasselbe Mittel wie im Druck, gegen dasselbe Problem.
- **Die Breite nie am transformierten Element messen.** Der Balken steht
  beim Aufbau auf `scaleX(.04)`, dem Auftritt. `getBoundingClientRect()`
  liefert dann vier Prozent der Breite, und das Canvas zieht einen Streifen
  zum Schmier auseinander. `clientWidth` kennt die Transformation nicht.
- **Vor dem Ausstanzen die Füllfarbe zurücksetzen.** `destination-out`
  radiert mit der Alpha der Quelle. Steht sie noch auf der halbdurch-
  sichtigen Spurfarbe, wird das Wort nur zu einem Fünftel freigestellt und
  sieht aus wie ein Druckfehler.
- **Die Leitschrift heisst «Fett», nicht «Archivo Black».** Sie liegt lokal
  und ist in `tokens.css` so benannt. Wer im Canvas den Originalnamen
  einsetzt, stanzt mit der Ersatzschrift aus — das Wort sitzt dann sichtbar
  schmaler im Balken als die Zeile darunter.
- **Farben über `color` lesen, nicht über `getPropertyValue`.** Die Werte
  stehen als `var(--verdigris)` in der Auszeichnung, damit `tokens.css` die
  einzige Quelle bleibt. Ein Custom Property liefert je nach Browser den
  unaufgelösten Text zurück; `color` ist immer eine fertige Farbe.
- **Erst nach `document.fonts.ready` zeichnen.** Sonst wird mit der
  Ersatzschrift ausgestanzt und alles sitzt daneben.
- **Eine Spur mit Gedächtnis muss vorgefüllt werden.** Das Spektrogramm
  baute seine Geschichte erst auf, während man hinschaut — die halbe Fläche
  blieb leer. Vorfüllen aber nicht über das Schieben: das kopierte je Spalte
  die ganze Leinwand, tausendmal. Spalten direkt an ihren Platz malen.
- **Bei stillstehender Spur die Bewegung ganz weglassen.** Die
  Durchgangsprüfung klebte sonst mit ihrem Punkt bei Null am linken Rand.
- **Rauschen muss mit der Lage abfallen.** Lag es gleichmässig auf allen
  Frequenzlagen, lief der Balken als graue Fläche zu — bei einer
  Feldaufnahme ist oben aber fast nichts.

**Am Text und am Layout**

- **`betont` muss wörtlich in `satz` vorkommen.** Die Hervorhebung wird als
  Textstelle gesucht. Passt sie nicht, verschwindet sie stillschweigend —
  kein Fehler, keine Warnung. Nach jeder Textänderung prüfen.
- **Raster-Kinder haben `min-width: auto`** und können das Raster aufziehen.
  `.mitte` hat darum `min-width: 0` — nicht entfernen.
- **Prozent-Polster auf runden oder quadratischen Elementen** beziehen sich
  auf die Breite des *Elters*, nicht des Elements. Hat Elemente von 250 auf
  336 px aufgeblasen.
- **Deutsche Versalien brauchen Zeilenhöhe.** Bei zu engem Wert stossen
  Umlaute in die Zeile darüber.
- **Balken brauchen ungleiches Polster oben und unten.** Versalien stehen
  auf der Grundlinie, der Raum für Unterlängen darunter bleibt leer — bei
  gleichem Polster sitzt die Schrift sichtbar daneben. Gilt auf der Seite
  wie auf dem Aufkleber; `malen()` richtet darum die gemessene Versalhöhe
  aus, nicht die Zeile.

## Geräte auf der Ebene

`inhalt.ts` kennt unter jeder Ebene ein optionales Feld `stuecke` — einzelne
Geräte mit Einordnung, Text und Datenliste. **Zum Ergänzen einen Eintrag
kopieren und ausfüllen**, die Reihenfolge im Array ist die Reihenfolge auf der
Seite. Beide Sprachen brauchen ihren eigenen Eintrag.

Bewusst **ohne Links**: Ein Stück ist Inhalt, kein Einstieg. Sonst entstünde
eine dritte Ebene, und die gibt es nicht.

## Zwei Sprachen

Deutsch liegt unter `/`, Englisch unter `/en`. Beide sind **echte, vorgebaute
Seiten** — kein Umschalten im Kopf des Browsers. Damit ist jede Fassung
verschickbar und auffindbar, aus demselben Grund, aus dem die Detail-Ebenen
eigene Adressen haben. Beide kennen einander über `hreflang`.

Die englischen Ebenen haben eigene Adressen: `/en/rig` und `/en/recordings`.
Der Schalter unten in der Mitte führt auf dieselbe Ebene in der anderen
Sprache, sonst auf die Startseite.

**Der Schalter gehört zum ersten Abschnitt und scrollt mit ihm weg.** Er steht
absolut im Fluss, nicht fest im Fenster — die Sprache wählt man beim
Eintreten, nicht auf jedem Abschnitt neu. Kein JavaScript nötig. Der Wert
`top: calc(100svh - …)` hängt an der Abschnittshöhe: wer die ändert, muss ihn
mitziehen.

Er liegt zudem unter der Detail-Ebene (kleinerer z-index): sobald eine Ebene
offen ist, ist er verdeckt. Sonst hätte die Ebene einen Ausgang, eine
Weiterführung *und* einen Sprachwechsel — einer zu viel für die zweite Regel.

Eigennamen bleiben auch im Englischen stehen (Am Bach Festival, Schwing und
Stampf) — übersetzt wären sie unauffindbar.

## Sprache

Deutsch, Schweizer Rechtschreibung (**ss statt ß**). Das gilt für Inhalt,
Kommentare im Code, Dateinamen und Commit-Nachrichten. Bezeichner im Code sind
ebenfalls deutsch (`abschnitt`, `ebene`, `zeiger`) — konsequent bleiben.

Der Ton der Texte: direkt, keine Werbesprache. Lieber ein Fehler zugeben als
eine Fähigkeit behaupten.

**Die erste Person ist gewollt.** Der Auftraggeber schreibt so, wie er redet:
zuerst der Antrieb, dann die Sache. «Ich baue Geräte aus Leidenschaft, aber vor
allem, weil sie nützlich sind.» Nicht in unpersönliche Grundsätze umschreiben —
eine Zwischenfassung tat das («Wer damit arbeitet, baut anders als wer sie
verkauft») und wurde als kühl verworfen.

Was trotzdem gilt: **kein Leistungsausweis.** Der Unterschied liegt zwischen
«ich mache das, weil …» und «ich kann das besser als …». Das erste ist der Ton,
das zweite war der Fehler einer früheren Fassung («Deshalb weiss ich, was um
vier Uhr wirklich passiert»).

Katalogwörter wie «High End», «Premium» oder «professionell» kommen nicht vor.
Die Qualität belegt die Datenliste auf der Ebene — Mogami, Neutrik, jede Ader
durchgemessen. Das überzeugt vom Fach mehr als ein Adjektiv.

**Grundsatz statt Aufzählung.** Konkrete Beispiele gehören auf die Ebene, nicht
aufs Plakat. Eine Zwischenfassung listete oben Geräte und Orte auf — Hydrophon,
Kontaktmikro, Stereopaar, «zehn nach sechs». Das war zu kleinteilig. Auf dem
Plakat steht je Abschnitt, worum es geht und warum; konkret bleibt nur, was die
Kategorie benennt («Recording-Rigs für DJ-Booths und Festivals, Kabel nach
Mass»). Die Belege stehen unten.

**«die Booth», nicht «der Booth».** In Zusammensetzungen entscheidet das zweite
Wort: «der Booth-Recorder», «am Booth-Ausgang» sind richtig.

### Das Plakat bietet nichts an

Der wichtigste Ton-Entscheid, und der, der am leichtesten zurückrutscht.

Eine Fassung hatte in drei von fünf Abschnitten ein Angebot an «dich» —
«Custom Audio-Kabel für die Profis unter uns», «DJ-Set mastern? Da kann ich
dir helfen», «Sag mir den Ort» — und am Fuss der beiden Ebenen je einen Knopf,
der als Mail mit vorbereitetem Betreff aufging: «Bau mir eins», «Aufnahme
bestellen». Zusammen war das ein Bestellformular.

Das Problem ist nicht der Verkauf an sich, sondern die Lücke: Wer vom Aufkleber
kommt, erwartet «hier war jemand» und findet eine Preisliste ohne Preise. Diese
Lücke liest sich als Masche — und zwar besonders bei Leuten vom Fach, also
genau beim Publikum dieser Seite.

Kommerziell macht eine Seite nicht ihr Aufbau, sondern **Angebot,
Handlungsaufforderung und Nutzen-für-dich.** Fünf Vollbilder mit je einem Satz
sind eine Plakatform, keine Verkaufsform.

Was jetzt gilt:

- **Kein Angebot, keine Aufforderung, kein Nutzenversprechen auf dem Plakat.**
  Aussagen in der ersten Person, sonst nichts. Auch keine Frage an den Leser
  («Du brauchst …?»).
- **Kein «dein».** «ob die Geschichte trägt», nicht «ob deine Geschichte trägt».
- **Keine Bestellknöpfe auf den Ebenen.** Die Adresse steht im Fuss der Seite,
  das genügt. Wer das Kabelblatt gelesen hat, findet sie.
- Die Ebenen selbst bleiben, wie sie sind. Dort steht das Konkrete, und dort
  darf eine Datenzeile auch sagen, dass es etwas zu haben gibt.

Der Gedanke dahinter steht schon oben: Aufträge entstehen als Nebenwirkung,
nicht als Ziel. Überzeugend ist die Datenliste — Mogami, Neutrik, jede Ader
durchgemessen, vier Grad unter null —, nicht der Knopf darunter.

**Und gegen «verspielter, chaotischer»:** gewollte Unordnung ist auch nur ein
Stil, und zwar der von jeder zweiten Agenturseite. Die Kraft dieser Seite ist
Präzision. Merkwürdiger Inhalt in strenger Form überzeugt weit mehr als
chaotische Form mit Verkaufsinhalt.

### Der Ton ist zweimal umgeschlagen

Die Texte sind mehrfach in die eine und wieder in die andere Richtung
geschrieben worden. Damit das nicht ein drittes Mal im Kreis läuft, hier beide
verworfenen Enden:

- **Zu viel «ich».** Eine Fassung stand in sieben von fünf Sätzen in «ich» und
  «mein» und las sich angeberisch — «ich weiss, was um vier Uhr wirklich
  passiert». Verworfen.
- **Gar kein «ich».** Die Gegenfassung schrieb dieselben Sätze unpersönlich —
  «Wer selber in der Booth steht, baut sie anders», «Wer damit arbeitet, baut
  anders als wer sie verkauft». Als kühl verworfen.

Was blieb, liegt dazwischen — siehe die zwei Absätze oben.

## Stand und was offen ist

Gebaut, Build läuft, sechs Seiten (`/`, `/rig`, `/aufnahmen` und dieselben
unter `/en`), kein externer Abruf.

- [x] Netlify verbunden, Domain `soundmatters.audio` aufgeschaltet
- [x] Fotos vom Peli-Case und von den Kabeln sind drin
- [ ] **Eigene Fotos** statt der Platzhalter in den fünf Abschnitten —
      mit Abstand der grösste Hebel
- [ ] Echte Links zu SoundCloud und Instagram in `src/data/inhalt.ts`
      (aktuell `https://soundcloud.com` als Platzhalter)
- [ ] Bild fürs Teilen (Open Graph), 1200 × 630
- [ ] Aufkleber drucken: drei Fassungen, je zweifarbig, rund 80 mm, matt —
      Farben und Fassungen stehen in `FARBEN.md`


### Fotos zu einem Stück hinzufügen

Jedes Stück in `stuecke` nimmt eine Liste `bilder`, je Bild eine Datei und
eine Zeile darunter. Beide Sprachen eintragen, sonst fehlt die Zeile auf
der englischen Seite.

```ts
bilder: [
  { datei: '/fotos/kabel-mid-side.jpg', text: 'Fünfpolig für Mid/Side, auf Länge konfektioniert' },
],
```

Zwei Dinge sind dabei wichtig:

**Format 4:3, quer.** Die Bilder werden im Raster auf 4:3 beschnitten
(`object-fit: cover`). Ein Hochformat verliert dabei oben und unten je
rund ein Viertel — das ist kein Fehler, sondern hält die Reihe gerade.
Wer den Ausschnitt selber bestimmen will, schneidet die Datei vorher auf
1200 × 900 zu. Das Skript dafür liegt nicht im Repo; es beschneidet mit
einem von Hand gesetzten Fokuswert, weil kein Algorithmus weiss, wo das
Kabel liegt.

**Auf der Ebene selbst: Gruppen.** Neben den Stücken kann eine Ebene
`bildgruppen` tragen — mehrere Bilder, EINE Zeile darunter:

```ts
bildgruppen: [
  { dateien: ['/fotos/ort-gletscherbach.jpg', '/fotos/ort-gletscher.jpg'],
    text: 'Aufnahmen für Forschung, Dokumentarfilm und Sound Libraries' },
],
```

Der Unterschied ist nicht die Form, sondern was die Zeile sagt. Bei den
Stücken beschreibt sie das Bauteil. Bei den Gruppen beschreibt sie **die
Arbeit, nicht das Bild**: «Stereopaar über dem Gletscherbach» sagt einem
Auftraggeber nichts, «Aufnahmen für Forschung, Dokumentarfilm und Sound
Libraries» sagt ihm alles. Darum teilen sich zwei Bilder derselben Sache
eine Aussage.

**Menge.** Ab etwa fünf Bildern wird die Reihe unruhig. Dann lieber ein
eigenes Stück je Bauform anlegen als die Reihe verlängern. Eine dritte
Ebene bleibt trotzdem verboten.

Kontakt ist gesetzt: `maurizio@mauriziozulli.com`, mit eigenem Betreff je
Abschnitt, damit in der Mail steht, woher die Anfrage kam.
