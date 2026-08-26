/**
 * person.ts — wer hinter dieser Seite steht, in maschinenlesbarer Form.
 *
 * WARUM ES DAS GIBT
 *
 * Bis hierher stand auf soundmatters.audio nirgends, dass Maurizio Zulli
 * die Seite macht. Im Titel stand «Sound Matters», in den strukturierten
 * Daten stand gar nichts. Für eine Suchmaschine war das eine namenlose
 * Seite, die zufällig so heisst — wer nach seinem Namen suchte, fand sie
 * nicht, und dass sie zu mauriziozulli.com gehört, konnte niemand wissen.
 *
 * DIE ZWEI SEITEN, EINE PERSON
 *
 * mauriziozulli.com ist, wo er gebucht wird: Credits, Auszeichnungen,
 * Filmografie. soundmatters.audio ist, warum es sich lohnt: Rigs, Musik,
 * Feldaufnahmen. Zwei Adressen, ein Mensch.
 *
 * Damit Suchmaschinen das auch so sehen, trägt jede der beiden Seiten
 * dieselbe Person-Auszeichnung, und in `sameAs` steht jeweils die andere
 * Adresse. Das ist der Mechanismus, den schema.org dafür vorsieht: nicht
 * «diese Seiten ähneln sich», sondern «dieselbe Person, andere Adresse».
 *
 * WER HIER ETWAS ÄNDERT
 *
 * Zwingend ist genau eines: jede Seite nennt die andere. Sonst greift der
 * Mechanismus nicht. Die übrigen Profile dürfen sich zwischen den beiden
 * Listen unterscheiden — sie dürfen sich nur nicht widersprechen, also
 * nie auf eine andere Person zeigen.
 *
 * Drüben steht die Gegenfassung in src/layouts/Layout.astro; die Profile
 * kommen dort aus dem CMS. Kommt hier eines dazu, lohnt der Blick, ob es
 * drüben auch hingehört.
 */

/** Die Startseite drüben — der Nachweis zu dieser Haltung. */
export const PORTFOLIO = 'https://mauriziozulli.com';

/**
 * Dieselben Profile wie auf mauriziozulli.com, dazu das Portfolio selbst.
 * Nur Adressen, die dauerhaft ihm gehören: ein Verzeichniseintrag oder
 * eine eigene Seite, kein Beitrag und kein Konto, das morgen weg ist.
 */
const SAME_AS = [
  PORTFOLIO,
  'https://www.imdb.com/name/nm12568868/',
  'https://www.swissfilms.ch/de/person/maurizio-zulli/af24bdf96ed942608aa2a327f6dd2194',
  'https://www.instagram.com/maurizio_zulli_/',
  'https://soundcloud.com/maurizio-zulli',
];

/**
 * Die Auszeichnung, wie sie in jede Seite kommt.
 *
 * `mainEntityOfPage` fehlt mit Absicht: die Person ist nicht das Thema
 * dieser Seite, sie ist ihre Urheberin. Was das Thema ist, sagt der
 * Titel.
 */
export function personLd(sprache: 'de' | 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Maurizio Zulli',
    jobTitle:
      sprache === 'de'
        ? 'Sounddesigner und Mischtonmeister'
        : 'Sound Designer & Re-Recording Mixer',
    url: PORTFOLIO,
    address: {
      '@type': 'PostalAddress',
      addressLocality: sprache === 'de' ? 'Luzern' : 'Lucerne',
      addressCountry: 'CH',
    },
    knowsLanguage: ['de', 'en'],
    sameAs: SAME_AS,
  };
}

/**
 * Die Seite selbst, damit «Sound Matters» als Name eines Werks erkennbar
 * ist und nicht als zufällige Wortfolge im Titel. `author` verbindet sie
 * mit der Person oben.
 */
export function seiteLd(sprache: 'de' | 'en', adresse: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Sound Matters',
    url: adresse,
    inLanguage: sprache === 'de' ? 'de-CH' : 'en',
    author: { '@type': 'Person', name: 'Maurizio Zulli', url: PORTFOLIO },
  };
}
