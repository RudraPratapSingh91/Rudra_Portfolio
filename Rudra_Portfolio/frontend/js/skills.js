/**
 * skills.js
 * Animates proficiency bars in the Lab Report table
 * Vintage Newspaper Portfolio — Rudra Pratap Singh
 */

'use strict';

/**
 * Animate all .prof-bar-fill elements to their data-width value
 * when the skills section enters the viewport.
 */
export function initSkillBars() {
  const bars    = document.querySelectorAll('.prof-bar-fill');
  const section = document.querySelector('.skills');

  if (!bars.length || !section) return;

  let animated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;

          bars.forEach((bar, i) => {
            const targetWidth = bar.dataset.width || '0%';

            // Stagger each bar
            setTimeout(() => {
              bar.style.width = targetWidth;
            }, i * 120);
          });

          observer.unobserve(section);
        }
      });
    },
    { threshold: 0.25 }
  );

  observer.observe(section);
}
