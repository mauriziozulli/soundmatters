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
  /* 00 Knochen auf Tinte — warmes Grau, damit die Kontur trägt */
  intro: { eingriff: 'zugX',    staerke: 18, schatten: [16, 16, 20], licht: [74, 69, 60],  kontrast: 1.28, breite: 460 },
  /* 01 Ocker auf Russ — abgedunkelter Ocker */
  film:  { eingriff: 'zugY',    staerke: 16, schatten: [26, 23, 18], licht: [107, 78, 24], kontrast: 1.3,  breite: 460 },
  /* 02 Staubblau auf Schiefer — abgedunkeltes Staubblau */
  gear:  { eingriff: 'raster',  staerke: 16, schatten: [27, 34, 38], licht: [58, 84, 96],  kontrast: 1.35, breite: 420 },
  /* 03 Rost auf Tiefbraun — tiefes Kupfer */
  club:  { eingriff: 'versatz', staerke: 16, schatten: [30, 19, 16], licht: [92, 42, 24],  kontrast: 1.24, breite: 460 },
  /* 04 Verdigris auf Tiefgrün — abgedunkeltes Verdigris */
  ice:   { eingriff: 'zugX',    staerke: 18, schatten: [9, 22, 19],  licht: [22, 56, 48],  kontrast: 1.3,  breite: 460 }
};
