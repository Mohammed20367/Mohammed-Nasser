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


 
console.log("hi")
    



document.addEventListener('DOMContentLoaded', function() {
         
            document.querySelectorAll('.custom-dropdown').forEach(function(dropdown) {
                const dropdownHeader = dropdown.querySelector('.dropdown-header');
                const dropdownOptions = dropdown.querySelector('.dropdown-options');
                const dropdownText = dropdownHeader.querySelector('.dropdown-text');
                let isOpen = false;
                let selectedValue = '';
                let isDragging = false;
                let startY = 0;
                let scrollTop = 0;

                // فتح/إغلاق القائمة
                dropdownHeader.addEventListener('click', function() {
                    if (isOpen) {
                        closeDropdown();
                    } else {
                        openDropdown();
                    }
                });

                function openDropdown() {
                    // إغلاق أي dropdown مفتوح
                    document.querySelectorAll('.dropdown-options.show').forEach(function(otherOptions) {
                        if (otherOptions !== dropdownOptions) {
                            otherOptions.classList.remove('show');
                            otherOptions.closest('.custom-dropdown').querySelector('.dropdown-header').classList.remove('active');
                        }
                    });

                    isOpen = true;
                    dropdownHeader.classList.add('active');
                    dropdownOptions.classList.add('show');
                }

                function closeDropdown() {
                    isOpen = false;
                    dropdownHeader.classList.remove('active');
                    dropdownOptions.classList.remove('show');
                }

                // اختيار المقاس
                dropdownOptions.addEventListener('click', function(e) {
                    if (e.target.classList.contains('dropdown-option') && !isDragging) {
                        // إزالة التحديد من جميع الخيارات
                        dropdownOptions.querySelectorAll('.dropdown-option').forEach(option => {
                            option.classList.remove('selected');
                        });

                        // تحديد الخيار المختار
                        e.target.classList.add('selected');
                        selectedValue = e.target.dataset.value;
                        dropdownText.textContent = selectedValue;
                        
                        // تحديث حالة الهيدر
                        dropdownHeader.classList.add('selected');
                        
                        // إغلاق القائمة
                        closeDropdown();
                        
                        console.log('Selected size:', selectedValue);
                    }
                });

                // Drag scroll functionality
                dropdownOptions.addEventListener('mousedown', function(e) {
                    isDragging = true;
                    startY = e.pageY - dropdownOptions.offsetTop;
                    scrollTop = dropdownOptions.scrollTop;
                    dropdownOptions.style.cursor = 'grabbing';
                    e.preventDefault();
                });

                dropdownOptions.addEventListener('mouseleave', function() {
                    isDragging = false;
                    dropdownOptions.style.cursor = 'grab';
                });

                dropdownOptions.addEventListener('mouseup', function() {
                    isDragging = false;
                    dropdownOptions.style.cursor = 'grab';
                });

                dropdownOptions.addEventListener('mousemove', function(e) {
                    if (!isDragging) return;
                    e.preventDefault();
                    const y = e.pageY - dropdownOptions.offsetTop;
                    const walk = (y - startY) * 2;
                    dropdownOptions.scrollTop = scrollTop - walk;
                });








            }


          )