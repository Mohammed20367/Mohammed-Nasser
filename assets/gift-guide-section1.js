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


  // Custom dropdown functionality
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

      // إغلاق الدروب داون لما نضغط خارجه
      document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
          closeDropdown();
        }
      });
    });
  })();



//    /* ================================
     ADD TO CART (localStorage cart)
     - Reads product info from popup
     - Requires size selection
     - Persists cart in localStorage
     - Updates #cart-count if exists
     ================================= */

  // Utils: get / set cart
  function getCart() {
    try { return JSON.parse(localStorage.getItem('cart')) || []; }
    catch { return []; }
  }
  function setCart(items) {
    localStorage.setItem('cart', JSON.stringify(items));
    updateCartCount();
  }
  function updateCartCount() {
    var el = document.querySelector('#cart-count');
    if (!el) return;
    var items = getCart();
    var total = items.reduce((n, it) => n + (it.qty || 0), 0);
    el.textContent = total > 99 ? '99+' : String(total);
  }

  // Tiny toast helper (injects style once)
  (function injectToastStyle(){
    if (document.getElementById('gg-toast-style')) return;
    var css = `
      .gg-toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);
        background:#111;color:#fff;padding:10px 14px;border-radius:6px;
        font:500 14px/1.2 Jost,system-ui,sans-serif;z-index:9999;opacity:.98;
        box-shadow:0 6px 16px rgba(0,0,0,.2)}
      .gg-toast--error{background:#B20F36}
    `;
    var s = document.createElement('style');
    s.id = 'gg-toast-style';
    s.textContent = css;
    document.head.appendChild(s);
  })();

  function showToast(msg, isError){
    var t = document.createElement('div');
    t.className = 'gg-toast' + (isError ? ' gg-toast--error' : '');
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => { t.style.transition='opacity .35s'; t.style.opacity='0'; }, 1400);
    setTimeout(() => t.remove(), 1800);
  }

  // Build a product object from the popup
  function readProductFromPopup(popupEl){
    var title = popupEl.querySelector('.gift-head__title')?.textContent.trim() || 'Product';
    var priceText = popupEl.querySelector('.gift-head__price')?.textContent.trim() || '';
    var img = popupEl.querySelector('.gift-head__img')?.getAttribute('src') || '';
    // Color: active swatch text or first swatch text
    var activeSw = popupEl.querySelector('.gift-swatch.is-active') || popupEl.querySelector('.gift-swatch');
    var color = activeSw ? activeSw.textContent.trim() : null;
    // Size: only if dropdown marked as selected
    var ddHeader = popupEl.querySelector('.custom-dropdown .dropdown-header');
    var size = ddHeader && ddHeader.classList.contains('selected')
      ? ddHeader.querySelector('.dropdown-text')?.textContent.trim()
      : null;

    // Try to normalize price to number (optional)
    var priceNum = null;
    if (priceText) {
      var normalized = priceText.replace(/[^\d,.\-]/g,'').replace('.', '').replace(',', '.'); // handle 980,00
      var parsed = parseFloat(normalized);
      if (!isNaN(parsed)) priceNum = parsed;
    }

    return {
      id: (title + '|' + (color||'') + '|' + (size||'')).toLowerCase().replace(/\s+/g,'-'),
      title: title,
      priceText: priceText,
      price: priceNum,          // may be null if parsing fails
      color: color,
      size: size,
      image: img,
      qty: 1
    };
  }

  // Add / increment in cart
  function addToCart(product){
    var cart = getCart();
    var idx = cart.findIndex(it => it.id === product.id && product.id !== '--');
    if (idx > -1) {
      cart[idx].qty += 1;
    } else {
      cart.push(product);
    }
    setCart(cart);
  }

  // Bind click on "ADD TO CART" in any popup
  document.addEventListener('click', function(e){
    var btn = e.target.closest('.gift-cta');
    if (!btn) return;

    var popup = btn.closest('.gift-popup');
    if (!popup) return;

    var product = readProductFromPopup(popup);

    // Validate required options
    if (!product.size) {
      showToast('Please choose a size', true);
      // Emphasize dropdown visually
      var dd = popup.querySelector('.custom-dropdown .dropdown-header');
      if (dd) { dd.style.outline = '2px solid #B20F36'; setTimeout(()=> dd.style.outline='none', 1200); }
      return;
    }

    // Color optional: if none active we already pulled first label; if still null, ignore
    addToCart(product);
    showToast('Added to cart ✓');

    // Optional: close popup after add
    var card = btn.closest('.gift-popup');
    if (card) {
      setTimeout(function(){ card.classList.remove('is-open'); card.setAttribute('aria-hidden','true'); }, 250);
    }
  });

  // Initialize count on load
  updateCartCount();
