const carouselContainer = document.querySelector(".carousel-container");
const leftButton = document.querySelector(".carousel-btn.left");
const rightButton = document.querySelector(".carousel-btn.right");

let currentIndex = 0;
let autoMoveInterval;

fetch('../assets/jsons/dresses.json')
  .then(response => response.json())
  .then(jsonData => {
    dresses = jsonData;
    loadCarousel(dresses);
    startAutoMove();
  })
  .catch(error => console.error('Error loading JSON:', error));

const visibleItems = 5;
const itemWidth = 17;

function loadCarousel(jsonData) {
  jsonData.forEach((item) => {
    const carouselItem = document.createElement("div");
    carouselItem.className = "carousel-item";

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

    carouselItem.appendChild(imageDiv);
    carouselItem.appendChild(nameDiv);
    carouselItem.appendChild(priceDiv);

    carouselContainer.appendChild(carouselItem);
  });

  updateCarouselTransform();
}

function moveCarousel(direction) {
  const totalItems = dresses.length;

  if (direction === 1 && currentIndex === totalItems - visibleItems) {
    currentIndex = 0;
  } else if (direction === -1 && currentIndex === 0) {
    currentIndex = totalItems - visibleItems;
  } else {
    currentIndex = (currentIndex + direction + totalItems) % totalItems;
  }

  updateCarouselTransform();
  restartAutoMove();
}

function updateCarouselTransform() {
  const totalItems = dresses.length;

  if (currentIndex > totalItems - visibleItems) {
    const offset = -(totalItems - visibleItems) * itemWidth;
    carouselContainer.style.transform = `translateX(${offset}rem)`;
  } else {
    const offset = -(currentIndex * itemWidth);
    carouselContainer.style.transform = `translateX(${offset}rem)`;
  }
}

function startAutoMove() {
  autoMoveInterval = setInterval(() => moveCarousel(1), 5000);
}

function restartAutoMove() {
  clearInterval(autoMoveInterval);
  startAutoMove();
}

function loadDressPage(dress) {
  const contentContainer = document.getElementById("content");

  fetch('./dress.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load dress.html');
      }
      return response.text();
    })
    .then(html => {
      contentContainer.innerHTML = html;

      document.getElementById('big-image').src = dress.images[0];
      document.getElementById('dress-name').textContent = dress.name;
      document.getElementById('dress-description').textContent = dress.description;
      document.getElementById('dress-price').textContent = `$${dress.price}`;

      const sizeSelect = document.getElementById('size-select');
      dress.sizes.forEach(size => {
        const option = document.createElement('option');
        option.textContent = size;
        sizeSelect.appendChild(option);
      });

      const colorSelect = document.getElementById('color-select');
      dress.colors.forEach(color => {
        const option = document.createElement('option');
        option.textContent = color;
        colorSelect.appendChild(option);
      });

      const smallImagesContainer = document.querySelector('.small-images');
      dress.images.forEach(image => {
        const img = document.createElement('img');
        img.src = image;
        img.onclick = () => {
          document.getElementById('big-image').src = image;
        };
        smallImagesContainer.appendChild(img);
      });

      history.pushState({ dress }, '', `#dress-${dress.name.toLowerCase().replace(/\s+/g, '-')}`);
    })
    .catch(error => {
      console.error('Error loading dress page:', error);
      contentContainer.innerHTML = '<p>Sorry, the dress page could not be loaded.</p>';
    });
}


leftButton.addEventListener("click", () => moveCarousel(-1));
rightButton.addEventListener("click", () => moveCarousel(1));