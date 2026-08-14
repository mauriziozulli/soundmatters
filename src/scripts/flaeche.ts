/**
 * Aus einem Foto eine Fläche machen.
 *
 * Ablauf pro Abschnitt: Foto formatfüllend auf eine kleine Zeichenfläche,
 * darauf der Eingriff (Zug, Raster, Versatz), zuletzt der Zweiklang.
 * Gerechnet wird bewusst in ~460 px Breite und per CSS hochgezogen — das ist
 * schnell genug fürs Handy und der Eingriff verträgt es ohnehin.
 */

import { BEHANDLUNG, type Behandlung } from '../data/bilder';

const geladen = new Map<string, HTMLImageElement>();

function laden(pfad: string): Promise<HTMLImageElement | null> {
  return new Promise((fertig) => {
    const bild = new Image();
    bild.onload = () => fertig(bild);
    bild.onerror = () => fertig(null);
    bild.src = pfad;
  });
}

/** wie object-fit: cover, nur von Hand */
function fuellend(ctx: CanvasRenderingContext2D, bild: HTMLImageElement, b: number, h: number) {
  const faktor = Math.max(b / bild.naturalWidth, h / bild.naturalHeight);
  const zb = bild.naturalWidth * faktor;
  const zh = bild.naturalHeight * faktor;
  ctx.drawImage(bild, (b - zb) / 2, (h - zh) / 2, zb, zh);
}

/**
 * Zweiklang: Helligkeit auf zwei Farbpole abbilden. Das ist der Schritt, der
 * aus einem beliebigen Foto eine Fläche der Marke macht — und der dafür
 * sorgt, dass der Kontrast zur Schrift nicht vom Motiv abhängt.
 */
function zweiklang(ctx: CanvasRenderingContext2D, b: number, h: number, k: Behandlung) {
  const daten = ctx.getImageData(0, 0, b, h);
  const p = daten.data;
  const [sr, sg, sb] = k.schatten;
  const [lr, lg, lb] = k.licht;
  for (let i = 0; i < p.length; i += 4) {
    let hell = (p[i] * 0.299 + p[i + 1] * 0.587 + p[i + 2] * 0.114) / 255;
    hell = (hell - 0.5) * k.kontrast + 0.5;
    hell = hell < 0 ? 0 : hell > 1 ? 1 : hell;
    p[i] = sr + (lr - sr) * hell;
    p[i + 1] = sg + (lg - sg) * hell;
    p[i + 2] = sb + (lb - sb) * hell;
  }
  ctx.putImageData(daten, 0, 0);
}

function zeichnen(flaeche: HTMLCanvasElement) {
  const name = flaeche.dataset.bild;
  if (!name) return;
  const k = BEHANDLUNG[name];
  const bild = geladen.get(name);
  if (!k || !bild) return;

  const kasten = flaeche.getBoundingClientRect();
  if (!kasten.width || !kasten.height) return;

  const b = (flaeche.width = k.breite);
  const h = (flaeche.height = Math.max(120, Math.round(k.breite * kasten.height / kasten.width)));
  const ctx = flaeche.getContext('2d', { willReadFrequently: true });
  if (!ctx) return;

  if (k.eingriff === 'raster') {
    /* Erst winzig zeichnen, dann hart hochziehen — daraus wird das Raster. */
    const klein = document.createElement('canvas');
    klein.width = Math.max(8, Math.round((b / k.staerke) * 2));
    klein.height = Math.max(6, Math.round((h / k.staerke) * 2));
    const kctx = klein.getContext('2d');
    if (!kctx) return;
    fuellend(kctx, bild, klein.width, klein.height);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(klein, 0, 0, b, h);
  } else {
    fuellend(ctx, bild, b, h);

    if (k.eingriff === 'zugX' || k.eingriff === 'zugY') {
      /* Zug: das Bild mehrfach versetzt über sich selbst. */
      ctx.globalAlpha = 0.5;
      for (let i = 1; i <= 9; i++) {
        const weg = (i * k.staerke) / 9;
        ctx.drawImage(flaeche, k.eingriff === 'zugX' ? weg : 0, k.eingriff === 'zugY' ? weg : 0, b, h);
      }
      ctx.globalAlpha = 1;
    }

    if (k.eingriff === 'versatz') {
      /* Waagrechte Bänder gegeneinander verschoben. */
      const quelle = document.createElement('canvas');
      quelle.width = b;
      quelle.height = h;
      quelle.getContext('2d')?.drawImage(flaeche, 0, 0);
      let y = 0;
      while (y < h) {
        const band = 6 + Math.floor(Math.random() * (h / 7));
        const weg = (Math.random() - 0.5) * k.staerke * 2;
        ctx.drawImage(quelle, 0, y, b, band, weg, y, b, band);
        y += band;
      }
      /* danach ein leichter Zug, damit die Kanten nicht zu hart stehen */
      ctx.globalAlpha = 0.4;
      for (let i = 1; i <= 4; i++) ctx.drawImage(flaeche, i, 0, b, h);
      ctx.globalAlpha = 1;
    }
  }

  zweiklang(ctx, b, h, k);
}

export async function flaechenAufbauen() {
  const flaechen = [...document.querySelectorAll<HTMLCanvasElement>('.abschnitt__flaeche')];
  const namen = [...new Set(flaechen.map((f) => f.dataset.bild).filter(Boolean) as string[])];

  await Promise.all(
    namen.map(async (name) => {
      const bild = await laden(`/fotos/${name}.jpg`);
      if (bild) geladen.set(name, bild);
    })
  );

  flaechen.forEach(zeichnen);
}

export function flaechenNeuZeichnen() {
  document.querySelectorAll<HTMLCanvasElement>('.abschnitt__flaeche').forEach(zeichnen);
}
