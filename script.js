function handleSubmit(e) {
  e.preventDefault();
  const successMsg = document.getElementById('form-success');
  if (successMsg) {
    successMsg.style.display = 'block';
    setTimeout(() => {
      successMsg.style.display = 'none';
    }, 5000);
  }
  e.target.reset();
}

// Intersection Observer for fade-in animations on scroll
document.addEventListener('DOMContentLoaded', () => {
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

  // Interactive 3D tilt effect for hero image card
  const heroRight = document.querySelector('.hero-right');
  if (heroRight) {
    const card = heroRight.querySelector('.hero-image-card');
    const badges = heroRight.querySelectorAll('.floating-badge');
    
    heroRight.addEventListener('mousemove', (e) => {
      const rect = heroRight.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const rotX = -(y / (rect.height / 2)) * 10;
      const rotY = (x / (rect.width / 2)) * 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
      
      badges.forEach((badge, idx) => {
        const factor = (idx + 1) * 12;
        const transX = (x / (rect.width / 2)) * factor;
        const transY = (y / (rect.height / 2)) * factor;
        badge.style.transform = `translate3d(${transX}px, ${transY}px, 20px) scale(1.05)`;
      });
    });
    
      heroRight.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
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
