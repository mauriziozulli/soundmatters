/**
 * Der ganze Inhalt der Seite an einem Ort.
 * Hier änderst du Texte, Links und Reihenfolge — sonst nirgends.
 * Solange es fünf Abschnitte sind, braucht es dafür kein CMS.
 */

export type Abschnitt = {
  /** Kürzel, muss zum Dateinamen unter public/fotos/ passen */
  bild: string;
  /** Ecke oben links: Nummer oder Hinweis */
  nummer: string;
  /** Ecke oben rechts */
  einordnung: string;
  /** Schriftbild: jeder Abschnitt hat ein eigenes */
  griff: 'grotesk' | 'serif' | 'hohl';
  /** Sicherheitsabstand beim Breitrechnen der Zeilen, siehe schrift.ts */
  passung: number;
  /** Akzentfarbe des Abschnitts (CSS-Variable) */
  akzent: string;
  /** Zeilen der Überschrift. `balken` legt die Zeile in eine Farbfläche,
   *  `ton` setzt sie in die Leitfarbe. `schmal`/`breit` blenden je nach
   *  Fensterbreite. */
  zeilen: { text: string; klasse?: string }[];
  /** Der eine Satz, der den Zusammenhang zu den anderen Welten nennt */
  satz: string;
  /** Der Teil des Satzes, der farbig hervorgehoben wird */
  betont?: string;
  /** Fusszeile links */
  fussnote: string;
  /** Fusszeile rechts. `art` steuert den Pfeil: raus (↗) oder Ebene (→) */
  link?: { text: string; ziel: string; art: 'extern' | 'ebene' };
};

export const ABSCHNITTE: Abschnitt[] = [
  {
    bild: 'intro',
    nummer: 'soundmatters.audio',
    einordnung: 'Luzern',
    griff: 'grotesk',
    passung: 0.9,
    akzent: 'var(--verdigris)',
    zeilen: [{ text: 'Sound is what' }, { text: 'matters.', klasse: 'balken' }],
    satz: 'Hi, ich bin Maurizio. Darum versuche ich, Ton überall gut zu machen — im Kino, im Booth, auf dem Gletscher.',
    betont: 'Darum versuche ich, Ton überall gut zu machen',
    fussnote: 'Runterscrollen'
  },
  {
    bild: 'film',
    nummer: '01',
    einordnung: 'Film · Video · Werbung',
    griff: 'serif',
    passung: 0.94,
    akzent: 'var(--ocker)',
    zeilen: [{ text: 'Sound' }, { text: 'and Picture', klasse: 'ton' }],
    satz: 'Sounddesign, Schnitt und Mischung. Was ich draussen aufnehme, landet hier drin — meine Bibliothek besteht nicht aus gekauften Paketen.',
    betont: 'Was ich draussen aufnehme, landet hier drin',
    fussnote: 'Die ganze Werkschau',
    link: { text: 'mauriziozulli.com', ziel: 'https://mauriziozulli.com', art: 'extern' }
  },
  {
    bild: 'gear',
    nummer: '02',
    einordnung: 'Rigs · Mikrofone · Bühne',
    griff: 'grotesk',
    passung: 0.84,
    akzent: 'var(--ocker)',
    zeilen: [{ text: 'Custom', klasse: 'balken' }, { text: 'Gear', klasse: 'balken' }],
    satz: 'Recording-Cases, die jedes Set am Festival mitschneiden — acht Kanäle aus dem Booth, die ganze Nacht. Gebaut, wie ich sie selber als DJ brauche.',
    betont: 'Gebaut, wie ich sie selber als DJ brauche.',
    fussnote: "Zeichnung und Teileliste gibt's dazu",
    link: { text: 'Wie es gebaut ist', ziel: '/rig', art: 'ebene' }
  },
  {
    bild: 'club',
    nummer: '03',
    einordnung: 'House · Techno · Festival',
    griff: 'grotesk',
    passung: 0.93,
    akzent: 'var(--verdigris)',
    zeilen: [{ text: 'Musik', klasse: 'ton' }],
    satz: 'Ich lege auf und baue an einem Festival in den Bergen mit. Deshalb weiss ich, was um vier Uhr im Booth wirklich passiert — und baue danach.',
    betont: 'Deshalb weiss ich, was um vier Uhr im Booth wirklich passiert',
    fussnote: 'Am Bach Festival · Schwing und Stampf',
    link: { text: 'SoundCloud', ziel: 'https://soundcloud.com/maurizio-zulli', art: 'extern' }
  },
  {
    bild: 'ice',
    nummer: '04',
    einordnung: 'Gletscher · Seilbahn · leere Räume',
    griff: 'hohl',
    passung: 0.92,
    akzent: 'var(--knochen)',
    zeilen: [{ text: 'Field' }, { text: 'Recording' }],
    satz: 'Hydrophon in der Gletschermühle, Kontaktmikro am Tragseil, Stereopaar im leeren Club um zehn nach sechs. Sag mir den Ort, ich bringe das Zeug und die Geduld.',
    betont: 'Sag mir den Ort, ich bringe das Zeug und die Geduld.',
    fussnote: 'Aufnahmen auf Bestellung',
    link: { text: 'Reinhören', ziel: '/aufnahmen', art: 'ebene' }
  }
];

/**
 * Die zweite und letzte Ebene. Jede hat eine eigene Adresse, damit sie
 * verschickbar ist. Eine dritte Ebene gibt es bewusst nicht.
 */
export type Ebene = {
  schluessel: string;
  farbe: string;
  kicker: string;
  titel: string;
  vorspann: string;
  /** Bild oben in der Ebene; leer lassen, solange keins da ist */
  bild?: string;
  bloecke: { titel: string; text: string }[];
  daten: { was: string; wert: string }[];
  handlung: { text: string; ziel: string };
};

export const EBENEN: Ebene[] = [
  {
    schluessel: 'rig',
    farbe: 'var(--ocker)',
    kicker: '02 — Custom Gear',
    titel: 'Das Bühnen-Rig',
    vorspann:
      'Ein Case, das an jeder Bühne steht und jedes Set sauber mitschneidet. Acht Kanäle direkt aus dem Booth, die ganze Nacht durch, ohne dass jemand am Mixer etwas davon merkt.',
    bloecke: [
      {
        titel: 'Was es macht',
        text: 'Es hängt am Ausgang des Booth-Mixers und schreibt parallel mit — Stereo-Summe plus die einzelnen Kanäle. Die DJs merken nichts davon, und am Montag habt ihr saubere Spuren statt einem Handy-Mitschnitt aus der dritten Reihe.'
      },
      {
        titel: 'Wie es gebaut ist',
        text: 'Merging Anubis als Herz, dazu eine eigene Stromführung, damit ein Kurzschluss am Pult nicht die Aufnahme killt. Alles in einem Case, das man zu zweit tragen kann. Aufbau: zwanzig Minuten. Abbau: zehn.'
      },
      {
        titel: 'Was schiefging',
        text: 'Version eins stieg bei acht Grad unter null aus, weil ich die Kondenswasserbildung im geschlossenen Case unterschätzt habe. Version zwei hat Lüftungsschlitze und eine Heizmatte. Auch das gehört dokumentiert.'
      }
    ],
    daten: [
      { was: 'Kanäle', wert: '8, gleichzeitig' },
      { was: 'Herz', wert: 'Merging Anubis' },
      { was: 'Laufzeit', wert: 'eine ganze Nacht, ohne Eingriff' },
      { was: 'Aufbau', wert: 'zwanzig Minuten' },
      { was: 'Unterlagen', wert: 'Zeichnung und Teileliste, frei kopierbar' }
    ],
    handlung: { text: 'Bau mir eins', ziel: 'mailto:maurizio@mauriziozulli.com?subject=Rig%20bauen' }
  },
  {
    schluessel: 'aufnahmen',
    farbe: 'var(--knochen)',
    kicker: '04 — Field Recording',
    titel: 'Die Aufnahmen',
    vorspann:
      'Orte klingen nie zweimal gleich. Das hier sind die, bei denen es sich gelohnt hat, das Zeug hochzuschleppen.',
    bloecke: [
      {
        titel: 'Eis, das arbeitet',
        text: 'Hydrophon in einer Gletschermühle, vier Grad unter null. Eis knirscht nicht nur, es knallt — der tiefste Ton kam aus zwölf Metern Tiefe und war auf dem Kopfhörer kaum auszuhalten.'
      },
      {
        titel: 'Seilbahn, hängend',
        text: 'Kontaktmikro am Tragseil. Ein Kilometer gespanntes Stahlseil ist eine Saite, man muss sie nur anfassen. Klingt wie ein Bass, den niemand gebaut hat.'
      },
      {
        titel: 'Zehn nach sechs',
        text: 'Stereopaar in der Mitte des leeren Clubs, wenn alle weg sind. Der schönste Moment einer Nacht ist der, in dem der Raum wieder er selbst ist.'
      }
    ],
    daten: [
      { was: 'Bisher', wert: 'einunddreissig Orte' },
      { was: 'Am kältesten', wert: 'Rhonegletscher, minus vier' },
      { was: 'Am lautesten', wert: 'Seilbahn unter Last' },
      { was: 'Zu haben', wert: 'einzeln oder als Paket, für alle' },
      { was: 'Auf Bestellung', wert: 'sag mir den Ort' }
    ],
    handlung: { text: 'Aufnahme bestellen', ziel: 'mailto:maurizio@mauriziozulli.com?subject=Feldaufnahme' }
  }
];

export const FUSS = {
  wer: 'Maurizio Zulli · Luzern',
  aufkleber: 'Die Aufkleber kleben an Festivals, im Studio und am Set.',
  kontakt: { text: 'Schreib mir', ziel: 'mailto:maurizio@mauriziozulli.com?subject=Sound%20Matters' }
};
