/**
 * Der ganze Inhalt der Seite an einem Ort, in zwei Sprachen.
 * Hier änderst du Texte, Links und Reihenfolge — sonst nirgends.
 * Solange es fünf Abschnitte sind, braucht es dafür kein CMS.
 *
 * Deutsch ist die Hauptfassung und liegt unter `/`, Englisch unter `/en`.
 * Beide sind echte, vorgebaute Seiten — verschickbar und auffindbar, so wie
 * die Detail-Ebenen auch.
 */

export const SPRACHEN = ['de', 'en'] as const;
export type Sprache = (typeof SPRACHEN)[number];

/** Adress-Vorsilbe je Sprache. Deutsch liegt an der Wurzel. */
export const BASIS: Record<Sprache, string> = { de: '', en: '/en' };

export type Abschnitt = {
  /** Kürzel, muss zum Dateinamen unter public/fotos/ passen */
  bild: string;
  /** Ecke oben links: Nummer oder Hinweis */
  nummer: string;
  /** Ecke oben rechts */
  einordnung: string;
  /** Schriftbild: Leitschrift, Gegenstimme oder Kontur */
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

/**
 * Die zweite und letzte Ebene. Jede hat eine eigene Adresse, damit sie
 * verschickbar ist. Eine dritte Ebene gibt es bewusst nicht.
 */
export type Ebene = {
  /** Zugleich das letzte Stück der Adresse — je Sprache eigen */
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

export type Fuss = {
  wer: string;
  aufkleber: string;
  kontakt: { text: string; ziel: string };
};

export type Fassung = {
  titel: string;
  beschreibung: string;
  /** Beschriftung des Sprachschalters für die jeweils andere Fassung */
  wechsel: string;
  abschnitte: Abschnitt[];
  ebenen: Ebene[];
  fuss: Fuss;
};

const DEUTSCH: Fassung = {
  titel: 'Sound Matters',
  beschreibung:
    'Maurizio Zulli aus Luzern: Ton für Film und Video, selbst gebaute Recording-Rigs, Musik und Feldaufnahmen.',
  wechsel: 'Auf Deutsch lesen',
  abschnitte: [
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
  ],
  ebenen: [
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
  ],
  fuss: {
    wer: 'Maurizio Zulli · Luzern',
    aufkleber: 'Die Aufkleber kleben an Festivals, im Studio und am Set.',
    kontakt: { text: 'Schreib mir', ziel: 'mailto:maurizio@mauriziozulli.com?subject=Sound%20Matters' }
  }
};

/**
 * Englische Fassung. Derselbe Ton wie im Deutschen: direkt, erste Person,
 * keine Werbesprache. Eigennamen bleiben stehen (Am Bach Festival, Schwing
 * und Stampf) — sie zu übersetzen würde sie unauffindbar machen.
 */
const ENGLISCH: Fassung = {
  titel: 'Sound Matters',
  beschreibung:
    'Maurizio Zulli from Lucerne: sound for film and video, self-built recording rigs, music and field recordings.',
  wechsel: 'Read in English',
  abschnitte: [
    {
      bild: 'intro',
      nummer: 'soundmatters.audio',
      einordnung: 'Lucerne',
      griff: 'grotesk',
      passung: 0.9,
      akzent: 'var(--verdigris)',
      zeilen: [{ text: 'Sound is what' }, { text: 'matters.', klasse: 'balken' }],
      satz: "Hi, I'm Maurizio. That's why I try to get sound right everywhere — in the cinema, in the booth, on the glacier.",
      betont: "That's why I try to get sound right everywhere",
      fussnote: 'Scroll down'
    },
    {
      bild: 'film',
      nummer: '01',
      einordnung: 'Film · Video · Advertising',
      griff: 'serif',
      passung: 0.94,
      akzent: 'var(--ocker)',
      zeilen: [{ text: 'Sound' }, { text: 'and Picture', klasse: 'ton' }],
      satz: "Sound design, editing and mixing. What I record outdoors ends up in here — my library isn't built from bought packs.",
      betont: 'What I record outdoors ends up in here',
      fussnote: 'The full body of work',
      link: { text: 'mauriziozulli.com', ziel: 'https://mauriziozulli.com', art: 'extern' }
    },
    {
      bild: 'gear',
      nummer: '02',
      einordnung: 'Rigs · Microphones · Stage',
      griff: 'grotesk',
      passung: 0.84,
      akzent: 'var(--ocker)',
      zeilen: [{ text: 'Custom', klasse: 'balken' }, { text: 'Gear', klasse: 'balken' }],
      satz: 'Recording cases that capture every set at the festival — eight channels straight out of the booth, all night. Built the way I need them as a DJ myself.',
      betont: 'Built the way I need them as a DJ myself.',
      fussnote: 'Drawing and parts list come with it',
      link: { text: 'How it is built', ziel: '/en/rig', art: 'ebene' }
    },
    {
      bild: 'club',
      nummer: '03',
      einordnung: 'House · Techno · Festival',
      griff: 'grotesk',
      passung: 0.93,
      akzent: 'var(--verdigris)',
      zeilen: [{ text: 'Music', klasse: 'ton' }],
      satz: "I play records and help build a festival up in the mountains. That's why I know what really happens in the booth at four in the morning — and I build for that.",
      betont: 'what really happens in the booth at four in the morning',
      fussnote: 'Am Bach Festival · Schwing und Stampf',
      link: { text: 'SoundCloud', ziel: 'https://soundcloud.com/maurizio-zulli', art: 'extern' }
    },
    {
      bild: 'ice',
      nummer: '04',
      einordnung: 'Glaciers · Cable cars · Empty rooms',
      griff: 'hohl',
      passung: 0.92,
      akzent: 'var(--knochen)',
      zeilen: [{ text: 'Field' }, { text: 'Recording' }],
      satz: "Hydrophone in a glacier mill, contact mic on a cable-car rope, stereo pair in the empty club at ten past six. Tell me the place, I'll bring the gear and the patience.",
      betont: "Tell me the place, I'll bring the gear and the patience.",
      fussnote: 'Recordings to order',
      link: { text: 'Have a listen', ziel: '/en/recordings', art: 'ebene' }
    }
  ],
  ebenen: [
    {
      schluessel: 'rig',
      farbe: 'var(--ocker)',
      kicker: '02 — Custom Gear',
      titel: 'The Stage Rig',
      vorspann:
        'A case that stands at every stage and records every set cleanly. Eight channels straight out of the booth, all night long, without anyone at the mixer noticing.',
      bloecke: [
        {
          titel: 'What it does',
          text: 'It sits on the booth mixer output and records in parallel — the stereo sum plus the individual channels. The DJs notice nothing, and on Monday you have clean tracks instead of a phone recording from the third row.'
        },
        {
          titel: 'How it is built',
          text: "A Merging Anubis at the heart, plus its own power routing so a short circuit at the desk doesn't kill the recording. All in one case two people can carry. Setup: twenty minutes. Teardown: ten."
        },
        {
          titel: 'What went wrong',
          text: 'Version one died at eight below zero, because I underestimated the condensation inside a closed case. Version two has vents and a heating mat. That belongs in the documentation too.'
        }
      ],
      daten: [
        { was: 'Channels', wert: '8, simultaneously' },
        { was: 'Heart', wert: 'Merging Anubis' },
        { was: 'Runtime', wert: 'a whole night, unattended' },
        { was: 'Setup', wert: 'twenty minutes' },
        { was: 'Documents', wert: 'drawing and parts list, free to copy' }
      ],
      handlung: { text: 'Build me one', ziel: 'mailto:maurizio@mauriziozulli.com?subject=Build%20a%20rig' }
    },
    {
      schluessel: 'recordings',
      farbe: 'var(--knochen)',
      kicker: '04 — Field Recording',
      titel: 'The Recordings',
      vorspann:
        'Places never sound the same twice. These are the ones where hauling the gear up there paid off.',
      bloecke: [
        {
          titel: 'Ice at work',
          text: "Hydrophone in a glacier mill, four below zero. Ice doesn't just creak, it cracks — the lowest note came from twelve metres down and was barely bearable on headphones."
        },
        {
          titel: 'Cable car, hanging',
          text: 'Contact mic on the carrying rope. A kilometre of tensioned steel cable is a string, you only have to touch it. Sounds like a bass nobody ever built.'
        },
        {
          titel: 'Ten past six',
          text: 'Stereo pair in the middle of the empty club, once everyone has gone. The finest moment of a night is the one where the room becomes itself again.'
        }
      ],
      daten: [
        { was: 'So far', wert: 'thirty-one places' },
        { was: 'Coldest', wert: 'Rhone Glacier, minus four' },
        { was: 'Loudest', wert: 'cable car under load' },
        { was: 'Available', wert: 'single or as a pack, for anyone' },
        { was: 'To order', wert: 'tell me the place' }
      ],
      handlung: { text: 'Order a recording', ziel: 'mailto:maurizio@mauriziozulli.com?subject=Field%20recording' }
    }
  ],
  fuss: {
    wer: 'Maurizio Zulli · Lucerne',
    aufkleber: 'The stickers are on cases at festivals, in the studio and on set.',
    kontakt: { text: 'Write to me', ziel: 'mailto:maurizio@mauriziozulli.com?subject=Sound%20Matters' }
  }
};

export const INHALT: Record<Sprache, Fassung> = { de: DEUTSCH, en: ENGLISCH };

/**
 * Die entsprechende Adresse in der jeweils anderen Sprache. Steht man auf
 * einer Detail-Ebene, landet man drüben auf derselben Ebene — sonst auf der
 * Startseite. Eine Stelle für beide Verwender: Schalter und hreflang.
 */
export function gegenstueck(von: Sprache, pfad: string): string {
  const zu: Sprache = von === 'de' ? 'en' : 'de';
  const basis = BASIS[zu];
  const schluessel = pfad.replace(/\/+$/, '').split('/').pop() ?? '';
  const stelle = INHALT[von].ebenen.findIndex((e) => e.schluessel === schluessel);
  const drueben = stelle >= 0 ? INHALT[zu].ebenen[stelle] : undefined;
  return mitStrich(drueben ? `${basis}/${drueben.schluessel}` : basis || '/');
}

/**
 * Immer mit Schrägstrich am Ende. Der Build legt Verzeichnisse an, also ist
 * `/en/rig/` die richtige Form — `/en/rig` wäre für Suchmaschinen eine
 * zweite, doppelte Adresse.
 */
export function mitStrich(pfad: string): string {
  return pfad.endsWith('/') ? pfad : pfad + '/';
}
