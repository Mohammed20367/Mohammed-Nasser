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



const select = document.getElementById("size");
const placeholder = document.getElementById("placeholder");

// ✅ لما يختار أي مقاس، نخفي الـ placeholder
select.addEventListener("change", () => {
  if (select.value !== "") {
    placeholder.style.display = "none";
  }
});
// Custom dropdown logic
document.addEventListener("click", function(e) {
  // فتح/غلق الليستة
  let header = e.target.closest(".custom-dropdown .dropdown-header");
  if (header) {
    header.parentElement.classList.toggle("open");
  }

  // اختيار قيمة
  let item = e.target.closest(".custom-dropdown .dropdown-list li");
  if (item) {
    let dropdown = item.closest(".custom-dropdown");
    let textEl = dropdown.querySelector(".dropdown-text");
    let hiddenSelect = dropdown.closest(".gift-select").querySelector("select");

    // غير النص الظاهر
    textEl.textContent = item.textContent;

    // غير قيمة الـ select المخفي + fire event
    hiddenSelect.value = item.dataset.value;
    hiddenSelect.dispatchEvent(new Event("change", { bubbles: true }));

    // قفل الليستة
    dropdown.classList.remove("open");
  }
});

// إغلاق القائمة لما تدوس برة
document.addEventListener("click", function(e) {
  document.querySelectorAll(".custom-dropdown.open").forEach(d => {
    if (!d.contains(e.target)) d.classList.remove("open");
  });
});
