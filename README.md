# soundmatters.audio

Vier Welten, in denen Ton eine Rolle spielt — und eine Person, die in allen
vieren steckt. Kein Portfolio: die Seite zeigt eine Haltung, die Aufträge
entstehen nebenbei.

Bewusst das Gegenteil von [mauriziozulli.com](https://mauriziozulli.com). Die
ist ruhig und für Auftraggeber. Diese hier ist laut und für die Szene.

## Stack

- **Astro**, statisch vorgebaut — Netlify liefert nur fertiges HTML aus
- **Netlify**, Build `npm run build`, Publish `dist`, Node 22 (siehe `netlify.toml`)
- **Kein CMS.** Der ganze Inhalt steht in `src/data/inhalt.ts`. Bei fünf
  Bildschirmen kostet ein Schema mehr Zeit, als es spart. Sanity kommt dazu,
  wenn es einen Grund gibt (wachsende Aufnahmen-Liste, Posten vom Handy) —
  dann als eigenes Dataset im bestehenden Sanity-Projekt: ein Login, zwei
  Seiten, getrennte Inhalte.
- Keine externen Abrufe. Schriften und Fotos liegen lokal.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build
```

## Aufbau

```
src/
  data/
    inhalt.ts      ALLE Texte, Links, Farben, Reihenfolge, beide Sprachen —
                   hier änderst du
  styles/
    tokens.css     Farben und Schriften, einzige Quelle
    global.css     Layout, der Balken, die Spur, die Detail-Ebene
  components/
    Abschnitt.astro   ein bildschirmfüllender Abschnitt
    Balken.astro      der Balken mit dem ausgestanzten Wort
    Spur.astro        Timecode und Pegel am unteren Rand
    Ebene.astro       eine Detail-Ebene
    Seite.astro       alles zusammen
  scripts/
    spuren.ts      was in den Balken läuft — fünf Spuren, eine je Thema
    ebene.ts       Ebene öffnen/schliessen samt Adresse
    zeiger.ts      der Mauszeiger
  pages/
    index.astro       /
    [ebene].astro     /rig, /aufnahmen
    en/index.astro    /en
    en/[ebene].astro  /en/rig, /en/recordings
public/
  fotos/         eigene Fotos für die Stücke auf den Ebenen, 4:3 quer
  schriften/     Fett (Archivo Black) und Mono (Space Mono)
```

## Der Balken

Das Motiv kommt vom gedruckten Aufkleber: ein Wort, aus einer Farbfläche
ausgespart. Auf der Seite ist die Fläche ein Canvas, und darin läuft eine
**Spur, die zum Thema des Abschnitts gehört** — ein Pegel, ein Filmstreifen
mit Tonspur, ein verdrilltes Kabel, ein Spektrum mit Kick, ein
Spektrogramm. Der Rahmen bleibt überall gleich, der Inhalt wechselt.

Aufbau in drei Lagen: der Balken trägt die Wortfarbe als Fläche, das Canvas
malt die Balkenfarbe und die Spur hinein, das Wort wird ausgestanzt. Was
durch die Buchstaben scheint, ist die Fläche — genau wie im Zweifarbendruck.

Ohne Bewegung (Systemeinstellung) stehen alle Spuren still und zeigen
trotzdem ihr Bild. Nichts hängt an der Animation.

## Die zwei Regeln, die das Ding zusammenhalten

1. **Höchstens zwei Ebenen.** Plakat → Detail. Nie tiefer. Sobald man
   innerhalb einer Ebene weiternavigiert, ist es ein Menü geworden.
2. **Pro Ebene ein Ausgang und höchstens eine Weiterführung.** Oben
   „Schliessen", unten eine Handlung. Keine Reiter, keine Unterpunkte.

Dazu die Pfeil-Konvention: **↗ führt von der Seite weg, → öffnet die Ebene
darüber.** So weiss man vorher, ob man soundmatters.audio verlässt.

## Wie die Detail-Ebenen funktionieren

Ein Klick legt die Ebene über das Plakat und schreibt die Adresse mit
(`/rig`). Damit ist sie verschickbar, die Zurück-Taste schliesst sie, und wer
die Adresse direkt öffnet, landet sofort dort — dafür ist zu jeder Ebene eine
echte Seite vorgebaut. Ohne JavaScript bleiben es normale Links: es lädt dann
neu statt zu überblenden, aber nichts geht verloren.

## Zwei Adressen, eine Person

mauriziozulli.com ist, wo er gebucht wird: Credits, Auszeichnungen,
Filmografie. Diese Seite hier ist, warum es sich lohnt: Rigs, Musik,
Feldaufnahmen. Für eine Suchmaschine sind das trotzdem erst mal zwei
fremde Adressen — und bis vor Kurzem stand hier nirgends, wer die Seite
macht: im Titel «Sound Matters», in den strukturierten Daten nichts.

Beide Seiten tragen darum jetzt dieselbe Person-Auszeichnung, und jede
nennt die andere in `sameAs`. Das ist der Mechanismus, den schema.org
dafür vorsieht: nicht «diese Seiten ähneln sich», sondern «dieselbe
Person, andere Adresse». Die Liste steht in `src/data/person.ts` und
**muss mit der auf mauriziozulli.com übereinstimmen** (dort in
`src/layouts/Layout.astro`). Zwei Einträge, die sich widersprechen, sind
schlechter als einer.

Im Titel steht seither auch sein Name. Wer nach «Maurizio Zulli» sucht,
soll in erster Linie das Portfolio finden — diese Seite rankt für andere
Fragen (Recording Rig, Field Recording, Custom Gear), und beide dürfen
nebeneinander stehen, sobald die Suchmaschine weiss, dass eine Person
dahintersteht.

## Was noch offen ist

- [ ] **Fotos hinter die Balken**, falls die Abschnitte Bilder bekommen
      sollen: als Grund, nicht als Ersatz. Dann trägt das Bild die Fläche
      und der Pegel die Schrift. Noch nicht gebaut.
- [x] Mailadresse gesetzt: `maurizio@mauriziozulli.com`, mit eigenem Betreff
      je Abschnitt — so ist in der Mail sofort sichtbar, woher die Anfrage kam
- [ ] Echte Links zu SoundCloud und Instagram in `src/data/inhalt.ts`
- [ ] Foto fürs Teilen (Open Graph), 1200×630
- [ ] Aufkleber drucken: drei Fassungen, je zweifarbig, siehe `FARBEN.md`

Farbentscheide stehen in [`FARBEN.md`](./FARBEN.md), Bildherkunft in
[`QUELLEN.md`](./QUELLEN.md).
