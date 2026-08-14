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

export const BEHANDLUNG: Record<string, Behandlung> = {
  intro: { eingriff: 'zugX',    staerke: 18, schatten: [24, 10, 46], licht: [255, 95, 176],  kontrast: 1.25, breite: 460 },
  film:  { eingriff: 'zugY',    staerke: 16, schatten: [6, 32, 43],  licht: [255, 183, 77],  kontrast: 1.3,  breite: 460 },
  gear:  { eingriff: 'raster',  staerke: 16, schatten: [4, 26, 46],  licht: [111, 233, 255], kontrast: 1.35, breite: 420 },
  club:  { eingriff: 'versatz', staerke: 16, schatten: [32, 6, 24],  licht: [255, 162, 79],  kontrast: 1.2,  breite: 460 },
  ice:   { eingriff: 'zugX',    staerke: 18, schatten: [5, 32, 46],  licht: [190, 239, 255], kontrast: 1.22, breite: 460 }
};
