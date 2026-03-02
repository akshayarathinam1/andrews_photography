/* ═══════════════════════════════════════════
   ANDREWS PHOTOGRAPHY — SCRIPT.JS
═══════════════════════════════════════════ */

'use strict';

// ─── Sticky Header ───────────────────────────────────────────────────
const header = document.getElementById('site-header');

function handleScroll() {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Scroll-to-top button
  const scrollBtn = document.getElementById('scroll-top');
  if (window.scrollY > 400) {
    scrollBtn.classList.add('visible');
  } else {
    scrollBtn.classList.remove('visible');
  }
}

window.addEventListener('scroll', handleScroll, { passive: true });

// ─── Mobile Menu ─────────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
});

function closeMenu() {
  hamburger.classList.remove('active');
  mobileMenu.classList.remove('open');
}

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (!header.contains(e.target)) {
    closeMenu();
  }
});

// ─── Scroll Reveal ───────────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  }
);

revealEls.forEach((el) => revealObserver.observe(el));

// ─── Portfolio Hover Parallax ─────────────────────────────────────────
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach((item) => {
  item.addEventListener('mousemove', (e) => {
    const rect = item.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    const img = item.querySelector('img');
    if (img) {
      img.style.transform = `scale(1.1) translate(${x}px, ${y}px)`;
    }
  });

  item.addEventListener('mouseleave', () => {
    const img = item.querySelector('img');
    if (img) {
      img.style.transform = '';
    }
  });
});

// ─── Contact Form ─────────────────────────────────────────────────────
function handleSubmit(event) {
  event.preventDefault();

  const btn = document.getElementById('submit-btn');
  const successMsg = document.getElementById('form-success');
  const form = document.getElementById('contact-form');

  btn.textContent = 'Sending…';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  // Simulate sending
  setTimeout(() => {
    form.querySelectorAll('input, textarea').forEach((el) => (el.value = ''));
    successMsg.style.display = 'block';
    btn.textContent = 'Sent!';

    setTimeout(() => {
      successMsg.style.display = 'none';
      btn.textContent = 'Send Message';
      btn.disabled = false;
      btn.style.opacity = '';
    }, 5000);
  }, 1400);
}

// ─── Smooth Active Nav Link Highlight ────────────────────────────────
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.remove('active-nav');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active-nav');
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((section) => sectionObserver.observe(section));

// Active nav link style
const styleEl = document.createElement('style');
styleEl.textContent = `
  .nav-links a.active-nav {
    color: var(--white) !important;
  }
  .nav-links a.active-nav::after {
    transform: scaleX(1) !important;
  }
`;
document.head.appendChild(styleEl);

// ─── Image Loading Polish ─────────────────────────────────────────────
document.querySelectorAll('img').forEach((img) => {
  img.addEventListener('load', () => {
    img.style.opacity = '1';
  });

  if (!img.complete) {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';
  }
});

// ─── Cursor Glow Effect ───────────────────────────────────────────────
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(200,169,110,0.06) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: left 0.12s ease, top 0.12s ease;
  left: -500px;
  top: -500px;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

// ─── Parallax on hero images ──────────────────────────────────────────
const imgMain = document.querySelector('.img-main img');
const imgSecondary = document.querySelector('.img-secondary img');

if (imgMain && imgSecondary) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < 900) {
      imgMain.style.transform = `translateY(${scrollY * 0.08}px)`;
      imgSecondary.style.transform = `translateY(${scrollY * 0.05}px)`;
    }
  }, { passive: true });
}

// ─── Partners logos infinite trail fade ──────────────────────────────
const partnerLogos = document.querySelectorAll('.partner-logo');
partnerLogos.forEach((logo, index) => {
  logo.style.transitionDelay = `${index * 0.1}s`;
});

// ─── Init ─────────────────────────────────────────────────────────────
handleScroll();
console.log('[Andrews Vincent Photography] Site loaded successfully ✓');
