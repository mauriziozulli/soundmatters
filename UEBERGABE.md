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

| | Abschnitt | Schriftbild | Zweiklang des Bildes |
|---|---|---|---|
| 00 | Sound is what matters. | Kontur schmal, ein Wort grün gefüllt | Violett → Pink |
| 01 | Sound and Picture | fett gefüllt, zwei Zeilen zweifarbig | Petrol → Orange |
| 02 | Custom Gear | Tinte auf pinken Balken | Navy → Hellblau |
| 03 | Musik | schmal, gefüllt, weit gesperrt, grün | Weinrot → Orange |
| 04 | Field Recording | fett, nur Kontur, grün | Tiefeis → Eis |

Jeder Abschnitt hat ein **eigenes Schriftbild** — das war eine ausdrückliche
Forderung, nachdem sich vorher mehrere Abschnitte dieselbe Behandlung teilten.
Nicht vereinheitlichen.

**Abschnitt 04 ist unantastbar:** Grün auf Eisblau ist die Kombination, die dem
Auftraggeber am besten gefällt. Nicht anfassen.

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

Doppelkomplementär: Grün gegen Pink, Hellblau gegen Orange. Alle vier gleich
kräftig, damit sie als Familie gelesen werden. **Kontrast läuft immer über den
Hellwert** — Tinte auf Farbe, Papier auf Dunkel, nie Signal auf Signal.
Höchstens drei Farben gleichzeitig. Grün ist der wiederkehrende Faden über
mehrere Abschnitte.

Ausführlich samt Herleitung in `FARBEN.md`. Werte stehen in
`src/styles/tokens.css` und nirgends sonst.

## Bilder

Die Fotos werden **im Browser abstrahiert**: Eingriff (Zug, Raster, Versatz),
danach ein Zweiklang aus zwei Farbpolen. Dadurch wird das Foto Textur statt
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

## Sprache

Deutsch, Schweizer Rechtschreibung (**ss statt ß**). Das gilt für Inhalt,
Kommentare im Code, Dateinamen und Commit-Nachrichten. Bezeichner im Code sind
ebenfalls deutsch (`abschnitt`, `ebene`, `zeiger`) — konsequent bleiben.

Der Ton der Texte: direkt, in der ersten Person, keine Werbesprache. Lieber ein
Fehler zugeben („Version eins stieg bei minus acht Grad aus") als eine
Fähigkeit behaupten. Das ist Absicht und macht glaubwürdig.

## Stand und was offen ist

Gebaut, Build läuft, drei Seiten (`/`, `/rig`, `/aufnahmen`), rund 428 KB
inklusive Fotos und Schriften, kein externer Abruf.

- [ ] **Eigene Fotos** statt der Platzhalter — mit Abstand der grösste Hebel
- [ ] Echte Links zu SoundCloud und Instagram in `src/data/inhalt.ts`
      (aktuell `https://soundcloud.com` als Platzhalter)
- [ ] Bild fürs Teilen (Open Graph), 1200 × 630
- [ ] Netlify verbinden, Domain `soundmatters.audio` aufschalten
- [ ] Aufkleber: drei Fassungen, je zweifarbig, siehe `FARBEN.md`

Kontakt ist gesetzt: `maurizio@mauriziozulli.com`, mit eigenem Betreff je
Abschnitt, damit in der Mail steht, woher die Anfrage kam.
