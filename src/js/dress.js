import './script.js';
import './carousel.js';

window.onload = function () {
  const dress = JSON.parse(sessionStorage.getItem("selectedDress"));
  if (!dress) return;

  document.getElementById("dress-description").textContent = dress.description;
  document.getElementById("dress-price").textContent = `$${dress.price}`;

  const sizeSelect = document.getElementById("size-select");
  dress.sizes.forEach(size => {
    const option = document.createElement("option");
    option.textContent = size;
    sizeSelect.appendChild(option);
  });

  const colorSelect = document.getElementById("color-select");
  dress.colors.forEach(color => {
    const option = document.createElement("option");
    option.textContent = color;
    colorSelect.appendChild(option);
  });

  const bigImage = document.getElementById("big-image");
  bigImage.src = dress.images[0];

  const smallImagesContainer = document.querySelector(".small-images");
  dress.images.forEach(image => {
    const img = document.createElement("img");
    img.src = image;
    img.onclick = () => (bigImage.src = image);
    smallImagesContainer.appendChild(img);
  });
};
