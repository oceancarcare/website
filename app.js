(function () {
  const { useState, useEffect, useRef, useMemo } = React;
  const h = (t, p, ...c) => {
    if (p && p.class) {
      p.className = p.class;
      delete p.class;
    }
    return React.createElement(t, p, ...c);
  };
  const html = htm.bind(h);
  const LOGO = "assets/logo.png";
  const PHONE = "918086966660";
  // Set a local or hosted video URL to enable the optional detailing reel.
  const VIDEOS = ["", "", ""];
  const wa = (t) =>
    "https://wa.me/" + PHONE + (t ? "?text=" + encodeURIComponent(t) : "");
  const PAGES = [
    ["home", "Home"],
    ["services", "Services"],
    ["gallery", "Gallery"],
    ["about", "About"],
    ["contact", "Contact"],
  ];
  const SVALL = [
    {
      k: "Ceramic Coating",
      a: "ceramic",
      u: "--u-cc",
      d: "Deep gloss and long-lasting protection for your paint.",
      c: ["Deep gloss", "Hydrophobic"],
    },
    {
      k: "Paint Protection",
      a: "paint",
      u: "--u-pp",
      d: "Paint restoration and protection treatments, done by hand.",
      c: ["Restoration", "Protection"],
    },
    {
      k: "Germ Clean",
      a: "germ",
      u: "--u-gc",
      d: "Interior treatment that removes 99% of bacteria.",
      c: ["Bacteria-free", "Hygiene care"],
    },
    {
      k: "Interior Enrichment",
      a: "interior",
      d: "Seats, trim and cabin restored and refreshed.",
      c: ["Seats and trim", "Fresh cabin"],
    },
    {
      k: "Anti Rust Coating",
      a: "rust",
      u: "--u-ar",
      d: "A protective coat against rust and corrosion.",
      c: ["Underbody", "Corrosion defence"],
    },
    {
      k: "Headlight Restoration",
      a: "lamp",
      d: "Clear, bright lenses restored to look new.",
      c: ["Clear lenses", "UV seal"],
    },
    {
      k: "Floor Lamination",
      a: "floor",
      d: "Leather or vinyl flooring, neatly laminated.",
      c: ["Leather", "Vinyl"],
    },
    {
      k: "Car Sanitization",
      a: "sani",
      d: "Full-cabin sanitising for a safe, clean ride.",
      c: ["Full cabin", "Safe sanitising"],
    },
  ];
  const SV = SVALL.filter((x) => x.u);
  const BODY = {
    coupe: {
      b: "M30 150 C30 138 48 132 80 128 L150 118 C185 84 235 66 300 62 C360 60 412 70 446 92 L500 108 C548 114 575 126 578 144 L580 158 C580 164 574 168 566 168 L536 168 A44 44 0 0 0 448 168 L190 168 A44 44 0 0 0 102 168 L44 168 C34 168 30 162 30 154 Z",
      g: "M170 116 L214 88 Q250 76 300 74 L372 76 Q412 82 432 104 L436 116 Z",
      y: 168,
    },
    suv: {
      b: "M34 156 C34 140 50 134 78 130 L120 124 L168 82 C176 74 190 70 206 70 L420 70 C440 70 452 76 464 88 L500 118 C548 122 572 132 576 148 L578 160 C578 166 572 170 564 170 L536 170 A44 44 0 0 0 448 170 L190 170 A44 44 0 0 0 102 170 L46 170 C38 170 34 164 34 158 Z",
      g: "M186 116 L214 84 L300 82 L300 116Z M312 82 L420 82 Q436 84 448 98 L458 116 L312 116Z",
      y: 170,
    },
  };
  function Wheel({ x, y }) {
    return html`<g
      ><circle cx=${x} cy=${y} r="36" fill="#05060a" /><circle
        cx=${x}
        cy=${y}
        r="27"
        fill="url(#rim)"
        stroke="#9aa6bd"
        strokeWidth="1" /><g class="whl"
        >${[0, 72, 144, 216, 288].map((a) => html`<line key=${a} x1=${x} y1=${y} x2=${x + 22 * Math.cos((a * Math.PI) / 180)} y2=${y + 22 * Math.sin((a * Math.PI) / 180)} stroke="#0a0d14" strokeWidth="5" strokeLinecap="round" />`)}</g
      ><circle cx=${x} cy=${y} r="7" fill="#d8e0ee"
    /></g>`;
  }
  function Lux({ t, c }) {
    const B = BODY[t || "coupe"];
    return html`<g
      ><ellipse
        cx="305"
        cy="178"
        rx="275"
        ry="10"
        fill="#000"
        opacity=".5" /><path
        d=${B.b}
        fill=${"url(#body" + (c || "Blue") + ")"}
        stroke="rgba(255,255,255,.3)"
        strokeWidth="1.5" /><path d=${B.g} fill="url(#glass)" /><path
        d="M120 126 C210 98 310 92 430 106"
        fill="none"
        stroke="#fff"
        strokeOpacity=".5"
        strokeWidth="2"
        strokeLinecap="round" /><path
        d="M304 80 L308 158"
        stroke="#000"
        strokeOpacity=".3"
        strokeWidth="1.5" /><rect
        x="318"
        y="108"
        width="22"
        height="4"
        rx="2"
        fill="#fff"
        fillOpacity=".55" /><circle
        cx="558"
        cy="128"
        r="32"
        fill="url(#hl)" /><path
        d="M548 122 L574 130 L566 136 L546 130Z"
        fill="#fff" /><path
        d="M34 134 L54 132 L52 141 L34 143Z"
        fill="#ff3b47" /><${Wheel} x=${146} y=${B.y} /><${Wheel}
        x=${492}
        y=${B.y}
    /></g>`;
  }
  function CarSvg({ t, c }) {
    return html`<svg viewBox="0 0 600 220" aria-hidden="true">
      <${Lux} t=${t} c=${c} />
    </svg>`;
  }
  const SK = {
    car: {
      vb: "0 0 400 130",
      p: [
        "M10 95 Q14 82 40 78 L90 70 Q130 38 190 32 Q235 30 262 44 L300 66 Q350 70 380 84 Q392 90 390 100 L388 104 H10 Z",
        "M110 66 Q140 44 190 40 Q225 40 248 52 L268 66 Z",
        "M130 66 H260",
        "M-30 60 H30 M-50 80 H10",
      ],
      c: [
        [88, 104, 20],
        [88, 104, 10],
        [312, 104, 20],
        [312, 104, 10],
      ],
    },
    pol: {
      vb: "0 0 100 100",
      p: [
        "M20 30 H60 Q72 30 72 40 V48 H20 Z",
        "M46 48 V62",
        "M22 62 H70 L63 76 H29 Z",
        "M72 38 H94",
        "M30 82 Q46 90 62 82",
      ],
    },
    spr: {
      vb: "0 0 100 100",
      p: [
        "M12 38 H56 Q64 38 64 46 V54 H42 L38 68 H28 L31 54 H12 Z",
        "M64 44 H78",
        "M84 38 L98 32",
        "M86 46 H100",
        "M84 54 L98 60",
      ],
    },
    sqg: {
      vb: "0 0 100 100",
      p: [
        "M10 60 H90 V72 H10 Z",
        "M50 60 V18",
        "M42 18 H58",
        "M16 80 Q50 88 84 80",
      ],
    },
    bkt: {
      vb: "0 0 100 100",
      p: [
        "M24 44 H76 L68 90 H32 Z",
        "M24 44 Q50 36 76 44",
        "M30 38 Q50 6 70 38",
      ],
      c: [
        [34, 24, 5],
        [66, 22, 7],
        [52, 10, 4],
      ],
    },
    cl: {
      vb: "0 0 100 100",
      p: ["M12 36 Q32 20 50 36 T88 36 V74 Q70 58 50 74 T12 74 Z", "M24 52 H76"],
    },
  };
  function Sk({ t, rot, delay }) {
    const s = SK[t];
    return html`<svg
      viewBox=${s.vb}
      aria-hidden="true"
      style=${{ transform: "rotate(" + (rot || 0) + "deg)", animationDelay: (delay || 0) + "s" }}
    >
      ${s.p.map((d, i) => html`<path key=${i} class="d" pathLength="1" d=${d} />`)}${(s.c || []).map((c, i) => html`<circle key=${"c" + i} class="d" pathLength="1" cx=${c[0]} cy=${c[1]} r=${c[2]} />`)}
    </svg>`;
  }
  function Bg({ items }) {
    return html`<div class="skl" aria-hidden="true">
      ${items.map((o, i) => html`<span key=${i} class="fs" style=${{ left: o[1] + "%", top: o[2] + "%", width: o[3] + "px", animationDelay: "-" + i * 1.7 + "s" }}><${Sk} t=${o[0]} rot=${o[4]} delay=${i * 0.9} /></span>`)}
    </div>`;
  }
  function Spk({ x, y, d, s }) {
    const k = s || 1;
    return html`<g
      transform=${"translate(" + x + "," + y + ") scale(" + k + ")"}
      ><path
        class="sp2"
        style=${{ animationDelay: (d || 0) + "s" }}
        d="M0-9L2.5-2.5 9 0 2.5 2.5 0 9-2.5 2.5-9 0-2.5-2.5Z"
    /></g>`;
  }
  function Wash({ n }) {
    const foam = useMemo(
      () =>
        Array.from({ length: n || 34 }, (_, i) => ({
          x: 40 + Math.random() * 520,
          y: 64 + Math.random() * 100,
          r: 10 + Math.random() * 18,
          d: i * 0.05,
        })),
      [],
    );
    const bub = useMemo(
      () =>
        Array.from({ length: 12 }, () => ({
          x: 60 + Math.random() * 680,
          r: 3 + Math.random() * 7,
          d: Math.random() * 6,
          t: 5 + Math.random() * 4,
        })),
      [],
    );
    return html`<svg
      viewBox="0 0 800 520"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="800" height="520" fill="url(#sceneBg)" />
      <g class="rays">
        <path d="M210 0H300L470 440H150Z" fill="url(#ray)" />
        <path
          d="M470 0H540L700 440H540Z"
          fill="url(#ray)"
          style=${{ animationDelay: "-2s" }}
        />
      </g>
      <ellipse cx="400" cy="440" rx="380" ry="64" fill="url(#floor)" />
      <g transform="translate(100,168)">
        <${Lux} t="coupe" c="Blue" />
        <g clipPath="url(#cpCoupe)">
          ${foam.map((f, i) => html`<circle key=${i} class="fm" cx=${f.x} cy=${f.y} r=${f.r} style=${{ animationDelay: f.d + "s" }} />`)}
          <rect
            class="sw"
            x="-40"
            y="40"
            width="90"
            height="150"
            fill="url(#shg)"
          />
        </g>
        <g class="spx">
          ${[
            [170, 86],
            [330, 70],
            [470, 100],
          ].map(
            (p, i) =>
              html`<g
                key=${i}
                transform=${"translate(" + p[0] + "," + p[1] + ") scale(1.6)"}
                ><path
                  class="sp"
                  style=${{ animationDelay: i * 0.15 + "s" }}
                  d="M0-9L2.5-2.5 9 0 2.5 2.5 0 9-2.5 2.5-9 0-2.5-2.5Z"
              /></g>`,
          )}
        </g>
      </g>
      <line class="jt" x1="60" y1="40" x2="330" y2="250" />
      <line
        class="jt"
        x1="60"
        y1="90"
        x2="300"
        y2="290"
        style=${{ animationDelay: ".1s" }}
      />
      <line
        class="jt"
        x1="740"
        y1="40"
        x2="520"
        y2="250"
        style=${{ animationDelay: ".15s" }}
      />
      <line
        class="jt"
        x1="740"
        y1="90"
        x2="560"
        y2="280"
        style=${{ animationDelay: ".25s" }}
      />
      ${bub.map((b, i) => html`<circle key=${"b" + i} class="bu" cx=${b.x} cy="470" r=${b.r} style=${{ animationDuration: b.t + "s", animationDelay: b.d + "s" }} />`)}
    </svg>`;
  }
  function Reel({ src, cap, n, tag }) {
    return html`<div class="vf">
      <${Wash}
        n=${n}
      />${src ? html`<video src=${src} autoplay muted loop playsinline></video>` : null}${cap ? html`<span class="cap">${cap}</span>` : null}${tag === false ? null : html`<span class="tag">DEMO REEL</span>`}
      <div class="pbar"><i></i></div>
    </div>`;
  }
  const ART = {
    ceramic: () =>
      html`<g transform="translate(-30,56) scale(.58)"
          ><${Lux} t="coupe" c="Blue" /></g
        >${[
          [196, 102],
          [214, 98],
          [236, 106],
          [256, 112],
          [204, 114],
          [226, 120],
          [244, 98],
          [176, 110],
          [262, 102],
        ].map(
          (p, i) =>
            html`<g key=${i}
              ><circle
                cx=${p[0]}
                cy=${p[1]}
                r="4"
                fill="rgba(190,235,255,.35)"
                stroke="#bfe8ff"
                strokeWidth=".8" /><circle
                cx=${p[0] - 1.2}
                cy=${p[1] - 1.4}
                r="1.1"
                fill="#fff"
            /></g>`,
        )}<g transform="translate(62,36)"
          ><path
            d="M0 -22 L28 -12 V12 C28 30 14 40 0 46 C-14 40 -28 30 -28 12 V-12Z"
            fill="rgba(255,43,56,.25)"
            stroke="#fff"
            strokeWidth="2" /><path
            d="M-12 8 l8 8 l16 -18"
            fill="none"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
        /></g>`,
    paint: () =>
      html`<g transform="translate(-30,60) scale(.58)"
          ><${Lux} t="coupe" c="Red" /></g
        ><g transform="translate(206,64)"
          ><rect
            x="-8"
            y="-40"
            width="30"
            height="20"
            rx="7"
            fill="#d4dbea" /><rect
            x="2"
            y="-22"
            width="10"
            height="26"
            fill="#8f9ab0" /><ellipse
            cx="7"
            cy="14"
            rx="36"
            ry="9"
            fill="#ffb020" /><ellipse
            class="swl"
            cx="7"
            cy="19"
            rx="48"
            ry="12"
            fill="none"
            stroke="#fff"
            strokeOpacity=".6"
            strokeDasharray="7 9" /></g
        ><${Spk} x=${190} y=${88} d=${0} /><${Spk}
          x=${262}
          y=${96}
          d=${0.8}
          s=${0.8}
        />`,
    germ: () =>
      html`<circle
          cx="150"
          cy="112"
          r="58"
          fill="none"
          stroke="#cfe3ff"
          strokeWidth="11"
        /><circle
          cx="150"
          cy="112"
          r="15"
          fill="#1b2a45"
          stroke="#8fb4ff"
          strokeWidth="2"
        /><path
          d="M100 118 H200 M150 127 V165"
          stroke="#cfe3ff"
          strokeWidth="9"
          strokeLinecap="round"
        /><path d="M0 172 Q160 132 320 172 V200 H0Z" fill="#0a1426" />${[
          [60, 50],
          [96, 36],
          [230, 60],
          [262, 100],
          [40, 120],
          [246, 150],
          [200, 30],
        ].map(
          (p, i) =>
            html`<circle
              key=${i}
              class="gm"
              cx=${p[0]}
              cy=${p[1]}
              r="5"
              style=${{ animationDelay: i * 0.35 + "s" }}
            />`,
        )}<g transform="translate(262,48)"
          ><path
            d="M0 -22 L26 -12 V12 C26 28 14 38 0 44 C-14 38 -26 28 -26 12 V-12Z"
            fill="rgba(255,43,56,.3)"
            stroke="#fff"
            strokeWidth="2" /><path
            d="M-11 8 l8 8 l15 -17"
            fill="none"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
        /></g>`,
    interior: () =>
      html`<path
          d="M120 26 Q120 14 134 14 H186 Q200 14 200 26 V104 H120Z"
          fill="#17254a"
          stroke="#4a73d0"
          strokeWidth="2"
        /><path
          d="M104 104 H216 Q228 104 228 116 V138 Q228 150 216 150 H104 Q92 150 92 138 V116 Q92 104 104 104Z"
          fill="#1c2d5c"
          stroke="#4a73d0"
          strokeWidth="2"
        /><rect
          x="142"
          y="0"
          width="36"
          height="14"
          rx="5"
          fill="#17254a"
          stroke="#4a73d0"
          strokeWidth="2"
        /><path
          d="M132 36 V96 M188 36 V96 M110 126 H210"
          stroke="#7fa6ff"
          strokeWidth="1.5"
          strokeDasharray="5 5"
          fill="none"
        /><path d="M0 170 Q160 150 320 170 V200 H0Z" fill="#0a1426" /><${Spk}
          x=${70}
          y=${70}
          d=${0}
          s=${1.6}
        /><${Spk} x=${256} y=${60} d=${0.9} s=${1.2} /><${Spk}
          x=${240}
          y=${150}
          d=${1.6}
        />`,
    rust: () =>
      html`<rect
          x="14"
          y="120"
          width="292"
          height="18"
          rx="5"
          fill="#1b2744"
        /><rect
          x="14"
          y="148"
          width="292"
          height="18"
          rx="5"
          fill="#1b2744"
        />${[
          [50, 129],
          [120, 128],
          [190, 130],
          [260, 129],
          [80, 157],
          [160, 156],
          [240, 158],
        ].map(
          (p, i) =>
            html`<circle
              key=${i}
              cx=${p[0]}
              cy=${p[1]}
              r="6"
              fill="#c0602d"
              opacity=".85"
            />`,
        )}<g transform="translate(228,34) scale(.9)"
          ><path
            d="M0 18 H44 Q52 18 52 26 V34 H30 L26 48 H18 L21 34 H0Z"
            fill="#cfd6e6" /><path
            d="M-6 26 L-34 56 M-8 34 L-30 70 M-4 20 L-40 40"
            stroke="#25b4f0"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="5 6" /></g
        >${[
          [190, 92],
          [170, 100],
          [150, 108],
          [206, 100],
        ].map(
          (p, i) =>
            html`<circle
              key=${i}
              class="mist"
              cx=${p[0]}
              cy=${p[1]}
              r="12"
              style=${{ animationDelay: i * 0.5 + "s" }}
            />`,
        )}`,
    lamp: () =>
      html`<path
          d="M30 116 C50 66 140 44 250 62 L280 108 C200 134 100 144 30 116Z"
          fill="url(#glass)"
          stroke="#6fa4ff"
          strokeWidth="2"
        /><circle
          cx="96"
          cy="100"
          r="26"
          fill="#0a1326"
          stroke="#9fc4ff"
          strokeWidth="2"
        /><circle cx="96" cy="100" r="14" fill="#fff" /><circle
          cx="170"
          cy="96"
          r="20"
          fill="#0a1326"
          stroke="#9fc4ff"
          strokeWidth="2"
        /><circle cx="170" cy="96" r="10" fill="#fff" /><path
          d="M280 100 L320 70 V150 L280 118Z"
          fill="url(#ray)"
          class="rays"
          transform="rotate(-90 300 100) scale(1,1)"
          opacity=".0"
        /><path
          d="M282 98 L320 60 V140 L282 118Z"
          fill="rgba(255,255,255,.35)"
          class="rays"
        />`,
    floor: () =>
      html`<rect
          x="64"
          y="22"
          width="192"
          height="156"
          rx="22"
          fill="#16233f"
          stroke="#4a73d0"
          strokeWidth="2"
        /><rect
          x="78"
          y="36"
          width="164"
          height="128"
          rx="14"
          fill="none"
          stroke="#7fa6ff"
          strokeWidth="1.5"
          strokeDasharray="6 5"
        /><path d="M96 130 Q160 96 224 130 V150 H96Z" fill="#1d2f5a" /><${Spk}
          x=${230}
          y=${54}
          d=${0}
          s=${1.4}
        /><${Spk} x=${98} y=${64} d=${1} />`,
    sani: () =>
      html`<g transform="translate(-40,64) scale(.58)"
          ><${Lux} t="suv" c="Black" /></g
        >${[
          [150, 70],
          [180, 56],
          [210, 70],
          [240, 58],
          [262, 76],
          [130, 84],
        ].map(
          (p, i) =>
            html`<circle
              key=${i}
              class="mist"
              cx=${p[0]}
              cy=${p[1]}
              r="16"
              style=${{ animationDelay: i * 0.45 + "s" }}
            />`,
        )}<g transform="translate(262,42)"
          ><path
            d="M0 -20 L24 -10 V10 C24 26 12 36 0 42 C-12 36 -24 26 -24 10 V-10Z"
            fill="rgba(255,43,56,.3)"
            stroke="#fff"
            strokeWidth="2" /><path
            d="M-10 6 l7 7 l14 -16"
            fill="none"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
        /></g>`,
  };
  function Art({ k }) {
    return html`<svg
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="320" height="200" fill="url(#artBg)" />
      <ellipse cx="160" cy="200" rx="200" ry="40" fill="url(#floor)" />
      ${ART[k]()}
      <rect
        class="sw2"
        x="-80"
        y="0"
        width="60"
        height="200"
        fill="url(#shg)"
      />
    </svg>`;
  }
  function Count({ to, suf }) {
    const [v, setV] = useState(0),
      r = useRef();
    useEffect(() => {
      const io = new IntersectionObserver((es) => {
        if (es[0].isIntersecting) {
          io.disconnect();
          let n = 0;
          const t = setInterval(() => {
            n += Math.ceil(to / 40);
            if (n >= to) {
              n = to;
              clearInterval(t);
            }
            setV(n);
          }, 40);
        }
      });
      io.observe(r.current);
      return () => io.disconnect();
    }, []);
    return html`<b ref=${r}>${v}${suf || ""}</b>`;
  }
  function Head({ eb, title, sub }) {
    return html`<div class="sh rv">
      <div>
        <span class="eb">${eb}</span>
        <h2>${title}</h2>
        ${sub ? html`<p class="mu">${sub}</p>` : null}
      </div>
    </div>`;
  }
  function Card({ s, i, pick }) {
    return html`<article class="cd rv" onClick=${() => pick(s.k)}>
      <div class="im">
        <span class="no">0${i + 1}</span
        >${s.u ? html`<div class="ph" style=${{ backgroundImage: "var(" + s.u + ")" }}></div>` : html`<${Art} k=${s.a} />`}
      </div>
      <div class="bd">
        <h3>${s.k}</h3>
        <p>${s.d}</p>
        <div class="ch">
          ${s.c.map((c) => html`<span key=${c}>${c}</span>`)}
        </div>
        <button class="arr" aria-label=${"Book " + s.k}>→</button>
      </div>
    </article>`;
  }
  function WaI() {
    return html`<svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.3.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.4z"
      />
    </svg>`;
  }
  function CTA({ go }) {
    return html`<section class="w sec">
      <div class="cta rv">
        <div class="cc"><${CarSvg} t="coupe" c="Blue" /></div>
        <span class="eb">Ready when you are</span>
        <h2>Fall in love with <span class="bl">your car.</span></h2>
        <p class="lead">Book a slot or message us on WhatsApp.</p>
        <div class="row">
          <button class="b p" onClick=${() => go("contact")}>Book now →</button
          ><a
            class="b g"
            href=${wa("Hi Ocean Car Care, I would like to book a service.")}
            target="_blank"
            rel="noopener"
            ><${WaI} />WhatsApp</a
          >
        </div>
      </div>
    </section>`;
  }
  const LINE = [
    ["coupe", "Blue"],
    ["suv", "Black"],
    ["coupe", "Red"],
    ["coupe", "White"],
    ["suv", "Blue"],
    ["coupe", "Black"],
  ];
  function Defs() {
    const gr = (id, a) =>
      html`<linearGradient id=${id} x1="0" y1="0" x2="0" y2="1"
        ><stop offset="0" stopColor=${a[0]} /><stop
          offset=".5"
          stopColor=${a[1]} /><stop offset="1" stopColor=${a[2]}
      /></linearGradient>`;
    return html`<svg
      width="0"
      height="0"
      style=${{ position: "absolute" }}
      aria-hidden="true"
    >
      <defs>
        ${gr("bodyBlue", ["#8fd0ff", "#1f78e8", "#08275f"])}${gr("bodyRed", ["#ff8a90", "#e0222f", "#5f0912"])}${gr("bodyBlack", ["#8b95a8", "#262a33", "#07080b"])}${gr("bodyWhite", ["#ffffff", "#dfe5ee", "#8590a5"])}
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#223a66" />
          <stop offset="1" stopColor="#030812" />
        </linearGradient>
        <radialGradient id="rim">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".6" stopColor="#8b96ab" />
          <stop offset="1" stopColor="#39414f" />
        </radialGradient>
        <radialGradient id="hl">
          <stop offset="0" stopColor="#fff" stopOpacity=".95" />
          <stop offset="1" stopColor="#9fd8ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="artBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14407f" />
          <stop offset="1" stopColor="#050a16" />
        </linearGradient>
        <linearGradient id="sceneBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d2a5c" />
          <stop offset=".6" stopColor="#061330" />
          <stop offset="1" stopColor="#02050d" />
        </linearGradient>
        <linearGradient id="ray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bfe8ff" stopOpacity=".28" />
          <stop offset="1" stopColor="#bfe8ff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="floor">
          <stop offset="0" stopColor="#25b4f0" stopOpacity=".4" />
          <stop offset="1" stopColor="#25b4f0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="shg" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".85" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="cpCoupe"><path d=${BODY.coupe.b} /></clipPath>
      </defs>
    </svg>`;
  }
  const STAGES = [
    ["Exterior washing", "--u-gc"],
    ["Foam wash", "--u-car"],
    ["Paint correction", "--u-cc"],
    ["Protection film", "--u-pp"],
    ["Rust treatment", "--u-ar"],
    ["Final result", "--u-hero"],
  ];
  const STAGE_DATA = [
    {
      idx: "01",
      tag: "WASH",
      range: "0% – 20%",
      headline: ["Clean", "Slate."],
      subtitle: "Surface reset",
      src: "assets/cinematic-sequence/clips/01-wash.mp4",
      title: "Stage 01 — High-Pressure Wash",
      desc: "Rinse away the road. Every perfect finish starts with a clean surface.",
      specs: [
        "40–60°C Hot Water Jets",
        "Touchless Decontamination",
        "pH-Neutral Pre-Wash",
      ],
      pctMin: 0,
      pctMax: 0.2,
    },
    {
      idx: "02",
      tag: "FOAM",
      range: "20% – 40%",
      headline: ["Let it", "Dwell."],
      subtitle: "Safe contact",
      src: "assets/cinematic-sequence/clips/02-foam.mp4",
      title: "Stage 02 — Active Snow Foam",
      desc: "A blanket of rich foam loosens the grit and lets the paint breathe.",
      specs: [
        "Hyper-Dense Foam Cannon",
        "Polymer Dirt Encapsulation",
        "Safe Dwell Time",
      ],
      pctMin: 0.2,
      pctMax: 0.4,
    },
    {
      idx: "03",
      tag: "POLISH",
      range: "40% – 60%",
      headline: ["Find the", "Gloss."],
      subtitle: "Paint refinement",
      src: "assets/cinematic-sequence/clips/03-polish.mp4",
      title: "Stage 03 — Precision Machine Polish",
      desc: "Fine machine work levels the haze and brings the depth back to the paint.",
      specs: [
        "Dual-Action Orbital Polish",
        "Micro-Abrasive Compounds",
        "Mirror Clarity",
      ],
      pctMin: 0.4,
      pctMax: 0.6,
    },
    {
      idx: "04",
      tag: "COATING",
      range: "60% – 80%",
      headline: ["Seal in", "the shine."],
      subtitle: "Lasting protection",
      src: "assets/cinematic-sequence/clips/04-coating.mp4",
      title: "Stage 04 — Ceramic Hydrophobic Shield",
      desc: "A precise protective layer locks in clarity, slickness and a lasting glow.",
      specs: [
        "9H Ceramic Molecular Bond",
        "Extreme Hydrophobic Beading",
        "UV & Chemical Barrier",
      ],
      pctMin: 0.6,
      pctMax: 0.8,
    },
    {
      idx: "05",
      tag: "FINAL CHECK",
      range: "80% – 100%",
      headline: ["Ready for", "the road."],
      subtitle: "Quality check",
      src: "assets/cinematic-sequence/clips/05-final-check.mp4",
      title: "Stage 05 — Studio Hero Inspection",
      desc: "One last walkaround. Every edge, reflection and detail gets a second look.",
      specs: [
        "High-CRI Inspection Lights",
        "360° Studio Audit",
        "Showroom Delivery Quality",
      ],
      pctMin: 0.8,
      pctMax: 1.0,
    },
  ];

  function StudioCanvas({ stageIdx, progress }) {
    const B = BODY.coupe;
    return html`<svg
      viewBox="0 0 1280 720"
      preserveAspectRatio="xMidYMid slice"
      class="cinema-canvas"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="studioWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#020408" />
          <stop offset="60%" stop-color="#070c18" />
          <stop offset="100%" stop-color="#03050a" />
        </linearGradient>
        <linearGradient id="studioFloor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#050812" />
          <stop offset="25%" stop-color="#0a1022" />
          <stop offset="100%" stop-color="#020306" />
        </linearGradient>
        <linearGradient id="overheadLight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(255,255,255,0.7)" />
          <stop offset="60%" stop-color="rgba(255,255,255,0.12)" />
          <stop offset="100%" stop-color="rgba(255,255,255,0)" />
        </linearGradient>
        <linearGradient id="redNeonGlow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="rgba(255,43,56,0)" />
          <stop offset="50%" stop-color="rgba(255,43,56,0.3)" />
          <stop offset="100%" stop-color="rgba(255,43,56,0)" />
        </linearGradient>
        <clipPath id="studioBodyClip"><path d=${B.b} /></clipPath>
      </defs>

      <rect width="1280" height="720" fill="url(#studioWall)" />
      <ellipse cx="640" cy="530" rx="580" ry="140" fill="url(#studioFloor)" />
      <rect
        x="240"
        y="0"
        width="800"
        height="40"
        rx="10"
        fill="url(#overheadLight)"
      />
      <line
        x1="280"
        y1="0"
        x2="280"
        y2="50"
        stroke="rgba(255,255,255,0.2)"
        stroke-width="2"
      />
      <line
        x1="1000"
        y1="0"
        x2="1000"
        y2="50"
        stroke="rgba(255,255,255,0.2)"
        stroke-width="2"
      />
      <rect x="0" y="520" width="1280" height="4" fill="url(#redNeonGlow)" />

      <line
        x1="0"
        y1="540"
        x2="1280"
        y2="540"
        stroke="rgba(255,255,255,0.06)"
        stroke-width="1"
      />
      <line
        x1="0"
        y1="580"
        x2="1280"
        y2="580"
        stroke="rgba(255,255,255,0.04)"
        stroke-width="1"
      />
      <line
        x1="0"
        y1="630"
        x2="1280"
        y2="630"
        stroke="rgba(255,255,255,0.03)"
        stroke-width="1"
      />

      <g
        transform="translate(320, 700) scale(1.05, -0.45)"
        opacity="0.22"
        style=${{ filter: "blur(3px)" }}
      >
        <path d=${B.b} fill="#ff2b38" />
        <path d=${B.g} fill="url(#glass)" />
        <circle cx="146" cy=${B.y} r="36" fill="#000" />
        <circle cx="492" cy=${B.y} r="36" fill="#000" />
      </g>

      <g transform="translate(320, 240) scale(1.05)">
        <path
          d=${B.b}
          fill=${stageIdx < 2 ? "#3a4152" : stageIdx === 2 ? "#b81c26" : "url(#bodyRed)"}
          stroke="rgba(255,255,255,0.4)"
          stroke-width="2"
        />

        ${
          stageIdx === 0
            ? html`<g>
                <g clipPath="url(#studioBodyClip)">
                  <g class="dirt" opacity=${Math.max(0.1, 0.8 - progress * 4)}>
                    ${[
                      [80, 120, 28, 10],
                      [200, 100, 18, 8],
                      [300, 132, 32, 12],
                      [420, 118, 22, 8],
                      [360, 96, 14, 6],
                      [150, 140, 24, 8],
                    ].map(
                      (q, k) =>
                        html`<ellipse
                          key=${k}
                          cx=${q[0]}
                          cy=${q[1]}
                          rx=${q[2]}
                          ry=${q[3]}
                          fill="#1e1b15"
                          opacity="0.85"
                        />`,
                    )}
                  </g>
                </g>
                <g
                  stroke="rgba(190,235,255,0.85)"
                  stroke-width="2.5"
                  stroke-dasharray="8 6"
                >
                  <line x1="-80" y1="-40" x2="150" y2="120" />
                  <line x1="-80" y1="30" x2="260" y2="100" />
                  <line x1="680" y1="-40" x2="450" y2="110" />
                  <line x1="680" y1="30" x2="350" y2="130" />
                </g>
                ${[
                  [120, 110],
                  [180, 95],
                  [240, 115],
                  [320, 85],
                  [400, 105],
                  [460, 115],
                ].map(
                  (p, i) =>
                    html`<circle
                      key=${i}
                      cx=${p[0]}
                      cy=${p[1]}
                      r="4.5"
                      fill="rgba(255,255,255,0.9)"
                      style=${{ animation: "pulse 1s infinite alternate", animationDelay: i * 0.15 + "s" }}
                    />`,
                )}
              </g>`
            : null
        }
        ${
          stageIdx === 1
            ? html`<g clipPath="url(#studioBodyClip)">
                <path
                  d="M50 150 C70 120 120 110 180 98 C240 70 320 64 420 86 C480 102 540 118 570 144 Z"
                  fill="rgba(255,255,255,0.92)"
                />
                ${[
                  [90, 130, 22],
                  [150, 115, 18],
                  [220, 95, 24],
                  [300, 82, 26],
                  [380, 88, 20],
                  [440, 105, 24],
                  [500, 122, 22],
                  [260, 120, 20],
                  [340, 115, 22],
                  [410, 125, 18],
                ].map(
                  (f, i) =>
                    html`<circle
                      key=${i}
                      cx=${f[0]}
                      cy=${f[1]}
                      r=${f[2]}
                      fill="#ffffff"
                      stroke="rgba(200,220,255,0.4)"
                      stroke-width="1.5"
                    />`,
                )}
                <path
                  d="M-60 40 Q80 80 240 95"
                  stroke="rgba(255,255,255,0.75)"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="round"
                  stroke-dasharray="14 10"
                />
              </g>`
            : null
        }
        ${
          stageIdx === 2
            ? html`<g>
                <g clipPath="url(#studioBodyClip)">
                  <rect
                    x="-50"
                    y="0"
                    width="380"
                    height="200"
                    fill="url(#bodyRed)"
                  />
                  <line
                    x1="330"
                    y1="0"
                    x2="330"
                    y2="200"
                    stroke="#fff"
                    stroke-width="3"
                    stroke-dasharray="6 4"
                  />
                </g>
                <g transform="translate(310, 85)">
                  <circle
                    cx="0"
                    cy="0"
                    r="32"
                    fill="none"
                    stroke="#ffb020"
                    stroke-width="3"
                    stroke-dasharray="6 8"
                    style=${{ animation: "spn 1.5s linear infinite" }}
                  />
                  <circle
                    cx="0"
                    cy="0"
                    r="22"
                    fill="rgba(255,176,32,0.3)"
                    stroke="#fff"
                    stroke-width="2"
                  />
                  <line
                    x1="-30"
                    y1="0"
                    x2="30"
                    y2="0"
                    stroke="#fff"
                    stroke-width="2"
                  />
                  <line
                    x1="0"
                    y1="-30"
                    x2="0"
                    y2="30"
                    stroke="#fff"
                    stroke-width="2"
                  />
                </g>
                <path
                  d="M80 120 C220 92 340 86 480 108"
                  fill="none"
                  stroke="#fff"
                  stroke-width="3"
                  stroke-linecap="round"
                />
              </g>`
            : null
        }
        ${
          stageIdx === 3
            ? html`<g>
                <path
                  d="M50 135 C190 98 330 90 490 112"
                  fill="none"
                  stroke="#ffffff"
                  stroke-width="4"
                  stroke-linecap="round"
                />
                ${[
                  [130, 108],
                  [170, 96],
                  [210, 88],
                  [250, 84],
                  [290, 82],
                  [330, 84],
                  [380, 92],
                  [430, 102],
                  [480, 114],
                  [230, 118],
                  [310, 112],
                  [390, 118],
                ].map(
                  (p, i) =>
                    html`<g key=${i}>
                      <ellipse
                        cx=${p[0]}
                        cy=${p[1]}
                        rx="5"
                        ry="3.5"
                        fill="rgba(220,245,255,0.95)"
                        stroke="#68b8ff"
                        stroke-width="1.2"
                      />
                      <circle
                        cx=${p[0] - 1.5}
                        cy=${p[1] - 1}
                        r="1.2"
                        fill="#fff"
                      />
                    </g>`,
                )}
                <g transform="translate(300, 48)">
                  <path
                    d="M0 -18 L20 -10 V8 C20 22 10 30 0 35 C-10 30 -20 22 -20 8 V-10 Z"
                    fill="rgba(255,43,56,0.4)"
                    stroke="#fff"
                    stroke-width="2"
                  />
                  <path
                    d="M-8 6 L-2 12 L10 -4"
                    fill="none"
                    stroke="#fff"
                    stroke-width="2.5"
                    stroke-linecap="round"
                  />
                </g>
              </g>`
            : null
        }
        ${
          stageIdx === 4
            ? html`<g>
                <path
                  d="M50 130 C190 94 330 86 500 110"
                  fill="none"
                  stroke="#ffffff"
                  stroke-width="4.5"
                  stroke-linecap="round"
                />
                <path
                  d="M110 124 C230 94 330 90 450 104"
                  fill="none"
                  stroke="rgba(255,255,255,0.7)"
                  stroke-width="2.5"
                  stroke-linecap="round"
                />
                <g transform="translate(280, 20)">
                  <polygon
                    points="0,0 80,160 -80,160"
                    fill="url(#overheadLight)"
                    opacity="0.6"
                  />
                  <circle
                    cx="0"
                    cy="0"
                    r="14"
                    fill="#ffffff"
                    stroke="#ff2b38"
                    stroke-width="3"
                  />
                  <line
                    x1="-30"
                    y1="0"
                    x2="-14"
                    y2="0"
                    stroke="#fff"
                    stroke-width="4"
                  />
                </g>
                ${[
                  [150, 96],
                  [280, 78],
                  [440, 94],
                  [520, 126],
                  [360, 110],
                ].map(
                  (p, i) =>
                    html`<g
                      key=${i}
                      transform=${"translate(" + p[0] + "," + p[1] + ")"}
                      style=${{ animation: "pulse 1.2s infinite alternate", animationDelay: i * 0.25 + "s" }}
                    >
                      <path
                        d="M0 -8 L2 -2 L8 0 L2 2 L0 8 L-2 2 L-8 0 L-2 -2 Z"
                        fill="#ffffff"
                      />
                    </g>`,
                )}
              </g>`
            : null
        }

        <path d=${B.g} fill="url(#glass)" />
        <${Wheel} x=${146} y=${B.y} />
        <${Wheel} x=${492} y=${B.y} />
      </g>
    </svg>`;
  }

  function Stages() {
    const sequenceRef = useRef(null);
    const [order, setOrder] = useState(STAGE_DATA.map((_, idx) => idx));
    const [dragX, setDragX] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [slamming, setSlamming] = useState(false);
    const dragRef = useRef(null);
    const activeIdx = order[0];

    useEffect(() => {
      let slamTimer = 0;
      setSlamming(true);
      slamTimer = window.setTimeout(() => setSlamming(false), 650);
      return () => {
        window.clearTimeout(slamTimer);
      };
    }, [activeIdx]);

    const goToStage = (idx) => {
      const sequence = sequenceRef.current;
      if (!sequence) return;
      if (idx === activeIdx) {
        const video = sequence.querySelector(".cinema-stage.is-active video");
        if (video) {
          video.currentTime = 0;
          video.play().catch(() => {});
        }
        return;
      }
      setOrder((current) => {
        const selectedPosition = current.indexOf(idx);
        return [
          ...current.slice(selectedPosition),
          ...current.slice(0, selectedPosition),
        ];
      });
      setDragX(0);
    };

    const moveBy = (amount) => {
      setOrder((current) =>
        amount > 0
          ? [...current.slice(1), current[0]]
          : [current[current.length - 1], ...current.slice(0, -1)],
      );
      setDragX(0);
    };

    const handlePointerDown = (event) => {
      if (event.button !== 0 || event.target.closest("button")) return;
      dragRef.current = { pointerId: event.pointerId, startX: event.clientX };
      event.currentTarget.setPointerCapture(event.pointerId);
      setDragging(true);
    };

    const handlePointerMove = (event) => {
      if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) return;
      const distance = event.clientX - dragRef.current.startX;
      const limit = window.innerWidth * 0.55;
      setDragX(Math.max(-limit, Math.min(limit, distance)));
    };

    const handlePointerUp = (event) => {
      if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) return;
      const distance = event.clientX - dragRef.current.startX;
      dragRef.current = null;
      setDragging(false);
      if (distance > 60) moveBy(1);
      else if (distance < -60) moveBy(-1);
      else setDragX(0);
    };

    return html`<div class="ln-wrap">
      <div class="ln-header">
        <div>
          <span class="ln-tagline">Cinematic Detailing Showcase</span>
          <h2 class="ln-title">
            5-Stage <span class="bl">Precision Transformation</span>
          </h2>
          <p class="ln-desc">
            Swipe right to send the front card to the back, or use the arrows to
            explore Wash → Foam → Polish → Coating → Final Check.
          </p>
        </div>
      </div>

      <div
        class=${"cinema-sequence" + (dragging ? " is-dragging" : "")}
        ref=${sequenceRef}
        onPointerDown=${handlePointerDown}
        onPointerMove=${handlePointerMove}
        onPointerUp=${handlePointerUp}
        onPointerCancel=${handlePointerUp}
      >
        ${order.map((stageIdx, position) => {
          const st = STAGE_DATA[stageIdx];
          const isActive = position === 0;
          const cardClass =
            "cinema-stage stack-card-" + position +
            (isActive ? " is-active" : "") +
            (slamming && isActive ? " slam" : "");
          const cardStyle = {
            "--drag-x": isActive ? dragX + "px" : "0px",
            "--drag-rotation": isActive ? dragX * -0.035 + "deg" : "0deg",
          };
          return html`<section
          key=${st.idx}
          class=${cardClass}
          style=${cardStyle}
          aria-label=${"Stage " + st.idx + ": " + st.tag.toLowerCase()}
        >
          <div class="cinema-footage">
            ${isActive ? html`<video
              src=${st.src}
              muted
              playsinline
              autoPlay
              preload="auto"
              onEnded=${() => moveBy(1)}
              aria-label=${"Detailing process: " + st.tag.toLowerCase()}
            ></video>` : null}
          </div>
          <div class="cinema-shade"></div>
          <div class="cinema-grain"></div>
          <div class="cinema-impact"></div>

          <div class="cinema-copy">
            <span class="cinema-eyebrow">Process / ${st.idx} · ${st.subtitle}</span>
            <h3 class="cinema-title">
              ${st.headline.map((line) => html`<span key=${line}>${line}</span>`)}
            </h3>
            <span class="cinema-step-name">${st.tag}</span>
            <p class="cinema-description">${st.desc}</p>
          </div>

          <div class="cinema-count">
            <span class="cinema-count-current">${st.idx}</span>
            <span class="cinema-count-total">/ 05</span>
          </div>
          <div class="cinema-side-label">${st.tag} · ${st.idx} / 05</div>

        </section>`;
        })}
        <div class="cinema-arrows">
          <button class="cinema-arrow" onClick=${() => moveBy(-1)} aria-label="Previous stage">←</button>
          <button class="cinema-arrow" onClick=${() => moveBy(1)} aria-label="Next stage">→</button>
        </div>
      </div>
      <div class="cinema-stage-nav" aria-label="Detailing stages">
        ${STAGE_DATA.map((buttonStage, buttonIdx) => html`<button
          key=${buttonStage.idx}
          class=${"cinema-stage-button" + (activeIdx === buttonIdx ? " on" : "")}
          onClick=${() => goToStage(buttonIdx)}
          onMouseEnter=${() => goToStage(buttonIdx)}
          aria-current=${activeIdx === buttonIdx ? "step" : null}
          aria-label=${"Go to stage " + buttonStage.idx + ": " + buttonStage.tag.toLowerCase()}
        >
          <span>STAGE ${buttonStage.idx}</span>
          <b>${buttonStage.tag}</b>
        </button>`)}
      </div>
    </div>`;
  }

  function Home({ go, pick }) {
    return html`<div class="pg home-page">
      <div class="hsec">
        <div class="hero-watermark" aria-hidden="true">OCEAN</div>
        <section class="w hero filllo-hero">
          <div class="hero-top-row">
            <div class="hero-left-col">
              <div>
                <span class="pl">Ocean Car Detailing · Kozhikode</span>
                <h1>
                  Fall in love<br />with <span class="bl">your car.</span>
                </h1>
                <p class="lead">Wash. Polish. Coat. Protect.</p>
              </div>
            </div>

            <div class="hero-right-col">
              <p class="lead hero-lead">
                Ocean Car Detailing is Kozhikode’s premier studio dedicated to
                master-class car care. Certified technicians, premium ceramic
                coating & graphene protection built around your car.
              </p>

              <div class="hs hero-stats">
                <div><b>20+</b><span>Years</span></div>
                <div><b>4.9★</b><span>Google</span></div>
                <div><b>117+</b><span>Reviews</span></div>
              </div>
            </div>
          </div>
          <div class="hero-car-showcase">
            <div class="hero-car-glow"></div>
            <img
              src="assets/hero-car.png"
              alt="Ocean Car Detailing Porsche 911 GT3 RS"
              class="hero-car-img"
            />
          </div>
        </section>
      </div>

      <div class="ln"><${Stages} /></div>
      <section class="w sec">
        <${Head}
          eb="What we do"
          title=${html`Full care. <span class="bl">Finest finish.</span>`}
        />
        <div class="g3">
          ${SV.slice(0, 3).map((s, i) => html`<${Card} key=${s.k} s=${s} i=${i} pick=${pick} />`)}
        </div>
        <div class="mid">
          <button class="b p" onClick=${() => go("services")}>
            Explore all services →
          </button>
        </div>
      </section>
      <section class="w sec" style=${{ paddingTop: 0 }}>
        <div class="two">
          <div class="rv">
            <span class="eb">About us</span>
            <h2>20 years. <span class="bl">Your car, brand new.</span></h2>
            <p class="lead">
              Certified technicians, quality products and a studio built around
              your car.
            </p>
            <button class="b" onClick=${() => go("about")}>About us →</button>
          </div>
          <div class="stt rv">
            <div><${Count} to=${20} suf="+" /><span>Years</span></div>
            <div><b>4.9★</b><span>Google</span></div>
            <div><${Count} to=${117} suf="+" /><span>Reviews</span></div>
          </div>
        </div>
      </section>
      <section class="w sec" style=${{ paddingTop: 0 }}>
        <${Head}
          eb="Gallery"
          title=${html`Fresh out of <span class="bl">the studio.</span>`}
        />
        <div class="gg">
          ${[
            ["p", "d1", "Our studio"],
            ["l", ["coupe", "Blue"], "Blue coupe"],
            ["l", ["suv", "Black"], "Black SUV"],
          ].map(
            (g, i) =>
              html`<div class="tl rv" key=${i} data-c=${g[2]}>
                ${g[0] === "p" ? html`<div class="im" style=${{ backgroundImage: "var(--i-" + g[1] + ")" }}></div>` : html`<div class="lx"><${CarSvg} t=${g[1][0]} c=${g[1][1]} /></div>`}
              </div>`,
          )}
        </div>
        <div class="mid">
          <button class="b p" onClick=${() => go("gallery")}>
            Explore gallery →
          </button>
        </div>
      </section>
      <${CTA} go=${go} />
    </div>`;
  }
  function Services({ go, pick }) {
    return html`<div class="pg">
      <section class="w sec" style=${{ paddingTop: 30 }}>
        <${Bg}
          items=${[
            ["car", 58, 0, 420, -2],
            ["pol", 1, 34, 120, -12],
            ["sqg", 92, 40, 110, 14],
          ]}
        /><${Head}
          eb="What we do"
          title=${html`Full-service. <span class="bl">Fully done.</span>`}
          sub="Tap a service to send us a quick request."
        />
        <div class="g3">
          ${SV.map((s, i) => html`<${Card} key=${s.k} s=${s} i=${i} pick=${pick} />`)}
        </div>
        <div class="mid">
          <button class="b" onClick=${() => go("home")}>
            ← Back to highlights
          </button>
        </div>
      </section>
      <${CTA} go=${go} />
    </div>`;
  }
  const ITEMS = [
    { t: "p", k: "d1", c: "Our studio" },
    { t: "v", n: 0, c: "Signature foam wash" },
    { t: "l", a: ["coupe", "Blue"], c: "Blue coupe" },
    { t: "l", a: ["suv", "Black"], c: "Black SUV" },
    { t: "v", n: 1, c: "Paint correction" },
    { t: "p", k: "d2", c: "Studio after dark" },
    { t: "l", a: ["coupe", "Red"], c: "Red coupe" },
    { t: "v", n: 2, c: "Ceramic coating" },
    { t: "l", a: ["coupe", "White"], c: "Pearl white" },
    { t: "a", k: "ceramic", c: "Ceramic coating" },
    { t: "a", k: "paint", c: "Paint correction" },
    { t: "a", k: "lamp", c: "Headlight care" },
  ];
  const key = (x) => x.t + (x.k || x.n || (x.a && x.a.join(""))) + x.c;
  function Gallery({ go }) {
    const [f, setF] = useState("all"),
      [m, setM] = useState(null),
      [exp, setExp] = useState(false);
    useEffect(() => {
      const k = (e) => {
        if (e.key === "Escape") setM(null);
      };
      addEventListener("keydown", k);
      return () => removeEventListener("keydown", k);
    }, []);
    useEffect(() => {
      document.body.style.overflow = m ? "hidden" : "";
      return () => {
        document.body.style.overflow = "";
      };
    }, [m]);
    const list = ITEMS.filter(
      (x) => f === "all" || (f === "photos" ? x.t !== "v" : x.t === "v"),
    );
    const shown = exp ? list : list.slice(0, 6);
    const body = (x, big) =>
      x.t === "p"
        ? html`<div
            class=${big ? "pic" : "im"}
            style=${{ backgroundImage: "var(--i-" + x.k + ")" }}
          ></div>`
        : x.t === "v"
          ? html`<${Reel} src=${VIDEOS[x.n]} n=${big ? 34 : 12} tag=${big} />`
          : x.t === "l"
            ? html`<div class=${big ? "bx" : "lx"}>
                <div
                  class=${big ? "lx" : ""}
                  style=${big ? {} : { display: "contents" }}
                >
                  <${CarSvg} t=${x.a[0]} c=${x.a[1]} />
                </div>
              </div>`
            : html`<div
                class=${big ? "bx" : ""}
                style=${big ? {} : { position: "absolute", inset: 0 }}
              >
                <${Art} k=${x.k} />
              </div>`;
    return html`<div class="pg">
      <section id="gallery-top" class="w sec" style=${{ paddingTop: 30 }}>
        <${Bg}
          items=${[
            ["spr", 90, 2, 120, 10],
            ["cl", 2, 40, 110, 8],
          ]}
        /><${Head}
          eb="Gallery"
          title=${html`Photos and <span class="bl">videos.</span>`}
          sub="Our studio and our work. Tap any item to open it."
        />
        <div class="fl2">
          ${[
            ["all", "All"],
            ["photos", "Photos"],
            ["videos", "Videos"],
          ].map(
            (x) =>
              html`<button
                key=${x[0]}
                class=${f === x[0] ? "on" : ""}
                onClick=${() => setF(x[0])}
              >
                ${x[1]}
              </button>`,
          )}
        </div>
        <div class="gg">
          ${shown.map((x) => html`<button key=${key(x)} class="tl pop" data-c=${x.c} onClick=${() => setM(x)}>${body(x, false)}${x.t === "v" ? html`<span class="play"></span>` : null}</button>`)}
        </div>
        ${
          list.length > 6
            ? html`<div class="mid">
                <button
                  class="b p"
                  onClick=${() => {
                    if (exp) {
                      setExp(false);
                      document
                        .getElementById("gallery-top")
                        .scrollIntoView({ behavior: "smooth", block: "start" });
                    } else setExp(true);
                  }}
                >
                  ${exp ? "Show less ↑" : "Explore more →"}
                </button>
              </div>`
            : null
        }
      </section>
      ${
        m
          ? html`<div class="md" onClick=${() => setM(null)}>
              <div class="in2" onClick=${(e) => e.stopPropagation()}>
                <button
                  class="x"
                  onClick=${() => setM(null)}
                  aria-label="Close"
                >
                  ✕</button
                >${body(m, true)}
                <div class="cp">${m.c}</div>
              </div>
            </div>`
          : null
      }
      <${CTA} go=${go} />
    </div>`;
  }
  function About({ go }) {
    return html`<div class="pg">
      <section class="w sec" style=${{ paddingTop: 30 }}>
        <${Bg}
          items=${[
            ["car", 52, 62, 520, 2],
            ["pol", 88, 4, 140, 10],
          ]}
        />
        <div class="two">
          <div class="rv">
            <span class="eb">About us</span>
            <h2>
              20 years of making cars look <span class="bl">brand new.</span>
            </h2>
            <p class="lead">
              With our customers’ appreciation and support, we are stepping into
              a new initiative in the automobile detailing industry. With 20
              years of experience in car detailing and working with major car
              brands, we assure you high market standards.
            </p>
            <p class="mu">
              We care for your car with our best quality products, services and
              certified technicians, from detailing to accessories, for an
              unmatched customer experience.
            </p>
          </div>
          <div class="big rv"></div>
        </div>
      </section>
      <section class="w sec" style=${{ paddingTop: 0 }}>
        <div class="stt rv">
          <div><${Count} to=${20} suf="+" /><span>Years experience</span></div>
          <div><b>4.9★</b><span>Google rating</span></div>
          <div><${Count} to=${117} suf="+" /><span>Reviews</span></div>
        </div>
      </section>
      <section class="w sec" style=${{ paddingTop: 0 }}>
        <${Head}
          eb="Our process"
          title=${html`Four steps. <span class="bl">Every time.</span>`}
        />
        <div class="stp">
          ${[
            [
              "01",
              "Inspect",
              "We check paint, glass and interior and agree the plan.",
            ],
            ["02", "Prepare", "Foam wash and careful decontamination."],
            [
              "03",
              "Treat",
              "Polish, coat or protect, depending on the service.",
            ],
            ["04", "Hand over", "Final check in good light, with care advice."],
          ].map(
            (s) =>
              html`<div class="cd rv" key=${s[0]}>
                <b>${s[0]}</b>
                <h3>${s[1]}</h3>
                <p>${s[2]}</p>
              </div>`,
          )}
        </div>
      </section>
      <${CTA} go=${go} />
    </div>`;
  }
  function Contact({ pref }) {
    const [s, setS] = useState(pref || SV[0].k),
      [n, setN] = useState(""),
      [p, setP] = useState(""),
      [m, setM] = useState(""),
      [live, setL] = useState(false);
    const send = (e) => {
      e.preventDefault();
      window.open(
        wa(
          "Hi Ocean Car Care, I’d like to book " +
            s +
            ". Name: " +
            n +
            ", phone: " +
            p +
            ". Car and notes: " +
            m,
        ),
        "_blank",
      );
    };
    return html`<div class="pg">
      <section class="w sec" style=${{ paddingTop: 30 }}>
        <${Bg}
          items=${[
            ["car", 4, 76, 480, -2],
            ["pol", 90, 8, 130, 10],
            ["bkt", 50, 3, 100, 0],
          ]}
        /><span class="eb">Contact</span>
        <h2 style=${{ marginBottom: 50 }}>
          Bring it in. Take it back <span class="bl">shining.</span>
        </h2>
        <div class="two" style=${{ alignItems: "start" }}>
          <div class="info rv">
            <div class="it">
              <svg viewBox="0 0 24 24">
                <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <div>
                <small>Studio</small
                ><span
                  >Ocean Agencies, Door No. 39/2223-A, All India Radio Road,
                  Puthiyangadi Post, Calicut – 673021</span
                >
              </div>
            </div>
            <div class="it">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              <div><small>Hours</small><span>Opens 9:00 AM</span></div>
            </div>
            <div class="it">
              <svg viewBox="0 0 24 24">
                <path
                  d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"
                />
              </svg>
              <div>
                <small>Call us</small
                ><a href="tel:+918086966660">+91 80869 66660</a>
              </div>
            </div>
            <div class="row">
              <a
                class="b p g"
                href=${wa("Hi Ocean Car Care")}
                target="_blank"
                rel="noopener"
                ><${WaI} />WhatsApp</a
              ><a
                class="b"
                href="https://www.instagram.com/ocean_cardetailing/"
                target="_blank"
                rel="noopener"
                >Instagram</a
              >
            </div>
          </div>
          <form class="rv" onSubmit=${send}>
            <h3>Send a request</h3>
            <input
              placeholder="Your name"
              value=${n}
              onInput=${(e) => setN(e.target.value)}
              required
            /><input
              placeholder="Phone number"
              type="tel"
              value=${p}
              onInput=${(e) => setP(e.target.value)}
              required
            /><select value=${s} onChange=${(e) => setS(e.target.value)}>
              ${SV.map((x) => html`<option key=${x.k}>${x.k}</option>`)}</select
            ><textarea
              placeholder="Car model and anything we should know"
              value=${m}
              onInput=${(e) => setM(e.target.value)}
            ></textarea
            ><button class="b p" type="submit">Send on WhatsApp</button>
          </form>
        </div>
      </section>
      <section class="w sec" style=${{ paddingTop: 0 }}>
        <span class="eb">Location</span>
        <h2 style=${{ marginBottom: 40 }}>
          Find <span class="bl">the studio.</span>
        </h2>
        <div class="map rv">
          <svg
            viewBox="0 0 800 340"
            preserveAspectRatio="xMidYMid slice"
            role="img"
            aria-label="Map sketch"
          >
            <path
              d="M0 240 Q240 214 420 190 T800 124"
              fill="none"
              stroke="#fff"
              strokeOpacity=".12"
              strokeWidth="24"
            />
            <path
              d="M366 0 Q386 150 420 190 T470 340"
              fill="none"
              stroke="#fff"
              strokeOpacity=".12"
              strokeWidth="18"
            />
            <g fill="none" stroke="#fff" strokeOpacity=".22" strokeWidth="1.5">
              <rect x="80" y="70" width="140" height="80" />
              <rect x="110" y="260" width="160" height="60" />
              <rect x="560" y="220" width="150" height="80" />
              <rect x="540" y="50" width="160" height="70" />
            </g>
            <path
              class="rt"
              d="M40 246 Q240 220 420 190"
              fill="none"
              stroke="#25b4f0"
              strokeWidth="3"
            />
            <circle class="pin" cx="420" cy="188" r="16" fill="#f0524a" />
            <circle
              cx="420"
              cy="188"
              r="8"
              fill="#f0524a"
              stroke="#fff"
              strokeWidth="3"
            />
            <text class="mp" x="440" y="170">Ocean Car Detailing ZPA</text>
            <text class="mp" x="560" y="136" style=${{ fontWeight: 400 }}>
              All India Radio Station
            </text>
            <text class="mp" x="30" y="274" style=${{ fontWeight: 400 }}>
              Towards Kozhikode city
            </text>
          </svg>
          ${live ? html`<iframe title="Live map" loading="lazy" src="https://maps.google.com/maps?q=Ocean+Car+Detailing+Puthiyangadi+Kozhikode&output=embed"></iframe>` : null}
          <div class="mi">
            <b>Ocean Car Detailing ZPA</b>
            <p>
              Ocean Agencies, Door No. 39/2223-A, All India Radio Road,
              Puthiyangadi Post, Calicut – 673021
            </p>
            <div class="row">
              <a
                class="b p sm"
                target="_blank"
                rel="noopener"
                href="https://www.google.com/maps/dir/?api=1&destination=Ocean+Agencies+Door+No+39%2F2223-A+All+India+Radio+Road+Puthiyangadi+Post+Calicut+673021"
                >Get Directions</a
              ><button class="b sm" type="button" onClick=${() => setL(!live)}>
                ${live ? "Hide live map" : "Load live map"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>`;
  }
  function Footer({ go }) {
    return html`<footer class="ft">
      <div class="w">
        <div class="gr">
          <div>
            <img src=${LOGO} alt="Ocean Car Detailing ZPA" />
            <p class="mu" style=${{ maxWidth: "26em", margin: 0 }}>
              Fall in love with your car.
            </p>
          </div>
          <div>
            <h4>Pages</h4>
            ${PAGES.map((p) => html`<button key=${p[0]} onClick=${() => go(p[0])}>${p[1]}</button>`)}
          </div>
          <div>
            <h4>Visit and contact</h4>
            <a href="tel:+918086966660">+91 80869 66660</a
            ><a
              href="https://www.instagram.com/ocean_cardetailing/"
              target="_blank"
              rel="noopener"
              >Instagram · ocean_cardetailing</a
            ><span class="mu" style=${{ display: "block", paddingTop: 6 }}
              >Ocean Agencies, Door No. 39/2223-A, All India Radio Road,
              Puthiyangadi Post, Calicut – 673021</span
            >
          </div>
        </div>
        <div class="cp">© 2026 Ocean Car Care · Ocean Car Detailing ZPA</div>
      </div>
    </footer>`;
  }
  function App() {
    const init = () => {
      const x = location.hash.slice(1);
      return PAGES.some((p) => p[0] === x) ? x : "home";
    };
    const [page, setPage] = useState(init),
      [pref, setPref] = useState(""),
      [up, setUp] = useState(false);
    const go = (p) => {
      window.scrollTo(0, 0);
      setPage(p);
      try {
        history.replaceState(null, "", "#" + p);
      } catch (e) {}
    };
    const pick = (k) => {
      setPref(k);
      go("contact");
    };
    useEffect(() => {
      const f = () => setUp(scrollY > 600);
      addEventListener("scroll", f, { passive: true });
      return () => removeEventListener("scroll", f);
    }, []);
    useEffect(() => {
      document.title =
        PAGES.find((p) => p[0] === page)[1] + " · Ocean Car Care";
    }, [page]);
    useEffect(() => {
      const t = document.querySelector(".tabs button.on");
      if (t && t.scrollIntoView)
        t.scrollIntoView({ inline: "center", block: "nearest" });
    }, [page]);
    useEffect(() => {
      const io = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          }),
        { threshold: 0.08 },
      );
      document.querySelectorAll(".rv").forEach((el) => io.observe(el));
      return () => io.disconnect();
    }, [page]);
    const V =
      page === "home"
        ? html`<${Home} go=${go} pick=${pick} />`
        : page === "services"
          ? html`<${Services} go=${go} pick=${pick} />`
          : page === "gallery"
            ? html`<${Gallery} go=${go} />`
            : page === "about"
              ? html`<${About} go=${go} />`
              : html`<${Contact} pref=${pref} />`;
    return html`<div>
      <${Defs} />
      <div class="glow"></div>
      <header class="nav">
        <div class="nin">
          <button
            class="lg"
            onClick=${() => go("home")}
            aria-label="Ocean Car Detailing ZPA home"
          >
            <img src=${LOGO} alt="Ocean Car Detailing ZPA" />
          </button>
          <nav class="tabs" aria-label="Pages">
            ${PAGES.map((p) => html`<button key=${p[0]} class=${page === p[0] ? "on" : ""} onClick=${() => go(p[0])}>${p[1]}</button>`)}
          </nav>
          <div class="ac">
            <button class="b p sm" onClick=${() => go("contact")}>
              Book now
            </button>
          </div>
        </div>
      </header>
      <main key=${page}>${V}</main>
      <${Footer} go=${go} />
      <button
        class=${"up" + (up ? " s" : "")}
        onClick=${() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        ↑
      </button>
      <a
        class="wa"
        href=${wa("Hi Ocean Car Care, I would like to know more.")}
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
        ><${WaI}
      /></a>
    </div>`;
  }
  if (!window.React || !window.ReactDOM || !window.htm) {
    document.getElementById("root").innerHTML =
      '<p style="padding:40px">Could not load the site libraries. Please check your internet connection and reload.</p>';
  } else
    ReactDOM.createRoot(document.getElementById("root")).render(
      html`<${App} />`,
    );
})();
