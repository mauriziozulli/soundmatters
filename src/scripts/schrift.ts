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

    /* Bei 100px messen — Breite *und* Höhe. Die Höhe muss gemessen und darf
       nicht aus dem Schriftgrad geschätzt werden: Zeilenhöhe, Polster und
       Balken zählen mit. Wird stattdessen der Grad gedeckelt, sprengt ein
       Schriftbild mit hoher Zeilenhöhe den Abschnitt trotz Deckel. */
    const gemessen = zeilen.map((zeile) => {
      /* Zum Messen kurz auf inline-block: ein Block-Element ist immer so breit
         wie sein Elter, die Schrift darin aber nicht. */
      zeile.style.display = 'inline-block';
      zeile.style.fontSize = '100px';
      const k = zeile.getBoundingClientRect();
      zeile.style.display = '';
      return { zeile, breite: k.width, hoehe: k.height };
    });
    if (gemessen.some((m) => !m.breite)) return;

    /* Höhendeckel gilt für den Satz als Ganzes, nicht je Zeile. */
    const hoeheBei100 = gemessen.reduce((s, m) => s + m.hoehe, 0);
    const deckel = (100 * mitte.clientHeight * 0.62) / hoeheBei100;

    gemessen.forEach(({ zeile, breite }) => {
      const nachBreite = (100 * platz) / breite * passung;
      zeile.style.fontSize = Math.min(nachBreite, deckel).toFixed(2) + 'px';
    });
  });
}
