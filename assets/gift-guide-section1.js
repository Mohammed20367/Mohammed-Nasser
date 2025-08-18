(function(){
  function openPopup(id){
    let p = document.querySelector('.gift-popup[data-popup="'+id+'"]');
    if(p){ p.classList.add('is-open'); p.setAttribute('aria-hidden','false'); }
  }
  function closePopup(p){
    p.classList.remove('is-open');
    p.setAttribute('aria-hidden','true');
  }

  document.addEventListener('click',function(e){
    let t = e.target.closest('[data-popup-open]');
    if(t){ e.preventDefault(); openPopup(t.getAttribute('data-popup-open')); }
    if(e.target.closest('.gift-popup__close')){ closePopup(e.target.closest('.gift-popup')); }
    else if(e.target.classList.contains('gift-popup')){ closePopup(e.target); }
  });

  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){ document.querySelectorAll('.gift-popup.is-open').forEach(closePopup); }
  });

  // Swatches
  document.addEventListener('click',function(e){
    let sw = e.target.closest('.gift-swatch');
    if(!sw) return;
    let wrap = sw.closest('.gift-swatches');
    wrap.querySelectorAll('.gift-swatch').forEach(b=>b.classList.remove('is-active'));
    sw.classList.add('is-active');
  });

  // Custom dropdown
  document.addEventListener("click", function(e) {
    let header = e.target.closest(".custom-dropdown .dropdown-header");
    if (header) { header.parentElement.classList.toggle("open"); }

    let item = e.target.closest(".custom-dropdown .dropdown-list li");
    if (item) {
      let dropdown = item.closest(".custom-dropdown");
      let textEl = dropdown.querySelector(".dropdown-text");
      let hiddenSelect = dropdown.closest(".gift-select").querySelector("select");
      textEl.textContent = item.textContent;
      hiddenSelect.value = item.dataset.value;
      hiddenSelect.dispatchEvent(new Event("change", { bubbles: true }));
      dropdown.classList.remove("open");
    }
  });

  document.addEventListener("click", function(e) {
    document.querySelectorAll(".custom-dropdown.open").forEach(d=>{
      if(!d.contains(e.target)) d.classList.remove("open");
    });
  });

  // Add to Cart
  document.addEventListener('click',function(e){
    if(e.target.closest('.gift-cta')){
      let popup = e.target.closest('.gift-popup');
      console.log('Add to cart:', popup.dataset.popup);
      closePopup(popup);
    }
  });
})();
