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

Fünf bildschirmfüllende Abschnitte, danach eine zweite Ebene für Vertiefungen.

| | Abschnitt | Schrift | Schriftbild | Leitfarbe |
|---|---|---|---|---|
| 00 | Sound is what matters. | Grotesk | Zeile 1 Knochen, Zeile 2 im Balken | Verdigris |
| 01 | Sound and Picture | Antiqua | zwei Zeilen, zweite kursiv | Ocker |
| 02 | Custom Gear | Grotesk | beide Zeilen im Balken | Ocker |
| 03 | Musik | Grotesk | flächig gefüllt | Verdigris |
| 04 | Field Recording | Antiqua | nur Kontur | Knochen |

**Die Seite spricht die Sprache des Aufklebers.** Fette Grotesk als
Leitschrift, der Balken mit harter Kontur als Motiv, die Mono für alles Kleine
— genau wie die Adresse unter dem Wortlaut des Klebers. Abschnitt 00 ist der
Kleber, aufgezogen auf Bildschirmgrösse.

Zwischenzeitlich hatte jeder Abschnitt eine **eigene Schriftfamilie** (fünf
Stück) und **keine Farbe kam zweimal vor**. Beides ist bewusst zurückgenommen:
Der Kleber spricht eine Sprache, fünf Schriften sprechen fünf. Jetzt tragen
eine Leitschrift und eine Gegenstimme die Seite, und Ocker und Verdigris
führen — sie dürfen sich wiederholen, weil sie die gedruckten Fassungen sind.
Rost und Staubblau sind nur noch im Farbklima der Fotos vorhanden.

Unterschieden werden die Abschnitte über **Farbe, Balken und Kontur**, nicht
über die Schriftfamilie. Nicht wieder auseinanderziehen.

## Die zwei Regeln

1. **Höchstens zwei Ebenen.** Plakat → Detail. Nie tiefer. Sobald man innerhalb
   einer Ebene weiternavigiert, ist ein Menü entstanden — und Menüs waren
   ausdrücklich unerwünscht.
2. **Pro Ebene ein Ausgang und höchstens eine Weiterführung.** Oben
   „Schliessen", unten eine Handlung. Keine Reiter, keine Unterpunkte.

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

Die Fotos werden **im Browser abstrahiert**: Eingriff (Zug, Raster, Versatz),
danach ein Zweiklang aus zwei Farbpolen. Der helle Pol ist eine gedämpfte,
dunklere Verwandte der Leitfarbe — nie die Leitfarbe selbst, sonst stünde die
Schrift auf einer Fläche ihrer eigenen Farbe. Dadurch wird das Foto Textur statt
Motiv, und der Kontrast zur Schrift ist gesetzt statt vom Motiv abhängig.
Gerechnet wird in ~460 px Breite, CSS zieht hoch — schnell genug fürs Handy.

Die fünf Bilder unter `public/fotos/` sind **Platzhalter** (CC0, Herkunft in
`QUELLEN.md`). Zum Austauschen genügt es, die Datei gleichnamig zu ersetzen.
Nur bei deutlich hellerem Bild `kontrast` in `src/data/bilder.ts` nachziehen.

## Fallen, die schon einmal zugeschlagen haben

- **Prozent-Polster auf runden oder quadratischen Elementen** beziehen sich auf
  die Breite des *Elters*, nicht des Elements. Hat Elemente von 250 auf 336 px
  aufgeblasen.
- **Raster-Kinder haben `min-width: auto`** und können das Raster aufziehen.
  `.abschnitt__mitte` hat darum `min-width: 0` und `overflow: hidden` als
  Sicherheitsnetz — nicht entfernen.
- **Breite messen:** ein Block-Element ist immer so breit wie sein Elter. Zum
  Messen der Textbreite kurz auf `inline-block` schalten (`schrift.ts`).
- **Jedes Schriftbild braucht seinen eigenen Sicherheitsabstand** (`passung` in
  `inhalt.ts`): Kontur, Sperrung und negative Laufweite ragen über die gemessene
  Textbreite hinaus. Balken brauchen am meisten (0.82), Kontur am wenigsten.
- **Deutsche Versalien brauchen Zeilenhöhe.** Bei zu engem Wert stossen Umlaute
  in die Zeile darüber.
- **Nach `document.fonts.ready` neu rechnen** — die Ersatzschrift ist schmaler
  als die geladene.
- **Balken brauchen ungleiches Polster oben und unten.** Versalien stehen auf
  der Grundlinie, der Raum für Unterlängen darunter bleibt leer — bei gleichem
  Polster sitzt die Schrift sichtbar daneben. Die Werte in `.balken` sind
  ausgemessen; wer die Zeilenhöhe ändert, muss sie neu messen. Dasselbe gilt
  für den Aufkleber.
- **Der Höhendeckel muss die gemessene Höhe deckeln, nicht den Schriftgrad.**
  Zeilenhöhe, Polster und Balken zählen mit: ein Schriftbild mit Zeilenhöhe
  über 1 sprengt sonst den Abschnitt, obwohl ein Deckel gesetzt ist. `schrift.ts`
  misst darum bei 100px Breite *und* Höhe.

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

**Menge.** Ab etwa fünf Bildern wird die Reihe unruhig. Dann lieber ein
eigenes Stück je Bauform anlegen als die Reihe verlängern. Eine dritte
Ebene bleibt trotzdem verboten.

Kontakt ist gesetzt: `maurizio@mauriziozulli.com`, mit eigenem Betreff je
Abschnitt, damit in der Mail steht, woher die Anfrage kam.
