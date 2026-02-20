// API Configuration
// Change this to the Render URL when deployed
const API_BASE_URL = 'http://localhost:8080';

// Modal functionality
const modal = document.getElementById('loginModal');
const userIcon = document.getElementById('userIcon');
const ctaButton = document.getElementById('ctaButton');
const closeBtn = document.getElementsByClassName('close')[0];
const googleLoginBtn = document.getElementById('googleLoginBtn');

// Image mapping for audiobook covers
const audiobookImages = {
  'The Historian': 'images/the_historian.jpg',
  'The Summer I Turned Pretty': 'images/the_summer_i_turned_pretty.jpg',
  "Mr. Malcolm's List": 'images/mr_malcolms_list.jpg',
  'The Chemist': 'images/the_chemist.jpg',
  'Midnight Sun': 'images/midnight_sun.jpg',
  Twilight: 'images/twilight.jpg',
  Default: 'images/default_cover.jpg',
};

// Prevent scrolling
// Open modal
function openModal() {
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

// Enable scrolling
// Close modal
function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Event listeners for modal
if (userIcon) userIcon.addEventListener('click', openModal);
if (ctaButton) ctaButton.addEventListener('click', openModal);
if (closeBtn) closeBtn.addEventListener('click', closeModal);

// Close modal when clicking outside
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

// Google Login functionality
googleLoginBtn.addEventListener('click', () => {
  // This will be implemented later with actual OAuth
  console.log('Google login clicked');
  // For now, just close the modal
  closeModal();
  alert('Google OAuth will be implemented in the next phase!');
});

// Fetch and display audiobooks
async function fetchAudiobooks() {
  try {
    const response = await fetch(`${API_BASE_URL}/audiobooks`);
    if (!response.ok) {
      throw new Error('Failed to fetch audiobooks');
    }
    const audiobooks = await response.json();
    displayAudiobooks(audiobooks);
  } catch (error) {
    console.error('Error fetching audiobooks:', error);
    displayFallbackAudiobooks();
  }
}

// Get image path for audiobook
function getAudiobookImage(title) {
  // Clean up title for matching
  const cleanTitle = title.trim();

  // Check if we have a matching image
  for (const [key, path] of Object.entries(audiobookImages)) {
    if (cleanTitle.includes(key) || key.includes(cleanTitle)) {
      return path;
    }
  }
  return audiobookImages.Default;
}

// Display audiobooks in grid
function displayAudiobooks(audiobooks) {
  const grid = document.getElementById('audiobookGrid');
  if (!grid) return;

  // Take only first 6 audiobooks
  const featuredAudiobooks = audiobooks.slice(0, 6);

  grid.innerHTML = featuredAudiobooks
    .map(
      (book) => `
        <div class="audiobook-card" onclick="openModal()">
            <img src="${getAudiobookImage(book.title)}" 
                 alt="${book.title} cover" 
                 class="audiobook-cover"
                 onerror="this.src='${audiobookImages.Default}'">
            <div class="audiobook-info">
                <h3 class="audiobook-title">${book.title}</h3>
                <p class="audiobook-author">by ${book.author}</p>
                <p class="audiobook-narrator">Narrated by ${book.narrator}</p>
                <p class="audiobook-length">
                    <i class="fas fa-clock"></i> ${book.listening_length}
                </p>
            </div>
        </div>
    `,
    )
    .join('');
}

// Fallback data in case API fails
function displayFallbackAudiobooks() {
  const fallbackData = [
    {
      title: 'The Historian',
      author: 'Elizabeth Kostova',
      narrator: 'Justine Eyre, Paul Michael',
      listening_length: '26 hours and 6 minutes',
    },
    {
      title: 'The Summer I Turned Pretty',
      author: 'Jenny Han',
      narrator: 'Lola Tung',
      listening_length: '6 hours',
    },
    {
      title: "Mr. Malcolm's List",
      author: 'Suzanne Allain',
      narrator: 'Elizabeth Knowelden',
      listening_length: '5 hours and 31 minutes',
    },
    {
      title: 'The Chemist',
      author: 'Stephenie Meyer',
      narrator: 'Ellen Archer',
      listening_length: '17 hours and 1 minute',
    },
    {
      title: 'Midnight Sun',
      author: 'Stephenie Meyer',
      narrator: 'Jake Abel',
      listening_length: '25 hours and 49 minutes',
    },
    {
      title: 'Twilight',
      author: 'Stephenie Meyer',
      narrator: 'Jake Abel',
      listening_length: '12 hours and 51 minutes',
    },
  ];

  displayAudiobooks(fallbackData);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  fetchAudiobooks();

  // Add smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });

  // Add animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe feature cards and audiobook cards
  document.querySelectorAll('.feature-card, .audiobook-card').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    if (email) {
      alert('Thank you for subscribing to our newsletter!');
      newsletterForm.reset();
    }
  });
}

// Search functionality (placeholder)
const searchIcon = document.querySelector('.fa-search');
if (searchIcon) {
  searchIcon.addEventListener('click', () => {
    alert('Search feature coming soon!');
  });
}

// Cart functionality (placeholder)
const cartIcon = document.querySelector('.fa-shopping-cart');
if (cartIcon) {
  cartIcon.addEventListener('click', () => {
    alert('Shopping cart coming soon!');
  });
}
