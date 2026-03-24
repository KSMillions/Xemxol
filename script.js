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
});
