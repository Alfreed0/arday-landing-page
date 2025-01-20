window.addEventListener('scroll', () => {
  const message = document.querySelector('.hero-message');
  if (window.scrollY > 50) {
    message.classList.add('hide');
  } else {
    message.classList.remove('hide');
  }
});

function scrollToDresses() {
  document.querySelector('.dresses-section').scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
      navToggle.classList.toggle('rotate');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('content');

  function loadPage(page) {
      fetch(page)
          .then(response => {
              if (!response.ok) {
                  throw new Error(`Failed to load ${page}`);
              }
              return response.text();
          })
          .then(data => {
              content.innerHTML = data;
              history.pushState({ page }, '', `#${page.replace('.html', '')}`); 
          })
          .catch(error => {
              console.error('Error loading page:', error);
              content.innerHTML = '<p>Sorry, the page could not be loaded.</p>';
          });
  }

  document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          const page = e.target.getAttribute('data-page');
          loadPage(page);
      });
  });

  window.addEventListener('popstate', (e) => {
      if (e.state && e.state.page) {
          loadPage(e.state.page);
      } else {
          loadPage('index.html');
      }
  });
});
