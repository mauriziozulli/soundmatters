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

/**
 * Was im Balken läuft. Der Balken ist überall derselbe Rahmen — die Spur
 * darin gehört zum Thema, sonst wären es fünf Effekte statt einer Idee.
 * Beschrieben sind sie in `src/scripts/spuren.ts`.
 */
export type Spurart = 'pegel' | 'bildton' | 'sternvierer' | 'spektrum' | 'spektrogramm';

/**
 * Die vier Farben eines Abschnitts. Immer aus `tokens.css`, nie als Hexwert
 * hier — und immer ein Paar, das es gedruckt gibt: was auf dem Aufkleber
 * nicht vorkommt, kommt auch auf der Seite nicht vor.
 */
export type Farbsatz = {
  /** Grund des ganzen Abschnitts */
  boden: string;
  /** Fläche des Balkens */
  bar: string;
  /** Das ausgestanzte Wort — und alles, was sich im Balken abheben soll:
   *  Spitzenhaltung, Schnittkante, Prüfpunkt, Marke. Zweite Druckfarbe. */
  wort: string;
  /** Kontur des Balkens */
  kontur: string;
  /** Zeile unter dem Balken und die Hervorhebung im Satz */
  zweit: string;
};

export type Abschnitt = {
  /** Ecke oben links: Nummer oder Hinweis */
  nummer: string;
  /** Ecke oben rechts. Leer lassen, wenn nichts dort stehen soll. */
  einordnung: string;
  /** Das Wort, das aus dem Balken ausgestanzt wird. Versalien im Bild,
   *  hier normal schreiben — die Schrift macht die Versalien. */
  wort: string;
  /** Die Zeile unter dem Balken. Weglassen, wenn das Wort allein steht;
   *  eine Zeile, die nur den Satz darunter doppelt, ist keine. */
  zweite?: string;
  /** Welche Spur im Balken läuft */
  spur: Spurart;
  /** Saat der Spur. Gleiche Saat, gleiches Bild bei jedem Besuch —
   *  die Seite soll nicht bei jedem Laden anders aussehen. */
  saat: number;
  farben: Farbsatz;
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
  /** Steht im Balken der Ebene und zugleich als Überschrift im Text.
   *  Kurz halten — was breiter ist als der Balken, wird klein gerechnet. */
  titel: string;
  /** Spur im Balken der Ebene. Sie steht still: ein Detailblatt soll
   *  nicht mit sich selber konkurrieren. */
  spur: Spurart;
  saat: number;
  farben: Farbsatz;
  vorspann: string;
  /** Bild oben in der Ebene; leer lassen, solange keins da ist */
  bild?: string;
  /** Bildreihe unter dem Vorspann, je mit einer Zeile darunter. Dasselbe
   *  Format wie bei den Stücken: 4:3 quer, sonst steht die Reihe schief.
   *  Für Situationen gedacht — was zu sehen ist, soll die Arbeit zeigen,
   *  nicht die Person. */
  bilder?: { datei: string; text: string }[];
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
  /** Weiterführung am Fuss der Ebene. **Optional, und meistens richtig
   *  weggelassen.** Hier standen einmal «Bau mir eins» und «Aufnahme
   *  bestellen» als Mail mit vorbereitetem Betreff — das machte aus der
   *  Ebene ein Bestellformular. Wer vom Aufkleber kommt, erwartet eine
   *  Haltung, keinen Laden; die Adresse steht ohnehin im Fuss der Seite.
   *  Die zweite Regel erlaubt eine Weiterführung, sie verlangt keine. */
  handlung?: { text: string; ziel: string };
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
      nummer: 'soundmatters.audio',
      einordnung: '',
      wort: 'Sound',
      zweite: 'Matters',
      spur: 'pegel',
      saat: 7,
      farben: {
        boden: 'var(--grund-00)', bar: 'var(--verdigris)', wort: 'var(--knochen)',
        kontur: 'var(--tiefgruen)', zweit: 'var(--knochen)'
      },
      satz: 'Schön, dass du da bist. Dir ist Ton also wichtig — dann bist du hier richtig. Komm und schau.',
      betont: 'Dir ist Ton also wichtig — dann bist du hier richtig.',
      fussnote: 'Runterscrollen'
    },
    {
      nummer: '01',
      /* Oben die Handwerke, nicht das Feld: das Feld steht schon im
         Balken. Dasselbe Muster wie bei 02, wo «Rigs · Kabel · Bühne»
         aufzählt, was dabei herauskommt. */
      einordnung: 'Sounddesign · Schnitt · Mischung',
      /* «Film» steht allein, wie «Musik» in 03. Vorher stand hier «Sound»
         — dann kam das Wort zweimal im Balken vor, einmal in 00 und
         einmal hier. Der Seitenname ist gesetzt, also weicht dieser. */
      wort: 'Film',
      spur: 'bildton',
      saat: 19,
      farben: {
        boden: 'var(--grund-01)', bar: 'var(--ocker)', wort: 'var(--grund-01)',
        kontur: 'var(--grund-01)', zweit: 'var(--ocker)'
      },
      satz: 'Ton erzählt mit — er entscheidet, ob die Geschichte trägt. Ich höre, was noch nicht da ist.',
      betont: 'Ton erzählt mit — er entscheidet, ob die Geschichte trägt.',
      fussnote: 'Die ganze Werkschau',
      link: { text: 'mauriziozulli.com', ziel: 'https://mauriziozulli.com', art: 'extern' }
    },
    {
      nummer: '02',
      einordnung: 'Rigs · Kabel · Bühne',
      wort: 'Custom',
      zweite: 'Gear',
      spur: 'sternvierer',
      saat: 31,
      farben: {
        boden: 'var(--grund-04)', bar: 'var(--verdigris)', wort: 'var(--knochen)',
        kontur: 'var(--tiefgruen)', zweit: 'var(--verdigris)'
      },
      satz: 'Ich baue Kabel und Rigs nach Mass — Recorder, die eine Festivalnacht durchlaufen, Breakout-Kabel fürs Recording-Bag. Aus Leidenschaft, aber vor allem, weil sie nützlich sein müssen.',
      betont: 'Ich baue Kabel und Rigs nach Mass',
      fussnote: "Zeichnung und Teileliste gibt's dazu",
      link: { text: 'Wie es gebaut ist', ziel: '/rig', art: 'ebene' }
    },
    {
      nummer: '03',
      einordnung: 'House · Techno · Festival',
      /* Keine zweite Zeile: «Musik» steht allein. Eine Zeile wie
         «Fünfzehn Jahre» würde nur den Satz darunter doppeln. */
      wort: 'Musik',
      spur: 'spektrum',
      saat: 53,
      farben: {
        boden: 'var(--grund-03)', bar: 'var(--rost)', wort: 'var(--knochen)',
        kontur: 'var(--tiefbraun)', zweit: 'var(--rost)'
      },
      /* Die Rigs standen hier einmal als Verbindung zu 02 — Bauen gehört
         aber nicht zur Musik. Die Verbindung läuft jetzt übers Pult, und
         die Rigs tauchen dort auf, wo sie zählen: bei den Aufnahmen.
         «Organisiere Events» ist weggefallen, ohne Verlust: die Fusszeile
         darunter nennt Am Bach Festival und Schwing und Stampf. */
      satz: 'Seit fünfzehn Jahren spiele ich Musik. Vom Audio Engineering kommt der Rest: Ich mische und mastere Tracks und Sets.',
      betont: 'Seit fünfzehn Jahren spiele ich Musik.',
      fussnote: 'Am Bach Festival · Schwing und Stampf',
      link: { text: 'SoundCloud', ziel: 'https://soundcloud.com/maurizio-zulli', art: 'extern' }
    },
    {
      nummer: '04',
      /* Die Orte stehen im Satz, also stehen hier die Werkzeuge — sonst
         doppelt sich beides. Alle drei kommen wörtlich auf der Ebene
         darunter vor, damit die Ecke belegt, was das Plakat behauptet. */
      einordnung: 'Hydrophon · Kontaktmikro · Stereopaar',
      wort: 'Field',
      zweite: 'Recording',
      spur: 'spektrogramm',
      saat: 71,
      farben: {
        boden: 'var(--grund-02)', bar: 'var(--knochen)', wort: 'var(--tiefgruen)',
        kontur: 'var(--knochen)', zweit: 'var(--knochen)'
      },
      /* «Dieselben Ohren, die den Film mischen» verengte auf Film — wer
         eine Aufnahme braucht, hat oft nichts mit Film zu tun. Und «was
         sonst nicht aufgenommen wird» klang nach Anspruch statt nach
         Arbeit. Jetzt trägt der Satz die Bandbreite. */
      /* Eine Handwerkswahrheit statt einer Künstlerpose. Vorgänger war
         «meistens für eine Idee, die noch keinen Klang hat» — das
         posierte, und der Auftraggeber ist Profi, nicht Poet.
         «Je schwieriger, desto lieber» ist die Lust an schwierigen Orten,
         ohne das Wort «Herausforderung», das nach Bewerbung klingt. */
      satz: 'Kein Mix rettet eine schlechte Aufnahme — alles entscheidet sich am Ort. Gletscher, Seilbahn, Filmset: je schwieriger, desto lieber.',
      betont: 'Kein Mix rettet eine schlechte Aufnahme',
      fussnote: 'Bisher einunddreissig Orte',
      link: { text: 'Wo ich aufnehme', ziel: '/aufnahmen', art: 'ebene' }
    }
  ],
  ebenen: [
    {
      schluessel: 'rig',
      farbe: 'var(--ocker)',
      spur: 'sternvierer',
      saat: 97,
      farben: {
        boden: 'var(--grund-04)', bar: 'var(--ocker)', wort: 'var(--tiefgruen)',
        kontur: 'var(--knochen)', zweit: 'var(--knochen)'
      },
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
            { was: 'Kanäle', wert: '2, Stereo-Summe aus der Booth' },
            { was: 'Nach Stromausfall', wert: 'gesicherte Datei, Aufnahme läuft weiter' },
            { was: 'Sicherung', wert: 'laufend, zwei SD-Karten parallel' },
            { was: 'Marker', wert: 'automatisch bei Übersteuerung, dazu von Hand' },
            { was: 'Für Künstler', wert: 'Signal durchgeschleift, eigener Recorder mithängbar' }
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
        }
      ]
    },
    {
      schluessel: 'aufnahmen',
      farbe: 'var(--knochen)',
      spur: 'spektrogramm',
      saat: 113,
      farben: {
        boden: 'var(--grund-02)', bar: 'var(--knochen)', wort: 'var(--tiefgruen)',
        kontur: 'var(--knochen)', zweit: 'var(--tiefgruen)'
      },
      kicker: '04 — Field Recording',
      titel: 'Die Aufnahmen',
      /* Kein «hör rein» mehr: hier liegt kein Ton. Was hier liegt, sind
         Bilder von der Arbeit — und ein Vorspann, der die Bandbreite
         nennt, statt sie nur anzudeuten. */
      vorspann:
        'Ich nehme auf, was gebraucht wird: Filmton am Set, Sprecher, Atmosphären und Naturgeräusche draussen, ganze Festivalnächte am Stück. Der Ort bestimmt das Rig, nicht umgekehrt.',
      bilder: [
        { datei: '/fotos/ort-gletscherbach.jpg', text: 'Stereopaar über dem Gletscherbach, Recorder im Case' },
        { datei: '/fotos/ort-gletscher.jpg', text: 'Am Gletscher: setzen, hören, verschieben' },
        { datei: '/fotos/ort-strasse.jpg', text: 'Filmton in der Stadt — Angel, Bag, Funkstrecken' },
        { datei: '/fotos/ort-strand.jpg', text: 'Dreh am Meer, Angel gegen den Wind' }
      ],
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
        { was: 'Auf Bestellung', wert: 'sag mir den Ort' }
      ]
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
      nummer: 'soundmatters.audio',
      einordnung: '',
      wort: 'Sound',
      zweite: 'Matters',
      spur: 'pegel',
      saat: 7,
      farben: {
        boden: 'var(--grund-00)', bar: 'var(--verdigris)', wort: 'var(--knochen)',
        kontur: 'var(--tiefgruen)', zweit: 'var(--knochen)'
      },
      satz: 'Good to have you here. So sound matters to you — then you are in the right place. Come and have a look.',
      betont: 'So sound matters to you — then you are in the right place.',
      fussnote: 'Scroll down'
    },
    {
      nummer: '01',
      einordnung: 'Sound design · Editing · Mixing',
      wort: 'Film',
      spur: 'bildton',
      saat: 19,
      farben: {
        boden: 'var(--grund-01)', bar: 'var(--ocker)', wort: 'var(--grund-01)',
        kontur: 'var(--grund-01)', zweit: 'var(--ocker)'
      },
      satz: 'Sound tells the story too — it decides whether the story carries. I hear what is not there yet.',
      betont: 'Sound tells the story too — it decides whether the story carries.',
      fussnote: 'The full body of work',
      link: { text: 'mauriziozulli.com', ziel: 'https://mauriziozulli.com', art: 'extern' }
    },
    {
      nummer: '02',
      einordnung: 'Rigs · Cables · Stage',
      wort: 'Custom',
      zweite: 'Gear',
      spur: 'sternvierer',
      saat: 31,
      farben: {
        boden: 'var(--grund-04)', bar: 'var(--verdigris)', wort: 'var(--knochen)',
        kontur: 'var(--tiefgruen)', zweit: 'var(--verdigris)'
      },
      satz: 'I build cables and rigs to measure — recorders that run through a festival night, breakout cables for the recording bag. Out of passion, but above all because they have to be useful.',
      betont: 'I build cables and rigs to measure',
      fussnote: 'Drawing and parts list come with it',
      link: { text: 'How it is built', ziel: '/en/rig', art: 'ebene' }
    },
    {
      nummer: '03',
      einordnung: 'House · Techno · Festival',
      wort: 'Music',
      spur: 'spektrum',
      saat: 53,
      farben: {
        boden: 'var(--grund-03)', bar: 'var(--rost)', wort: 'var(--knochen)',
        kontur: 'var(--tiefbraun)', zweit: 'var(--rost)'
      },
      satz: 'I have been playing music for fifteen years. The rest comes from audio engineering: I mix and master tracks and sets.',
      betont: 'I have been playing music for fifteen years.',
      fussnote: 'Am Bach Festival · Schwing und Stampf',
      link: { text: 'SoundCloud', ziel: 'https://soundcloud.com/maurizio-zulli', art: 'extern' }
    },
    {
      nummer: '04',
      einordnung: 'Hydrophone · Contact mic · Stereo pair',
      wort: 'Field',
      zweite: 'Recording',
      spur: 'spektrogramm',
      saat: 71,
      farben: {
        boden: 'var(--grund-02)', bar: 'var(--knochen)', wort: 'var(--tiefgruen)',
        kontur: 'var(--knochen)', zweit: 'var(--knochen)'
      },
      satz: 'No mix saves a bad recording — everything is decided on location. A glacier, a cable car, a film set: the harder, the better.',
      betont: 'No mix saves a bad recording',
      fussnote: 'Thirty-one places so far',
      link: { text: 'Where I record', ziel: '/en/recordings', art: 'ebene' }
    }
  ],
  ebenen: [
    {
      schluessel: 'rig',
      farbe: 'var(--ocker)',
      spur: 'sternvierer',
      saat: 97,
      farben: {
        boden: 'var(--grund-04)', bar: 'var(--ocker)', wort: 'var(--tiefgruen)',
        kontur: 'var(--knochen)', zweit: 'var(--knochen)'
      },
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
        }
      ]
    },
    {
      schluessel: 'recordings',
      farbe: 'var(--knochen)',
      spur: 'spektrogramm',
      saat: 113,
      farben: {
        boden: 'var(--grund-02)', bar: 'var(--knochen)', wort: 'var(--tiefgruen)',
        kontur: 'var(--knochen)', zweit: 'var(--tiefgruen)'
      },
      kicker: '04 — Field Recording',
      titel: 'The Recordings',
      vorspann:
        'I record what is needed: location sound on set, voice-over, atmospheres and nature outdoors, whole festival nights in one go. The place decides the rig, not the other way round.',
      bilder: [
        { datei: '/fotos/ort-gletscherbach.jpg', text: 'Stereo pair over a glacial stream, recorder in the case' },
        { datei: '/fotos/ort-gletscher.jpg', text: 'On the glacier: place it, listen, move it again' },
        { datei: '/fotos/ort-strasse.jpg', text: 'Location sound in the city — boom, bag, radio links' },
        { datei: '/fotos/ort-strand.jpg', text: 'A shoot by the sea, boom against the wind' }
      ],
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
        { was: 'To order', wert: 'tell me the place' }
      ]
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
