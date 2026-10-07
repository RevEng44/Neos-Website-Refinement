/* Triangle graphic (Draft 6): shared orbit with a guided tour. The owner's choice of options D and C.

   Owners, Nations and Contractors sit 120 degrees apart on one tilted ring around the Neos logo, as
   equals. The ring keeps turning slowly, and every few seconds it glides the next party round to the
   front. As it does, a gold line draws out from Neos to that party, the party's point lights, and the
   caption changes to its role. The front of the ring moves left to right, so the order is Nations,
   Owners, Contractors.

   - The turn follows one smooth speed curve: slow while a party is at the front (about 5 s), quicker
     between parties (about 1.5 s). It never starts or stops abruptly.
   - Hover or keyboard focus on the graphic eases the ring to a stop (about 0.6 s). Selecting a party
     (click, tap, Enter or Space) turns it to the front and holds it there. The tour picks up again
     from where the ring is, about 2 s after the pointer leaves (5 s after a choice), or 8 s after a tap.
   - Pause / Play beside the instruction line stops the tour until Play is pressed.
   - The centre is the Neos logo on its own. The lines fade out before they reach it.
   - Screen readers: the automatic caption changes are not read out (aria-live is "off" while the tour
     runs); the visitor's own choices are.
   - Reduced motion, or no html.motion: the same ring, still, in the page's original arrangement
     (Owners at the top, Nations lower left, Contractors lower right). Choosing a party changes the
     caption and lights its line, with no movement.
   - Nothing runs while the graphic is off screen or the tab is hidden.

   mount(panel) returns { destroy() }, which puts the panel back as it was. initTriangle() mounts it
   on the hero's graphic (#who-we-help). */

const SVGNS = 'http://www.w3.org/2000/svg';
const CX = 210, CY = 168;
const TAU = Math.PI * 2;
const STEP = TAU / 3;
const PARTIES = ['owners', 'nations', 'contractors'];
const ORDER = ['nations', 'owners', 'contractors']; // the order in which they come to the front
// Each party's place on the ring at zero turn: Owners at the back (top), Nations front left,
// Contractors front right, as in the page's original triangle.
const OFFSETS = { owners: -Math.PI / 2, nations: (150 * Math.PI) / 180, contractors: (30 * Math.PI) / 180 };
// Tour position p: a whole number puts ORDER[p mod 3] at the front. The turn is -STEP * (p + 0.5), so
// p = -0.5 is the original arrangement, and the tour starts there.
const START_P = -0.5;

const GEOMETRY = {
  wide: { rx: 165, ry: 92, depth: 0.08, labelMin: 0.72 },
  phone: { rx: 150, ry: 90, depth: 0.06, labelMin: 0.78 }
};

// Speed curve: dp/dt = BASE * (1 - A cos 2πp). Slowest with a party at the front, quickest halfway.
const STEP_TIME = 6.6;                                   // seconds per party
const A = 0.78;
const BASE = 1 / (STEP_TIME * Math.sqrt(1 - A * A));
const STOP_TAU = 0.2;      // seconds; about 95% stopped in 0.6 s
const RESUME_TAU = 1.1;    // seconds; a gentle pick-up
const SEEK_OMEGA = 3.6;    // critically damped turn to a chosen party, about 1.3 s
const INTRO = 2.2;         // seconds on the Neos caption before the tour starts
const LEAVE_RESUME = 1600; // ms after the pointer leaves
const CHOICE_RESUME = 5000;// ms after the pointer leaves, when a party was chosen
const TOUCH_RESUME = 8000; // ms after a tap
const FOCUS_RESUME = 3000; // ms after keyboard focus leaves
const GAP = 8;             // viewBox units between a line's end and a party's point

const EASE = {
  inOut: (u) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2),
  out: (u) => 1 - Math.pow(1 - u, 3),
  in: (u) => u * u,
  sine: (u) => -(Math.cos(Math.PI * u) - 1) / 2
};

function el(name, attrs, parent) {
  const node = document.createElementNS(SVGNS, name);
  for (const k in attrs) node.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(node);
  return node;
}
const mod3 = (n) => ((n % 3) + 3) % 3;

export function initTriangle() {
  return mount(document.getElementById('who-we-help'));
}

export function mount(panel) {
  if (!panel) return { destroy() {} };
  if (panel.__orbit) panel.__orbit.destroy();

  const map = panel.querySelector('.connection-map');
  const caption = panel.querySelector('.connection-caption');
  const label = panel.querySelector('.connection-label');
  const desc = panel.querySelector('#connection-description');
  const controls = panel.querySelector('.connection-controls');
  const centre = panel.querySelector('.map-centre');
  const logo = centre ? centre.querySelector('img') : null;
  const nodes = {};
  PARTIES.forEach((k) => { nodes[k] = map ? map.querySelector('.map-node[data-participant="' + k + '"]') : null; });
  if (!map || !caption || !label || !desc || PARTIES.some((k) => !nodes[k])) return { destroy() {} };

  const html = document.documentElement;
  const gsap = window.gsap;
  const orig = typeof window.showParticipant === 'function' ? window.showParticipant : null;
  const copy = typeof participantCopy !== 'undefined' ? participantCopy : null; // eslint-disable-line no-undef
  const ac = new AbortController();
  const on = (target, type, fn, opts) => target.addEventListener(type, fn, Object.assign({ signal: ac.signal }, opts || {}));
  const savedStyles = new Map();
  PARTIES.forEach((k) => savedStyles.set(nodes[k], nodes[k].getAttribute('style')));
  [label, desc, caption].forEach((n) => savedStyles.set(n, n.getAttribute('style')));
  const startLive = caption.getAttribute('aria-live');
  const startKey = map.dataset.active || 'all';

  panel.dataset.tri = 'orbit';

  // ---------------------------------------------------------------- SVG
  const uid = 'orbit' + Math.random().toString(36).slice(2, 7);
  const svg = el('svg', { class: 'orbit-svg', viewBox: '0 0 420 330', 'aria-hidden': 'true', focusable: 'false' });
  const defs = el('defs', {}, svg);
  const glowGrad = el('radialGradient', { id: uid + 'Glow' }, defs);
  el('stop', { offset: '0', 'stop-color': '#c9a962', 'stop-opacity': '.11' }, glowGrad);
  el('stop', { offset: '1', 'stop-color': '#c9a962', 'stop-opacity': '0' }, glowGrad);
  const planeGrad = el('radialGradient', { id: uid + 'Plane' }, defs);
  el('stop', { offset: '0', 'stop-color': '#c9a962', 'stop-opacity': '.04' }, planeGrad);
  el('stop', { offset: '.75', 'stop-color': '#c9a962', 'stop-opacity': '.018' }, planeGrad);
  el('stop', { offset: '1', 'stop-color': '#c9a962', 'stop-opacity': '0' }, planeGrad);
  // The lines fade out around the logo: an elliptical mask, black (hidden) over the logo.
  const fadeGrad = el('radialGradient', { id: uid + 'Fade', gradientUnits: 'userSpaceOnUse', cx: CX, cy: CY, r: 100 }, defs);
  el('stop', { offset: '0', 'stop-color': '#000' }, fadeGrad);
  const fadeInner = el('stop', { offset: '.7', 'stop-color': '#000' }, fadeGrad);
  el('stop', { offset: '1', 'stop-color': '#fff' }, fadeGrad);
  const mask = el('mask', { id: uid + 'Mask', maskUnits: 'userSpaceOnUse', x: -80, y: -80, width: 580, height: 490 }, defs);
  el('rect', { x: -80, y: -80, width: 580, height: 490, fill: 'url(#' + uid + 'Fade)' }, mask);

  el('circle', { cx: CX, cy: CY, r: 158, fill: 'url(#' + uid + 'Glow)' }, svg);
  const plane = el('ellipse', { cx: CX, cy: CY, fill: 'url(#' + uid + 'Plane)' }, svg);
  const ringBack = el('path', { class: 'orbit-ring orbit-ring-back' }, svg);
  const ringFront = el('path', { class: 'orbit-ring orbit-ring-front' }, svg);

  const lines = el('g', { mask: 'url(#' + uid + 'Mask)' }, svg);
  const edgePairs = [['owners', 'nations'], ['nations', 'contractors'], ['contractors', 'owners']];
  const edges = edgePairs.map(() => el('path', { class: 'orbit-edge' }, lines));
  const spokes = {};
  PARTIES.forEach((k) => { spokes[k] = el('path', { class: 'orbit-spoke', 'data-p': k }, lines); });
  const beams = {};
  PARTIES.forEach((k) => {
    const g = el('g', { class: 'orbit-beam', opacity: '0' }, lines);
    const glow = el('path', { class: 'orbit-beam-glow', pathLength: '1' }, g);
    const line = el('path', { class: 'orbit-beam-line', pathLength: '1' }, g);
    const head = el('circle', { class: 'orbit-beam-head', r: '2.3', opacity: '0' }, g);
    beams[k] = { g, glow, line, head, on: false, a: 0, b: 0, op: 0, headOp: 0 };
  });
  const bloomLayer = el('g', { class: 'orbit-blooms' }, svg);
  const blooms = {};
  PARTIES.forEach((k) => { blooms[k] = { c: el('circle', { class: 'orbit-bloom', r: '7', opacity: '0' }, bloomLayer), r: 7, op: 0 }; });

  const originalSvg = map.querySelector('svg:not(.orbit-svg)');
  if (originalSvg) originalSvg.after(svg); else map.prepend(svg);

  // ---------------------------------------------------------------- Pause / Play
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'connection-motion orbit-toggle';
  if (controls) controls.appendChild(toggle);

  // ---------------------------------------------------------------- state
  const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mqPhone = window.matchMedia('(max-width: 600px)');
  let geo = GEOMETRY.wide;
  let scale = 1;            // px per viewBox unit
  let dotOff = 20;          // px from a party button's top to its point's centre
  const clear = { rx: 70, ry: 30 }; // the hidden ellipse over the logo, in viewBox units
  let p = START_P;          // tour position
  let pVel = 0;             // tour positions per second
  let k = 0;                // speed factor, 0 held to 1 touring
  let seeking = false, seekTarget = 0;
  let mode = 'intro';       // 'intro' | 'auto' | 'user'
  let shownKey = startKey;  // what the caption shows (or is changing to)
  let paused = false, hover = false, focusHold = false, choseInHover = false;
  let holdUntil = 0;
  let introStarted = false;
  let onScreen = true;
  let running = false, lastT = 0, rafId = 0;
  let internal = false, trigger = null, pendingText = 0;
  const timers = new Set();
  const zState = {};
  const pos = {};
  PARTIES.forEach((key) => { pos[key] = { x: CX, y: CY, z: 0 }; });
  const cap = { op: 1 };
  const tweens = [];

  const isStill = () => mqReduce.matches || !html.classList.contains('motion');
  const rate = (q) => BASE * (1 - A * Math.cos(TAU * q));
  const frontKey = () => ORDER[mod3(Math.floor(p + 0.5))];

  function later(ms, fn) {
    const id = setTimeout(() => { timers.delete(id); fn(); }, ms);
    timers.add(id);
  }

  // ---------------------------------------------------------------- tweens (on the same clock as the ring)
  function killTweens(obj, key) {
    for (let i = tweens.length - 1; i >= 0; i--) {
      if (tweens[i].obj === obj && (key === undefined || tweens[i].key === key)) tweens.splice(i, 1);
    }
  }
  function tween(obj, key, to, dur, opts) {
    const o = opts || {};
    killTweens(obj, key);
    if (isStill() || dur <= 0) { obj[key] = to; if (o.done) o.done(); return; }
    tweens.push({ obj, key, to, dur, delay: o.delay || 0, ease: o.ease || EASE.inOut, done: o.done, t: 0, from: null });
    wake();
  }
  function stepTweens(dt) {
    for (let i = 0; i < tweens.length; i++) {
      const tw = tweens[i];
      tw.t += dt;
      if (tw.t < tw.delay) continue;
      if (tw.from === null) tw.from = tw.obj[tw.key];
      const u = Math.min(1, (tw.t - tw.delay) / tw.dur);
      tw.obj[tw.key] = tw.from + (tw.to - tw.from) * tw.ease(u);
      if (u >= 1) { tweens.splice(i--, 1); if (tw.done) tw.done(); }
    }
  }

  // ---------------------------------------------------------------- geometry
  function setGeometry() {
    geo = mqPhone.matches ? GEOMETRY.phone : GEOMETRY.wide;
    const { rx, ry } = geo;
    plane.setAttribute('rx', rx);
    plane.setAttribute('ry', ry);
    // Back half (top of the screen) and front half, so the near side of the ring reads brighter.
    ringBack.setAttribute('d', `M${CX - rx} ${CY} A${rx} ${ry} 0 0 1 ${CX + rx} ${CY}`);
    ringFront.setAttribute('d', `M${CX + rx} ${CY} A${rx} ${ry} 0 0 1 ${CX - rx} ${CY}`);
  }

  function measure() {
    const w = map.getBoundingClientRect().width;
    if (w > 0) scale = w / 420;
    const dot = nodes.owners.querySelector('.node-dot');
    if (dot) dotOff = dot.offsetTop + dot.offsetHeight / 2;
    // The hidden ellipse covers the logo's box with a little room; the lines fade in beyond it.
    if (logo) {
      const r = logo.getBoundingClientRect();
      if (r.width > 0) {
        const hw = r.width / 2 / scale, hh = r.height / 2 / scale;
        clear.rx = hw * Math.SQRT2 + 4;
        clear.ry = hh * Math.SQRT2 + 4;
      }
    }
    const outer = 1.45;
    fadeGrad.setAttribute('r', (clear.rx * outer).toFixed(2));
    fadeGrad.setAttribute('gradientTransform', `translate(${CX} ${CY}) scale(1 ${(clear.ry / clear.rx).toFixed(4)}) translate(${-CX} ${-CY})`);
    fadeInner.setAttribute('offset', (1 / outer).toFixed(3));
  }

  // ---------------------------------------------------------------- drawing
  function render() {
    const still = isStill();
    const turn = -STEP * (p + 0.5);
    for (const key of PARTIES) {
      const th = OFFSETS[key] + turn;
      const x = CX + geo.rx * Math.cos(th);
      const y = CY + geo.ry * Math.sin(th);
      const z = still ? 0 : Math.sin(th); // -1 far, +1 near
      const P = pos[key];
      P.x = x; P.y = y; P.z = z;

      const n = nodes[key];
      const s = 1 + geo.depth * z;
      n.style.setProperty('transform',
        `translate3d(${(x * scale).toFixed(2)}px,${(y * scale).toFixed(2)}px,0) translate(-50%,${-dotOff}px) scale(${s.toFixed(4)})`,
        'important');
      n.style.transformOrigin = `50% ${dotOff}px`;
      n.style.opacity = (still ? 1 : geo.labelMin + (1 - geo.labelMin) * (z + 1) / 2).toFixed(3);
      const front = still || z >= 0;
      if (zState[key] !== front) { zState[key] = front; n.style.zIndex = front ? '4' : '2'; }

      // Spoke and line: from the edge of the hidden ellipse to just short of the party's point.
      const dx = x - CX, dy = y - CY;
      const len = Math.hypot(dx, dy) || 1;
      const ux = dx / len, uy = dy / len;
      const tIn = Math.min(len - GAP - 1, 1 / Math.sqrt((ux / clear.rx) ** 2 + (uy / clear.ry) ** 2));
      const sx = CX + ux * tIn, sy = CY + uy * tIn;
      const ex = x - ux * GAP, ey = y - uy * GAP;
      const d = `M${sx.toFixed(2)} ${sy.toFixed(2)}L${ex.toFixed(2)} ${ey.toFixed(2)}`;
      const sp = spokes[key];
      sp.setAttribute('d', d);
      sp.setAttribute('stroke-opacity', (still ? 0.8 : 0.5 + 0.5 * (z + 1) / 2).toFixed(3));

      const bm = beams[key];
      if (bm.op > 0.001) {
        bm.glow.setAttribute('d', d);
        bm.line.setAttribute('d', d);
        const dash = Math.max(0, bm.b - bm.a).toFixed(4) + ' 3';
        const off = (-bm.a).toFixed(4);
        bm.glow.setAttribute('stroke-dasharray', dash); bm.glow.setAttribute('stroke-dashoffset', off);
        bm.line.setAttribute('stroke-dasharray', dash); bm.line.setAttribute('stroke-dashoffset', off);
        bm.head.setAttribute('cx', (sx + (ex - sx) * bm.b).toFixed(2));
        bm.head.setAttribute('cy', (sy + (ey - sy) * bm.b).toFixed(2));
        bm.head.setAttribute('opacity', bm.headOp.toFixed(3));
      }
      bm.g.setAttribute('opacity', bm.op.toFixed(3));

      const bl = blooms[key];
      if (bl.op > 0.001) {
        bl.c.setAttribute('cx', x.toFixed(2)); bl.c.setAttribute('cy', y.toFixed(2));
        bl.c.setAttribute('r', bl.r.toFixed(2));
      }
      bl.c.setAttribute('opacity', bl.op.toFixed(3));
    }
    edgePairs.forEach(([a, b], i) => {
      const P = pos[a], Q = pos[b];
      const dx = Q.x - P.x, dy = Q.y - P.y, len = Math.hypot(dx, dy) || 1;
      const ux = dx / len, uy = dy / len;
      edges[i].setAttribute('d', `M${(P.x + ux * GAP).toFixed(2)} ${(P.y + uy * GAP).toFixed(2)}L${(Q.x - ux * GAP).toFixed(2)} ${(Q.y - uy * GAP).toFixed(2)}`);
      edges[i].setAttribute('stroke-opacity', (still ? 0.8 : 0.5 + 0.5 * ((P.z + Q.z) / 2 + 1) / 2).toFixed(3));
    });
    const c = cap.op.toFixed(3);
    label.style.opacity = c;
    desc.style.opacity = c;
  }

  // ---------------------------------------------------------------- lines, points, caption
  function lit(key, value) { nodes[key].toggleAttribute('data-orbit-lit', value); }

  function bloom(key) {
    const bl = blooms[key];
    bl.r = 7; bl.op = 0.7;
    tween(bl, 'r', 26, 1.9, { ease: EASE.out });
    tween(bl, 'op', 0, 1.9, { ease: EASE.out });
  }

  // Draws the lines to `keys` and takes the others away. User choices are quicker.
  function showBeams(keys, user) {
    let order = 0;
    for (const key of PARTIES) {
      const bm = beams[key];
      const want = keys.includes(key);
      if (want && !bm.on) {
        killTweens(bm);
        bm.on = true; bm.a = 0; bm.b = 0; bm.op = 1; bm.headOp = 0;
        const dur = user ? 0.6 : 1.35;
        const delay = (user ? 0 : 0.12) + (keys.length > 1 ? order++ * 0.12 : 0);
        if (user) lit(key, true);
        tween(bm, 'b', 1, dur, { delay, ease: user ? EASE.out : EASE.inOut, done: () => { if (bm.on) { lit(key, true); bloom(key); } } });
        tween(bm, 'headOp', 1, 0.3, { delay, ease: EASE.sine, done: () => tween(bm, 'headOp', 0, 0.5, { delay: Math.max(0, dur * 0.82 - 0.3), ease: EASE.sine }) });
      } else if (want && bm.on) {
        if (user) lit(key, true);
      } else if (!want && bm.on) {
        bm.on = false;
        lit(key, false);
        killTweens(bm);
        const reset = () => { bm.a = 0; bm.b = 0; bm.op = 0; bm.headOp = 0; };
        tween(bm, 'headOp', 0, 0.2);
        if (!user && bm.b > 0.98) {
          // Fully drawn: the line runs on out through the party's point, away from Neos.
          tween(bm, 'a', 1, 1.05, { ease: EASE.in, done: reset });
          tween(bm, 'op', 0, 1.05, { ease: EASE.in });
        } else {
          tween(bm, 'op', 0, user ? 0.3 : 0.5, { ease: EASE.sine, done: reset });
        }
      }
    }
  }

  function callOrig(key) {
    if (!orig) return;
    internal = true;
    try { orig(key); } finally { internal = false; }
  }

  function autoTo(key) {
    shownKey = key;
    cancelAnimationFrame(pendingText);
    caption.setAttribute('aria-live', 'off');
    tween(cap, 'op', 0, 0.34, { ease: EASE.in, done: () => { callOrig(key); tween(cap, 'op', 1, 0.75, { ease: EASE.out }); } });
    showBeams([key], false);
  }

  function userChoose(key, how) {
    const still = isStill();
    if (!still) mode = 'user';
    if (key !== shownKey || cap.op < 1) {
      shownKey = key;
      killTweens(cap);
      cancelAnimationFrame(pendingText);
      if (caption.getAttribute('aria-live') === 'off') {
        // Switch the live region back on first and change the text a moment later, so the
        // visitor's own choice is read out.
        caption.setAttribute('aria-live', startLive || 'polite');
        cap.op = 0.35;
        pendingText = requestAnimationFrame(() => {
          pendingText = requestAnimationFrame(() => { callOrig(key); tween(cap, 'op', 1, 0.35, { ease: EASE.out }); });
        });
      } else {
        callOrig(key);
        if (!still) { cap.op = 0.35; tween(cap, 'op', 1, 0.35, { ease: EASE.out }); }
      }
    }
    showBeams(key === 'all' ? PARTIES : [key], true);
    if (how === 'click' && key !== 'all' && !still) seekTo(key);
    if (hover) choseInHover = true;
    if (still) render(); else wake();
  }

  function seekTo(key) {
    const idx = ORDER.indexOf(key);
    const target = idx + 3 * Math.round((p - idx) / 3);
    if (Math.abs(p - target) < 1e-3 && Math.abs(pVel) < 1e-3) return;
    seekTarget = target;
    seeking = true;
    wake();
  }

  // ---------------------------------------------------------------- the loop
  function held(now) {
    return paused || hover || focusHold || now < holdUntil || mode === 'intro';
  }

  function tick(time) {
    const t = typeof time === 'number' ? time : performance.now() / 1000;
    let dt = lastT ? t - lastT : 0;
    lastT = t;
    if (dt <= 0) return;
    if (dt > 0.05) dt = 0.05;
    const now = performance.now();
    const hold = held(now);
    if (!hold && mode === 'user') mode = 'auto';

    if (seeking) {
      const d = p - seekTarget;
      pVel += (-SEEK_OMEGA * SEEK_OMEGA * d - 2 * SEEK_OMEGA * pVel) * dt;
      p += pVel * dt;
      // Settled to well under a pixel: finish there.
      if (Math.abs(p - seekTarget) < 2e-3 && Math.abs(pVel) < 1e-2) { p = seekTarget; pVel = 0; seeking = false; k = 0; }
    } else {
      const target = hold ? 0 : 1;
      k += (target - k) * (1 - Math.exp(-dt / (target > k ? RESUME_TAU : STOP_TAU)));
      if (target === 0 && k < 0.012) k = 0; // under about 2 px a second: stop there
      pVel = k * rate(p);
      p += pVel * dt;
    }
    // Keep p small without changing which party is where.
    if (p > 30 && !seeking) p -= 30;

    if (mode === 'auto') { const f = frontKey(); if (f !== shownKey) autoTo(f); }
    stepTweens(dt);
    render();
    if (k === 0 && !seeking && tweens.length === 0 && hold) stop();
  }

  function rafLoop(ts) { tick(ts / 1000); if (running && !(gsap && gsap.ticker)) rafId = requestAnimationFrame(rafLoop); }
  function start() {
    if (running) return;
    running = true; lastT = 0;
    if (gsap && gsap.ticker) gsap.ticker.add(tick); else rafId = requestAnimationFrame(rafLoop);
  }
  function stop() {
    if (!running) return;
    running = false;
    if (gsap && gsap.ticker) gsap.ticker.remove(tick);
    if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
  }
  function wake() {
    if (!isStill() && onScreen && !document.hidden) start();
  }
  function holdFor(ms) {
    holdUntil = Math.max(holdUntil, performance.now() + ms);
    later(ms + 30, wake);
    wake();
  }

  function showToggle() {
    toggle.textContent = '';
    toggle.append(document.createTextNode(paused ? 'Play ' : 'Pause '));
    const icon = document.createElement('span');
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = paused ? '▷' : 'Ⅱ';
    toggle.append(icon);
    toggle.setAttribute('aria-label', paused ? 'Play the participant tour' : 'Pause the participant tour');
  }

  // Motion on or off (the preference can change while the page is open).
  function update() {
    const still = isStill();
    panel.toggleAttribute('data-orbit-live', !still);
    toggle.hidden = still;
    if (still) {
      stop();
      killTweens(cap);
      tweens.length = 0;
      seeking = false; k = 0; pVel = 0; p = START_P;
      cap.op = 1;
      if (startLive !== null) caption.setAttribute('aria-live', startLive);
      PARTIES.forEach((key) => { const b = blooms[key]; b.op = 0; });
      const key = map.dataset.active || 'all';
      shownKey = key;
      PARTIES.forEach((pk) => { const bm = beams[pk]; bm.on = false; bm.op = 0; bm.a = 0; bm.b = 0; bm.headOp = 0; lit(pk, false); });
      if (key !== 'all') showBeams([key], true);
      render();
      return;
    }
    if (mode === 'intro' && onScreen && !introStarted) {
      introStarted = true;
      later(INTRO * 1000, () => { if (mode === 'intro') { mode = 'auto'; wake(); } });
    }
    if (onScreen && !document.hidden) start(); else stop();
  }

  // ---------------------------------------------------------------- events
  // Every call from the page (hover, focus, click on a party or on Neos) comes through here.
  const wrapped = function (key) {
    if (internal || !orig) return orig && orig.apply(this, arguments);
    const how = trigger; trigger = null;
    // While a chosen party turns to the front, others pass under a resting pointer: ignore those.
    if (how === 'hover' && seeking) return;
    userChoose(key, how);
  };
  if (orig) window.showParticipant = wrapped;

  const isTarget = (n) => n && n.closest && n.closest('[data-participant]');
  on(panel, 'mouseenter', (e) => { if (isTarget(e.target)) trigger = 'hover'; }, { capture: true });
  on(panel, 'focus', (e) => { if (isTarget(e.target)) trigger = 'focus'; }, { capture: true });
  on(panel, 'click', (e) => {
    const b = isTarget(e.target);
    if (!b) return;
    trigger = 'click';
    if (!orig) userChoose(b.dataset.participant, 'click');
  }, { capture: true });

  on(panel, 'pointerenter', (e) => {
    if (e.pointerType === 'touch') return;
    hover = true; choseInHover = false;
  });
  on(panel, 'pointerleave', (e) => {
    if (e.pointerType === 'touch') return;
    hover = false;
    holdFor(choseInHover ? CHOICE_RESUME : LEAVE_RESUME);
  });
  on(map, 'pointerdown', (e) => {
    if (e.pointerType === 'touch' || e.pointerType === 'pen') holdFor(TOUCH_RESUME);
  });
  on(panel, 'focusin', (e) => {
    let kb = false;
    try { kb = e.target.matches(':focus-visible'); } catch (err) { kb = true; }
    if (kb && e.target !== toggle) { focusHold = true; wake(); }
  });
  on(panel, 'focusout', (e) => {
    if (focusHold && !panel.contains(e.relatedTarget)) { focusHold = false; holdFor(FOCUS_RESUME); }
  });
  on(toggle, 'click', () => {
    paused = !paused;
    showToggle();
    wake();
  });

  // Keep the caption the height of its longest text, so nothing below it moves between parties.
  let lastWidth = -1;
  function lockCaptionHeight() {
    const w = caption.getBoundingClientRect().width;
    if (!copy || !w || Math.abs(w - lastWidth) < 0.5) return;
    lastWidth = w;
    const probe = caption.cloneNode(true);
    probe.removeAttribute('aria-live');
    probe.setAttribute('aria-hidden', 'true');
    probe.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'));
    probe.style.cssText = 'position:absolute;left:0;top:0;visibility:hidden;pointer-events:none;min-height:0;margin:0;width:' + w + 'px';
    panel.append(probe);
    let max = 0;
    Object.keys(copy).forEach((key) => {
      probe.firstElementChild.textContent = copy[key][0];
      probe.lastElementChild.textContent = copy[key][1];
      max = Math.max(max, probe.getBoundingClientRect().height);
    });
    probe.remove();
    caption.style.minHeight = Math.ceil(max) + 'px';
  }

  let io = null, ro = null, roFrame = 0;
  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver((entries) => {
      onScreen = entries[entries.length - 1].isIntersecting;
      update();
    }, { rootMargin: '60px 0px' });
    io.observe(panel);
  }
  on(document, 'visibilitychange', update);
  const onResize = () => {
    cancelAnimationFrame(roFrame);
    roFrame = requestAnimationFrame(() => { measure(); render(); lockCaptionHeight(); });
  };
  if ('ResizeObserver' in window) { ro = new ResizeObserver(onResize); ro.observe(panel); }
  else on(window, 'resize', onResize);
  on(mqPhone, 'change', () => { setGeometry(); onResize(); });
  on(mqReduce, 'change', update);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (!ac.signal.aborted) { lastWidth = -1; onResize(); } });
  if (logo && !logo.complete) on(logo, 'load', onResize);

  setGeometry();
  measure();
  showToggle();
  lockCaptionHeight();
  if (startKey !== 'all') showBeams([startKey], true);
  render();
  update();
  if (typeof window.neosRequestRefresh === 'function') window.neosRequestRefresh();

  const api = {
    destroy() {
      stop();
      ac.abort();
      timers.forEach((id) => clearTimeout(id));
      timers.clear();
      cancelAnimationFrame(pendingText);
      cancelAnimationFrame(roFrame);
      if (io) io.disconnect();
      if (ro) ro.disconnect();
      if (window.showParticipant === wrapped) window.showParticipant = orig;
      svg.remove();
      toggle.remove();
      savedStyles.forEach((s, n) => {
        // Clear through the style object first and read the attribute back, so Chrome does not later
        // re-serialize an empty style="" from its pending inline-style state.
        n.style.cssText = '';
        n.getAttribute('style');
        if (s === null) n.removeAttribute('style'); else n.setAttribute('style', s);
      });
      PARTIES.forEach((key) => nodes[key].removeAttribute('data-orbit-lit'));
      if (startLive === null) caption.removeAttribute('aria-live'); else caption.setAttribute('aria-live', startLive);
      panel.removeAttribute('data-orbit-live');
      delete panel.dataset.tri;
      delete panel.__orbit;
      callOrig(startKey);
    }
  };
  panel.__orbit = api;
  return api;
}
