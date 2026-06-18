/* ============================================================
   Mind Horizon Technologies — Main JavaScript
   ============================================================ */

/* ---- Page routing ---- */
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  window.scrollTo(0, 0);
  // Re-trigger animations on inner pages
  if (name !== 'home') {
    setTimeout(() => {
      document.querySelectorAll('#page-' + name + ' .up').forEach((el, i) => {
        setTimeout(() => el.classList.add('in'), 100 + i * 80);
      });
    }, 50);
  }
}

/* ---- Drawer ---- */
function openDrawer() {
  document.getElementById('drawer').classList.add('open');
  document.getElementById('overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() {
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('overlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* ---- Scroll-triggered fade-in (home) ---- */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.12 });
document.querySelectorAll('.up').forEach(el => io.observe(el));

/* ---- Hero fires on load ---- */
window.addEventListener('load', () => {
  document.querySelectorAll('#hero .up').forEach((el, i) => {
    setTimeout(() => el.classList.add('in'), 150 + i * 100);
  });
});

/* ---- Service Worker (PWA) ---- */
if ('serviceWorker' in navigator && location.hostname === 'mindhorizon.site') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(r => console.log('SW registered:', r.scope))
      .catch(e => console.warn('SW failed:', e));
  });
}
