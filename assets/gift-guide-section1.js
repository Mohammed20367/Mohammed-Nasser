(function(){
  function openPopup(id){
    var p = document.querySelector('.gift-popup[data-popup="'+id+'"]');
    if(p){
      p.classList.add('is-open');
      p.setAttribute('aria-hidden','false');
    }
  }

  function closePopup(p){
    p.classList.remove('is-open');
    p.setAttribute('aria-hidden','true');
  }

  // فتح/غلق البوب أب
  document.addEventListener('click',function(e){
    var t = e.target.closest('[data-popup-open]');
    if(t){
      e.preventDefault();
      openPopup(t.getAttribute('data-popup-open'));
    }
    if(e.target.closest('.gift-popup__close')){
      closePopup(e.target.closest('.gift-popup'));
    }
    else if(e.target.classList.contains('gift-popup')){
      closePopup(e.target);
    }
  });

  // ESC key closes any open popup
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){
      document.querySelectorAll('.gift-popup.is-open').forEach(closePopup);
    }
  });

  // Color swatches
  document.addEventListener('click',function(e){
    var sw = e.target.closest('.gift-swatch');
    if(!sw) return;
    var wrap = sw.closest('.gift-popup');
    wrap.querySelectorAll('.gift-swatch').forEach(b=>b.classList.remove('is-active'));
    sw.classList.add('is-active');
  });

  // Size select (change event)
  document.addEventListener('change',function(e){
    if(e.target.matches('.gift-select select')){
      var select = e.target;
      // لو محتاج تعمل شيء بالاختيار (زي update UI)
      console.log('Selected size:', select.value);
    }
  });

  // Add to Cart button
  document.addEventListener('click',function(e){
    if(e.target.closest('.gift-cta')){
      var btn = e.target.closest('.gift-cta');
      var popup = btn.closest('.gift-popup');
      // هنا ممكن تعمل كول للـ Shopify cart API
      console.log('Add to cart from popup:', popup.dataset.popup);
      // قفل البوب أب بعد ما يضيف
      closePopup(popup);
    }
  });
})();
// نفس السكربت اللي عندك يشتغل
document.addEventListener('click', function(e) {
  let sw = e.target.closest('.gift-swatch');
  if (!sw) return;
  let wrap = sw.closest('.gift-swatches');
  wrap.querySelectorAll('.gift-swatch').forEach(b => b.classList.remove('is-active'));
  sw.classList.add('is-active');
});



