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
