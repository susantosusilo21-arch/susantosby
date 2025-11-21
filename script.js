// Load GSAP and Particles.js from CDN
const gsapScript = document.createElement('script');
gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
document.head.appendChild(gsapScript);

const scrollTriggerScript = document.createElement('script');
scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';
document.head.appendChild(scrollTriggerScript);

const particlesScript = document.createElement('script');
particlesScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js';
document.head.appendChild(particlesScript);

// Wait for GSAP and Particles.js to load
window.addEventListener('load', () => {
  // Initialize Particles.js for the hero section
  if (typeof particlesJS !== 'undefined') {
    particlesJS('home', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#ffffff' },
        shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
        opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1 } },
        size: { value: 3, random: true, anim: { enable: false } },
        line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
      },
      retina_detect: true
    });
  }

  // GSAP Scroll-triggered animations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Animate sections
    gsap.utils.toArray(['#about', '#projects', '#contact']).forEach(section => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 30%',
          scrub: 1,
          toggleActions: 'play none none reverse'
        }
      });
    });

    // Animate project cards individually
    gsap.utils.toArray('.project-card').forEach(card => {
      gsap.from(card, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      });

      // Hover animation for project cards
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          rotate: 2,
          duration: 0.3,
          ease: 'power1.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          rotate: 0,
          duration: 0.3,
          ease: 'power1.out'
        });
      });
    });
  }

  // Navbar shrink on scroll
  const navbar = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      gsap.to(navbar, {
        height: '3.5rem',
        background: 'rgba(255, 255, 255, 0.95)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        duration: 0.3
      });
    } else {
      gsap.to(navbar, {
        height: '4rem',
        background: 'linear-gradient(90deg, #ffffff, #f8fafc)',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        duration: 0.3
      });
    }
  });

  // Ensure smooth scrolling is preserved
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});