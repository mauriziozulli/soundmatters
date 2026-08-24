/**
 * DIE SPUREN IM BALKEN
 *
 * Der Balken ist überall derselbe Rahmen — er kommt vom Aufkleber. Was
 * DARIN läuft, gehört zum Thema des Abschnitts; sonst wären es fünf
 * Effekte statt einer Idee. Jede Spur bringt ihr eigenes `bauen` und
 * `malen` mit, alles andere ist gemeinsam: Balkenfarbe, das Ausstanzen
 * des Worts, Messen, die Schleife.
 *
 * Aufbau eines Balkens in drei Lagen, von hinten nach vorn:
 *   1. der Balken selbst trägt die WORTFARBE als Fläche
 *   2. das Canvas darüber malt die Balkenfarbe und die Spur hinein
 *   3. das Wort wird aus dem Canvas ausgestanzt (destination-out)
 * Was durch die Buchstaben scheint, ist also Lage 1 — genau wie im Druck.
 *
 * Fallen, die hier schon zugeschlagen haben, stehen als Kommentar an Ort
 * und Stelle. Kurz: mit Zugabe malen, vor dem Ausstanzen die Füllfarbe
 * zurücksetzen, und die Breite nie am transformierten Element messen.
 */

export function spurenAufbauen() {


  const ruhig = matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------------------------------------------------------------------
     Scrollen ist Transport.
     Die Spuren laufen von selbst weiter, aber ein Bildlauf schiebt sie
     zusätzlich an — wie wenn man am Rad zieht. Der Schub klingt aus,
     damit es sich nach Masse anfühlt und nicht nach einem Schalter.
     Das ist der Unterschied zwischen einer Seite, die etwas abspielt,
     und einer, die man bedient.
     --------------------------------------------------------------------- */
  let zug = 0, letztesY = scrollY;
  addEventListener('scroll', () => {
    const d = scrollY - letztesY;
    letztesY = scrollY;
    zug += d * .12;
    if (zug > 26) zug = 26; else if (zug < -26) zug = -26;
  }, { passive: true });

  /* ---------------------------------------------------------------------
     Die Welle
     Deterministisch aus einer Saat gerechnet, damit jeder Abschnitt seine
     eigene, aber immer dieselbe Silhouette hat. Kein Zufall je Bildlauf —
     sonst sieht die Seite bei jedem Besuch anders aus.
     --------------------------------------------------------------------- */
  const zufall = (saat) => {
    let z = saat * 9301 + 49297;
    return () => { z = (z * 9301 + 49297) % 233280; return z / 233280; };
  };

  /* =====================================================================
     DIE SPUREN
     Der Balken ist überall derselbe Rahmen. Was DARIN läuft, gehört zum
     Thema — sonst wären es fünf Effekte statt einer Idee. Jede Spur
     bringt ihr eigenes `bauen` und `malen` mit; alles andere (Balkenfarbe,
     Ausstanzen des Worts, Messen, Schleife) ist gemeinsam.

     Gerechnet wird immer deterministisch aus einer Saat: dieselbe Seite
     sieht bei jedem Besuch gleich aus. Gemalt wird ausschliesslich in
     Schwarz mit Deckkraft, nie in einer eigenen Farbe — so bleibt die
     gedruckte Balkenfarbe die Farbe, und der Kontrast zum ausgestanzten
     Wort ändert sich nie.
     ===================================================================== */

  const SPUREN = {

    /* 00 — Pegel. Sprache und Atem: wellig, mit Pausen. Von der Mitte
       nach oben und unten, wie ein Schnittfenster. */
    pegel: {
      bauen(w) {
        const r = zufall(w.saat);
        w.werte = [];
        for (let i = 0; i < 320; i++) {
          const atem = (Math.sin(i / 320 * Math.PI * 5.5) * .5 + .5) * .55 + .2;
          w.werte.push(Math.min(1, atem * (.55 + r() * .34 + .1)));
        }
        w.spitze = 0;
      },
      malen(w, z, B, H, t) {
        const anzahl = Math.max(40, Math.round(B / 7));
        const luecke = B / anzahl, dick = Math.max(1.5, luecke * .52);
        let hoechst = 0, summe = 0;
        z.fillStyle = 'rgba(0,0,0,.22)';
        for (let i = 0; i < anzahl; i++) {
          const a = w.werte[Math.floor((i + w.phase) % w.werte.length)];
          const wackeln = w.statisch ? 1 : Math.sin(t / 620 + i * .32) * .13 + .93;
          const wert = a * wackeln;
          if (wert > hoechst) hoechst = wert;
          summe += wert;
          z.fillRect(i * luecke, (H - Math.max(2, wert * H * .78)) / 2, dick, Math.max(2, wert * H * .78));
        }
        w.energie = summe / anzahl;

        /* Spitzenhaltung: die zwei Linien fangen den höchsten Ausschlag
           und sinken langsam zurück. Jedes Messgerät hat das — es ist die
           einzige Art, einen Ausschlag zu sehen, der zu kurz war, um ihn
           zu bemerken. */
        w.spitze = Math.max(hoechst, w.spitze - .0035);
        const s = w.spitze * H * .78 / 2;
        z.fillStyle = w.wortFarbe;
        for (const v of [-1, 1]) z.fillRect(0, H / 2 + v * s - 1, B, 2);
      },
    },

    /* 01 — Bild und Ton, aneinander gebunden. Oben die Einzelbilder mit
       ihrer Perforation, unten die Tonspur — beide mit derselben Phase,
       also im Gleichlauf. Genau das ist die Aussage des Abschnitts: Ton
       erzählt mit, er läuft nicht daneben her. */
    bildton: {
      bauen(w) {
        const r = zufall(w.saat);
        w.werte = [];
        for (let i = 0; i < 320; i++) {
          const bogen = (Math.sin(i / 320 * Math.PI * 3.1) * .5 + .5) * .6 + .18;
          w.werte.push(Math.min(1, bogen * (.5 + r() * .5)));
        }
        w.wurf = r;
        w.schnitte = [];
        w.naechsterSchnitt = 1800;
      },
      malen(w, z, B, H, t) {
        const bildH = H * .44, tonH = H * .40, spalt = H * .16;
        const bildB = Math.max(34, H * .58);
        const versatz = (w.phase * 1.6) % (bildB + 4);

        /* Schnitte. Alle paar Sekunden springt das Material — und die
           Stelle bleibt als Schnittkante stehen und wandert mit nach
           links, wie in einer Schnittfolge. Das ist die Arbeit, um die es
           in diesem Abschnitt geht. */
        if (!w.statisch && !ruhig.matches) {
          if (t > w.naechsterSchnitt) {
            w.schnitte.push(w.phase);
            w.phase += 70 + w.wurf() * 150;
            w.naechsterSchnitt = t + 2200 + w.wurf() * 3400;
          }
          while (w.schnitte.length && (w.phase - w.schnitte[0]) * 1.6 > B) w.schnitte.shift();
        }

        /* Einzelbilder */
        z.fillStyle = 'rgba(0,0,0,.20)';
        for (let x = -bildB; x < B + bildB; x += bildB + 4) {
          z.fillRect(x - versatz, 0, bildB, bildH);
        }
        /* Perforation: kleine Löcher am oberen Rand, wie am Filmstreifen */
        z.fillStyle = 'rgba(0,0,0,.34)';
        const loch = Math.max(3, H * .05);
        for (let x = -bildB; x < B + bildB; x += (bildB + 4) / 2) {
          z.fillRect(x - versatz + loch, loch * .7, loch, loch);
        }

        /* Tonspur, gleiche Phase */
        const mitte = bildH + spalt + tonH / 2;
        const anzahl = Math.max(40, Math.round(B / 6));
        const luecke = B / anzahl, dick = Math.max(1.4, luecke * .5);
        let summe = 0;
        z.fillStyle = 'rgba(0,0,0,.26)';
        for (let i = 0; i < anzahl; i++) {
          const a = w.werte[Math.floor((i + w.phase) % w.werte.length)];
          summe += a;
          const h = Math.max(2, a * tonH);
          z.fillRect(i * luecke, mitte - h / 2, dick, h);
        }
        w.energie = summe / anzahl;

        /* Die Schnittkanten: durch beide Spuren, weil ein Schnitt beide
           trifft. Genau darum geht der Ton beim Schnitt so oft kaputt. */
        z.fillStyle = w.wortFarbe;
        for (const s of w.schnitte) {
          const x = B - (w.phase - s) * 1.6;
          if (x < -3 || x > B) continue;
          z.fillRect(x - 1.5, 0, 3, H);
        }
      },
    },

    /* 02 — Sternvierer. Vier Adern, paarweise verdrillt: genau die
       Bauform, die im Text steht. Sie laufen durch den Balken, als ob man
       ein Kabel durch die Hand zieht. */
    sternvierer: {
      bauen(w) {
        w.pruef = 0;      /* Wo die Prüfung gerade steht, 0…1 */
        w.ader = 0;       /* Welche Ader gerade dran ist */
      },
      malen(w, z, B, H, t) {
        const mitte = H / 2;
        const A = H * .26;
        const welle = 2 * Math.PI / Math.max(90, H * 1.5);
        z.lineWidth = Math.max(2, H * .055);
        z.lineCap = 'round';

        /* Mantel: zwei ruhige Linien aussen */
        z.strokeStyle = 'rgba(0,0,0,.13)';
        for (const v of [-1, 1]) {
          z.beginPath();
          z.moveTo(0, mitte + v * A * 1.42);
          z.lineTo(B, mitte + v * A * 1.42);
          z.stroke();
        }

        /* Vier Adern, zwei Paare um eine Vierteldrehung versetzt */
        const paare = [
          { ver: 0,             deck: .30, amp: 1 },
          { ver: Math.PI,       deck: .30, amp: 1 },
          { ver: Math.PI / 2,   deck: .18, amp: .62 },
          { ver: Math.PI * 1.5, deck: .18, amp: .62 },
        ];
        for (const ader of paare) {
          z.strokeStyle = `rgba(0,0,0,${ader.deck})`;
          z.beginPath();
          for (let x = 0; x <= B; x += 3) {
            const y = mitte + Math.sin(x * welle + w.phase * .05 + ader.ver) * A * ader.amp;
            x === 0 ? z.moveTo(x, y) : z.lineTo(x, y);
          }
          z.stroke();
        }

        /* Durchgangsprüfung. Ein heller Punkt läuft eine Ader entlang,
           von Stecker zu Stecker; ist er durch, ist die nächste dran und
           danach fängt es von vorne an. Genau das steht im Datenblatt
           dieses Abschnitts: «jede Ader einzeln durchgemessen». Der Punkt
           läuft in der zweiten Druckfarbe — es bleibt bei zwei Farben. */
        if (!w.statisch && !ruhig.matches) {
          w.pruef += .0055;
          if (w.pruef > 1.18) { w.pruef = 0; w.ader = (w.ader + 1) % paare.length; }
        }
        /* Steht die Spur still, entfällt die Prüfung ganz. Sonst klebte
           ihr Punkt bei Null am linken Rand — eine Prüfung, die nie
           losläuft, ist keine. */
        if (!w.statisch && w.pruef <= 1) {
          const ader = paare[w.ader];
          const x = w.pruef * B;
          const y = mitte + Math.sin(x * welle + w.phase * .05 + ader.ver) * A * ader.amp;
          /* Der geprüfte Abschnitt bleibt hinter dem Punkt stehen. */
          z.strokeStyle = w.wortFarbe;
          z.lineWidth = Math.max(2, H * .055);
          z.beginPath();
          for (let px = 0; px <= x; px += 3) {
            const py = mitte + Math.sin(px * welle + w.phase * .05 + ader.ver) * A * ader.amp;
            px === 0 ? z.moveTo(px, py) : z.lineTo(px, py);
          }
          z.stroke();
          z.fillStyle = w.wortFarbe;
          z.beginPath();
          z.arc(x, y, Math.max(3.5, H * .052), 0, 6.2832);
          z.fill();
          w.energie = .30 + w.pruef * .45;
        } else {
          w.energie = .22;
        }
      },
    },

    /* 03 — Spektrum mit Kick. Ein Set: dicht, unten angeschlagen, oben in
       der Begrenzung. Der Puls sitzt auf 124 Schlägen und pumpt die
       ganze Spur — wer im Club steht, kennt die Bewegung. */
    spektrum: {
      bauen(w) {
        const r = zufall(w.saat);
        w.baender = [];
        const n = 56;
        for (let i = 0; i < n; i++) {
          /* Fällt zu den Höhen hin ab, wie jedes echte Spektrum. */
          const grund = Math.pow(1 - i / n, .78) * .82 + .12;
          w.baender.push({ grund, flimmer: r() * 6.283, tempo: .8 + r() * 1.9 });
        }
      },
      malen(w, z, B, H, t) {
        const n = w.baender.length;
        const luecke = B / n, dick = Math.max(2, luecke * .62);
        /* 124 Schläge je Minute → 484 ms je Schlag */
        const puls = w.statisch ? .82 : Math.pow(1 - ((t % 484) / 484), 2.4) * .42 + .72;
        /* Der Schlag verlässt den Balken: die Fläche des Abschnitts atmet
           mit, und der Pegel in der Spur pumpt. Beides sehr wenig — es
           soll wirken, nicht auffallen. */
        w.puls = puls;
        w.energie = Math.min(1, (puls - .70) * 2.1 + .34);
        z.fillStyle = 'rgba(0,0,0,.24)';
        for (let i = 0; i < n; i++) {
          const b = w.baender[i];
          const flimmer = w.statisch ? .9 : Math.sin(t / 150 * b.tempo + b.flimmer) * .16 + .88;
          const h = Math.min(H * .9, b.grund * flimmer * puls * H);
          z.fillRect(i * luecke, H - h, dick, h);
        }
        /* Begrenzung: die Linie, über die kein Band mehr hinauskommt.
           Sie zieht auf dem Schlag an — das ist der Moment, in dem der
           Begrenzer wirklich arbeitet. */
        z.fillStyle = `rgba(0,0,0,${.26 + (puls - .70) * .5})`;
        z.fillRect(0, H * .09, B, Math.max(1.5, H * .014));
      },
    },

    /* 04 — Spektrogramm. Die Ansicht, in der ein Feldrecordist eine
       Aufnahme wirklich anschaut: Frequenz über Zeit. Meist nur
       Grundrauschen, dann ein Ereignis, das über alle Lagen geht — Eis,
       das arbeitet. Läuft auf einer eigenen Leinwand mit Gedächtnis:
       je Bild wird das Bisherige um eine Spalte nach links geschoben und
       rechts eine neue angehängt. */
    spektrogramm: {
      bauen(w) {
        w.wurf = zufall(w.saat);
        w.ereignis = 0;
        w.marken = [];
        w.zaehler = 0;
      },
      messen(w) {
        w.spg = document.createElement('canvas');
        w.spg.width = Math.max(1, Math.round(w.breite * w.dpr));
        w.spg.height = Math.max(1, Math.round(w.hoehe * w.dpr));
        w.spgZ = w.spg.getContext('2d');
        w.spalteBreit = Math.max(1, Math.round(2 * w.dpr));
        /* Vorfüllen: eine Feldaufnahme lief schon, bevor jemand
           hinschaut. Ohne das baut sich die Spur erst am rechten Rand auf
           und die halbe Fläche bleibt leer.
           Hier NICHT über `schieben` — das kopierte je Spalte die ganze
           Leinwand, also tausendmal bei voller Breite. Stattdessen von
           links nach rechts direkt an ihren Platz gemalt. */
        for (let x = 0; x < w.spg.width; x += w.spalteBreit) {
          SPUREN.spektrogramm.spalte(w, x);
        }
      },
      /** Eine Spalte an Stelle x. Rechnet den Zustand weiter. */
      spalte(w, x) {
        const z = w.spgZ, H = w.spg.height, s = w.spalteBreit;
        z.clearRect(x, 0, s, H);

        /* Ereignisse kommen selten und klingen aus. Jedes bekommt eine
           Marke — genau das tut ein Feldrecorder, wenn etwas passiert,
           damit man es später wiederfindet. */
        if (w.ereignis > 0) w.ereignis *= .93;
        if (w.wurf() < .006) {
          w.ereignis = 1;
          w.marken.push({ x: x / w.dpr, nr: ++w.zaehler });
        }

        const lagen = 22, lh = H / lagen;
        for (let i = 0; i < lagen; i++) {
          /* Tiefe Lagen tragen das Grundrauschen, hohe bleiben leer —
             bis ein Ereignis kommt, das über alles geht. */
          const tief = Math.pow(1 - i / lagen, 2.3);
          /* Das Zufallsglied MUSS mit der Lage abfallen. Liegt es gleich
             auf allen Lagen, bekommt auch der oberste Bereich noch etwas
             ab und der Balken läuft als graue Fläche zu — bei einer
             Feldaufnahme ist oben aber fast nichts. */
          const grund = tief * (.30 + w.wurf() * .20);
          const stoss = w.ereignis * (.38 + w.wurf() * .46) * (1 - i / lagen * .3);
          const deck = Math.min(.55, grund + stoss);
          if (deck < .045) continue;
          z.fillStyle = `rgba(0,0,0,${deck})`;
          z.fillRect(x, H - (i + 1) * lh, s, lh + 1);
        }
      },
      /** Alles um eine Spalte nach links, rechts eine neue anhängen. */
      schieben(w) {
        const z = w.spgZ, B = w.spg.width, s = w.spalteBreit;
        z.globalCompositeOperation = 'copy';
        z.drawImage(w.spg, -s, 0);
        z.globalCompositeOperation = 'source-over';
        SPUREN.spektrogramm.spalte(w, B - s);
      },
      malen(w, z, B, H) {
        if (!w.spg) return;
        if (!w.statisch && !ruhig.matches) {
          SPUREN.spektrogramm.schieben(w);
          const s = w.spalteBreit / w.dpr;
          for (const m of w.marken) m.x -= s;
          while (w.marken.length && w.marken[0].x < -40) w.marken.shift();
        }
        z.drawImage(w.spg, -2, -2, B + 4, H + 4);   /* Zugabe, siehe malen() */

        /* Die Marken: Strich am oberen Rand plus laufende Nummer. */
        const hoch = Math.max(9, H * .17);
        z.fillStyle = w.wortFarbe;
        z.textAlign = 'left';
        z.font = `${Math.max(8, H * .075)}px "Mono", monospace`;
        for (const m of w.marken) {
          if (m.x < -20 || m.x > B) continue;
          z.fillRect(m.x, 0, 2, hoch);
          z.fillText(String(m.nr).padStart(2, '0'), m.x + 5, hoch * .82);
        }
        w.energie = Math.min(1, .08 + w.ereignis * .9);
      },
    },
  };

  const wellen = [];

  function bauen(leinwand) {
    const art = leinwand.dataset.spur || 'pegel';
    const spur = SPUREN[art] || SPUREN.pegel;
    const eltern = leinwand.parentElement;
    const w = {
      leinwand, spur, art,
      zeichner: leinwand.getContext('2d'),
      eltern,
      wort: leinwand.dataset.wort,
      saat: Number(leinwand.dataset.saat) || 1,
      statisch: leinwand.dataset.statisch === '1',
      /* Farben über `color` lesen, nicht über getPropertyValue: die Werte
         stehen als var(--verdigris) in der Auszeichnung, damit tokens.css
         die einzige Quelle bleibt. Ein Custom Property liefert je nach
         Browser den unaufgelösten Text zurück — `color` ist immer eine
         fertige Farbe. Der Balken trägt die Wortfarbe, das Canvas die
         Balkenfarbe; beide setzt global.css. */
      bar: getComputedStyle(leinwand).color,
      /* Die zweite Druckfarbe. Alles, was sich vom Untergrund abheben
         soll — Spitzenhaltung, Schnittkante, Prüfpunkt, Marke — wird
         damit gemalt. So bleibt es bei zwei Farben je Balken, wie im
         Druck. Schwarz mit Deckkraft geht nur nach unten. */
      wortFarbe: getComputedStyle(eltern).color,
      sichtbar: false,
      phase: Number(leinwand.dataset.saat) || 1,
      breite: 0, hoehe: 0, dpr: 1,
    };
    spur.bauen(w);
    messen(w);
    wellen.push(w);
    return w;
  }

  function messen(w) {
    /* clientWidth, NICHT getBoundingClientRect: der Balken steht beim
       Aufbau noch auf scaleX(.04) — dem Auftritt. Das Rechteck lieferte
       dann vier Prozent der Breite. clientWidth ist die Layoutbreite und
       kennt die Transformation nicht. */
    const breite = w.eltern.clientWidth;
    if (!breite) return;
    w.dpr = Math.min(devicePixelRatio || 1, 2);
    /* Höhenverhältnis vom gedruckten Kleber übernommen. */
    const hoehe = Math.max(70, Math.min(breite * .24, 260));
    w.breite = breite;
    w.hoehe = hoehe;
    w.leinwand.style.height = hoehe + 'px';
    w.leinwand.width = Math.round(breite * w.dpr);
    w.leinwand.height = Math.round(hoehe * w.dpr);
    if (w.spur.messen) w.spur.messen(w);
  }

  function malen(w, zeit) {
    const { zeichner: z, breite: B, hoehe: H, dpr } = w;
    if (!B || !H) return;
    z.setTransform(dpr, 0, 0, dpr, 0, 0);
    z.clearRect(0, 0, B, H);

    /* Lage 2: die Balkenfarbe — MIT ZUGABE über den Rand hinaus.
       `clientWidth` liefert eine gerundete Ganzzahl, die wirkliche Fläche
       ist oft einen Bruchteil breiter. Malt man exakt bis B, bleibt rechts
       (und je nach Bildschirm oben oder unten) eine Haarlinie stehen, durch
       die der helle Untergrund des Balkens scheint — der weisse Rand.
       Zugabe ist im Druck dasselbe Mittel gegen dasselbe Problem. */
    z.fillStyle = w.bar;
    z.fillRect(-2, -2, B + 4, H + 4);

    /* Die Spur des Abschnitts. */
    w.spur.malen(w, z, B, H, zeit);

    /* Lage 3: das Wort wird ausgestanzt.
       destination-out radiert mit der ALPHA der Quelle — die Füllfarbe
       steht hier noch auf der halbdurchsichtigen Spurfarbe und würde das
       Wort nur zu einem Fünftel freistellen. Also zuerst auf Vollton. */
    z.fillStyle = '#000';
    z.globalCompositeOperation = 'destination-out';
    z.textAlign = 'center';
    z.textBaseline = 'alphabetic';
    const grad = passen(z, w.wort, B * .9, H);
    z.font = `${grad}px "Fett", "Arial Black", sans-serif`;
    /* Versalien stehen auf der Grundlinie; der Raum für Unterlängen bleibt
       leer. Darum nicht auf die Mitte setzen, sondern die gemessene
       Versalhöhe mittig ausrichten — derselbe Fehler wie im Druck. */
    const m = z.measureText(w.wort);
    const oben = m.actualBoundingBoxAscent || grad * .72;
    const unten = m.actualBoundingBoxDescent || 0;
    z.fillText(w.wort, B / 2, (H + oben - unten) / 2);
    z.globalCompositeOperation = 'source-over';
  }

  /** Grösster Schriftgrad, bei dem das Wort in Breite und Höhe passt.
   *  Der Name der Schrift ist «Fett», nicht «Archivo Black» — sie liegt
   *  lokal und ist in tokens.css so benannt. Wer hier den Originalnamen
   *  einsetzt, bekommt die Ersatzschrift ins Canvas, und das Wort sitzt
   *  sichtbar schmaler im Balken als die Zeile darunter. */
  function passen(z, wort, maxB, maxH) {
    let grad = maxH * .8;
    for (let i = 0; i < 12; i++) {
      z.font = `${grad}px "Fett", "Arial Black", sans-serif`;
      const b = z.measureText(wort).width;
      if (b <= maxB) break;
      grad *= maxB / b;
    }
    return Math.max(10, Math.min(grad, maxH * .74));
  }


  /* --- Schleife: nur sichtbare Wellen werden gemalt ------------------- */
  let laeuft = false;
  function schleife(zeit) {
    let offen = false;
    for (const w of wellen) {
      if (!w.sichtbar) continue;
      offen = true;
      if (!w.statisch && !ruhig.matches) w.phase += .34 + zug;
      malen(w, zeit);
    }
    zug *= .90;
    if (Math.abs(zug) < .01) zug = 0;
    pegelNachfuehren();
    if (offen) requestAnimationFrame(schleife);
    else laeuft = false;
  }
  function anstossen() {
    if (laeuft) return;
    laeuft = true;
    requestAnimationFrame(schleife);
  }

  /* --- Der Pegel unten in der Spur ------------------------------------
     Er zeigt die Energie der Spur, die gerade im Bild ist. Damit hat das
     Bauteil in jedem Abschnitt einen anderen Charakter: es atmet, es
     pumpt auf dem Schlag, es steht still und schlägt nur bei einem
     Ereignis aus. Die Spitze fällt langsam zurück, wie bei jedem Gerät. */
  let fuellung, spitzeEl, spitzeWert = 0, aktiveWelle = null;
  function pegelNachfuehren() {
    if (!fuellung) return;
    const e = aktiveWelle && aktiveWelle.sichtbar ? (aktiveWelle.energie || 0) : 0;
    spitzeWert = Math.max(e, spitzeWert - .004);
    fuellung.style.width = (e * 100).toFixed(1) + '%';
    spitzeEl.style.left = (spitzeWert * 100).toFixed(1) + '%';
  }

  /* --- Aufbau --------------------------------------------------------- */
  function start() {
    document.querySelectorAll('[data-balken]').forEach(bauen);

    /* Jedem Balken einmal ein Bild geben, bevor irgendwer scrollt.
       Gezeichnet wird sonst nur, was im Bild ist — ein nie gezeichneter
       Balken wäre durchsichtig, und durch ihn schiene die helle Wortfarbe
       als volle Fläche. Beim Hereinscrollen gäbe das ein Aufblitzen. */
    for (const w of wellen) malen(w, 0);

    const wache = new IntersectionObserver((eintraege) => {
      for (const e of eintraege) {
        const w = wellen.find((x) => x.leinwand === e.target);
        if (w) w.sichtbar = e.isIntersecting;
      }
      anstossen();
    }, { rootMargin: '120px' });
    wellen.forEach((w) => wache.observe(w.leinwand));

    /* Auftritt je Abschnitt, einmal. */
    const auftritt = new IntersectionObserver((eintraege) => {
      for (const e of eintraege) {
        if (e.isIntersecting) {
          e.target.dataset.an = 'true';
          auftritt.unobserve(e.target);
        }
      }
    }, { threshold: .28 });
    document.querySelectorAll('[data-abschnitt]').forEach((a) => auftritt.observe(a));

    let warten;
    addEventListener('resize', () => {
      clearTimeout(warten);
      warten = setTimeout(() => { wellen.forEach(messen); anstossen(); }, 140);
    });

    fuellung = document.querySelector('[data-fuellung]');
    spitzeEl = document.querySelector('[data-spitze]');

    /* Der Schlag aus 03 auf die Fläche des Abschnitts. Nur solange sie
       sichtbar ist — sonst rechnet der Browser an etwas, das niemand
       sieht. */
    const pulsFlaeche = document.querySelector('[data-puls]');
    const pulsWelle = wellen.find((x) => x.art === 'spektrum');
    if (pulsFlaeche && pulsWelle && !ruhig.matches) {
      const takt = () => {
        pulsFlaeche.style.opacity = pulsWelle.sichtbar
          ? Math.max(0, (pulsWelle.puls || .7) - .70) * .115
          : 0;
        requestAnimationFrame(takt);
      };
      takt();
    }

    spurBauen();
    anstossen();
  }

  /* ---------------------------------------------------------------------
     Die Spur: Timecode und Abspielkopf, aus der Bildlaufhöhe gerechnet.
     Vierundzwanzig Bilder je Sekunde, weil die Seite von Film handelt.
     --------------------------------------------------------------------- */
  function spurBauen() {
    const code = document.querySelector('[data-code]');
    const kopf = document.querySelector('[data-kopf]');
    const bahn = document.querySelector('[data-bahn]');
    const wo = document.querySelector('[data-wo]');
    const abschnitte = [...document.querySelectorAll('[data-abschnitt]')];
    const namen = abschnitte.map((a) => a.dataset.name || '');
    const GESAMT = 264; /* Sekunden, rein erzählerisch */

    /* Klippgrenzen auf der Bahn — dieselbe Zahl wie Abschnitte. */
    abschnitte.forEach((_, i) => {
      if (i === 0) return;
      const s = document.createElement('span');
      s.className = 'spur__clip';
      s.style.left = (i / abschnitte.length * 100) + '%';
      s.style.width = (1 / abschnitte.length * 100) + '%';
      bahn.appendChild(s);
    });

    const zwei = (n) => String(Math.floor(n)).padStart(2, '0');
    let angefragt = false;

    function nach() {
      angefragt = false;
      const hoch = document.documentElement.scrollHeight - innerHeight;
      const t = hoch > 0 ? Math.min(1, Math.max(0, scrollY / hoch)) : 0;
      const s = t * GESAMT;
      code.textContent = `${zwei(0)}:${zwei(s / 60)}:${zwei(s % 60)}:${zwei((s % 1) * 24)}`;
      kopf.style.transform = `translateX(${t * bahn.clientWidth}px)`;

      const mitte = innerHeight / 2;
      for (let i = 0; i < abschnitte.length; i++) {
        const k = abschnitte[i].getBoundingClientRect();
        if (k.top <= mitte && k.bottom >= mitte) {
          wo.textContent = namen[i];
          const l = abschnitte[i].querySelector('[data-balken]');
          aktiveWelle = l ? wellen.find((x) => x.leinwand === l) : null;
          break;
        }
      }
    }

    addEventListener('scroll', () => {
      if (angefragt) return;
      angefragt = true;
      requestAnimationFrame(nach);
    }, { passive: true });
    nach();
  }

  /* Erst wenn die Leitschrift da ist — sonst wird das Wort mit der
     Ersatzschrift ausgestanzt und sitzt sichtbar daneben. */
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(start);
  else addEventListener('load', start);
}
