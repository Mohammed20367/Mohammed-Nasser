// Open popup
document.querySelectorAll('[data-popup-open]').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-popup-open');
    const popup = document.querySelector(`[data-popup="${target}"]`);
    if (popup) popup.setAttribute('aria-hidden', 'false');
  });
});

// Close popup
document.querySelectorAll('.gift-close').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.gift-popup').setAttribute('aria-hidden', 'true');
  });
});

// Handle add to cart
document.querySelectorAll('.gift-popup').forEach(popup => {
  const colorBtns = popup.querySelectorAll('.color-swatch');
  const sizeSelect = popup.querySelector('.size-select');
  const addBtn = popup.querySelector('.add-to-cart');
  let selectedColor = null;

  // select color
  colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      selectedColor = btn.dataset.color;
      colorBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // add to cart click
  addBtn.addEventListener('click', () => {
    const selectedSize = sizeSelect.value;
    if (!selectedColor || !selectedSize || selectedSize.includes("Select")) {
      alert("Please select color and size");
      return;
    }

    const map = JSON.parse(popup.dataset.variantMap);
    const variantId = map[selectedColor][selectedSize];

    fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ id: variantId, quantity: 1 })
    })
    .then(res => res.json())
    .then(data => {
      alert("✅ Added to cart!");
      popup.setAttribute('aria-hidden', 'true');
    })
    .catch(err => {
      console.error("Error:", err);
      alert("❌ Failed to add to cart");
    });
  });
});
