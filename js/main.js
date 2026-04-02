/* ============================================
   Display Pallets - main.js
   Premium B2B interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----- 1. Navigation - scroll shadow + glassmorphism ----- */
  (() => {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          nav.classList.toggle('is-scrolled', window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();

  /* ----- 2. Hamburger menu with slide animation ----- */
  (() => {
    const hamburger = document.querySelector('.nav__hamburger');
    const navLinks = document.querySelector('.nav__links');
    if (!hamburger || !navLinks) return;

    // Create overlay element for mobile
    let overlay = document.querySelector('.nav-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'nav-overlay';
      document.body.appendChild(overlay);
    }

    const toggle = () => {
      const isOpen = navLinks.classList.contains('is-open');
      hamburger.classList.toggle('is-open', !isOpen);
      navLinks.classList.toggle('is-open', !isOpen);
      overlay.classList.toggle('is-visible', !isOpen);
      document.body.style.overflow = !isOpen ? 'hidden' : '';
    };

    const close = () => {
      hamburger.classList.remove('is-open');
      navLinks.classList.remove('is-open');
      overlay.classList.remove('is-visible');
      document.body.style.overflow = '';
    };

    hamburger.addEventListener('click', toggle);
    overlay.addEventListener('click', close);

    navLinks.querySelectorAll('.nav__link, .nav__cta').forEach(link => {
      link.addEventListener('click', close);
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('is-open')) close();
    });
  })();

  /* ----- 3. Active nav link detection ----- */
  (() => {
    const navLinks = document.querySelectorAll('.nav__link');
    if (!navLinks.length) return;

    const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    const pageName = currentPath.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
      const href = link.getAttribute('href').replace('../', '');
      if (href === pageName ||
          (pageName === '' && href === 'index.html') ||
          (currentPath === '/' && href === 'index.html')) {
        link.classList.add('is-active');
      }
    });
  })();

  /* ----- 4. FAQ Accordion ----- */
  (() => {
    const items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach(item => {
      const btn = item.querySelector('.faq-question');
      if (!btn) return;
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        items.forEach(i => {
          i.classList.remove('is-open');
          const q = i.querySelector('.faq-question');
          if (q) q.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  })();

  /* ----- 5. Scroll Animations with staggered delays ----- */
  (() => {
    const els = document.querySelectorAll('.fade-up');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    els.forEach(el => observer.observe(el));
  })();

  /* ----- 6. Smooth scroll for anchor links ----- */
  (() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  })();

  /* ----- 7. Back to Top button ----- */
  (() => {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          btn.classList.toggle('is-visible', window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  })();

  /* ----- 8. Contact Form Validation ----- */
  (() => {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const naam = form.querySelector('[name="naam"]');
      const email = form.querySelector('[name="email"]');
      const bericht = form.querySelector('[name="bericht"]');
      const status = form.querySelector('.form-status');

      let valid = true;
      [naam, email, bericht].forEach(field => {
        if (field && !field.value.trim()) {
          field.style.borderColor = '#DC2626';
          valid = false;
        } else if (field) {
          field.style.borderColor = '';
        }
      });

      if (email && email.value && !email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        email.style.borderColor = '#DC2626';
        valid = false;
      }

      if (!valid) {
        if (status) {
          status.className = 'form-status form-status--error';
          status.textContent = 'Vul alle verplichte velden correct in.';
        }
        return;
      }

      if (form.action && form.action !== '#' && !form.action.endsWith('#')) {
        form.submit();
        return;
      }

      if (status) {
        status.className = 'form-status form-status--success';
        status.textContent = 'Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op.';
      }
      form.reset();
    });
  })();

});
