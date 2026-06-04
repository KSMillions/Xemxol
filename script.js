// Show success banner when redirected back after FormSubmit delivery
function checkFormSent() {
  if (new URLSearchParams(window.location.search).get('sent') === '1') {
    const successMsg = document.getElementById('form-success');
    const contactSection = document.getElementById('contact');
    if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
    if (successMsg) {
      successMsg.style.display = 'block';
      setTimeout(() => { successMsg.style.display = 'none'; }, 8000);
    }
    // Clean the URL so refreshing doesn't re-show the banner
    history.replaceState(null, '', window.location.pathname);
  }
}

// Intersection Observer for fade-in animations on scroll
document.addEventListener('DOMContentLoaded', () => {
  checkFormSent();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.animation = 'fadeUp 0.6s ease both';
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section, .pillar, .service-card, .why-item').forEach(el => {
    el.style.opacity = '0'; // Initial state before animation
    observer.observe(el);
  });

  // Interactive 3D tilt effect for hero image card and badges
  const heroRight = document.querySelector('.hero-right');
  if (heroRight) {
    const card = heroRight.querySelector('.hero-image-card');
    const container = heroRight.querySelector('.hero-badges-container');
    const badges = heroRight.querySelectorAll('.floating-badge');
    
    heroRight.addEventListener('mousemove', (e) => {
      const rect = heroRight.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const rotX = -(y / (rect.height / 2)) * 10;
      const rotY = (x / (rect.width / 2)) * 10;
      
      if (card) {
        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
      }
      if (container) {
        container.style.transform = `perspective(1000px) rotateX(${rotX * 0.5}deg) rotateY(${rotY * 0.5}deg)`;
      }
      
      badges.forEach((badge, idx) => {
        const factor = (idx + 1) * 12;
        const transX = (x / (rect.width / 2)) * factor;
        const transY = (y / (rect.height / 2)) * factor;
        badge.style.transform = `translate3d(${transX}px, ${transY}px, 20px) scale(1.05)`;
      });
    });
    
    heroRight.addEventListener('mouseleave', () => {
      if (card) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      }
      if (container) {
        container.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      }
      badges.forEach(badge => {
        badge.style.transform = 'translate3d(0, 0, 0)';
      });
    });
  }

  // Mobile Nav Hamburger Toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const closeBtn = document.querySelector('.mobile-menu-close');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

  if (menuBtn && overlay) {
    menuBtn.addEventListener('click', () => {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  const closeMenu = () => {
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeMenu();
      }
    });
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
});
