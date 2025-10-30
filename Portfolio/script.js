// TYPEWRITER EFFECT
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

let roleIndex = 0;
let charIndex = 0;
let deleting = false;
let typingSpeed = 80; // ms per char
let pauseBetween = 1200; // pause at end of word

function tick() {
  const current = roles[roleIndex];
  if (!deleting) {
    el.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(tick, pauseBetween);
      return;
    }
  } else {
    el.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  const speed = deleting ? typingSpeed / 2 : typingSpeed;
  setTimeout(tick, speed + Math.random() * 80);
}

// start when DOM is ready
if (el) {
  tick();
}


// ===============================
// PORTFOLIO FILTER FUNCTIONALITY
// ===============================

// Select all filter buttons and project cards
const filterBtns = document.querySelectorAll('.filter-btn');
const workCards = document.querySelectorAll('.work-card');

// Add click listener to each button
filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    // Remove 'active' class from all buttons
    filterBtns.forEach((b) => b.classList.remove('active'));
    // Add 'active' class to clicked button
    btn.classList.add('active');

    // Get filter category (text content of button)
    const category = btn.textContent.toLowerCase();

    // Loop through each project card
    workCards.forEach((card) => {
      // Match category with tags (you can use dataset or text matching)
      const tags = Array.from(card.querySelectorAll('.tech-tags span')).map(
        (tag) => tag.textContent.toLowerCase()
      );

      if (category === 'all projects' || tags.includes(category)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
