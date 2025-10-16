document.addEventListener('DOMContentLoaded', () => {

  const fadeClasses = ['fade-in-up', 'fade-in-down', 'fade-in-extra', 'fade-in-side'];

  fadeClasses.forEach(fadeClass => {
    const elements = document.querySelectorAll(`.${fadeClass}`);
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 200);
    });
  });
  
  // ===== HAMBURGER MENU =====
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
  }

  // ===== TO TOP BUTTON =====
  const toTopBtn = document.getElementById('toTopBtn');

  if (toTopBtn) {
    // Scroll event
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        toTopBtn.style.display = 'block';
      } else {
        toTopBtn.style.display = 'none';
      }
    });

    // Klik op knop → smooth scroll
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

      // Sluit alle open items
      document.querySelectorAll('.faq-item.active').forEach(activeItem => {
        activeItem.classList.remove('active');
      });

      // Alleen openen als het niet al actief was
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
});
