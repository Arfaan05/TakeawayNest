  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Back to Top Button
  const backToTopButton = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.remove('opacity-0', 'invisible', 'translate-y-4');
      backToTopButton.classList.add('opacity-100', 'visible', 'translate-y-0');
    } else {
      backToTopButton.classList.remove('opacity-100', 'visible', 'translate-y-0');
      backToTopButton.classList.add('opacity-0', 'invisible', 'translate-y-4');
    }
  });
  
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
