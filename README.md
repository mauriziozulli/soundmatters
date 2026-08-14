# soundmatters.ch

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
    inhalt.ts      ALLE Texte, Links, Reihenfolge — hier änderst du
    bilder.ts      wie aus jedem Foto eine Fläche wird
  styles/
    tokens.css     Farben und Schriften, einzige Quelle
    global.css     Layout, die fünf Schriftbilder, die Detail-Ebene
  components/
    Abschnitt.astro   ein bildschirmfüllender Abschnitt
    Ebene.astro       eine Detail-Ebene
    Seite.astro       alles zusammen
  scripts/
    flaeche.ts     Foto → Fläche (Zug, Raster, Versatz, Zweiklang)
    schrift.ts     Überschriften auf volle Breite rechnen
    ebene.ts       Ebene öffnen/schliessen samt Adresse
    zeiger.ts      der grüne Mauszeiger
  pages/
    index.astro       /
    [ebene].astro     /rig, /aufnahmen
public/
  fotos/         die fünf Hintergrundbilder (Platzhalter, siehe QUELLEN.md)
  schriften/     Poster (Bebas Neue) und Heavy (Archivo Black)
```

## Die zwei Regeln, die das Ding zusammenhalten

1. **Höchstens zwei Ebenen.** Plakat → Detail. Nie tiefer. Sobald man
   innerhalb einer Ebene weiternavigiert, ist es ein Menü geworden.
2. **Pro Ebene ein Ausgang und höchstens eine Weiterführung.** Oben
   „Schliessen", unten eine Handlung. Keine Reiter, keine Unterpunkte.

Dazu die Pfeil-Konvention: **↗ führt von der Seite weg, → öffnet die Ebene
darüber.** So weiss man vorher, ob man soundmatters.ch verlässt.

## Wie die Detail-Ebenen funktionieren

Ein Klick legt die Ebene über das Plakat und schreibt die Adresse mit
(`/rig`). Damit ist sie verschickbar, die Zurück-Taste schliesst sie, und wer
die Adresse direkt öffnet, landet sofort dort — dafür ist zu jeder Ebene eine
echte Seite vorgebaut. Ohne JavaScript bleiben es normale Links: es lädt dann
neu statt zu überblenden, aber nichts geht verloren.

## Was noch offen ist

- [ ] **Eigene Fotos** statt der Platzhalter — grösster Hebel. Querformat,
      eher dunkel; je unschärfer das Motiv, desto besser trägt die Schrift.
      Datei unter `public/fotos/` gleichnamig ersetzen, fertig. Nur bei
      deutlich hellerem Bild `kontrast` in `src/data/bilder.ts` nachziehen.
- [ ] Echte Mailadresse und Links in `src/data/inhalt.ts` (`mailto:` steht
      noch leer, ebenso SoundCloud)
- [ ] Foto fürs Teilen (Open Graph), 1200×630
- [ ] Aufkleber drucken: drei Fassungen, je zweifarbig, siehe `FARBEN.md`

Farbentscheide stehen in [`FARBEN.md`](./FARBEN.md), Bildherkunft in
[`QUELLEN.md`](./QUELLEN.md).
