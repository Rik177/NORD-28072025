// Interactive cursor and hover effects

/**
 * Initializes hover effects for interactive elements
 */
export const initHoverEffects = (): void => {
  // Magnetic effect for buttons
  initMagneticEffect();
  
  // Parallax card effect
  initParallaxCards();
  
  // Shine effect for cards
  initCardShine();
};

/**
 * Initializes magnetic effect for buttons with magnetic-effect class
 */
const initMagneticEffect = (): void => {
  const magneticElements = document.querySelectorAll('.magnetic-effect');
  
  magneticElements.forEach(element => {
    element.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = (element as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Calculate distance from center (0-1)
      const distance = Math.sqrt(x * x + y * y);
      const maxDistance = Math.sqrt(rect.width * rect.width + rect.height * rect.height) / 2;
      const strength = Math.min(distance / maxDistance, 1) * 0.5;
      
      // Apply transform
      (element as HTMLElement).style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
    
    element.addEventListener('mouseleave', () => {
      (element as HTMLElement).style.transform = 'translate(0, 0)';
    });
  });
};

/**
 * Initializes parallax effect for cards with parallax-card class
 */
const initParallaxCards = (): void => {
  const cards = document.querySelectorAll('.parallax-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = (card as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate percentage position
      const xPercent = x / rect.width - 0.5;
      const yPercent = y / rect.height - 0.5;
      
      // Apply transform
      (card as HTMLElement).style.transform = `perspective(1000px) rotateX(${yPercent * -5}deg) rotateY(${xPercent * 5}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      (card as HTMLElement).style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });
};

/**
 * Initializes shine effect for cards
 */
const initCardShine = (): void => {
  const cards = document.querySelectorAll('.card, .category-card, .service-card');
  
  cards.forEach(card => {
    const shine = card.querySelector('.card-shine');
    
    if (!shine) return;
    
    card.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = (card as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate percentage position
      const xPercent = x / rect.width * 100;
      const yPercent = y / rect.height * 100;
      
      // Apply gradient
      (shine as HTMLElement).style.background = `radial-gradient(circle at ${xPercent}% ${yPercent}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)`;
    });
    
    card.addEventListener('mouseleave', () => {
      (shine as HTMLElement).style.background = 'none';
    });
  });
};

/**
 * Initializes scroll animations for elements
 */
export const initScrollAnimations = (): void => {
  const animatedElements = document.querySelectorAll(
    '.fade-in-element, .scale-in-element, .slide-in-element, .stagger-item'
  );
  
  if (animatedElements.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('fade-in-element')) {
          entry.target.classList.add('fade-in-visible');
        } else if (entry.target.classList.contains('scale-in-element')) {
          entry.target.classList.add('scale-in-visible');
        } else if (entry.target.classList.contains('slide-in-element')) {
          entry.target.classList.add('slide-in-visible');
        }
        
        // For staggered animations, add class to parent
        if (entry.target.classList.contains('stagger-item') && entry.target.parentElement) {
          entry.target.parentElement.classList.add('stagger-visible');
        }
        
        // Unobserve after animation
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
  
  // Text reveal animations
  const textRevealElements = document.querySelectorAll('.text-reveal');
  
  if (textRevealElements.length > 0) {
    const textObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          textObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });
    
    textRevealElements.forEach(element => {
      // Wrap text content in span
      const text = element.textContent;
      if (text) {
        element.innerHTML = `<span>${text}</span>`;
        textObserver.observe(element);
      }
    });
  }
};

/**
 * Disables animations for users who prefer reduced motion
 */
export const respectReducedMotion = (): void => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('reduced-motion');
  }
};