/**
 * Der grüne Zeiger: ein Punkt, der sofort folgt, und ein Ring, der weich
 * hinterherläuft. Beide verrechnen sich per mix-blend-mode mit dem Bild
 * darunter — dadurch sind sie auf hellen wie auf dunklen Stellen sichtbar,
 * ohne aufgeklebt zu wirken. Auf Touch-Geräten gar nicht erst aufgebaut.
 */

export function zeigerAufbauen() {
  const fein = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const ruhig = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const punkt = document.querySelector<HTMLElement>('.zeiger--punkt');
  const ring = document.querySelector<HTMLElement>('.zeiger--ring');
  if (!punkt || !ring) return;

  if (!fein) {
    punkt.style.display = 'none';
    ring.style.display = 'none';
    return;
  }

  let mx = innerWidth / 2;
  let my = innerHeight / 2;
  let rx = mx;
  let ry = my;

  addEventListener(
    'pointermove',
    (e) => {
      mx = e.clientX;
      my = e.clientY;
      punkt.style.transform = `translate(${mx - 11}px, ${my - 11}px)`;
      if (ruhig) ring.style.transform = `translate(${mx - 28}px, ${my - 28}px)`;
    },
    { passive: true }
  );

  if (ruhig) return;

  (function folgen() {
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    ring.style.transform = `translate(${rx - 28}px, ${ry - 28}px)`;
    requestAnimationFrame(folgen);
  })();
}
