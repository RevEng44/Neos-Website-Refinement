/* Neos Advisors website: page behaviour. The header and phone menu, the client-work tabs and phone
   picker, the dialogs, the participant map in the hero, the partner logos, the project names band, the
   examples list with its search, and links straight to an example (#work/estimating).
   The forms are in forms.js. The smooth scroll, the video controls and the section motion are in
   shell.js. Merged on 2026-09-30 from app.js, feedback.js, premium.js and work-expanded.js. */

/* ---------- Header and phone menu ---------- */
const header = document.querySelector('.site-header');
const nav = document.querySelector('#main-nav');
const menuToggle = document.querySelector('.menu-toggle');
function setMenu(open) { nav.classList.toggle('is-open', open); menuToggle.setAttribute('aria-expanded', String(open)); menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); }
menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
nav.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false); });
window.addEventListener('resize', () => { if (window.innerWidth > 900) setMenu(false); });
function updateHeader() { header.classList.toggle('scrolled', window.scrollY > 20); }
window.addEventListener('scroll', updateHeader, { passive: true }); updateHeader();

/* ---------- Client-work tabs ---------- */
const tabs = [...document.querySelectorAll('[role="tab"]')];
const workAreaSelect = document.querySelector('#work-area-select');
function selectTab(tab, focus = false) {
  tabs.forEach(item => { const selected = item === tab; item.setAttribute('aria-selected', String(selected)); item.tabIndex = selected ? 0 : -1; document.getElementById(item.getAttribute('aria-controls')).hidden = !selected; });
  const id = tab.id.replace('work-tab-', '');
  if (workAreaSelect) workAreaSelect.value = id;
  if (focus) tab.focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => { selectTab(tab); rememberExample(tab.id.replace('work-tab-', '')); });
  tab.addEventListener('keydown', event => {
    const targets = { ArrowDown: (index + 1) % tabs.length, ArrowUp: (index + tabs.length - 1) % tabs.length, ArrowRight: (index + 1) % tabs.length, ArrowLeft: (index + tabs.length - 1) % tabs.length, Home: 0, End: tabs.length - 1 };
    if (Object.hasOwn(targets, event.key)) { event.preventDefault(); selectTab(tabs[targets[event.key]], true); rememberExample(tabs[targets[event.key]].id.replace('work-tab-', '')); }
  });
});
// The phone picker and the tabs show the same content and share one selection.
if (workAreaSelect) {
  workAreaSelect.addEventListener('change', () => { selectTab(document.getElementById('work-tab-' + workAreaSelect.value)); rememberExample(workAreaSelect.value); });
}
// Choosing a tab low on the screen scrolls the panel back into view.
document.querySelector('.work-categories').addEventListener('click', event => {
  if (!event.target.closest('[role="tab"]')) return;
  const stage = document.querySelector('.assignment-stage');
  const headerBottom = document.querySelector('.site-header').getBoundingClientRect().bottom;
  if (stage.getBoundingClientRect().top < headerBottom + 12) stage.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
});

/* ---------- Service lists: one item open at a time ---------- */
document.querySelectorAll('.service-list').forEach(list => list.addEventListener('toggle', event => {
  if (event.target.tagName === 'DETAILS' && event.target.open) list.querySelectorAll('details').forEach(detail => { if (detail !== event.target) detail.open = false; });
}, true));

/* ---------- Dialogs ---------- */
const dialogTriggers = new WeakMap();
function openDialog(dialog, trigger) { dialogTriggers.set(dialog, trigger); dialog.showModal(); document.body.classList.add('dialog-open'); }
document.querySelectorAll('[data-interest]').forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  document.querySelector('#inquiry-type').value = link.dataset.interest;
  document.querySelector('#inquiry-audience').value = link.dataset.audience || '';
  document.querySelector('#inquiry-result').hidden = true;
  openDialog(document.querySelector('#inquiry-dialog'), link);
}));
document.querySelectorAll('[data-dialog]').forEach(button => button.addEventListener('click', () => openDialog(document.getElementById(button.dataset.dialog), button)));
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); dialogTriggers.get(dialog)?.focus(); });
});

/* ---------- Header link for the section in view ---------- */
// With motion on, shell.js does this (it knows where the photo chapters are) and sets window.neosScrollSpy.
const sectionLinks = [...nav.querySelectorAll('a[href^="#"]')];
const sectionObserver = new IntersectionObserver(entries => {
  if (window.neosScrollSpy) return;
  const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  // The header button is never marked active, so its label stays navy on gold.
  if (visible) sectionLinks.forEach(link => link.classList.toggle('active', !link.classList.contains('nav-cta') && link.hash === `#${visible.target.id}`));
}, { rootMargin: '-20% 0px -50% 0px', threshold: 0 });
sectionLinks.forEach(link => { const section = document.querySelector(link.hash); if (section) sectionObserver.observe(section); });

/* ---------- Participant map in the hero ---------- */
const participantCopy = {
  all: ['NEOS ADVISORS', 'Supporting project teams, commercial decisions and working relationships.'],
  owners: ['OWNERS', 'Support with project teams, delivery oversight, commercial matters and engagement commitments.'],
  nations: ['NATIONS', 'Support with participation priorities, commercial partnerships, business opportunities and delivery capacity.'],
  contractors: ['CONTRACTORS', 'Support with estimating, commercial terms, project resources and execution.']
};
const connectionMap = document.querySelector('.connection-map');
const participantButtons = [...document.querySelectorAll('[data-participant]')];
function showParticipant(key) {
  const copy = participantCopy[key];
  connectionMap.dataset.active = key;
  document.querySelector('.connection-label').textContent = copy[0];
  document.querySelector('#connection-description').textContent = copy[1];
  participantButtons.forEach(button => { if (button.dataset.participant !== 'all') button.setAttribute('aria-pressed', String(button.dataset.participant === key)); });
}
participantButtons.forEach(button => { button.addEventListener('click', () => showParticipant(button.dataset.participant)); button.addEventListener('mouseenter', () => showParticipant(button.dataset.participant)); button.addEventListener('focus', () => showParticipant(button.dataset.participant)); });

/* ---------- Partner logos ---------- */
// The row is doubled so the sideways scroll loops without a seam; the copy is hidden from screen readers.
// Hover or keyboard focus pauses it, the Pause button stops it, and reduced motion keeps it still.
const partnerRail = document.querySelector('.logo-rail');
if (partnerRail) {
  const logoTrack = document.createElement('div'); logoTrack.className = 'logo-track';
  const logoGroup = document.createElement('div'); logoGroup.className = 'logo-group';
  [...partnerRail.children].forEach(image => logoGroup.append(image));
  const logoCopy = logoGroup.cloneNode(true); logoCopy.setAttribute('aria-hidden', 'true'); logoCopy.querySelectorAll('img').forEach(image => image.alt = '');
  logoTrack.append(logoGroup, logoCopy); partnerRail.append(logoTrack);
  const motionControl = document.querySelector('#partner-motion');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motionControl) {
    if (reducedMotion.matches) { partnerRail.classList.add('is-paused'); motionControl.textContent = 'Motion off'; motionControl.disabled = true; motionControl.setAttribute('aria-label', 'Logo motion is off according to your device preference'); }
    motionControl.addEventListener('click', () => { const paused = partnerRail.classList.toggle('is-paused'); motionControl.setAttribute('aria-pressed', String(paused)); motionControl.setAttribute('aria-label', paused ? 'Resume partner logo scrolling' : 'Pause partner logo scrolling'); motionControl.textContent = paused ? 'Play ▷' : 'Pause Ⅱ'; });
  }
}

/* ---------- Project names band ---------- */
// The same pattern as the partner logos: each of the two rows is doubled so the sideways scroll loops
// without a seam (the second row runs the other way, in CSS), hover or keyboard focus pauses them, and
// the Pause button stops them. With reduced motion the lists are left as they are in the page, wrapped
// onto centred lines, and the button stays hidden.
const projectRows = document.querySelector('.fp-rows');
if (projectRows && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  projectRows.querySelectorAll('.fp-slider').forEach(slider => {
    const row = slider.querySelector('.fp-row');
    const track = document.createElement('div'); track.className = 'fp-track';
    const copy = row.cloneNode(true); copy.setAttribute('aria-hidden', 'true');
    row.replaceWith(track); track.append(row, copy);
    slider.classList.add('is-sliding');
  });
  const projectControl = document.querySelector('#project-motion');
  if (projectControl) {
    projectControl.hidden = false;
    projectControl.addEventListener('click', () => { const paused = projectRows.classList.toggle('is-paused'); projectControl.setAttribute('aria-pressed', String(paused)); projectControl.setAttribute('aria-label', paused ? 'Resume the project names' : 'Pause the project names'); projectControl.textContent = paused ? 'Play ▷' : 'Pause Ⅱ'; });
  }
}

/* ---------- The examples list: search and count ---------- */
const exampleSearch = document.querySelector('#example-search');
const libraryItems = [...document.querySelectorAll('.example-library-item')];
const exampleCount = document.querySelector('#example-count');
function filterExamples() {
  const query = exampleSearch.value.toLocaleLowerCase().trim();
  let visible = 0;
  libraryItems.forEach(item => {
    const matches = !query || item.textContent.toLocaleLowerCase().includes(query);
    item.hidden = !matches;
    if (!matches) item.open = false;
    if (matches) visible++;
  });
  exampleCount.textContent = visible === 0 ? 'No matching examples. Try another term.' : visible + ' work example' + (visible === 1 ? '' : 's');
}
exampleSearch.addEventListener('input', filterExamples);
document.querySelectorAll('[data-dialog="all-examples-dialog"]').forEach(button => button.addEventListener('click', () => {
  exampleSearch.value = '';
  libraryItems.forEach(item => item.open = false);
  filterExamples();
}));

/* ---------- Links straight to an example: #work/estimating ---------- */
// A tab or picker choice writes #work/<id> into the address without adding a history entry, so the
// address can be copied. Opening the page at such an address selects that tab (shell.js lands the
// page on the client-work section). An example that is only in the full list opens the list.
function rememberExample(id) {
  if (!history.replaceState) return;
  history.replaceState(null, '', '#work/' + id);
}
function showExample(id) {
  const tab = document.getElementById('work-tab-' + id);
  if (tab) { selectTab(tab); return; }
  const entry = document.getElementById('example-' + id);
  if (!entry) return;
  openDialog(document.getElementById('all-examples-dialog'), document.querySelector('[data-dialog="all-examples-dialog"]'));
  exampleSearch.value = '';
  filterExamples();
  entry.open = true;
  entry.scrollIntoView({ block: 'center' });
}
function exampleFromHash() { const m = /^#work\/([a-z-]+)$/.exec(location.hash); return m ? m[1] : null; }
{ const id = exampleFromHash(); if (id) showExample(id); }
window.addEventListener('hashchange', () => { const id = exampleFromHash(); if (id) showExample(id); });
