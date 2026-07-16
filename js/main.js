(function () {
  'use strict';

  // Loader
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
      }, 2000);
    });
    document.body.style.overflow = 'hidden';
  }

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach((section) => {
      const top = section.offsetTop - 150;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');

      if (currentScroll >= top && currentScroll < bottom) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Mobile hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  let isDark = true;

  if (themeToggle) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      themeToggle.textContent = '☀️';
      isDark = false;
    }

    themeToggle.addEventListener('click', () => {
      isDark = !isDark;
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'light');
      }
    });
  }

  // Custom cursor
  const cursor = document.getElementById('cursor');
  const cursorBlur = document.getElementById('cursor-blur');

  if (cursor && cursorBlur) {
    let cursorX = 0;
    let cursorY = 0;
    let blurX = 0;
    let blurY = 0;

    document.addEventListener('mousemove', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
    });

    function animateCursor() {
      blurX += (cursorX - blurX) * 0.12;
      blurY += (cursorY - blurY) * 0.12;

      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      cursorBlur.style.left = blurX + 'px';
      cursorBlur.style.top = blurY + 'px';

      requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Hover effect on interactive elements
    document.querySelectorAll('a, button, .service-card, .job-card, .team-card, input, textarea, select').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursor.style.background = 'var(--accent-2)';
        cursorBlur.style.transform = 'scale(1.5)';
        cursorBlur.style.borderColor = 'var(--accent-1)';
      });

      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.background = 'var(--accent-1)';
        cursorBlur.style.transform = 'scale(1)';
        cursorBlur.style.borderColor = 'var(--accent-2)';
      });
    });
  }

  // Video player
  const videoContainer = document.getElementById('videoContainer');
  const videoOverlay = document.getElementById('videoOverlay');
  const playBtn = document.getElementById('playBtn');
  const video = document.getElementById('showcaseVideo');

  if (videoContainer && video && videoOverlay) {
    playBtn.addEventListener('click', () => {
      video.play();
      videoOverlay.classList.add('hidden');
    });

    video.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        videoOverlay.classList.add('hidden');
      } else {
        video.pause();
        videoOverlay.classList.remove('hidden');
      }
    });

    video.addEventListener('ended', () => {
      videoOverlay.classList.remove('hidden');
    });
  }

  // Contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.btn');
      const originalText = btn.innerHTML;
      btn.innerHTML = '✓ Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #2ed573, #7bed9f)';

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        contactForm.reset();
      }, 3000);
    });
  }

  // Newsletter form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = newsletterForm.querySelector('.btn');
      const input = newsletterForm.querySelector('input');
      const originalText = btn.innerHTML;
      btn.innerHTML = '✓ Subscribed!';

      setTimeout(() => {
        btn.innerHTML = originalText;
        input.value = '';
      }, 2500);
    });
  }

  // Back to top
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Ripple effect on buttons
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ripple.style.cssText = `
        position: absolute;
        width: 20px; height: 20px;
        background: rgba(255,255,255,0.4);
        border-radius: 50%;
        left: ${x}px; top: ${y}px;
        transform: scale(0);
        pointer-events: none;
        animation: ripple 0.6s ease-out forwards;
      `;

      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Skill bars animation
  const animateSkillBars = () => {
    const bars = document.querySelectorAll('.skill-bar-fill');
    let animated = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            animated = true;
            bars.forEach((bar, i) => {
              const width = bar.dataset.width || bar.parentElement.previousElementSibling.querySelector('.skill-percent').dataset.target;
              setTimeout(() => {
                bar.style.width = width + '%';
              }, i * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    const container = document.querySelector('.skills-demand-grid');
    if (container) observer.observe(container);
  };

  // Skill percent counter
  const animateSkillPercent = () => {
    const percents = document.querySelectorAll('.skill-percent');
    let animated = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            animated = true;
            percents.forEach((el) => {
              const target = parseInt(el.dataset.target);
              let current = 0;
              const interval = setInterval(() => {
                current++;
                el.textContent = current + '%';
                if (current >= target) clearInterval(interval);
              }, 20);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    const container = document.querySelector('.skills-demand-grid');
    if (container) observer.observe(container);
  };

  // Initialize new features
  animateSkillBars();
  animateSkillPercent();

  // Footer floating particles
  const footerParticles = document.getElementById('footerParticles');
  if (footerParticles) {
    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      particle.className = 'footer-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = (6 + Math.random() * 4) + 's';
      const colors = ['var(--accent-1)', 'var(--accent-2)', 'var(--accent-3)', 'var(--accent-4)', 'var(--accent-5)', 'var(--accent-6)'];
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.width = (2 + Math.random() * 4) + 'px';
      particle.style.height = particle.style.width;
      footerParticles.appendChild(particle);
    }
  }

  // Add ripple animation keyframes if not present
  if (!document.querySelector('#ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `
      @keyframes ripple {
        to { transform: scale(4); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  console.log('%c TechHire IT Solutions 🚀 ', 'background: #6c63ff; color: #fff; font-size: 1.2rem; padding: 8px 16px; border-radius: 4px; font-weight: bold;');
  console.log('%c Built with ❤️ using HTML, CSS & JavaScript ', 'color: #00d4ff; font-size: 0.9rem;');
})();
