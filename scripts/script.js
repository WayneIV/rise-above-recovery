// script.js — Rise Above Recovery
// Description: Loads homepage content from JSON and handles basic interactivity

document.addEventListener('DOMContentLoaded', () => {
  console.log('Rise Above Recovery site initialized.');

  // Prevent duplicate execution
  if (window._RARInitialized) return;
  window._RARInitialized = true;

  // Load homepage data from JSON
  fetch('data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load data.json');
      }
      return response.json();
    })
    .then(data => {
      populateHeroSection(data.hero);
      populateNewsSection(data.newsArticles);
    })
    .catch(error => {
      console.error('Error loading homepage content:', error);
    });

  // Contact Form Submission Handler
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      // Simple form validation
      if (!name || !email || !message) {
        alert('Please complete all fields before submitting.');
        return;
      }

      console.log('Contact form submitted:', { name, email, message });

      // Placeholder for backend or integration with a service
      alert('Thank you for reaching out. We will contact you soon.');
      contactForm.reset();
    });
  }
});

// Populate Hero Section from JSON
function populateHeroSection(hero) {
  const title = document.getElementById('hero-heading');
  const subtext = document.querySelector('.hero-subtext');
  const buttonsContainer = document.querySelector('.hero-buttons');

  if (title) title.textContent = hero.headline;
  if (subtext) subtext.textContent = hero.subtext;

  if (buttonsContainer && Array.isArray(hero.ctaButtons)) {
    buttonsContainer.innerHTML = ''; // Clear existing buttons

    hero.ctaButtons.forEach(button => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = button.text;
      btn.setAttribute('aria-label', `Navigate to ${button.text}`);
      btn.addEventListener('click', () => {
        const target = document.getElementById(button.targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
      buttonsContainer.appendChild(btn);
    });
  }
}

// Populate News Section from JSON
function populateNewsSection(articles) {
  const newsList = document.querySelector('.news-list');
  if (!newsList || !Array.isArray(articles)) return;

  newsList.innerHTML = ''; // Clear any existing content

  articles.forEach(article => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <a href="${article.url}" target="_blank" rel="noopener noreferrer">${article.title}</a>
      <p>${article.description}</p>
    `;
    newsList.appendChild(listItem);
  });
}
