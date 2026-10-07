// "Client work you can see" for Alternative B.
// Adds a representative document beside the assignment panel in #work-examples.
// Reads tab state only (aria-selected). Never changes app.js behaviour or ARIA.
// Selecting the sheet opens a larger, readable view.
import { DOCS } from './documents.js';

const CANVAS_W = 640, CANVAS_H = 495;   // design canvas, see documents.js
const SWAP_MS = 800;             // longest swap (delay + duration), keep in sync with work-docs.css
const CAPTION = 'Representative example. Not client material.';

export function initWorkDocs({ root = document } = {}) {
  const doc = root.ownerDocument || root;
  const win = doc.defaultView || window;
  const section = root.querySelector('#work-examples') || root.querySelector('.work-showcase');
  const stage = section && section.querySelector('.assignment-stage');
  if (!stage) return null;
  if (stage.querySelector('.wd-desk')) return stage.__workDocs || null;

  const tabs = [...section.querySelectorAll('[role="tab"][id^="work-tab-"]')];
  const idOf = tab => tab.id.replace('work-tab-', '');
  const selectedId = () => { const t = tabs.find(x => x.getAttribute('aria-selected') === 'true'); return t ? idOf(t) : DOCS[0].id; };
  const byId = new Map(DOCS.map(d => [d.id, d]));

  // ---- markup ------------------------------------------------------------
  const desk = doc.createElement('div');
  desk.className = 'wd-desk';
  desk.innerHTML = `<div class="wd-stagebox"><div class="wd-tilt" aria-hidden="true"></div><div class="wd-floor" aria-hidden="true"></div>` +
    `<button type="button" class="wd-open" aria-haspopup="dialog"><span class="wd-open-hint" aria-hidden="true">View larger</span></button></div>` +
    `<p class="wd-caption" aria-hidden="true">${CAPTION}</p>`;
  const tilt = desk.querySelector('.wd-tilt');
  const openBtn = desk.querySelector('.wd-open');
  // Sheets are built when first shown, so the page does not lay out twelve documents at start.
  const sheets = new Map();
  function sheetFor(id) {
    if (sheets.has(id)) return sheets.get(id);
    const d = byId.get(id);
    if (!d) return null;
    const sheet = doc.createElement('div');
    sheet.className = 'wd-sheet' + (d.spread ? ' wd-sheet-spread' : '');
    sheet.dataset.doc = d.id;
    sheet.innerHTML = `<div class="wd-canvas">${d.html}</div>`;
    tilt.append(sheet);
    sheets.set(id, sheet);
    return sheet;
  }
  stage.prepend(desk);
  section.classList.add('wd-on');

  // ---- motion preference ------------------------------------------------
  const html = doc.documentElement;
  const mqReduce = win.matchMedia('(prefers-reduced-motion: reduce)');
  const mqPhone = win.matchMedia('(max-width: 800px)');
  const motionOn = () => html.classList.contains('motion') && !mqReduce.matches;
  const applyMotionClass = () => { desk.classList.toggle('wd-still', !motionOn()); queueTilt(); };

  // ---- scale the 640px canvas to the frame -------------------------------
  const setScale = () => { const w = tilt.clientWidth; if (w) desk.style.setProperty('--wd-scale', (w / CANVAS_W).toFixed(4)); };
  const ro = new win.ResizeObserver(setScale);
  ro.observe(tilt);

  // ---- swap ----------------------------------------------------------------
  let current = null, swapTimer = 0;
  const timers = new Map();
  const snap = (el, fn) => { el.classList.add('wd-snap'); fn(); void el.offsetWidth; el.classList.remove('wd-snap'); };
  function label(id) {
    const d = byId.get(id);
    openBtn.setAttribute('aria-label', `${d ? d.label : 'Document'}. ${CAPTION} View larger.`);
  }

  function show(id, instant = false) {
    if (!byId.has(id) || id === current) return;
    const fresh = !sheets.has(id);
    const next = sheetFor(id);
    const prev = current && sheets.get(current);
    const still = instant || !motionOn();
    if (timers.has(id)) { clearTimeout(timers.get(id)); timers.delete(id); }
    if (still) {
      sheets.forEach(s => { if (s !== next) snap(s, () => s.classList.remove('is-active', 'is-leaving', 'wd-ready')); });
      // A sheet that has just been created has no style yet, so nothing can transition: set its
      // classes directly instead of forcing a layout of the whole page (the page's first show).
      if (fresh) next.classList.add('wd-ready', 'is-active');
      else snap(next, () => { next.classList.remove('is-leaving'); next.classList.add('wd-ready', 'is-active'); });
    } else {
      desk.classList.add('wd-swapping');
      clearTimeout(swapTimer);
      swapTimer = setTimeout(() => desk.classList.remove('wd-swapping'), SWAP_MS + 80);
      if (prev) {
        prev.classList.remove('is-active');
        prev.classList.add('is-leaving');
        const key = current;
        timers.set(key, setTimeout(() => { snap(prev, () => prev.classList.remove('is-leaving', 'wd-ready')); timers.delete(key); }, SWAP_MS + 60));
      }
      // display the new sheet in its start pose first, then let it glide in
      snap(next, () => { next.classList.remove('is-leaving'); next.classList.add('wd-ready'); });
      next.classList.add('is-active');
    }
    current = id;
    label(id);
  }

  // ---- tab changes: watch aria-selected, the source of truth set by app.js --
  const mo = new win.MutationObserver(() => show(selectedId()));
  tabs.forEach(t => mo.observe(t, { attributes: true, attributeFilter: ['aria-selected'] }));

  // ---- scroll tilt (scrubbed to scroll position, reversible) ---------------
  // Progress 0 when the desk enters at the bottom of the viewport, 1 when it leaves at the top.
  // Reads the live rect once per frame at most, so it stays correct with Lenis and with held sections.
  let visible = false, tiltRaf = 0;
  function applyTilt() {
    tiltRaf = 0;
    if (mqPhone.matches) { tilt.style.transform = ''; return; }
    let p = 0.5;
    if (motionOn()) {
      const r = desk.getBoundingClientRect();
      const vh = win.innerHeight || 1;
      p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
    }
    const rx = 11 - 7 * p;          // top edge leans back 11deg on entry, 4deg on exit
    const ry = 7 - 4 * p;           // left edge leans away slightly
    const rz = -0.9 + 0.8 * p;
    tilt.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) rotateZ(${rz.toFixed(2)}deg)`;
  }
  function queueTilt() { if (!tiltRaf) tiltRaf = win.requestAnimationFrame(applyTilt); }
  const onScroll = () => { if (visible && motionOn()) queueTilt(); };
  const io = new win.IntersectionObserver(entries => { visible = entries.some(e => e.isIntersecting); if (visible) queueTilt(); }, { rootMargin: '10% 0px' });
  io.observe(desk);
  // one scroll source: Lenis when it runs the page, otherwise the window
  const lenis = win.neosLenis;
  const offLenis = lenis && typeof lenis.on === 'function' ? lenis.on('scroll', onScroll) : null;
  if (!lenis) win.addEventListener('scroll', onScroll, { passive: true });
  win.addEventListener('resize', queueTilt);
  const onMq = () => applyMotionClass();
  mqReduce.addEventListener('change', onMq);
  mqPhone.addEventListener('change', onMq);
  const classWatch = new win.MutationObserver(onMq);
  classWatch.observe(html, { attributes: true, attributeFilter: ['class'] });

  // ---- larger view ---------------------------------------------------------
  // With a mouse the paper opens at 1.5 to 2.1 times its size on the page (scroll to see the rest on a
  // small window). On a touch screen too small for that, it opens fitted to the screen, so the whole
  // sheet is in view, and two fingers zoom it (one finger pans; a double tap zooms in or back out).
  let viewer = null, fit = 1, zoom = 1, zoomable = false;
  const mqTouch = win.matchMedia('(pointer: coarse)');
  const MAX_SCALE = 2.2;
  function buildViewer() {
    viewer = doc.createElement('dialog');
    viewer.className = 'wd-viewer';
    viewer.setAttribute('aria-labelledby', 'wd-viewer-title');
    viewer.setAttribute('data-lenis-prevent', '');
    viewer.innerHTML = `<div class="wd-viewer-head"><p class="wd-viewer-title" id="wd-viewer-title"></p>` +
      `<button type="button" class="wd-viewer-close" aria-label="Close larger view">×</button></div>` +
      `<div class="wd-viewer-scroll"><div class="wd-viewer-paper"></div></div>` +
      `<p class="wd-viewer-caption"><span>${CAPTION}</span><span class="wd-viewer-hint" aria-hidden="true">Pinch to zoom</span></p>`;
    doc.body.append(viewer);
    viewer.querySelector('.wd-viewer-close').addEventListener('click', () => viewer.close());
    viewer.addEventListener('click', (event) => {
      if (event.target !== viewer) return;
      const b = viewer.getBoundingClientRect();
      if (event.clientX < b.left || event.clientX > b.right || event.clientY < b.top || event.clientY > b.bottom) viewer.close();
    });
    viewer.addEventListener('close', () => {
      doc.body.classList.remove('dialog-open');
      viewer.querySelector('.wd-viewer-paper').replaceChildren();
      openBtn.focus({ preventScroll: true });
    });
    win.addEventListener('resize', () => { if (viewer.open) sizeViewer(); });
    // pinch to zoom and double tap
    const scroller = viewer.querySelector('.wd-viewer-scroll');
    let pinch = null, tap = null;
    const dist = (t) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
    // the point of the paper under the fingers (as fractions of the paper), kept there as it grows
    const anchorAt = (x, y) => {
      const r = viewer.querySelector('.wd-viewer-paper').getBoundingClientRect();
      return { z0: zoom, x, y, fx: (x - r.left) / r.width, fy: (y - r.top) / r.height };
    };
    scroller.addEventListener('touchstart', (e) => {
      if (!zoomable) return;
      if (e.touches.length === 2) {
        pinch = Object.assign(anchorAt((e.touches[0].clientX + e.touches[1].clientX) / 2, (e.touches[0].clientY + e.touches[1].clientY) / 2), { d0: dist(e.touches) || 1 });
        tap = null;
      }
    }, { passive: true });
    scroller.addEventListener('touchmove', (e) => {
      if (!pinch || e.touches.length !== 2) return;
      e.preventDefault();
      setZoom(pinch.z0 * dist(e.touches) / pinch.d0, pinch);
    }, { passive: false });
    scroller.addEventListener('touchend', (e) => {
      if (e.touches.length < 2) pinch = null;
      if (!zoomable || e.touches.length || e.changedTouches.length !== 1) return;
      const t = e.changedTouches[0], now = e.timeStamp;
      if (tap && now - tap.t < 320 && Math.hypot(t.clientX - tap.x, t.clientY - tap.y) < 24) {
        setZoom(zoom > 1.3 ? 1 : 2.5, anchorAt(t.clientX, t.clientY));
        tap = null;
      } else {
        tap = { t: now, x: t.clientX, y: t.clientY };
      }
    }, { passive: true });
  }
  // Scale the paper to fit * z, keeping the point under the fingers where it is.
  function setZoom(z, anchor) {
    const zMax = Math.max(1, MAX_SCALE / fit);
    z = Math.min(zMax, Math.max(1, z));
    const paper = viewer.querySelector('.wd-viewer-paper');
    const scroller = viewer.querySelector('.wd-viewer-scroll');
    const s = fit * z;
    paper.style.setProperty('--wd-scale', s.toFixed(4));
    paper.style.width = Math.round(CANVAS_W * s) + 'px';
    paper.style.height = Math.round(CANVAS_H * s) + 'px';
    if (anchor) {
      const r = paper.getBoundingClientRect();
      scroller.scrollLeft += r.left + anchor.fx * r.width - anchor.x;
      scroller.scrollTop += r.top + anchor.fy * r.height - anchor.y;
    }
    zoom = z;
  }
  function sizeViewer() {
    const scroller = viewer.querySelector('.wd-viewer-scroll');
    const touch = mqTouch.matches;
    // the zoomable view has a fixed height (see work-docs.css), so the area measured here does not
    // change while the paper grows under the fingers
    viewer.classList.toggle('wd-zoomable', touch);
    const availW = (scroller.clientWidth || Math.min(win.innerWidth - 32, 1240) - 36) - 2;
    const availH = touch && scroller.clientHeight ? scroller.clientHeight - 2 : win.innerHeight - 32 - 32 - 74;
    const fitW = Math.min(availW / CANVAS_W, Math.max(availH, 200) / CANVAS_H);
    if (touch && fitW < 1.5) {
      // fitted to the screen: the whole sheet in view, pinch to read the detail
      fit = Math.min(availW / CANVAS_W, availH / CANVAS_H, 2.1);
      zoomable = true;
    } else {
      // readable: never below 1.5 times the sheet on the page, larger when the screen allows
      fit = Math.max(1.5, Math.min(2.1, availW / CANVAS_W, availH / CANVAS_H));
      zoomable = false;
    }
    viewer.classList.toggle('wd-zoomable', zoomable);
    setZoom(1, null);
  }
  function openViewer() {
    const d = byId.get(current);
    if (!d) return;
    if (!viewer) buildViewer();
    viewer.querySelector('.wd-viewer-title').textContent = d.label;
    viewer.querySelector('.wd-viewer-paper').innerHTML = `<div class="wd-canvas">${d.html}</div>`;
    viewer.showModal();
    sizeViewer();
    doc.body.classList.add('dialog-open');
    viewer.querySelector('.wd-viewer-scroll').scrollTo(0, 0);
  }
  openBtn.addEventListener('click', openViewer);

  // ---- start -----------------------------------------------------------
  // (the ResizeObserver sets the scale after the first layout, before the first paint)
  applyMotionClass();
  show(selectedId(), true);

  // The desk makes the section taller. Ask the page to re-measure (once, at rest).
  const refresh = () => {
    if (typeof win.neosRequestRefresh === 'function') win.neosRequestRefresh({ soft: true });
    else if (win.ScrollTrigger) win.ScrollTrigger.refresh();
  };
  win.requestAnimationFrame(refresh);
  // (fonts that finish loading later: reading document.fonts.ready would force a style pass here)
  if (doc.fonts && doc.fonts.addEventListener) doc.fonts.addEventListener('loadingdone', refresh);

  const api = {
    show,
    open: openViewer,
    destroy() {
      mo.disconnect(); ro.disconnect(); io.disconnect(); classWatch.disconnect();
      win.removeEventListener('scroll', onScroll); win.removeEventListener('resize', queueTilt);
      if (typeof offLenis === 'function') offLenis(); else if (lenis && typeof lenis.off === 'function') lenis.off('scroll', onScroll);
      mqReduce.removeEventListener('change', onMq); mqPhone.removeEventListener('change', onMq);
      timers.forEach(t => clearTimeout(t));
      if (tiltRaf) win.cancelAnimationFrame(tiltRaf);
      if (viewer) viewer.remove();
      desk.remove(); section.classList.remove('wd-on'); delete stage.__workDocs;
    },
  };
  stage.__workDocs = api;
  return api;
}
