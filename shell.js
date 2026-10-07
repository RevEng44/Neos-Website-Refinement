/* Neos Advisors website: page shell.
   - One Lenis smooth-scroll instance (window.neosLenis) driven by the GSAP ticker and wired to ScrollTrigger.
   - Lenis stops while a dialog or the phone menu is open. In-page links scroll through Lenis to the
     section, and a #section address lands correctly at load.
   - The header highlight follows the section on screen.
   - Chapter photos fetched and decoded about 3.5 screens ahead once the page has loaded.
   - Scrubbed motion only: the hero copy drifts up, the hero picture scales a little and darkens as you leave
     the hero, the photo chapters push in and drift (see "Construction sequence chapters"), and the
     Trans Mountain photo has a slow parallax. Nothing runs on a timer.
   - The client-work section, then the next section below the screen, is drawn once ahead of time at a still moment.
   - The single gold underline that slides between header links.
   Reduced motion (no html.motion class): no Lenis and no scrubbed motion. */
(function () {
  'use strict';

  var html = document.documentElement;
  var motion = html.classList.contains('motion');
  var hasGsap = !!(window.gsap && window.ScrollTrigger);
  if (hasGsap) {
    window.gsap.registerPlugin(window.ScrollTrigger);
    // No automatic refresh on 'load': the page asks for re-measures itself, at rest (see requestRefresh).
    window.ScrollTrigger.config({ ignoreMobileResize: true, autoRefreshEvents: 'visibilitychange,DOMContentLoaded,resize' });
  }

  /* ---------- Smooth scroll ---------- */
  var lenis = null;
  if (motion && hasGsap && typeof window.Lenis === 'function') {
    try {
      lenis = new window.Lenis({
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: false,
        anchors: false,
        allowNestedScroll: true,
        // Dialogs and the phone menu scroll natively.
        prevent: function (node) { return node.nodeName === 'DIALOG' || node.id === 'main-nav'; }
      });
      lenis.on('scroll', window.ScrollTrigger.update);
      window.gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      window.gsap.ticker.lagSmoothing(0);
    } catch (error) {
      console.warn('[Alternative B] Smooth scroll is off:', error);
      lenis = null;
    }
  }
  window.neosLenis = lenis;

  document.querySelectorAll('dialog, #main-nav').forEach(function (el) { el.setAttribute('data-lenis-prevent', ''); });

  var menuToggle = document.querySelector('.menu-toggle');
  function overlayOpen() {
    return document.body.classList.contains('dialog-open') ||
      !!document.querySelector('dialog[open]') ||
      (!!menuToggle && menuToggle.getAttribute('aria-expanded') === 'true');
  }
  function syncLenis() {
    if (!lenis) return;
    if (overlayOpen()) lenis.stop(); else lenis.start();
  }
  if (lenis) {
    var watch = new MutationObserver(syncLenis);
    watch.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    document.querySelectorAll('dialog').forEach(function (d) { watch.observe(d, { attributes: true, attributeFilter: ['open'] }); });
    if (menuToggle) watch.observe(menuToggle, { attributes: true, attributeFilter: ['aria-expanded'] });
  }

  if (menuToggle) {
    var menuNav = document.getElementById('main-nav');
    document.addEventListener('keydown', function (event) {
      if (menuToggle.getAttribute('aria-expanded') !== 'true' || !menuNav) return;
      if (event.key === 'Escape') {
        // app.js closes the menu on Escape; focus goes back to the button that opened it
        setTimeout(function () { menuToggle.focus(); }, 0);
        return;
      }
      if (event.key !== 'Tab') return;
      var items = [menuToggle].concat(Array.prototype.slice.call(menuNav.querySelectorAll('a[href], button:not([disabled])')))
        .filter(function (el) { return el.offsetWidth > 0 || el.offsetHeight > 0; });
      if (!items.length) return;
      var first = items[0], last = items[items.length - 1];
      var at = items.indexOf(document.activeElement);
      if (event.shiftKey && (at <= 0)) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (at === items.length - 1 || at === -1)) { event.preventDefault(); first.focus(); }
    });
  }

  function headerOffset() {
    var v = parseFloat(getComputedStyle(html).getPropertyValue('--header-offset'));
    return isNaN(v) ? 125 : v;
  }

  // Where an element sits in the page.
  function pageTop(el) {
    return el.getBoundingClientRect().top + window.scrollY;
  }

  function restingY(el, y) {
    return Math.max(0, y);
  }
  function landingY(el) {
    return restingY(el, pageTop(el) - headerOffset());
  }
  // The element a #address names. #work/<id> (a client-work example, see app.js) lands on the
  // client-work section.
  function hashTarget() {
    var h = '';
    try { h = decodeURIComponent(location.hash.slice(1)); } catch (e) { return null; }
    if (/^work\//.test(h)) h = 'work-examples';
    // The site before October 2026 linked to #about, #case-study and #indigenous. Old links land on the
    // nearest section, and the address is corrected so it can be copied.
    var oldNames = { about: 'team', 'case-study': 'experience', indigenous: 'engagement-services' };
    if (oldNames[h]) { h = oldNames[h]; if (history.replaceState) history.replaceState(null, '', '#' + h); }
    return h ? document.getElementById(h) : null;
  }

  /* ---------- Re-measuring ---------- */
  // Fonts, the documents and the transition spacers change the page height. Every module asks for a
  // re-measure through this one debounced request. A re-measure never runs while the page is moving
  // or in the middle of a section transition (it would stop a scroll in progress); it waits until
  // the page is at rest. A "soft" request is skipped when the page size has not changed.
  var refreshTimer = 0, refreshForced = false, lastSig = '';
  function layoutSig() { return document.documentElement.scrollHeight + 'x' + window.innerWidth + 'x' + window.innerHeight; }
  function pageBusy() {
    return !!(lenis && lenis.isScrolling);
  }
  function runRefresh() {
    refreshTimer = 0;
    if (pageBusy()) { refreshTimer = setTimeout(runRefresh, 250); return; }
    if (!refreshForced && lastSig && layoutSig() === lastSig) return;
    refreshForced = false;
    window.ScrollTrigger.refresh();
  }
  function requestRefresh(opts) {
    if (!hasGsap) return;
    if (opts && opts.force) refreshForced = true;
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(runRefresh, 120);
  }
  if (hasGsap) window.ScrollTrigger.addEventListener('refresh', function () { lastSig = layoutSig(); });
  window.neosRequestRefresh = requestRefresh;

  // In-page links: scroll with Lenis to the section's resting position (never inside a transition),
  // then move focus there, so the next Tab continues from the section that was chosen.
  // (the element a link has just landed on is already where it should be: settleFocus leaves it)
  var landedEl = null;
  function focusTarget(target) {
    if (!target.hasAttribute('tabindex') && !/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(target.nodeName)) target.setAttribute('tabindex', '-1');
    landedEl = target;
    target.focus({ preventScroll: true });
  }
  document.addEventListener('click', function (event) {
    if (!lenis || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    var link = event.target.closest && event.target.closest('a[href^="#"]');
    if (!link) return;
    var hash = link.getAttribute('href');
    if (!hash || hash.length < 2) return;
    var target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target) return;
    event.preventDefault();
    var isSkip = link.classList.contains('skip');
    syncLenis();
    lenis.resize();
    lenis.scrollTo(isSkip ? Math.max(0, pageTop(target)) : landingY(target), {
      immediate: isSkip,
      force: true,
      onComplete: function () { focusTarget(target); }
    });
    if (history.pushState && location.hash !== hash) history.pushState(null, '', hash);
  });

  // Keyboard focus and address changes: the browser jumps to a focused element or a #section on its
  // own (instantly under Lenis; see shell.css). If that leaves the page inside a transition, or the
  // element out of view, move on to the nearest resting position where the element is fully visible.
  var focusEl = null, focusTimer = 0;
  function settleFocus() {
    focusTimer = 0;
    var el = focusEl;
    focusEl = null;
    var landed = el === landedEl;
    landedEl = null;
    if (landed) return;               // an in-page link placed it just below the header already
    if (!el || el !== document.activeElement || !el.getBoundingClientRect || el === document.body) return;
    if (overlayOpen()) return;       // the phone menu or a dialog is open: the page stays where it is
    if (el.closest('.site-header, dialog, .skip')) return;   // fixed parts of the page
    var keyboard = false;
    try { keyboard = el.matches(':focus-visible'); } catch (e) { keyboard = false; }
    if (!keyboard) return;            // a mouse or touch press never moves the page
    var top = pageTop(el), h = el.getBoundingClientRect().height, y = window.scrollY;
    var hdr = headerOffset(), vh = window.innerHeight;
    var want = y;
    if (top - y < hdr + 8) want = top - hdr - 8;
    else if (top - y + Math.min(h, vh - hdr - 16) > vh - 8) want = top + Math.min(h, vh - hdr - 16) - vh + 8;
    if (want === y) return;
    var rest = restingY(el, want);
    if (Math.abs(rest - y) < 1) return;
    lenis.scrollTo(rest, { immediate: true, force: true });
  }
  function waitForFocusScroll() {
    if (!focusEl) return;
    clearTimeout(focusTimer);
    focusTimer = setTimeout(settleFocus, 90);
  }
  if (lenis) {
    document.addEventListener('focusin', function (event) { focusEl = event.target; waitForFocusScroll(); });
    window.addEventListener('scroll', waitForFocusScroll, { passive: true });
    // Page Down, Page Up and Space scroll a page with Lenis. A step keeps a little overlap below the
    // fixed header, so no line is skipped. Arrow keys still move in small steps.
    document.addEventListener('keydown', function (event) {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
      var key = event.key;
      var dir = key === 'PageDown' || (key === ' ' && !event.shiftKey) ? 1 : key === 'PageUp' || (key === ' ' && event.shiftKey) ? -1 : 0;
      if (!dir || overlayOpen()) return;
      var el = event.target;
      if (el && el.closest) {
        if (el.closest('input, textarea, select, [contenteditable=""], [contenteditable="true"], dialog, #main-nav')) return;
        if (key === ' ' && el.closest('a, button, summary, [role="button"], [role="tab"], label')) return;   // Space presses these
      }
      var from = typeof lenis.targetScroll === 'number' ? lenis.targetScroll : window.scrollY;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var step = Math.max(120, window.innerHeight - headerOffset() - 64);
      var to = Math.max(0, Math.min(max, from + dir * step));
      event.preventDefault();
      lenis.scrollTo(to);
    });
    // A same-page #section change (typed, or set by a script) lands like a menu link.
    window.addEventListener('hashchange', function () {
      var target = hashTarget();
      if (!target) return;
      requestAnimationFrame(function () {
        lenis.resize();
        lenis.scrollTo(target.id === 'main' ? 0 : landingY(target), { immediate: true, force: true });
      });
    });
  }

  /* ---------- Chapter photos: ready before they come into view ---------- */
  // The browser's own lazy loading starts a photo about a screen or two ahead, which on a phone
  // connection can leave a band showing only its blurred placeholder as a quick flick reaches it. So,
  // once the page has loaded, each photo is fetched and decoded about three and a half screens ahead.
  // With Save-Data or a 2G/3G connection the smaller file is used on wide screens too.
  (function () {
    var bands = Array.prototype.slice.call(document.querySelectorAll('.chapter'));
    if (!bands.length) return;
    var c = navigator.connection;
    var lite = !!(c && (c.saveData || /(^|-)(2g|3g)$/.test(c.effectiveType || '')));
    if (lite) {
      bands.forEach(function (band) {
        var img = band.querySelector('img.chapter-photo');
        if (img && img.getAttribute('src')) img.setAttribute('srcset', img.getAttribute('src') + ' 1200w');
      });
    }
    var ready = function (band) {
      var img = band.querySelector('img.chapter-photo');
      if (!img) return;
      img.loading = 'eager';
      if (img.decode) img.decode().catch(function () {});
    };
    // The Trans Mountain photo is revealed by the lowering-in, so it needs the same head start;
    // otherwise the string sweeps across flat navy and the photo cuts in partway through.
    var caseSection = document.getElementById('experience');
    var caseImg = caseSection && caseSection.querySelector('.case-photo img');
    var readyCase = function () {
      if (!caseImg) return;
      caseImg.loading = 'eager';
      if (caseImg.decode) caseImg.decode().catch(function () {});
    };
    var start = function () {
      if (!('IntersectionObserver' in window)) { bands.forEach(ready); readyCase(); return; }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          if (e.target === caseSection) readyCase(); else ready(e.target);
        });
      }, { rootMargin: '350% 0px 350% 0px' });
      bands.forEach(function (band) { io.observe(band); });
      if (caseImg) io.observe(caseSection);
    };
    if (document.readyState === 'complete') start(); else window.addEventListener('load', start, { once: true });
  })();

  /* ---------- Scrubbed motion ---------- */
  if (motion && hasGsap) {
    var gsap = window.gsap;
    var hero = document.getElementById('home');
    // (from where the hero rests in the page: Draft 7 holds it, with the partner band, while the pipe joint
    // is lowered, so its live box is its held pose)
    var heroScroll = function () {
      return {
        trigger: hero, scrub: true, invalidateOnRefresh: true,
        start: function () { return pageTop(hero); },
        end: function () { return pageTop(hero) + hero.offsetHeight; }
      };
    };

    // Gentle, and linear with the scroll.
    gsap.timeline({ scrollTrigger: heroScroll() })
      .fromTo('.hero-still', { scale: 1 }, { scale: 1.035, ease: 'none' }, 0)
      .fromTo('.hero-dim', { opacity: 0 }, { opacity: 0.5, ease: 'none' }, 0);

    /* Photo bands (stringing, welding, site aerial). CSS holds each photo still behind its band while
       the page slides over it (site.css, .chapter). Here, over the whole time any part of the band is in
       view: the photo pushes in from 1 to 1.04 and drifts up slowly (about 10% of the scroll speed).
       Linear, so the pace never changes; transform only; it runs backwards when you scroll up. */
    document.querySelectorAll('.chapter').forEach(function (band) {
      var frame = band.querySelector('.chapter-frame');
      var photo = band.querySelector('.chapter-photo');
      var label = band.querySelector('.chapter-label');
      if (!frame || !photo) return;
      var travel = function () { return Math.max(0, photo.offsetHeight - frame.offsetHeight); };
      var tl = gsap.timeline({
        defaults: { ease: 'none' },
        // (from where the band rests in the page: a transition may hold it under the header while it is revealed)
        scrollTrigger: {
          trigger: band, scrub: true, invalidateOnRefresh: true,
          start: function () { return pageTop(band) - window.innerHeight; },
          end: function () { return pageTop(band) + band.offsetHeight; }
        }
      });
      tl.fromTo(photo, { y: 0, scale: 1 }, { y: function () { return -travel(); }, scale: 1.04 }, 0);
      if (label) tl.fromTo(label, { y: function () { return 0.2 * travel(); } }, { y: function () { return -0.25 * travel(); } }, 0);
      // the photo and label get their own layers a little before the band comes into view
      window.ScrollTrigger.create({
        trigger: band,
        start: function () { return pageTop(band) - 2.5 * window.innerHeight; },
        end: function () { return pageTop(band) + band.offsetHeight + 1.5 * window.innerHeight; },
        onToggle: function (self) { band.classList.toggle('is-near', self.isActive); }
      });
    });

    var mm = gsap.matchMedia();
    mm.add('(min-width: 601px)', function () {
      gsap.fromTo('.hero-copy-column', { y: 0 }, { y: -80, ease: 'none', scrollTrigger: heroScroll() });
      var photo = document.querySelector('.experience .case-photo img');
      var exp = document.getElementById('experience');
      if (photo && exp) {
        // (from where the section rests in the page: during the lowering-in it is held under the header)
        gsap.fromTo(photo, { y: -48 }, {
          y: 48, ease: 'none',
          scrollTrigger: {
            trigger: exp, scrub: true, refreshPriority: -1,
            start: function () { return pageTop(exp) - window.innerHeight; },
            end: function () { return pageTop(exp) + exp.offsetHeight; }
          }
        });
      }
    });
    mm.add('(max-width: 600px)', function () {
      // The copy column is display:contents on phones, so the whole hero block drifts instead.
      gsap.fromTo('.hero-content', { y: 0 }, { y: -40, ease: 'none', scrollTrigger: heroScroll() });
    });

    var refresh = function () { requestRefresh(); };
    window.addEventListener('load', refresh);
    // fonts that finish loading later (document.fonts.ready would force a style pass at start)
    if (document.fonts && document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', refresh);
  }

  /* ---------- GPU warm-up ---------- */
  // The first time the browser draws a blurred header backdrop, a scaled layer or a polygon clip, the
  // graphics driver prepares that effect, which cost a 40 to 70 ms frame on the first scroll and at the
  // start of the first transition. Draw each effect once, near-invisibly and for two frames, while the
  // page is idle after load. Nothing here is visible or changes layout.
  if (motion) {
    var warmGpu = function () {
      if (lenis && lenis.isScrolling) { setTimeout(scheduleWarm, 400); return; }
      // the header's own blurred backdrop (it switches on at the first scroll); at the top of the hero it
      // sits over the dark top of the footage for three frames, which cannot be seen
      var header = document.querySelector('.site-header');
      if (header && !header.classList.contains('scrolled')) {
        header.style.setProperty('-webkit-backdrop-filter', 'blur(16px)');
        header.style.setProperty('backdrop-filter', 'blur(16px)');
      }
      var clip = document.createElement('div');
      clip.setAttribute('aria-hidden', 'true');
      clip.style.cssText = 'position:fixed;left:0;bottom:0;width:24px;height:24px;pointer-events:none;z-index:1;opacity:.012;background:#0d1b30;' +
        'will-change:transform;transform:translate3d(0,-1px,0) scale(.98);clip-path:polygon(0 0,24px 2px,22px 24px,1px 22px)';
      document.body.append(clip);
      requestAnimationFrame(function () { requestAnimationFrame(function () { requestAnimationFrame(function () {
        clip.remove();
        if (header) { header.style.removeProperty('-webkit-backdrop-filter'); header.style.removeProperty('backdrop-filter'); }
      }); }); });
    };
    var scheduleWarm = function () {
      var go = function () { if ('requestIdleCallback' in window) window.requestIdleCallback(warmGpu, { timeout: 1500 }); else setTimeout(warmGpu, 200); };
      setTimeout(go, 300);
    };
    if (document.readyState === 'complete') scheduleWarm(); else window.addEventListener('load', scheduleWarm, { once: true });
  }

  /* ---------- Drawing the next section ahead of time ---------- */
  // The first time the browser draws a large section (the client-work documents above all) it can
  // take one long frame, which would land just as that section slides up over a chapter photo. So
  // when the page has been still for a moment, the next section below the screen that has not been
  // drawn yet is moved into view at 1% opacity, a screen of it at a time for two frames each (a
  // transform only: the layout does not change and nothing can be seen), then put back. Any scroll puts it back at once.
  if (motion) {
    var drawn = [], drawTimer = 0, drawUndo = null;
    var lastMove = 0;
    // The client-work section is the one that is slow to draw the first time (hundreds of elements, no
    // photographs), and it first appears sliding up over the welding photo. So it is drawn first, at the
    // first still moment after load, wherever the visitor is. It has no images, so this fetches nothing.
    var first = document.getElementById('work-examples');
    var drawAhead = function () {
      drawTimer = 0;
      if (document.hidden || overlayOpen()) return;
      if ((lenis && lenis.isScrolling) || performance.now() - lastMove < 400) { scheduleDraw(); return; }
      var vh = window.innerHeight;
      var fr = first && drawn.indexOf(first) < 0 ? first.getBoundingClientRect() : null;
      var next = fr && (fr.top > vh || fr.bottom < 0) ? first : null;   // (never while it is on screen)
      if (!next) next = Array.prototype.slice.call(document.querySelectorAll('main section')).find(function (s) {
        if (drawn.indexOf(s) >= 0) return false;
        var r = s.getBoundingClientRect();
        return r.top > vh && r.top < vh * 3.5;
      });
      if (!next) return;
      drawn.push(next);
      var st = next.style;
      var keep = ['transform', 'opacity', 'position', 'z-index', 'pointer-events'].map(function (k) { return [k, st.getPropertyValue(k), st.getPropertyPriority(k)]; });
      // a tall section is shown one screen at a time, two frames each, so all of it is drawn
      var rect = next.getBoundingClientRect();
      var slices = Math.max(1, Math.min(4, Math.ceil(rect.height / (vh * 0.9))));
      var place = function (k) { st.setProperty('transform', 'translate3d(0,' + (-(rect.top + k * vh * 0.9)).toFixed(1) + 'px,0)'); };
      if (getComputedStyle(next).position === 'static') st.setProperty('position', 'relative');
      place(0);
      st.setProperty('opacity', '0.01');
      st.setProperty('z-index', '40');
      st.setProperty('pointer-events', 'none');
      var undo = function () {
        if (drawUndo !== undo) return;
        drawUndo = null;
        keep.forEach(function (k) { if (k[1]) st.setProperty(k[0], k[1], k[2]); else st.removeProperty(k[0]); });
        scheduleDraw();
      };
      drawUndo = undo;
      var n = 0;
      var step = function () {
        if (drawUndo !== undo) return;
        n++;
        if (n >= slices * 2 + 1) { undo(); return; }
        if (n % 2 === 0) place(n / 2);
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    var scheduleDraw = function () { clearTimeout(drawTimer); drawTimer = setTimeout(drawAhead, 500); };
    window.addEventListener('scroll', function () { lastMove = performance.now(); if (drawUndo) drawUndo(); else scheduleDraw(); }, { passive: true });
    if (document.readyState === 'complete') scheduleDraw(); else window.addEventListener('load', scheduleDraw, { once: true });
  }

  /* ---------- Opening the page at a #section link ---------- */
  // The transition spacers are added after the browser has already jumped to the hash, so the
  // page lands on the section again once the modules have started and the page has loaded.
  // index.html calls this after both modules have booted.
  function landOnHash() {
    if (!lenis || location.hash.length < 2) return;
    var target = hashTarget();
    if (!target || target.id === 'main') return;
    // Fonts, images and the documents can still change heights for a moment, so the section stays
    // the landing point through each re-measure for a few seconds, until the visitor scrolls.
    var sticky = true;
    var land = function () {
      if (!sticky) return;
      requestAnimationFrame(function () {
        if (!sticky) return;
        // Lenis caches the page height; the spacers and documents have just made the page taller.
        lenis.resize();
        lenis.scrollTo(landingY(target), { immediate: true, force: true });
      });
    };
    var release = function () {
      sticky = false;
      if (hasGsap) window.ScrollTrigger.removeEventListener('refresh', land);
    };
    ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach(function (type) {
      window.addEventListener(type, release, { once: true, passive: true });
    });
    if (hasGsap) window.ScrollTrigger.addEventListener('refresh', land);
    if (document.readyState !== 'complete') window.addEventListener('load', land, { once: true });
    setTimeout(release, 4000);
    land();
  }
  window.neosShell = { landOnHash: landOnHash, pageTop: pageTop };

  /* ---------- Header section highlight ---------- */
  // Revision 11 marks the header link of the section in view with an IntersectionObserver.
  // During a transition the chapters are held in place, so their boxes say little about what the
  // visitor sees. With motion on, this takes over (app.js steps aside when window.neosScrollSpy
  // is set): outside a transition the section whose top has passed 45% of the screen is current;
  // inside one, the outgoing chapter stays current until the incoming one has taken the screen.
  var nav = document.getElementById('main-nav');
  if (motion && nav) {
    window.neosScrollSpy = true;
    var spyLinks = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
    var spyItems = spyLinks.map(function (a) { return { a: a, el: document.getElementById(a.hash.slice(1)) }; })
      .filter(function (x) { return x.el; });
    var spyId = undefined, spyTops = null;
    var measureSpy = function () { spyTops = spyItems.map(function (x) { return pageTop(x.el); }); };
    var spy = function () {
      var id = null;
      var pt = window.__neosPipeTransitions;
      var st = pt && typeof pt.state === 'function' ? pt.state() : null;
      if (st) {
        // the chapter the visitor is looking at: the next one once it has taken the screen
        var sel = (st.shown ? st.shown === 'from' : st.p < 0.5) ? st.from : st.to;
        id = sel && sel.charAt(0) === '#' ? sel.slice(1) : null;
      } else {
        if (!spyTops) measureSpy();
        var line = window.scrollY + window.innerHeight * 0.45;
        spyItems.forEach(function (x, i) { if (spyTops[i] <= line) id = x.el.id; });
      }
      if (id === spyId) return;
      spyId = id;
      spyItems.forEach(function (x) { x.a.classList.toggle('active', !x.a.classList.contains('nav-cta') && x.el.id === id); });
    };
    var remeasure = function () { measureSpy(); spy(); };
    if (lenis) lenis.on('scroll', spy); else window.addEventListener('scroll', spy, { passive: true });
    if (hasGsap) window.ScrollTrigger.addEventListener('refresh', remeasure);
    window.addEventListener('load', remeasure);
    window.addEventListener('resize', remeasure);
    remeasure();
  }

  /* ---------- Header underline ---------- */
  if (motion && nav) {
    var navLinks = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]:not(.nav-cta)'));
    var indicator = document.createElement('span');
    indicator.className = 'nav-indicator';
    indicator.setAttribute('aria-hidden', 'true');
    nav.append(indicator);
    var placeIndicator = function () {
      var link = navLinks.find(function (a) { return a.classList.contains('active'); });
      if (!link || window.innerWidth <= 900) { indicator.classList.remove('is-on'); return; }
      var n = nav.getBoundingClientRect(), r = link.getBoundingClientRect();
      var t = 'translate(' + (r.left - n.left).toFixed(2) + 'px,' + (r.bottom - n.top - 1).toFixed(2) + 'px) scaleX(' + (r.width / 100).toFixed(4) + ')';
      if (!indicator.classList.contains('is-on')) {
        indicator.style.transition = 'none'; indicator.style.transform = t; void indicator.offsetWidth; indicator.style.transition = '';
        indicator.classList.add('is-on');
      } else {
        indicator.style.transform = t;
      }
    };
    var navWatch = new MutationObserver(placeIndicator);
    navLinks.forEach(function (a) { navWatch.observe(a, { attributes: true, attributeFilter: ['class'] }); });
    window.addEventListener('resize', placeIndicator);
    if (document.fonts && document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', placeIndicator);
    placeIndicator();
  }
})();
