/* =============================================================
   RAJARAJESHWARA RAKHI STORE — SCRIPT
   Handles: mobile navigation, scroll-reveal animations,
   active nav-link highlighting, back-to-top button,
   and the auto-updating footer year.
============================================================= */

// -------------------------------------------------------------
// Mobile Navigation Toggle
// -------------------------------------------------------------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// -------------------------------------------------------------
// Scroll-Reveal Animations
// Elements marked with [data-aos] fade + rise into view once
// they enter the viewport. Uses IntersectionObserver so it's
// lightweight and doesn't run on every scroll event.
// -------------------------------------------------------------
const revealTargets = document.querySelectorAll('[data-aos]');

if (revealTargets.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((el) => revealObserver.observe(el));
}

// -------------------------------------------------------------
// Active Nav Link Highlighting on Scroll
// Highlights the nav link matching whichever section is
// currently in view.
// -------------------------------------------------------------
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

if (sections.length && navLinkEls.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id');
        const matchingLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (!matchingLink) return;

        if (entry.isIntersecting) {
          navLinkEls.forEach((link) => link.classList.remove('active-link'));
          matchingLink.classList.add('active-link');
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

// -------------------------------------------------------------
// Lightweight page motion enhancements
// -------------------------------------------------------------
const pageLoader = document.createElement('div');
pageLoader.className = 'page-loader';
pageLoader.setAttribute('aria-hidden', 'true');
pageLoader.innerHTML = '<div class="loader-ring"></div><p>Loading</p>';
document.body.prepend(pageLoader);

const particleLayer = document.createElement('div');
particleLayer.className = 'particle-layer';
particleLayer.setAttribute('aria-hidden', 'true');

for (let i = 0; i < 14; i += 1) {
  const particle = document.createElement('span');
  particle.className = 'particle';
  particle.style.setProperty('--x', `${Math.random() * 100}%`);
  particle.style.setProperty('--y', `${Math.random() * 100}%`);
  particle.style.setProperty('--size', `${4 + Math.random() * 6}px`);
  particle.style.setProperty('--duration', `${8 + Math.random() * 6}s`);
  particle.style.setProperty('--delay', `${Math.random() * -8}s`);
  particleLayer.appendChild(particle);
}

document.body.appendChild(particleLayer);

const finishLoading = () => {
  document.body.classList.add('loaded');
};

if (document.readyState === 'complete') {
  window.setTimeout(finishLoading, 220);
} else {
  window.addEventListener('load', () => {
    window.setTimeout(finishLoading, 220);
  }, { once: true });
}

// -------------------------------------------------------------
// Back-to-Top Button
// -------------------------------------------------------------
const backToTop = document.getElementById('backToTop');

if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// -------------------------------------------------------------
// Share Website Action
// -------------------------------------------------------------
const shareWebsiteBtn = document.getElementById('shareWebsiteBtn');

if (shareWebsiteBtn) {
  shareWebsiteBtn.addEventListener('click', async () => {
    const shareData = {
      title: document.title,
      text: 'Visit House of Rakhi by Shri Rajarajeshwara Rakhi Store',
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href);
        shareWebsiteBtn.setAttribute('aria-label', 'Link copied');
        shareWebsiteBtn.classList.add('copied');
        setTimeout(() => {
          shareWebsiteBtn.setAttribute('aria-label', 'Share website');
          shareWebsiteBtn.classList.remove('copied');
        }, 1400);
      }
    } catch (error) {
      console.log('Share cancelled', error);
    }
  });
}

// -------------------------------------------------------------
// Auto-Update Footer Year
// -------------------------------------------------------------
document.querySelectorAll('.year').forEach((el) => {
  el.textContent = new Date().getFullYear();
});
