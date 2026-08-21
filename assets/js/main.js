/**
 * Bella Vita — main.js
 * Funcionalidades globais: menu drawer, scroll reveal, carrossel touch
 */

'use strict';

/* ══════════════════════════════════════════
   MENU DRAWER (mobile)
══════════════════════════════════════════ */
(function initDrawer() {
  const toggle  = document.getElementById('menu-toggle');
  const drawer  = document.getElementById('nav-drawer');
  const overlay = document.getElementById('nav-overlay');

  if (!toggle || !drawer) return;

  function openDrawer() {
    toggle.classList.add('is-active');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fechar menu');
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    overlay.classList.add('is-active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus first link
    const firstLink = drawer.querySelector('a');
    if (firstLink) firstLink.focus();
  }

  function closeDrawer() {
    toggle.classList.remove('is-active');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('is-active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    toggle.focus();
  }

  toggle.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('is-open');
    isOpen ? closeDrawer() : openDrawer();
  });

  overlay.addEventListener('click', closeDrawer);

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  // Close when a drawer link is clicked
  const drawerLinks = drawer.querySelectorAll('a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
})();

/* ══════════════════════════════════════════
   SCROLL REVEAL — Intersection Observer
══════════════════════════════════════════ */
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
})();

/* ══════════════════════════════════════════
   HEADER — Scroll state
══════════════════════════════════════════ */
(function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  let lastY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;

    if (currentY > 80) {
      header.style.boxShadow = '0 2px 20px rgba(35,31,32,0.06)';
    } else {
      header.style.boxShadow = 'none';
    }

    lastY = currentY;
  }, { passive: true });
})();

/* ══════════════════════════════════════════
   CARROSSEL — Drag to scroll (mouse)
══════════════════════════════════════════ */
(function initCarouselDrag() {
  const carousel = document.getElementById('procedimentos-carousel');
  if (!carousel) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    carousel.style.cursor = 'grabbing';
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener('mouseleave', () => {
    isDown = false;
    carousel.style.cursor = 'grab';
  });

  carousel.addEventListener('mouseup', () => {
    isDown = false;
    carousel.style.cursor = 'grab';
  });

  carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.5;
    carousel.scrollLeft = scrollLeft - walk;
  });
})();

/* ══════════════════════════════════════════
   SMOOTH SCROLL para âncoras internas
══════════════════════════════════════════ */
(function initSmoothScroll() {
  const headerH = document.getElementById('site-header')?.offsetHeight ?? 68;

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();

      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
