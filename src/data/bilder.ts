/**
 * Wie aus einem Foto eine Fläche wird.
 *
 * Jedes Bild bekommt einen Eingriff (Zug, Raster, Versatz) und danach einen
 * Zweiklang: die Helligkeit wird auf zwei Farbpole abgebildet. Dadurch wird
 * das Foto Textur statt Motiv — und der Kontrast zur Schrift ist gesetzt,
 * statt vom Motiv abzuhängen. Die Farbwahl ist in FARBEN.md begründet.
 *
 * Beim Austausch gegen ein echtes Foto reicht es, die Datei unter
 * public/fotos/ zu ersetzen. Nur wenn das neue Bild deutlich heller oder
 * dunkler ist, muss `kontrast` nachgezogen werden.
 */

export type Eingriff = 'zugX' | 'zugY' | 'raster' | 'versatz';

export type Behandlung = {
  eingriff: Eingriff;
  /** Stärke des Eingriffs: Pixel beim Zug, Blockgrösse beim Raster */
  staerke: number;
  /** dunkler Pol des Zweiklangs */
  schatten: [number, number, number];
  /** heller Pol */
  licht: [number, number, number];
  kontrast: number;
  /** Auflösung, in der gerechnet wird — bewusst klein, CSS zieht hoch */
  breite: number;
};

/**
 * Der helle Pol ist bewusst eine *gedämpfte, dunklere Verwandte* der
 * Leitfarbe des Abschnitts — nie die Leitfarbe selbst. Sonst stünde die
 * Schrift in ihrer eigenen Farbe auf einer Fläche derselben Farbe, und
 * genau das verbietet die Kontrastregel (nie Ton auf Ton).
 *
 * Ergebnis: das Foto bleibt eine dunkle Textur im Farbklima des
 * Abschnitts, rein leuchtet die Leitfarbe nur in der Schrift.
 */
export const BEHANDLUNG: Record<string, Behandlung> = {
  /* 00 Zinnober auf Schwarz — Rost als dunkle Verwandte */
  intro: { eingriff: 'zugX',    staerke: 18, schatten: [8, 8, 12],   licht: [122, 36, 24],  kontrast: 1.28, breite: 460 },
  /* 01 Bernstein auf Tiefblau — dunkler Ocker */
  film:  { eingriff: 'zugY',    staerke: 16, schatten: [10, 26, 51], licht: [92, 74, 30],   kontrast: 1.3,  breite: 460 },
  /* 02 Stahlblau auf Beton — abgedunkeltes Stahl */
  gear:  { eingriff: 'raster',  staerke: 16, schatten: [36, 39, 45], licht: [62, 90, 112],  kontrast: 1.35, breite: 420 },
  /* 03 Magenta auf Nachtviolett — Pflaume */
  club:  { eingriff: 'versatz', staerke: 16, schatten: [26, 10, 46], licht: [74, 22, 56],   kontrast: 1.24, breite: 460 },
  /* 04 Eisweiss auf Petrol — dunkles Teal, damit die Kontur stehen bleibt */
  ice:   { eingriff: 'zugX',    staerke: 18, schatten: [6, 51, 61],  licht: [62, 110, 126], kontrast: 1.22, breite: 460 }
};
