function sendWhatsAppMessage() {
  const dressName = document.getElementById("dress-name")?.textContent.trim();
  const dressPrice = document.getElementById("dress-price")?.textContent.trim();
  const selectedSize = document.getElementById("size-select")?.value;
  const selectedColor = document.getElementById("color-select")?.value;

  if (!dressName || !dressPrice) {
    console.error("Missing dress name or price!");
    return;
  }

  const phoneNumber = "593968931179";

  const message = `Hola, estoy interesada en este vestido:
  ⭐ *${dressName}*
  💲 Precio: ${dressPrice}
  📏 Talla: ${selectedSize}
  🎨 Color: ${selectedColor}

  ¿Me puedes ayudar con más información?`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  window.open(whatsappURL, "_blank");
}

function sendHandmadeWhatsAppMessage() {
  const phoneNumber = "593968931179";
  const message = `Hola, estoy interesada en un vestido hecho a mano personalizado.
  ¿Me puedes ayudar con más información?`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  window.open(whatsappURL, "_blank");
}