/* ═══════════════════════════════════════════════════════════
   RefMate Promo Site — JavaScript (Animations & Interactions)
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Scroll-triggered animations (IntersectionObserver) ──────
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Stagger children if needed
          const children = entry.target.querySelectorAll('.animate-on-scroll');
          children.forEach((child, i) => {
            child.style.transitionDelay = `${i * 80}ms`;
            child.classList.add('visible');
          });
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    observer.observe(el);
  });

  // ── Navbar scroll effect ───────────────────────────────────
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });

  // ── Mobile menu toggle ─────────────────────────────────────
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // ── Smooth scroll for anchor links ─────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 16;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ── Counter animation for stat numbers ─────────────────────
  const statNumbers = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const finalValue = el.textContent.trim();
          const numericPart = parseInt(finalValue, 10);
          const suffix = finalValue.replace(/\d+/, '');

          if (!isNaN(numericPart) && numericPart > 0) {
            let current = 0;
            const step = Math.max(1, Math.ceil(numericPart / 40));
            const interval = setInterval(() => {
              current += step;
              if (current >= numericPart) {
                current = numericPart;
                clearInterval(interval);
              }
              el.textContent = current + suffix;
            }, 30);
          }

          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((el) => counterObserver.observe(el));

  // ── Parallax on hero glow elements ─────────────────────────
  const heroGlows = document.querySelectorAll('.hero-glow');
  if (heroGlows.length > 0) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      heroGlows.forEach((glow, i) => {
        const factor = (i + 1) * 15;
        glow.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    }, { passive: true });
  }

});
