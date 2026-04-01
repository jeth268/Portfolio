// TYPEWRITER EFFECT
document.addEventListener('DOMContentLoaded', function () {
  const roles = [
    'Video Editor',
    'Developer',
    'UI/UX Designer',
    'Web Developer',
    'Front-end Developer',
    'Photographer',
    'Videographer'
  ];
  const el = document.querySelector('.typewriter-text');
  let roleIndex = 0, charIndex = 0, deleting = false;
  const typingSpeed = 80, pauseBetween = 1200;
  function tick() {
    if (!el) return;
    const current = roles[roleIndex];
    el.textContent = deleting
      ? current.slice(0, --charIndex)
      : current.slice(0, ++charIndex);
    if (!deleting && charIndex === current.length) {
      deleting = true;
      setTimeout(tick, pauseBetween);
    } else if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(tick, 300);
    } else {
      setTimeout(tick, deleting ? typingSpeed / 2 : typingSpeed);
    }
  }
  if (el) tick();

  // CONTACT FORM HANDLER
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      const mailtoLink = `mailto:havenjethrourbano6@gmail.com?subject=${encodeURIComponent(subject)}&body=From: ${encodeURIComponent(name)} (${encodeURIComponent(email)})%0A%0A${encodeURIComponent(message)}`;
      window.location.href = mailtoLink;
      this.reset();
      alert('Thank you for your message! Please check your email client to confirm sending.');
    });
  }

  // MOBILE MENU TOGGLE
  window.hamburg = function() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : 'auto';
  };
  window.closeMobileMenu = function() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = 'auto';
  };

  // SET POINTER CURSOR
  const sendBtn = document.querySelector('.send-btn');
  if (sendBtn) sendBtn.style.cursor = 'pointer';

  // PORTFOLIO FILTER + LOAD MORE
  const filterBtns = document.querySelectorAll('.filter-btn');
  const allCards = Array.from(document.querySelectorAll('.work-card'));
  const loadMoreBtn = document.getElementById('load-more-btn');
  const cardsPerPage = 6;
  let currentCategory = 'all';
  let currentIndex = 0;

  function updateProjects(category) {
    currentIndex = 0;
    const filtered = category === 'all'
      ? allCards
      : allCards.filter(card => (card.dataset.category || '').split(' ').includes(category));
    
    // Hide all cards
    allCards.forEach(card => card.style.display = 'none');
    // Show first batch
    filtered.slice(0, cardsPerPage).forEach(card => card.style.display = 'block');

    // Show/hide Load More button
    loadMoreBtn.style.display = filtered.length > cardsPerPage ? 'inline-block' : 'none';
  }

  // FILTER BUTTON CLICK
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;
      updateProjects(currentCategory);
    });
  });

  // LOAD MORE CLICK
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      const filtered = currentCategory === 'all'
        ? allCards
        : allCards.filter(card => (card.dataset.category || '').split(' ').includes(currentCategory));
      
      currentIndex += cardsPerPage;
      filtered.slice(currentIndex, currentIndex + cardsPerPage).forEach(card => card.style.display = 'block');

      if (currentIndex + cardsPerPage >= filtered.length) {
        loadMoreBtn.style.display = 'none';
      }
    });
  }

  // INITIAL LOAD
  updateProjects(currentCategory);
});
