/**
 * Die Detail-Ebene.
 *
 * Ein Klick legt sie über das Plakat und schreibt die Adresse mit (/rig,
 * /aufnahmen). Damit ist sie verschickbar, die Zurück-Taste schliesst sie,
 * und wer die Adresse direkt öffnet, landet sofort dort — dafür gibt es zu
 * jeder Ebene eine echte, vorgebaute Seite.
 *
 * Ohne JavaScript bleiben es normale Links auf diese Seiten. Es geht also
 * nichts verloren, es lädt dann nur neu statt zu überblenden.
 */

const ebenen = new Map<string, HTMLElement>();
let zuletztFokus: HTMLElement | null = null;
let selbstGeschoben = false;

function pfadZuSchluessel(pfad: string) {
  return pfad.replace(/\/+$/, '').split('/').pop() ?? '';
}

function oeffnen(schluessel: string, schieben: boolean) {
  const ebene = ebenen.get(schluessel);
  if (!ebene) return;

  ebenen.forEach((e) => (e.dataset.offen = 'false'));
  zuletztFokus = document.activeElement as HTMLElement;
  ebene.dataset.offen = 'true';
  ebene.scrollTop = 0;
  document.body.style.overflow = 'hidden';

  if (schieben && pfadZuSchluessel(location.pathname) !== schluessel) {
    history.pushState({ ebene: schluessel }, '', `/${schluessel}`);
    selbstGeschoben = true;
  }
  ebene.querySelector<HTMLButtonElement>('.ebene__zu')?.focus();
}

function schliessen(ueberVerlauf: boolean) {
  const offen = [...ebenen.values()].some((e) => e.dataset.offen === 'true');
  if (!offen) return;

  ebenen.forEach((e) => (e.dataset.offen = 'false'));
  document.body.style.overflow = '';
  zuletztFokus?.focus();

  if (!ueberVerlauf) {
    /* Zurückgehen statt Adresse überschreiben — sonst sammelt sich Verlauf an
       und die Zurück-Taste führt durch lauter offene und geschlossene Ebenen. */
    if (selbstGeschoben) {
      selbstGeschoben = false;
      history.back();
    } else {
      history.pushState(null, '', '/');
    }
  }
}

function abgleichen() {
  const schluessel = pfadZuSchluessel(location.pathname);
  if (ebenen.has(schluessel)) oeffnen(schluessel, false);
  else schliessen(true);
}

export function ebenenAufbauen() {
  document.querySelectorAll<HTMLElement>('.ebene').forEach((e) => {
    const schluessel = e.dataset.ebene;
    if (schluessel) ebenen.set(schluessel, e);
  });
  if (!ebenen.size) return;

  /* Klicks auf Links, zu denen es eine Ebene gibt, fangen wir ab. */
  document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]').forEach((a) => {
    const schluessel = pfadZuSchluessel(a.getAttribute('href') ?? '');
    if (!ebenen.has(schluessel)) return;
    a.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // neuer Tab bleibt neuer Tab
      e.preventDefault();
      oeffnen(schluessel, true);
    });
  });

  document.querySelectorAll<HTMLButtonElement>('.ebene__zu').forEach((b) =>
    b.addEventListener('click', () => schliessen(false))
  );
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape') schliessen(false);
  });
  addEventListener('popstate', abgleichen);

  abgleichen();
}
