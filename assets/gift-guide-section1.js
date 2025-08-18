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


document.querySelectorAll(".gift-select").forEach(wrapper => {
  const select = wrapper.querySelector("select");
  const placeholder = wrapper.querySelector(".gift-placeholder");

  select.addEventListener("change", () => {
    if (select.value !== "") {
      placeholder.style.display = "none";
    } else {
      placeholder.style.display = "block";
    }
  });
});


// Custom Dropdown Functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.querySelector('.custom-dropdown');
    const header = dropdown.querySelector('.dropdown-header');
    const options = dropdown.querySelector('.dropdown-options');
    const optionItems = dropdown.querySelectorAll('.dropdown-option');
    const placeholder = header.getAttribute('data-placeholder');
    
    // Toggle dropdown
    header.addEventListener('click', function() {
        header.classList.toggle('active');
        options.classList.toggle('show');
    });
    
    // Handle option selection
    optionItems.forEach(option => {
        option.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            
            // Update header
            header.textContent = value;
            header.classList.add('selected');
            header.setAttribute('data-selected', value);
            
            // Update selected option styling
            optionItems.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            
            // Close dropdown
            header.classList.remove('active');
            options.classList.remove('show');
            
            // Optional: Log the selected value
            console.log('Selected size:', value);
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.custom-dropdown')) {
            header.classList.remove('active');
            options.classList.remove('show');
        }
    });
});