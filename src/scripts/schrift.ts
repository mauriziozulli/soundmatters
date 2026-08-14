/**
 * Überschriften auf die volle Breite rechnen.
 *
 * Jede Zeile wird einzeln skaliert, bis sie die Spalte füllt — dadurch bekommt
 * jede Zeile ihre eigene Grösse, und genau das macht den Plakat-Eindruck.
 * Zusätzlich wird auf die Höhe des Mittelteils gedeckelt, damit nichts oben
 * oder unten abgeschnitten wird.
 *
 * Warum `passung`: Kontur, Sperrung und negative Laufweite ragen über die
 * gemessene Textbreite hinaus. Jedes Schriftbild braucht darum seinen eigenen
 * Sicherheitsabstand, sonst läuft die Zeile rechts an.
 */

export function schriftPassen() {
  document.querySelectorAll<HTMLElement>('.wort').forEach((wort) => {
    const mitte = wort.closest<HTMLElement>('.abschnitt__mitte');
    if (!mitte) return;

    /* Nur sichtbare Zeilen zählen — je nach Fensterbreite ist eine andere
       Fassung derselben Überschrift eingeblendet. */
    const zeilen = [...wort.querySelectorAll<HTMLElement>('.zeile')].filter(
      (z) => getComputedStyle(z).display !== 'none'
    );
    const platz = wort.clientWidth;
    if (!platz || !zeilen.length) return;

    const passung = parseFloat(wort.dataset.passung ?? '') || 0.98;
    const deckel = mitte.clientHeight * (zeilen.length === 1 ? 0.62 : 0.4);

    zeilen.forEach((zeile) => {
      /* Zum Messen kurz auf inline-block: ein Block-Element ist immer so breit
         wie sein Elter, die Schrift darin aber nicht. */
      zeile.style.display = 'inline-block';
      zeile.style.fontSize = '100px';
      const breite = zeile.getBoundingClientRect().width;
      zeile.style.display = '';
      if (!breite) return;
      zeile.style.fontSize = Math.min((100 * platz) / breite * passung, deckel).toFixed(2) + 'px';
    });
  });
}
