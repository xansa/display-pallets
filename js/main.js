/* ============================================
   Display Pallets — main.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----- 1. Navigation ----- */
  (() => {
    const hamburger = document.querySelector('.nav__hamburger');
    const navLinks = document.querySelector('.nav__links');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('is-open');
      navLinks.classList.toggle('is-open');
      document.body.style.overflow = navLinks.classList.contains('is-open') ? 'hidden' : '';
    });

    // Close on link click
    navLinks.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('is-open');
        navLinks.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });

    // Active link detection
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    const pageName = currentPath.split('/').pop() || 'index.html';
    navLinks.querySelectorAll('.nav__link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === pageName || (pageName === '' && href === 'index.html') ||
          (currentPath === '/' && href === 'index.html')) {
        link.classList.add('is-active');
      }
    });
  })();

  /* ----- 2. FAQ Accordion ----- */
  (() => {
    const items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach(item => {
      const btn = item.querySelector('.faq-question');
      if (!btn) return;
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        // Close all
        items.forEach(i => {
          i.classList.remove('is-open');
          const q = i.querySelector('.faq-question');
          if (q) q.setAttribute('aria-expanded', 'false');
        });
        // Toggle current
        if (!isOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  })();

  /* ----- 3. Scroll Animations ----- */
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
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => observer.observe(el));
  })();

  /* ----- 4. Contact Form Validation ----- */
  (() => {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const naam = form.querySelector('[name="naam"]');
      const email = form.querySelector('[name="email"]');
      const bericht = form.querySelector('[name="bericht"]');
      const status = form.querySelector('.form-status');

      // Simple validation
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

      // If form has a real action, submit it
      if (form.action && form.action !== '#' && !form.action.endsWith('#')) {
        form.submit();
        return;
      }

      // Placeholder success
      if (status) {
        status.className = 'form-status form-status--success';
        status.textContent = 'Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op.';
      }
      form.reset();
    });
  })();

});
