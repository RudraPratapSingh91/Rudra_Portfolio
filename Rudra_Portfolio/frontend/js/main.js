/**
 * main.js
 * Entry point — initializes all modules
 * Vintage Newspaper Portfolio — Rudra Pratap Singh
 */

'use strict';

import { initFadeAnimations, initCounterAnimations, initParallax } from './animations.js';
import { initSkillBars }   from './skills.js';
import { initContactForm } from './contact.js';

/* ── DOM Ready ─────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initFadeAnimations();
  initCounterAnimations();
  initSkillBars();
  initContactForm();
  initParallax();
  initNavHighlight();
  initMobileNav();
  initDateStamp();
  initSmoothScroll();
});

/* ── Active Nav Link on Scroll ────────────────────── */
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((s) => observer.observe(s));
}

/* ── Mobile Hamburger Nav ─────────────────────────── */
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');

    // Animate hamburger to X
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach((s) => {
        s.style.transform = '';
        s.style.opacity   = '';
      });
    }
  });

  // Close on link click
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.querySelectorAll('span').forEach((s) => {
        s.style.transform = '';
        s.style.opacity   = '';
      });
    });
  });
}

/* ── Live Date Stamp in Masthead Strip ────────────── */
function initDateStamp() {
  const dateEl = document.getElementById('live-date');
  if (!dateEl) return;

  const now = new Date();
  const options = {
    weekday: 'long',
    year:    'numeric',
    month:   'long',
    day:     'numeric',
  };
  dateEl.textContent = now.toLocaleDateString('en-IN', options).toUpperCase();
}

/* ── Smooth Scroll for Anchor Links ───────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;

      e.preventDefault();

      // Offset for sticky nav height
      const navHeight = document.querySelector('.masthead-nav')?.offsetHeight || 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });
}
