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


 document.addEventListener('DOMContentLoaded', function() {
            const dropdown = document.querySelector('.custom-dropdown');
            const header = dropdown.querySelector('.dropdown-header');
            const options = dropdown.querySelector('.dropdown-options');
            const optionItems = dropdown.querySelectorAll('.dropdown-option');
            const placeholder = header.getAttribute('data-placeholder');
            
            // 👈 متغيرات الـ drag scroll
            let isScrolling = false;
            let startY = 0;
            let scrollTop = 0;

            // Toggle dropdown
            header.addEventListener('click', function() {
                header.classList.toggle('active');
                options.classList.toggle('show');
            });
            
            // Handle option selection
            optionItems.forEach(option => {
                option.addEventListener('click', function(e) {
                    // منع الـ drag من التداخل مع الاختيار
                    if (!isScrolling) {
                        const value = this.getAttribute('data-value');
                        
                        // Update header - النص المختار يظهر على الشمال
                        header.textContent = value;
                        header.classList.add('selected');
                        header.setAttribute('data-selected', value);
                        
                        // Update selected option styling
                        optionItems.forEach(opt => opt.classList.remove('selected'));
                        this.classList.add('selected');
                        
                        // Close dropdown
                        header.classList.remove('active');
                        options.classList.remove('show');
                        
                        console.log('Selected size:', value);
                    }
                });
            });

            // 👈 Drag Scroll functionality
            options.addEventListener('mousedown', function(e) {
                isScrolling = true;
                startY = e.pageY - options.offsetTop;
                scrollTop = options.scrollTop;
                options.style.cursor = 'grabbing';
                
                // منع تحديد النص أثناء الـ drag
                e.preventDefault();
            });

            options.addEventListener('mouseleave', function() {
                isScrolling = false;
                options.style.cursor = 'grab';
            });

            options.addEventListener('mouseup', function() {
                isScrolling = false;
                options.style.cursor = 'grab';
            });

            options.addEventListener('mousemove', function(e) {
                if (!isScrolling) return;
                
                e.preventDefault();
                const y = e.pageY - options.offsetTop;
                const walk = (y - startY) * 2; // 👈 سرعة الـ scroll
                options.scrollTop = scrollTop - walk;
            });

            // Mouse wheel scroll (إضافي)
            options.addEventListener('wheel', function(e) {
                e.preventDefault();
                this.scrollTop += e.deltaY * 0.5;
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.custom-dropdown')) {
                    header.classList.remove('active');
                    options.classList.remove('show');
                    isScrolling = false;
                }
            });

            // 👈 إيقاف الـ scrolling عند mouse up في أي مكان
            document.addEventListener('mouseup', function() {
                isScrolling = false;
                if (options) options.style.cursor = 'grab';
            });
        });
  