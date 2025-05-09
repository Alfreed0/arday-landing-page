window.addEventListener('scroll', () => {
  const message = document.querySelector('.hero-message');
  if (window.scrollY > 50) {
    message.classList.add('hide');
  } else {
    message.classList.remove('hide');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
      navToggle.classList.toggle('rotate');
  });
});

let dresses = [];
let activeTypeFilter = null;
let activeStockFilter = null;

document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('content');

  function loadPage(page) {
    if (page === 'index.html') {
      window.location.href = 'index.html';
      return;
    }

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

              if (page === 'catalogue.html') {
                fetch('../assets/jsons/dresses.json')
                  .then(response => response.json())
                  .then(jsonData => {
                    dresses = jsonData;
                    loadCatalogue(dresses);
                    setupFilters();
                    setupFiltersToggle();
                  })
                  .catch(error => console.error('Error loading JSON:', error));
              }
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
        window.location.href = 'index.html';
      }
  });
});

function loadCatalogue(jsonData) {
  const catalogueContainer = document.querySelector(".catalogue-container");
  catalogueContainer.innerHTML = "";

  jsonData.forEach((item) => {
    const catalogueItem = document.createElement("div");
    catalogueItem.className = "carousel-item";

    const imageDiv = document.createElement("div");
    imageDiv.className = "carousel-image";
    
    const img = document.createElement("img");
    img.src = item.images[0];
    img.alt = item.name;
    img.className = "carousel-img";
    img.onclick = () => loadDressPage(item);

    const verOverlay = document.createElement("div");
    verOverlay.className = "ver-overlay";
    verOverlay.textContent = "ver";
    verOverlay.onclick = () => loadDressPage(item);

    imageDiv.appendChild(img);
    imageDiv.appendChild(verOverlay);

    const nameDiv = document.createElement("div");
    nameDiv.className = "carousel-name";
    nameDiv.textContent = item.name;

    const priceDiv = document.createElement("div");
    priceDiv.className = "carousel-price";
    priceDiv.textContent = `$${item.price}`;

    catalogueItem.appendChild(imageDiv);
    catalogueItem.appendChild(nameDiv);
    catalogueItem.appendChild(priceDiv);

    catalogueContainer.appendChild(catalogueItem);
  });
}

function setupFilters() {
  const categoryLinks = document.querySelectorAll(".categories li a");
  const stockLinks = document.querySelectorAll(".stock li a");

  categoryLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const type = link.getAttribute("data-type");

      if (type === "all") {
        activeTypeFilter = null;
      } else {
        activeTypeFilter = type;
      }

      applyFilters();
    });
  });

  stockLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const stockType = link.getAttribute("data-stock");

      if (stockType === "all") {
        activeStockFilter = null;
      } else {
        activeStockFilter = true;
      }

      applyFilters();
    });
  });
}

function applyFilters() {
  let filteredDresses = dresses;

  if (activeStockFilter !== null) {
    filteredDresses = filteredDresses.filter(
      (dress) => dress.in_stock === activeStockFilter
    );
  }

  if (activeTypeFilter !== null) {
    filteredDresses = filteredDresses.filter(
      (dress) => dress.type === activeTypeFilter
    );
  }

  loadCatalogue(filteredDresses);
}

function setupFiltersToggle() {
  const filterToggle = document.querySelector(".filter-toggle");
  const filtersContainer = document.querySelector(".filters-container");
  const closeFilters = document.querySelector(".close-filters");

  if (filterToggle && filtersContainer && closeFilters) {
    filterToggle.addEventListener("click", () => {
      filtersContainer.classList.toggle("active");
    });
    closeFilters.addEventListener("click", () => {
      filtersContainer.classList.remove("active");
    });
  }
}