(function () {
  'use strict';

  // Intersection Observer for scroll animations
  const animateElements = () => {
    const elements = document.querySelectorAll(
      '.about-card, .service-card, .team-card, .job-card, .stat-item, .about-showcase, .contact-grid'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    elements.forEach((el) => {
      el.classList.add('animate-on-scroll');
      observer.observe(el);
    });
  };

  // Animated Counters
  const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    let animated = false;

    const startCounting = () => {
      if (animated) return;
      animated = true;

      counters.forEach((counter) => {
        const target = parseFloat(counter.dataset.target);
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
          step++;
          current += increment;

          if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
          } else {
            counter.textContent = target % 1 === 0 ? Math.floor(current) : current.toFixed(1);
          }
        }, duration / steps);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            startCounting();
          }
        });
      },
      { threshold: 0.3 }
    );

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) observer.observe(statsSection);
  };

  // Typewriter Effect
  const typewriter = () => {
    const element = document.querySelector('.typing-text');
    if (!element) return;

    const phrases = [
      'Build Your Future in Tech 🚀',
      'Find Your Dream IT Job 💼',
      'Connect With Top Employers 🌐',
      'Transform Your Career Today ⚡',
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function type() {
      const currentPhrase = phrases[phraseIndex];
      const displayText = currentPhrase.substring(0, charIndex);

      element.innerHTML = displayText
        ? displayText
            .split('')
            .map(
              (ch, i) =>
                `<span style="display:inline-block;animation:fadeIn 0.1s ease ${i * 0.02}s both">${ch}</span>`
            )
            .join('')
        : '';

      if (!isDeleting && !isPaused) {
        charIndex++;
        if (charIndex > currentPhrase.length) {
          isPaused = true;
          setTimeout(() => {
            isPaused = false;
            isDeleting = true;
          }, 2000);
        }
      }

      if (isDeleting && !isPaused) {
        charIndex--;
        if (charIndex < 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }

      const speed = isDeleting ? 30 : 70;
      setTimeout(type, isPaused ? 100 : speed);
    }

    type();
  };

  // Testimonial Carousel
  const testimonialCarousel = () => {
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');

    if (!track) return;

    const slides = track.querySelectorAll('.testimonial-card');
    let currentSlide = 0;
    let autoSlide;

    // Create dots
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = `carousel-dot${i === 0 ? ' active' : ''}`;
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });

    function goToSlide(index) {
      currentSlide = index;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;

      document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    }

    function nextSlide() {
      goToSlide((currentSlide + 1) % slides.length);
    }

    function prevSlide() {
      goToSlide((currentSlide - 1 + slides.length) % slides.length);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAuto(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAuto(); });

    function resetAuto() {
      clearInterval(autoSlide);
      autoSlide = setInterval(nextSlide, 5000);
    }

    autoSlide = setInterval(nextSlide, 5000);

    // Touch support
    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    track.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
        resetAuto();
      }
    });
  };

  // Parallax effect on scroll
  const parallaxEffect = () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const heroContent = hero.querySelector('.hero-content');
      if (heroContent && scrolled < hero.offsetHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - scrolled / (hero.offsetHeight * 0.8);
      }
    });
  };

  // Tilt effect on service cards
  const tiltEffect = () => {
    const cards = document.querySelectorAll('.service-card, .team-card, .job-card');

    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 768) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform =
          `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      });
    });
  };

  // Job filtering
  const jobFilters = () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const jobCards = document.querySelectorAll('.job-card');

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        jobCards.forEach((card) => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.classList.remove('hidden');
            card.style.animation = 'fadeIn 0.4s ease';
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  };

  // Initialize everything
  document.addEventListener('DOMContentLoaded', () => {
    animateElements();
    animateCounters();
    typewriter();
    testimonialCarousel();
    parallaxEffect();
    tiltEffect();
    jobFilters();
  });
})();
