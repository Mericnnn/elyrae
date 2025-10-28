document.addEventListener('DOMContentLoaded', () => {
  const fadeClasses = ['fade-in-up', 'fade-in-down', 'fade-in-extra', 'fade-in-side'];

  // ===== FADE-IN BIJ SCROLL =====
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  fadeClasses.forEach(fadeClass => {
    document.querySelectorAll(`.${fadeClass}`).forEach(el => observer.observe(el));
  });

  // ===== MOBILE INFINITE SCROLL =====
  const grid = document.querySelector('.values-grid');
  if (window.innerWidth <= 768 && grid) {
    grid.innerHTML += grid.innerHTML;
    grid.style.display = 'flex';
    grid.style.flexDirection = 'column';
    grid.style.animation = 'scroll-up 12s linear infinite';
  }

  // ===== HAMBURGER MENU =====
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  const overlay = document.querySelector('.overlay');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('open');
      hamburger.classList.toggle('active');
      if (overlay) overlay.classList.toggle('active');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      overlay.classList.remove('active');
      nav.classList.remove('open');
      hamburger.classList.remove('active');
      document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
    });
  }

  // ===== TO TOP BUTTON =====
  const toTopBtn = document.getElementById('toTopBtn');
  if (toTopBtn) {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        toTopBtn.style.display = 'block';
      } else {
        toTopBtn.style.display = 'none';
      }
    });

    toTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== NAV LINK HIGHLIGHT =====
  const links = document.querySelectorAll('.nav a');
  const currentFile = window.location.pathname.split('/').pop();
  links.forEach(link => {
    const linkFile = link.getAttribute('href').split('/').pop();
    link.classList.toggle('active', linkFile === currentFile);
  });

  // ===== FAQ TOGGLE =====
  const faqButtons = document.querySelectorAll('.faq-question');
  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const item = button.parentElement;
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item.active').forEach(activeItem => activeItem.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  // ===== MOBILE DROPDOWN TOGGLE =====
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(drop => {
    const btn = drop.querySelector('.dropbtn');

    btn.addEventListener('click', e => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        const isOpen = drop.classList.contains('open');

        // Sluit alle dropdowns
        dropdowns.forEach(d => d.classList.remove('open'));

        // Open huidige dropdown als hij nog niet open was
        if (!isOpen) drop.classList.add('open');
      }
    });
  });

  // Klik buiten dropdown sluit open dropdowns
  document.addEventListener('click', e => {
    if (window.innerWidth <= 900) {
      dropdowns.forEach(drop => {
        if (!drop.contains(e.target)) {
          drop.classList.remove('open');
        }
      });
    }
  });

  // ===== COOKIE CONSENT =====
  const cookieConsent = document.getElementById('cookieConsent');
  const acceptBtn = document.getElementById('acceptCookies');

  if (cookieConsent && acceptBtn) {
    if (localStorage.getItem('cookiesAccepted') === 'true') {
      cookieConsent.classList.add('hide');
    }

    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookiesAccepted', 'true');
      cookieConsent.classList.add('hide');
    });
  }

});
