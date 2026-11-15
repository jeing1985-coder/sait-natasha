// Шапка: компактный вид при прокрутке
const header = document.getElementById('header');
const setCompact = () => {
  header.classList.toggle('is-compact', window.scrollY > 40);
};
setCompact();
window.addEventListener('scroll', setCompact, { passive: true });

// Мобильное меню
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

const closeMenu = () => {
  nav.classList.remove('is-open');
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-label', 'Открыть меню');
};

burger.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

// «Подробнее обо мне» — раскрытие дополнительного текста
const aboutToggle = document.getElementById('about-toggle');
const aboutMore = document.getElementById('about-more');

aboutToggle.addEventListener('click', () => {
  const expanded = aboutToggle.getAttribute('aria-expanded') === 'true';
  aboutToggle.setAttribute('aria-expanded', String(!expanded));
  aboutMore.hidden = expanded;
});

// Плавное появление блоков при прокрутке
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('[data-reveal]');

if (reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((el) => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealItems.forEach((el) => observer.observe(el));
}
