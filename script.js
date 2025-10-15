
 // Hamburger functionaliteit
 const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');

    hamburger.addEventListener('click', () => {
      nav.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
    
    const toTopBtn = document.getElementById("toTopBtn");

    // Laat button zien bij scrollen
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        // Als je meer dan 200px naar beneden scrollt, toon de knop
        if (document.body.scrollTop > 350 || document.documentElement.scrollTop > 350) {
            toTopBtn.style.display = "block";
        } else {
            toTopBtn.style.display = "none";
        }
    }

    // Scroll naar boven wanneer knop wordt geklikt
    toTopBtn.addEventListener("click", function(){
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const links = document.querySelectorAll('.nav a');

    links.forEach(link => {
    // alleen de bestandsnaam van href vergelijken
    const linkFile = link.getAttribute('href').split("/").pop();
    const currentFile = window.location.pathname.split("/").pop();

    if(linkFile === currentFile) {
        link.classList.add('active');
    } else {
        link.classList.remove('active'); // verwijder voor de rest
    }
    });
    
    document.addEventListener('DOMContentLoaded', () => {
      const faqButtons = document.querySelectorAll('.faq-question');
    
      faqButtons.forEach(button => {
        button.addEventListener('click', () => {
          const item = button.parentElement;
          const isActive = item.classList.contains('active');
    
          // Sluit alle items
          document.querySelectorAll('.faq-item.active').forEach(activeItem => {
            activeItem.classList.remove('active');
          });
    
          // Als het item niet al actief was, open het
          if (!isActive) {
            item.classList.add('active');
          }
        });
      });
    });
    
    