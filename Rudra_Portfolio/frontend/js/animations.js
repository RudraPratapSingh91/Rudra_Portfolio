/**
 * animations.js
 * Handles scroll-triggered animations via IntersectionObserver
 * Vintage Newspaper Portfolio — Rudra Pratap Singh
 */

'use strict';

/**
 * Initialize fade-in animations for elements with .fade-in class
 */
export function initFadeAnimations() {
  const fadeEls = document.querySelectorAll('.fade-in');

  if (!fadeEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Fire once only
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  fadeEls.forEach((el) => observer.observe(el));
}

/**
 * Add staggered delay to a set of elements
 * @param {string} parentSelector - Container selector
 * @param {string} childSelector  - Child elements to stagger
 * @param {number} delayStep      - ms between each child
 */
export function staggerChildren(parentSelector, childSelector, delayStep = 100) {
  const parent = document.querySelector(parentSelector);
  if (!parent) return;

  const children = parent.querySelectorAll(childSelector);
  children.forEach((child, i) => {
    child.style.transitionDelay = `${i * delayStep}ms`;
  });
}

/**
 * Animate number counters (stat cards etc.)
 */
export function initCounterAnimations() {
  const counters = document.querySelectorAll('[data-counter]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el       = entry.target;
        const target   = parseFloat(el.dataset.counter);
        const duration = parseInt(el.dataset.duration || '1500', 10);
        const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals, 10) : 0;
        const suffix   = el.dataset.suffix || '';
        const prefix   = el.dataset.prefix || '';

        let start = null;

        function step(timestamp) {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = eased * target;

          el.textContent = prefix + current.toFixed(decimals) + suffix;

          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = prefix + target.toFixed(decimals) + suffix;
          }
        }

        requestAnimationFrame(step);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
}

/**
 * Typing cursor blink effect on masthead title
 */
export function initTypingEffect() {
  const cursor = document.querySelector('.masthead-cursor');
  if (!cursor) return;

  // Already animating via CSS, just ensure it exists
}

/**
 * Parallax subtle effect on hero portrait
 */
export function initParallax() {
  const portrait = document.querySelector('.hero-portrait-frame');
  if (!portrait || window.matchMedia('(max-width: 768px)').matches) return;

  window.addEventListener(
    'scroll',
    () => {
      const scrollY = window.scrollY;
      const shift   = scrollY * 0.08;
      portrait.style.transform = `translateY(${shift}px)`;
    },
    { passive: true }
  );
}
