// (function () {
//   // =========================
//   // Popup open/close helpers
//   // =========================
//   function openPopup(id) {
//     var p = document.querySelector('.gift-popup[data-popup="' + id + '"]');
//     if (p) {
//       p.classList.add('is-open');
//       p.setAttribute('aria-hidden', 'false');
//     }
//   }
//   function closePopup(p) {
//     p.classList.remove('is-open');
//     p.setAttribute('aria-hidden', 'true');
//   }

//   // Open/close popups (overlay + close button)
//   document.addEventListener('click', function (e) {
//     var opener = e.target.closest('[data-popup-open]');
//     if (opener) {
//       e.preventDefault();
//       openPopup(opener.getAttribute('data-popup-open'));
//       return;
//     }
//     if (e.target.closest('.gift-popup__close')) {
//       closePopup(e.target.closest('.gift-popup'));
//       return;
//     }
//     if (e.target.classList.contains('gift-popup')) {
//       closePopup(e.target);
//       return;
//     }
//   });

//   // ESC closes all
//   document.addEventListener('keydown', function (e) {
//     if (e.key === 'Escape') {
//       document.querySelectorAll('.gift-popup.is-open').forEach(closePopup);
//     }
//   });

//   // =========================
//   // Color swatches (toggle)
//   // =========================
//   document.addEventListener('click', function (e) {
//     var sw = e.target.closest('.gift-swatch');
//     if (!sw) return;
//     var wrap = sw.closest('.gift-popup');
//     if (!wrap) return;
//     wrap.querySelectorAll('.gift-swatch').forEach(function (b) {
//       b.classList.remove('is-active');
//     });
//     sw.classList.add('is-active');
//   });

//   // ===========================================
//   // SIZE DROPDOWN (conflict-free, delegated)
//   // ===========================================
//   document.addEventListener('click', function (e) {
//     // Toggle header
//     var header = e.target.closest('.custom-dropdown .dropdown-header');
//     if (header) {
//       // Close others
//       document
//         .querySelectorAll('.custom-dropdown .dropdown-header.active')
//         .forEach(function (h) {
//           if (h !== header) {
//             h.classList.remove('active');
//             var mm = h.parentElement.querySelector('.dropdown-options');
//             if (mm) mm.classList.remove('show');
//           }
//         });
//       var menu = header.parentElement.querySelector('.dropdown-options');
//       header.classList.toggle('active');
//       if (menu) menu.classList.toggle('show');
//       e.stopPropagation();
//       return;
//     }

//     // Select option
//     var option = e.target.closest('.custom-dropdown .dropdown-option');
//     if (option) {
//       var menu = option.closest('.dropdown-options');
//       var dd   = option.closest('.custom-dropdown');
//       if (menu) {
//         menu.querySelectorAll('.dropdown-option').forEach(function (o) {
//           o.classList.remove('selected');
//         });
//       }
//       option.classList.add('selected');

//       var ddHeader = dd.querySelector('.dropdown-header');
//       var textNode = ddHeader.querySelector('.dropdown-text');
//       var value    = option.dataset.value || option.textContent.trim();
//       if (textNode) textNode.textContent = value;

//       ddHeader.classList.add('selected');
//       ddHeader.classList.remove('active');
//       if (menu) menu.classList.remove('show');

//       e.stopPropagation();
//       return;
//     }

//     // Click outside → close any open dropdowns
//     if (!e.target.closest('.custom-dropdown')) {
//       document
//         .querySelectorAll('.custom-dropdown .dropdown-header.active')
//         .forEach(function (h) { h.classList.remove('active'); });
//       document
//         .querySelectorAll('.custom-dropdown .dropdown-options.show')
//         .forEach(function (m) { m.classList.remove('show'); });
//     }
//   });

//   // ===========================================
//   // ADD TO CART (localStorage)
//   // ===========================================
//   function getCart() {
//     try { return JSON.parse(localStorage.getItem('cart')) || []; }
//     catch { return []; }
//   }
//   function setCart(items) {
//     localStorage.setItem('cart', JSON.stringify(items));
//     updateCartCount();
//   }
//   function updateCartCount() {
//     var el = document.querySelector('#cart-count');
//     if (!el) return;
//     var total = getCart().reduce(function (n, it) { return n + (it.qty || 0); }, 0);
//     el.textContent = total > 99 ? '99+' : String(total);
//   }

//   // Toast helper (once)
//   (function injectToastStyle() {
//     if (document.getElementById('gg-toast-style')) return;
//     var css = ".gg-toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:#111;color:#fff;padding:10px 14px;border-radius:6px;font:500 14px/1.2 Jost,system-ui,sans-serif;z-index:9999;opacity:.98;box-shadow:0 6px 16px rgba(0,0,0,.2)}.gg-toast--error{background:#B20F36}";
//     var s = document.createElement('style');
//     s.id = 'gg-toast-style';
//     s.textContent = css;
//     document.head.appendChild(s);
//   })();
//   function showToast(msg, isError) {
//     var t = document.createElement('div');
//     t.className = 'gg-toast' + (isError ? ' gg-toast--error' : '');
//     t.textContent = msg;
//     document.body.appendChild(t);
//     setTimeout(function () { t.style.transition = 'opacity .35s'; t.style.opacity = '0'; }, 1400);
//     setTimeout(function () { t.remove(); }, 1800);
//   }

//   function readProductFromPopup(popupEl) {
//     var title = popupEl.querySelector('.gift-head__title')?.textContent.trim() || 'Product';
//     var priceText = popupEl.querySelector('.gift-head__price')?.textContent.trim() || '';
//     var img = popupEl.querySelector('.gift-head__img')?.getAttribute('src') || '';
//     var activeSw = popupEl.querySelector('.gift-swatch.is-active') || popupEl.querySelector('.gift-swatch');
//     var color = activeSw ? activeSw.textContent.trim() : null;

//     var ddHeader = popupEl.querySelector('.custom-dropdown .dropdown-header');
//     var size = ddHeader && ddHeader.classList.contains('selected')
//       ? ddHeader.querySelector('.dropdown-text')?.textContent.trim()
//       : null;

//     var priceNum = null;
//     if (priceText) {
//       var normalized = priceText.replace(/[^\d,.\-]/g, '').replace('.', '').replace(',', '.');
//       var parsed = parseFloat(normalized);
//       if (!isNaN(parsed)) priceNum = parsed;
//     }

//     return {
//       id: (title + '|' + (color || '') + '|' + (size || '')).toLowerCase().replace(/\s+/g, '-'),
//       title: title,
//       priceText: priceText,
//       price: priceNum,
//       color: color,
//       size: size,
//       image: img,
//       qty: 1
//     };
//   }

//   function addToCart(product) {
//     var cart = getCart();
//     var idx = cart.findIndex(function (it) { return it.id === product.id && product.id !== '--'; });
//     if (idx > -1) cart[idx].qty += 1; else cart.push(product);
//     setCart(cart);
//   }

//   // Click "ADD TO CART"
//   document.addEventListener('click', function (e) {
//     var btn = e.target.closest('.gift-cta');
//     if (!btn) return;

//     var popup = btn.closest('.gift-popup');
//     if (!popup) return;

//     var product = readProductFromPopup(popup);

//     if (!product.size) {
//       showToast('Please choose a size', true);
//       var dd = popup.querySelector('.custom-dropdown .dropdown-header');
//       if (dd) { dd.style.outline = '2px solid #B20F36'; setTimeout(function () { dd.style.outline = 'none'; }, 1200); }
//       return;
//     }

//     addToCart(product);
//     showToast('Added to cart ✓');

//     // Optional: close popup after add
//     setTimeout(function () { closePopup(popup); }, 250);
//   });

//   // Init cart count on load
//   updateCartCount();
// })();


(function () {
  // =========================
  // Popup open/close helpers
  // =========================
  function openPopup(id) {
    var p = document.querySelector('.gift-popup[data-popup="' + id + '"]');
    if (p) {
      p.classList.add('is-open');
      p.setAttribute('aria-hidden', 'false');
    }
  }
  function closePopup(p) {
    p.classList.remove('is-open');
    p.setAttribute('aria-hidden', 'true');
  }

  // Open/close popups (overlay + close button)
  document.addEventListener('click', function (e) {
    var opener = e.target.closest('[data-popup-open]');
    if (opener) {
      e.preventDefault();
      openPopup(opener.getAttribute('data-popup-open'));
      return;
    }
    if (e.target.closest('.gift-popup__close')) {
      closePopup(e.target.closest('.gift-popup'));
      return;
    }
    if (e.target.classList.contains('gift-popup')) {
      closePopup(e.target);
      return;
    }
  });

  // ESC closes all
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.gift-popup.is-open').forEach(closePopup);
    }
  });

  // =========================
  // Color swatches (toggle)
  // =========================
  document.addEventListener('click', function (e) {
    var sw = e.target.closest('.gift-swatch');
    if (!sw) return;
    var wrap = sw.closest('.gift-popup');
    if (!wrap) return;
    wrap.querySelectorAll('.gift-swatch').forEach(function (b) {
      b.classList.remove('is-active');
    });
    sw.classList.add('is-active');
  });

  // ===========================================
  // DRAG SCROLL FOR DROPDOWN OPTIONS
  // ===========================================
  var isDragging = false;
  var startY = 0;
  var scrollTop = 0;
  var currentDropdown = null;

  document.addEventListener('mousedown', function(e) {
    var dropdownOptions = e.target.closest('.dropdown-options');
    if (dropdownOptions) {
      isDragging = true;
      currentDropdown = dropdownOptions;
      startY = e.pageY - dropdownOptions.offsetTop;
      scrollTop = dropdownOptions.scrollTop;
      dropdownOptions.style.cursor = 'grabbing';
      e.preventDefault();
    }
  });

  document.addEventListener('mousemove', function(e) {
    if (!isDragging || !currentDropdown) return;
    e.preventDefault();
    var y = e.pageY - currentDropdown.offsetTop;
    var walk = (y - startY) * 2; // scroll speed multiplier
    currentDropdown.scrollTop = scrollTop - walk;
  });

  document.addEventListener('mouseup', function() {
    if (isDragging && currentDropdown) {
      isDragging = false;
      currentDropdown.style.cursor = 'grab';
      currentDropdown = null;
    }
  });

  document.addEventListener('mouseleave', function() {
    if (isDragging && currentDropdown) {
      isDragging = false;
      currentDropdown.style.cursor = 'grab';
      currentDropdown = null;
    }
  });

  // ===========================================
  // SIZE DROPDOWN (conflict-free, delegated) - UPDATED VERSION
  // ===========================================
  document.addEventListener('click', function (e) {
    // Toggle header
    var header = e.target.closest('.custom-dropdown .dropdown-header');
    if (header) {
      // Close others
      document
        .querySelectorAll('.custom-dropdown .dropdown-header.active')
        .forEach(function (h) {
          if (h !== header) {
            h.classList.remove('active');
            var mm = h.parentElement.querySelector('.dropdown-options');
            if (mm) mm.classList.remove('show');
          }
        });
      var menu = header.parentElement.querySelector('.dropdown-options');
      header.classList.toggle('active');
      if (menu) menu.classList.toggle('show');
      e.stopPropagation();
      return;
    }

    // Select option - UPDATED TO HANDLE CENTERING
    var option = e.target.closest('.custom-dropdown .dropdown-option');
    if (option) {
      var menu = option.closest('.dropdown-options');
      var dd   = option.closest('.custom-dropdown');
      if (menu) {
        menu.querySelectorAll('.dropdown-option').forEach(function (o) {
          o.classList.remove('selected');
        });
      }
      option.classList.add('selected');

      var ddHeader = dd.querySelector('.dropdown-header');
      var textNode = ddHeader.querySelector('.dropdown-text');
      var value    = option.dataset.value || option.textContent.trim();
      
      if (textNode) {
        textNode.textContent = value;
        // NEW: Add centering classes when size is selected
        textNode.classList.add('selected');
      }

      // NEW: Add selected class to center the content
      ddHeader.classList.add('selected');
      ddHeader.classList.remove('active');
      if (menu) menu.classList.remove('show');

      e.stopPropagation();
      return;
    }

    // Click outside → close any open dropdowns
    if (!e.target.closest('.custom-dropdown')) {
      document
        .querySelectorAll('.custom-dropdown .dropdown-header.active')
        .forEach(function (h) { h.classList.remove('active'); });
      document
        .querySelectorAll('.custom-dropdown .dropdown-options.show')
        .forEach(function (m) { m.classList.remove('show'); });
    }
  });

  // ===========================================
  // ADD TO CART (localStorage)
  // ===========================================
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
    var total = getCart().reduce(function (n, it) { return n + (it.qty || 0); }, 0);
    el.textContent = total > 99 ? '99+' : String(total);
  }

  // Toast helper (once)
  (function injectToastStyle() {
    if (document.getElementById('gg-toast-style')) return;
    var css = ".gg-toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:#111;color:#fff;padding:10px 14px;border-radius:6px;font:500 14px/1.2 Jost,system-ui,sans-serif;z-index:9999;opacity:.98;box-shadow:0 6px 16px rgba(0,0,0,.2)}.gg-toast--error{background:#B20F36}";
    var s = document.createElement('style');
    s.id = 'gg-toast-style';
    s.textContent = css;
    document.head.appendChild(s);
  })();
  function showToast(msg, isError) {
    var t = document.createElement('div');
    t.className = 'gg-toast' + (isError ? ' gg-toast--error' : '');
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.style.transition = 'opacity .35s'; t.style.opacity = '0'; }, 1400);
    setTimeout(function () { t.remove(); }, 1800);
  }

  function readProductFromPopup(popupEl) {
    var title = popupEl.querySelector('.gift-head__title')?.textContent.trim() || 'Product';
    var priceText = popupEl.querySelector('.gift-head__price')?.textContent.trim() || '';
    var img = popupEl.querySelector('.gift-head__img')?.getAttribute('src') || '';
    var activeSw = popupEl.querySelector('.gift-swatch.is-active') || popupEl.querySelector('.gift-swatch');
    var color = activeSw ? activeSw.textContent.trim() : null;

    var ddHeader = popupEl.querySelector('.custom-dropdown .dropdown-header');
    var size = ddHeader && ddHeader.classList.contains('selected')
      ? ddHeader.querySelector('.dropdown-text')?.textContent.trim()
      : null;

    var priceNum = null;
    if (priceText) {
      var normalized = priceText.replace(/[^\d,.\-]/g, '').replace('.', '').replace(',', '.');
      var parsed = parseFloat(normalized);
      if (!isNaN(parsed)) priceNum = parsed;
    }

    return {
      id: (title + '|' + (color || '') + '|' + (size || '')).toLowerCase().replace(/\s+/g, '-'),
      title: title,
      priceText: priceText,
      price: priceNum,
      color: color,
      size: size,
      image: img,
      qty: 1
    };
  }

  function addToCart(product) {
    var cart = getCart();
    var idx = cart.findIndex(function (it) { return it.id === product.id && product.id !== '--'; });
    if (idx > -1) cart[idx].qty += 1; else cart.push(product);
    setCart(cart);
  }

  // Click "ADD TO CART"
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.gift-cta');
    if (!btn) return;

    var popup = btn.closest('.gift-popup');
    if (!popup) return;

    var product = readProductFromPopup(popup);

    if (!product.size) {
      showToast('Please choose a size', true);
      var dd = popup.querySelector('.custom-dropdown .dropdown-header');
      if (dd) { dd.style.outline = '2px solid #B20F36'; setTimeout(function () { dd.style.outline = 'none'; }, 1200); }
      return;
    }

    addToCart(product);
    showToast('Added to cart');

    // Optional: close popup after add
    setTimeout(function () { closePopup(popup); }, 250);
  });

  // Init cart count on load
  updateCartCount();
})();