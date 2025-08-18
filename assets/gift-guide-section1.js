// (function(){
//   function openPopup(id){
//     var p = document.querySelector('.gift-popup[data-popup="'+id+'"]');
//     if(p){
//       p.classList.add('is-open');
//       p.setAttribute('aria-hidden','false');
//     }
//   }

//   function closePopup(p){
//     p.classList.remove('is-open');
//     p.setAttribute('aria-hidden','true');
//   }

//   // فتح/غلق البوب أب
//   document.addEventListener('click',function(e){
//     var t = e.target.closest('[data-popup-open]');
//     if(t){
//       e.preventDefault();
//       openPopup(t.getAttribute('data-popup-open'));
//     }
//     if(e.target.closest('.gift-popup__close')){
//       closePopup(e.target.closest('.gift-popup'));
//     }
//     else if(e.target.classList.contains('gift-popup')){
//       closePopup(e.target);
//     }
//   });

//   // ESC key closes any open popup
//   document.addEventListener('keydown',function(e){
//     if(e.key==='Escape'){
//       document.querySelectorAll('.gift-popup.is-open').forEach(closePopup);
//     }
//   });

//   // Color swatches
//   document.addEventListener('click',function(e){
//     var sw = e.target.closest('.gift-swatch');
//     if(!sw) return;
//     var wrap = sw.closest('.gift-popup');
//     wrap.querySelectorAll('.gift-swatch').forEach(b=>b.classList.remove('is-active'));
//     sw.classList.add('is-active');
//   });

//   // Size select (change event)
//   document.addEventListener('change',function(e){
//     if(e.target.matches('.gift-select select')){
//       var select = e.target;
//       // لو محتاج تعمل شيء بالاختيار (زي update UI)
//       console.log('Selected size:', select.value);
//     }
//   });

//   // Add to Cart button
//   document.addEventListener('click',function(e){
//     if(e.target.closest('.gift-cta')){
//       var btn = e.target.closest('.gift-cta');
//       var popup = btn.closest('.gift-popup');
//       // هنا ممكن تعمل كول للـ Shopify cart API
//       console.log('Add to cart from popup:', popup.dataset.popup);
//       // قفل البوب أب بعد ما يضيف
//       closePopup(popup);
//     }
//   });
// })();
// // نفس السكربت اللي عندك يشتغل
// document.addEventListener('click', function(e) {
//   let sw = e.target.closest('.gift-swatch');
//   if (!sw) return;
//   let wrap = sw.closest('.gift-swatches');
//   wrap.querySelectorAll('.gift-swatch').forEach(b => b.classList.remove('is-active'));
//   sw.classList.add('is-active');
// });



// const select = document.getElementById("size");
// const placeholder = document.getElementById("placeholder");

// // ✅ لما يختار أي مقاس، نخفي الـ placeholder
// select.addEventListener("change", () => {
//   if (select.value !== "") {
//     placeholder.style.display = "none";
//   }
// });
(function(){
  function openPopup(id){
    let p = document.querySelector('.gift-popup[data-popup="'+id+'"]');
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
    let t = e.target.closest('[data-popup-open]');
    if(t){ e.preventDefault(); openPopup(t.getAttribute('data-popup-open')); }
    if(e.target.closest('.gift-popup__close')){ closePopup(e.target.closest('.gift-popup')); }
    else if(e.target.classList.contains('gift-popup')){ closePopup(e.target); }
  });

  // ESC
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){ document.querySelectorAll('.gift-popup.is-open').forEach(closePopup); }
  });

  // Color swatches
  document.addEventListener('click',function(e){
    let sw = e.target.closest('.gift-swatch');
    if(!sw) return;
    let wrap = sw.closest('.gift-swatches');
    wrap.querySelectorAll('.gift-swatch').forEach(b=>b.classList.remove('is-active'));
    sw.classList.add('is-active');
  });

  // Custom dropdown
  document.querySelectorAll('[data-dropdown]').forEach(drop=>{
    let header = drop.querySelector('.dropdown-header');
    let options = drop.querySelector('.dropdown-options');
    header.addEventListener('click', ()=> options.classList.toggle('show'));
    options.querySelectorAll('.dropdown-option').forEach(opt=>{
      opt.addEventListener('click', ()=>{
        header.textContent = opt.textContent;
        options.querySelectorAll('.dropdown-option').forEach(o=>o.classList.remove('selected'));
        opt.classList.add('selected');
        options.classList.remove('show');
        console.log("Selected size:", opt.dataset.value);
      });
    });
  });

  // Add to Cart
  document.addEventListener('click',function(e){
    if(e.target.closest('.gift-cta')){
      let btn = e.target.closest('.gift-cta');
      let popup = btn.closest('.gift-popup');
      console.log('Add to cart from popup:', popup.dataset.popup);
      closePopup(popup);
    }
  });
})();
