(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const savedTheme = localStorage.getItem('mzaid-theme');
  if (savedTheme === 'dark') document.body.classList.add('dark');
  const themeBtn = $('.theme-btn');
  const updateThemeIcon = () => { if (!themeBtn) return; themeBtn.innerHTML = document.body.classList.contains('dark') ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>'; };
  updateThemeIcon();
  themeBtn?.addEventListener('click', () => { document.body.classList.toggle('dark'); localStorage.setItem('mzaid-theme', document.body.classList.contains('dark') ? 'dark' : 'light'); updateThemeIcon(); });

  const menu = $('.menu-btn'), nav = $('.nav-links');
  menu?.addEventListener('click', () => { const open = nav?.classList.toggle('open') ?? false; menu.setAttribute('aria-expanded', String(open)); menu.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>'; });
  nav?.addEventListener('click', e => { if (e.target.closest('a')) { nav.classList.remove('open'); menu?.setAttribute('aria-expanded', 'false'); menu.innerHTML = '<i class="fa-solid fa-bars"></i>'; } });

  const reviews = $('.testimonial-grid'), more = $('.see-more');
  more?.addEventListener('click', () => { const show = reviews.classList.toggle('show-more'); more.innerHTML = show ? '<i class="fa-solid fa-chevron-up"></i> Show less' : '<i class="fa-solid fa-comments"></i> See more reviews'; });

  const track = $('.portfolio-track'), dots = $$('.portfolio-dots button'), cards = $$('.portfolio-card');
  let index = 0;
  const goTo = (i) => { index = (i + cards.length) % cards.length; cards[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' }); dots.forEach((d, n) => d.classList.toggle('active', n === index)); };
  $('.portfolio-prev')?.addEventListener('click', () => goTo(index - 1));
  $('.portfolio-next')?.addEventListener('click', () => goTo(index + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
  let scrollTimer;
  track?.addEventListener('scroll', () => { clearTimeout(scrollTimer); scrollTimer = setTimeout(() => { const w = track.clientWidth + 18; goTo(Math.round(track.scrollLeft / w)); }, 80) }, { passive: true });

  $('[data-contact]')?.addEventListener('submit', e => { e.preventDefault(); alert('Thanks! Your message has been received.'); e.currentTarget.reset(); });

  const sections = $$('main section[id]'), links = $$('.nav-links a[href^="#"]');
  let ticking = false;
  const updateActive = () => { ticking = false; const marker = scrollY + 190; let current = 'home'; for (const s of sections) { if (s.offsetTop <= marker) current = s.id; else break } links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current}`)); };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(updateActive) } }, { passive: true }); updateActive();
})();