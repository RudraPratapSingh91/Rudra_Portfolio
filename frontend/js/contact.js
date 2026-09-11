/**
 * contact.js
 * Form validation and submission handler
 * Vintage Newspaper Portfolio — Rudra Pratap Singh
 */

'use strict';

export function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');

  if (!form || !feedback) return;

  form.addEventListener('submit', handleSubmit);
}

function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const feedback = document.getElementById('form-feedback');
  const btn = form.querySelector('[type="submit"]');

  // ── Field refs ─────────────────────────────────────
  const nameEl = form.querySelector('#field-name');
  const emailEl = form.querySelector('#field-email');
  const subjectEl = form.querySelector('#field-subject');
  const storyEl = form.querySelector('#field-story');

  // Clear previous errors
  clearErrors(form);
  feedback.className = 'form-feedback';
  feedback.style.display = 'none';

  // ── Validate ────────────────────────────────────────
  let valid = true;

  if (!nameEl.value.trim()) {
    showError(nameEl, 'Name is required.');
    valid = false;
  }

  if (!emailEl.value.trim()) {
    showError(emailEl, 'Email is required.');
    valid = false;
  } else if (!isValidEmail(emailEl.value.trim())) {
    showError(emailEl, 'Please enter a valid email address.');
    valid = false;
  }

  if (!subjectEl.value.trim()) {
    showError(subjectEl, 'Subject is required.');
    valid = false;
  }

  if (!storyEl.value.trim() || storyEl.value.trim().length < 20) {
    showError(storyEl, 'The story must be at least 20 characters.');
    valid = false;
  }

  if (!valid) {
    feedback.textContent = '⚠ TRANSMISSION FAILED — Please correct the errors above.';
    feedback.classList.add('error');
    feedback.style.display = 'block';
    return;
  }

  // ── Simulate submission ─────────────────────────────
  btn.disabled = true;
  btn.textContent = 'TRANSMITTING…';

  setTimeout(() => {
    btn.disabled = false;
    btn.textContent = 'TRANSMIT MESSAGE →';
    form.reset();

    feedback.textContent =
      '✓ DISPATCH RECEIVED — Your message has been logged. Expect a response within 24–48 hours.';
    feedback.classList.add('success');
    feedback.style.display = 'block';

    // Hide after 6s
    setTimeout(() => {
      feedback.style.display = 'none';
      feedback.className = 'form-feedback';
    }, 6000);
  }, 1400);
}

/* ── Helpers ─────────────────────────────────────── */

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(input, message) {
  input.style.borderColor = 'var(--red)';
  const wrap = input.closest('.field-group');

  if (!wrap) return;

  const existing = wrap.querySelector('.field-error');
  if (existing) return;

  const err = document.createElement('span');
  err.className = 'field-error';
  err.textContent = message;
  err.style.cssText = `
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.58rem;
    letter-spacing: 0.08em;
    color: var(--red);
    margin-top: 0.2rem;
    display: block;
  `;
  wrap.appendChild(err);
}

function clearErrors(form) {
  form.querySelectorAll('.field-error').forEach((el) => el.remove());
  form.querySelectorAll('.field-input, .field-textarea').forEach((el) => {
    el.style.borderColor = '';
  });
}
