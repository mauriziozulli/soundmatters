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
  /** Fliesstext-Bloecke. Weglassen, wenn die Stuecke den Inhalt tragen. */
  bloecke?: { titel: string; text: string }[];
  daten?: { was: string; wert: string }[];
  /**
   * Einzelne Geräte auf dieser Ebene. Bewusst ohne eigene Adresse — eine
   * dritte Ebene gibt es nicht. Zum Ergänzen einen Eintrag kopieren und
   * ausfüllen; die Reihenfolge hier ist die Reihenfolge auf der Seite.
   */
  stuecke?: {
    titel: string;
    /** Kurze Verortung, erscheint klein über dem Titel */
    einordnung: string;
    text: string;
    /** Fotos des Geräts, je mit einer Zeile darunter. Datei unter
     *  public/fotos/ ablegen und hier eintragen. Ein Bild steht allein,
     *  mehrere stehen nebeneinander. Weglassen, solange keins da ist.
     *  Ab etwa fünf Bildern wird die Reihe unruhig — dann lieber ein
     *  eigenes Stück je Bauform. */
    bilder?: { datei: string; text: string }[];
    daten: { was: string; wert: string }[];
  }[];
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
  /** Feste Beschriftungen der Oberfläche, damit nichts hartkodiert ist */
  beschriftung: { schliessen: string; platzhalter: string; stuecke: string };
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
  beschriftung: {
    schliessen: '✕ Schliessen',
    platzhalter: 'Hier kommt dein Foto hin',
    stuecke: 'Vier Beispiele'
  },
  abschnitte: [
    {
      bild: 'intro',
      nummer: 'soundmatters.audio',
      einordnung: 'Luzern',
      griff: 'grotesk',
      passung: 0.9,
      akzent: 'var(--verdigris)',
      zeilen: [{ text: 'Sound is what' }, { text: 'matters.', klasse: 'balken' }],
      satz: 'Schön, dass du da bist. Dir ist Ton also wichtig — dann bist du hier richtig. Komm und schau.',
      betont: 'Dir ist Ton also wichtig — dann bist du hier richtig.',
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
      satz: 'Ton erzählt mit — er entscheidet, ob deine Geschichte trägt. Ich höre, was noch nicht da ist: Sounddesign, Schnitt und Mischung.',
      betont: 'Ton erzählt mit — er entscheidet, ob deine Geschichte trägt.',
      fussnote: 'Die ganze Werkschau',
      link: { text: 'mauriziozulli.com', ziel: 'https://mauriziozulli.com', art: 'extern' }
    },
    {
      bild: 'gear',
      nummer: '02',
      einordnung: 'Rigs · Kabel · Bühne',
      griff: 'grotesk',
      passung: 0.84,
      akzent: 'var(--ocker)',
      zeilen: [{ text: 'Custom', klasse: 'balken' }, { text: 'Gear', klasse: 'balken' }],
      satz: 'Custom Audio-Kabel für die Profis unter uns, dazu Recording-Rigs für DJ-Booths und Festivals. Gebaut, weil sie nützlich sein müssen.',
      betont: 'Custom Audio-Kabel für die Profis unter uns',
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
      satz: 'DJ-Set mastern? Da kann ich dir helfen. Seit fünfzehn Jahren spiele ich Musik und organisiere Events in der Kulturszene.',
      betont: 'DJ-Set mastern? Da kann ich dir helfen.',
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
      satz: 'Du brauchst eine Aufnahme, die es so noch nicht gibt? Sag mir den Ort — auf dem Gletscher wie im Proberaum.',
      betont: 'Sag mir den Ort',
      fussnote: 'Aufnahmen auf Bestellung',
      link: { text: 'Reinhören', ziel: '/aufnahmen', art: 'ebene' }
    }
  ],
  ebenen: [
    {
      schluessel: 'rig',
      farbe: 'var(--ocker)',
      kicker: '02 — Custom Gear',
      titel: 'Was ich baue',
      vorspann:
        'Cases, Kabel und Software, die es so nicht zu kaufen gibt — gebaut für den Fall, den es zu lösen gab. Schau dir an, was im Einsatz ist.',
      stuecke: [
        {
          titel: 'Der Booth-Recorder',
          einordnung: 'Festival · DJ-Booth',
          text: 'Ein Tascam SS-R250N im Case, fest am Booth-Ausgang. Er läuft die ganze Nacht und sichert laufend mit — zieht jemand den Stecker, ist die Aufnahme bis kurz davor da und läuft danach von selbst weiter. Übersteuert ein Set, setzt er den Marker automatisch. Und wer sein eigenes Set mitnehmen will, hängt seinen Recorder ans durchgeschleifte Signal.',
          daten: [
            { was: 'Herz', wert: 'Tascam SS-R250N' },
            { was: 'Kanäle', wert: '2, Stereo-Summe aus dem Booth' },
            { was: 'Nach Stromausfall', wert: 'gesicherte Datei, Aufnahme läuft weiter' },
            { was: 'Sicherung', wert: 'laufend, zwei SD-Karten parallel' },
            { was: 'Marker', wert: 'automatisch bei Übersteuerung, dazu von Hand' },
            { was: 'Für Künstler', wert: 'Signal durchgeschleift, eigener Recorder mithängbar' }
          ]
        },
        {
          titel: 'Das Gletscher-Case',
          einordnung: 'Feld · Expedition · Eis',
          bilder: [{ datei: '/fotos/peli-case.jpg', text: 'Peli 1400 mit dem Anubis, am Griesgletscher' }],
          text: 'Ein Peli 1400, ausgebaut für den Merging Anubis SPS Premium — Vorverstärker und Monitorcontroller in einem, mitgenommen auf den Griesgletscher. Der Strom kommt aus SWIT-NP-1-Akkus; über einen powerCON läuft und lädt das Case gleichzeitig, und im Feld übernimmt der Akku nahtlos. Zwei Wege, eine Aufnahme.',
          daten: [
            { was: 'Case', wert: 'Peli 1400, selber ausgebaut' },
            { was: 'Herz', wert: 'Merging Anubis SPS Premium' },
            { was: 'Aufnahme', wert: 'Zoom F3 mit LOM-Ucho-Mikrofonen' },
            { was: 'Strom', wert: 'SWIT NP-1, powerCON für Netzbetrieb' },
            { was: 'Redundanz', wert: 'nahtlose Übernahme auf Akku' },
            { was: 'Verkabelung', wert: 'Mogami, innen wie aussen selbst gebaut' }
          ]
        },
        {
          titel: 'Kabel nach Mass',
          einordnung: 'Location Sound · Bag · Angel',
          bilder: [
            { datei: '/fotos/kabel-mid-side.jpg', text: 'Fünfpolig für Mid/Side, auf Länge konfektioniert' },
            { datei: '/fotos/kabel-stecker.jpg', text: 'Fünf Pol auf drei Pol, flach gebaut fürs Bag' },
            { datei: '/fotos/kabel.jpg', text: 'Angelkabel und Breakout, wie sie im Case liegen' },
            { datei: '/fotos/kabel-adapter.jpg', text: 'Adapter zwischen Steckerwelten, ebenfalls nach Mass' }
          ],
          text: 'Mogami-Kabel, Neutrik-Stecker, von Hand gelötet und jede Ader einzeln durchgemessen. Fünfpolig für Mid/Side an der Angel, Breakout von fünf Pol auf zwei dreipolige Flachstecker fürs Recording-Bag, Verlängerungen für Ambisonics-Rigs, dazu Adapter zwischen Steckerwelten, die nicht zusammenpassen wollten. Mogami, weil es im Bag kaum Griffgeräusche überträgt und auch nach hundert Drehtagen noch weich in der Hand liegt.',
          daten: [
            { was: 'Kabel', wert: 'Mogami, Sternvierer' },
            { was: 'Stecker', wert: 'Neutrik, im Bag in Flachbauform' },
            { was: 'Gebaut', wert: 'Mid/Side, Breakout fürs Bag, Adapter, Verlängerungen' },
            { was: 'Warum Mogami', wert: 'wenig Griffgeräusch, bleibt lange weich' },
            { was: 'Prüfung', wert: 'jede Ader einzeln durchgemessen' },
            { was: 'Länge', wert: 'nach Mass, nicht nach Katalog' }
          ]
        },
        {
          titel: 'ParanoidQC',
          einordnung: 'Postproduktion · macOS',
          text: 'Gebaut gegen den Ärger, der immer gleich anfängt: Der fertige Stereomix kommt als Dual Mono zurück, oder er ist auf einmal zu leise. Datei ins Fenster ziehen, und die App prüft sie gegen ein Ausgabeprofil — Pegel, Lautheit, Kanäle, Format. Pass, Warnung oder Fehler, mit Timecode zur Fundstelle. Nichts wird hochgeladen, alles rechnet lokal.',
          daten: [
            { was: 'System', wert: 'macOS, Apple Silicon und Intel' },
            { was: 'Prüfungen', wert: '21 in fünf Gruppen' },
            { was: 'Findet', wert: 'Dual Mono, Clipping, Lautheit, True Peak, Aussetzer' },
            { was: 'Ergebnis', wert: 'Pass, Warnung oder Fehler — mit Timecode' },
            { was: 'Bericht', wert: 'HTML, CSV oder Text' },
            { was: 'Zu finden', wert: 'mauriziozulli.com/paranoid-qc' }
          ]
        }
      ],
      handlung: { text: 'Bau mir eins', ziel: 'mailto:maurizio@mauriziozulli.com?subject=Rig%20bauen' }
    },
    {
      schluessel: 'aufnahmen',
      farbe: 'var(--knochen)',
      kicker: '04 — Field Recording',
      titel: 'Die Aufnahmen',
      vorspann:
        'Orte klingen nie zweimal gleich. Das hier sind die, bei denen es sich gelohnt hat, das Zeug hochzuschleppen — hör rein.',
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
  beschriftung: {
    schliessen: '✕ Close',
    platzhalter: 'Your photo goes here',
    stuecke: 'Four examples'
  },
  abschnitte: [
    {
      bild: 'intro',
      nummer: 'soundmatters.audio',
      einordnung: 'Lucerne',
      griff: 'grotesk',
      passung: 0.9,
      akzent: 'var(--verdigris)',
      zeilen: [{ text: 'Sound is what' }, { text: 'matters.', klasse: 'balken' }],
      satz: 'Good to have you here. So sound matters to you — then you are in the right place. Come and have a look.',
      betont: 'So sound matters to you — then you are in the right place.',
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
      satz: 'Sound tells the story too — it decides whether yours carries. I hear what is not there yet: sound design, editing and mixing.',
      betont: 'Sound tells the story too — it decides whether yours carries.',
      fussnote: 'The full body of work',
      link: { text: 'mauriziozulli.com', ziel: 'https://mauriziozulli.com', art: 'extern' }
    },
    {
      bild: 'gear',
      nummer: '02',
      einordnung: 'Rigs · Cables · Stage',
      griff: 'grotesk',
      passung: 0.84,
      akzent: 'var(--ocker)',
      zeilen: [{ text: 'Custom', klasse: 'balken' }, { text: 'Gear', klasse: 'balken' }],
      satz: 'Custom audio cables for the pros among us, plus recording rigs for DJ booths and festivals. Built because they have to be useful.',
      betont: 'Custom audio cables for the pros among us',
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
      satz: 'Need your DJ set mastered? I can help. For fifteen years I have played music and organised events in the cultural scene.',
      betont: 'Need your DJ set mastered? I can help.',
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
      satz: 'Need a recording that does not exist yet? Tell me the place — on a glacier as much as in a rehearsal room.',
      betont: 'Tell me the place',
      fussnote: 'Recordings to order',
      link: { text: 'Have a listen', ziel: '/en/recordings', art: 'ebene' }
    }
  ],
  ebenen: [
    {
      schluessel: 'rig',
      farbe: 'var(--ocker)',
      kicker: '02 — Custom Gear',
      titel: 'What I Build',
      vorspann:
        'Cases, cables and software you cannot buy like this — built for the problem that needed solving. Have a look at what is in use.',
      stuecke: [
        {
          titel: 'The Booth Recorder',
          einordnung: 'Festival · DJ booth',
          text: "A Tascam SS-R250N in a case, wired straight to the booth output. It runs all night and keeps saving as it goes — pull the plug and the recording is there up to a moment before, then it picks up again by itself. If a set clips, it sets the marker automatically. And anyone who wants their own set can hang their recorder off the through signal.",
          daten: [
            { was: 'Heart', wert: 'Tascam SS-R250N' },
            { was: 'Channels', wert: '2, stereo sum from the booth' },
            { was: 'After power loss', wert: 'file saved, recording continues' },
            { was: 'Backup', wert: 'continuous, two SD cards in parallel' },
            { was: 'Markers', wert: 'automatic on clipping, plus manual' },
            { was: 'For artists', wert: 'signal passed through, own recorder can hang off it' }
          ]
        },
        {
          titel: 'The Glacier Case',
          einordnung: 'Field · Expedition · Ice',
          bilder: [{ datei: '/fotos/peli-case.jpg', text: 'Peli 1400 with the Anubis, on the Gries Glacier' }],
          text: 'A Peli 1400 built out for the Merging Anubis SPS Premium — preamp and monitor controller in one, carried up the Gries Glacier. Power comes from SWIT NP-1 batteries; a powerCON lets the case run and charge at once, and in the field the battery takes over seamlessly. Two paths, one recording.',
          daten: [
            { was: 'Case', wert: 'Peli 1400, built out by hand' },
            { was: 'Heart', wert: 'Merging Anubis SPS Premium' },
            { was: 'Capture', wert: 'Zoom F3 with LOM Ucho microphones' },
            { was: 'Power', wert: 'SWIT NP-1, powerCON for mains' },
            { was: 'Redundancy', wert: 'seamless battery takeover' },
            { was: 'Cabling', wert: 'Mogami, inside and out, self-built' }
          ]
        },
        {
          titel: 'Cables to Measure',
          einordnung: 'Location sound · Bag · Boom',
          bilder: [
            { datei: '/fotos/kabel-mid-side.jpg', text: 'Five-pin for mid/side, cut to length' },
            { datei: '/fotos/kabel-stecker.jpg', text: 'Five-pin to three-pin, low profile for the bag' },
            { datei: '/fotos/kabel.jpg', text: 'Boom cable and breakout, as they sit in the case' },
            { datei: '/fotos/kabel-adapter.jpg', text: 'Adapters between connector worlds, also made to measure' }
          ],
          text: 'Mogami cable, Neutrik connectors, soldered by hand and every core measured individually. Five-pin for mid/side on the boom, a breakout from five-pin to two low-profile three-pin connectors for the recording bag, extensions for ambisonic rigs, plus adapters between connector worlds that refused to fit. Mogami, because it passes on almost no handling noise inside a bag and still lies soft in the hand after a hundred shooting days.',
          daten: [
            { was: 'Cable', wert: 'Mogami, star-quad' },
            { was: 'Connectors', wert: 'Neutrik, low-profile in the bag' },
            { was: 'Built', wert: 'mid/side, breakouts for the bag, adapters, extensions' },
            { was: 'Why Mogami', wert: 'little handling noise, stays supple' },
            { was: 'Testing', wert: 'every core measured individually' },
            { was: 'Length', wert: 'to measure, not to catalogue' }
          ]
        },
        {
          titel: 'ParanoidQC',
          einordnung: 'Post-production · macOS',
          text: 'Built against the trouble that always starts the same way: the finished stereo mix comes back as dual mono, or it is suddenly too quiet. Drag the file into the window and the app checks it against a delivery profile — levels, loudness, channels, format. Pass, warning or fail, with a timecode for every finding. Nothing is uploaded; it all runs locally.',
          daten: [
            { was: 'System', wert: 'macOS, Apple Silicon and Intel' },
            { was: 'Checks', wert: '21 across five groups' },
            { was: 'Catches', wert: 'dual mono, clipping, loudness, true peak, dropouts' },
            { was: 'Result', wert: 'pass, warning or fail — with timecode' },
            { was: 'Report', wert: 'HTML, CSV or text' },
            { was: 'Where', wert: 'mauriziozulli.com/paranoid-qc' }
          ]
        }
      ],
      handlung: { text: 'Build me one', ziel: 'mailto:maurizio@mauriziozulli.com?subject=Build%20a%20rig' }
    },
    {
      schluessel: 'recordings',
      farbe: 'var(--knochen)',
      kicker: '04 — Field Recording',
      titel: 'The Recordings',
      vorspann:
        'Places never sound the same twice. These are the ones where hauling the gear up there paid off — have a listen.',
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
