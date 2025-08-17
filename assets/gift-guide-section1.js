
(function () {
  // 1) اربط كل أزرار + تلقائيًا بـ data-popup-open
  function ensureTriggers() {
    document.querySelectorAll('.grid-item [class*="plus-icon"]').forEach(function (el) {
      if (!el.getAttribute('data-popup-open')) {
        // استخرج الرقم من اسم الكلاس (plus-icon1 → 1)
        var m = Array.from(el.classList).join(' ').match(/plus-icon(\d+)/);
        if (m) el.setAttribute('data-popup-open', 'look-' + m[1]);
      }
      el.setAttribute('role','button');
      el.setAttribute('tabindex','0');
      el.style.cursor = 'pointer';
    });
  }

  // 2) لو البوب اب مش موجود هيعمل واحد تجريبي 250px تلقائيًا
  function ensurePopup(id, imgSrc, title) {
    var selector = '.gift-popup[data-popup="'+id+'"]';
    if (document.querySelector(selector)) return;

    var wrap = document.createElement('div');
    wrap.className = 'gift-popup';
    wrap.setAttribute('data-popup', id);
    wrap.setAttribute('aria-hidden','true');
    wrap.innerHTML = `
      <div class="gift-popup__card" role="dialog" aria-modal="true" aria-label="${title||'Quick view'}">
        <button class="gift-popup__close" type="button" aria-label="Close">&times;</button>
        ${imgSrc ? `<img class="gift-popup__img" src="${imgSrc}" alt="">` : ``}
        <h4 class="gift-popup__title">${title||'Product title'}</h4>
        <div class="gift-popup__price">980,00€</div>
        <p class="gift-popup__desc">Sample popup (250px width). Replace with your real content.</p>
        <label class="gift-popup__label">Color</label>
        <div class="gift-popup__swatches">
          <button type="button" class="swatch is-active">Option A</button>
          <button type="button" class="swatch">Option B</button>
        </div>
        <label class="gift-popup__label">Size</label>
        <div class="gift-popup__select">
          <select><option selected>Choose your size</option><option>XS</option><option>S</option><option>M</option></select>
        </div>
        <button class="gift-popup__cta" type="button">ADD TO CART</button>
      </div>`;
    document.body.appendChild(wrap);
  }

  // 3) ستايل أساسي سريع (لو ملف CSS مش موجود)
  function injectCSS() {
    if (document.getElementById('gift-popup-inline-css')) return;
    var css = `
      .gift-popup{position:fixed;inset:0;background:rgba(0,0,0,.45);display:none;z-index:1000}
      .gift-popup.is-open{display:block}
      .gift-popup__card{width:250px;background:#fff;border-radius:8px;position:absolute;top:50%;left:50%;
        transform:translate(-50%,-50%);padding:14px;box-shadow:0 10px 30px rgba(0,0,0,.15);font-family:inherit}
      .gift-popup__close{position:absolute;top:6px;right:8px;font-size:20px;line-height:1;background:transparent;border:0;cursor:pointer}
      .gift-popup__img{width:100%;height:140px;object-fit:cover;border-radius:6px}
      .gift-popup__title{font-size:14px;margin:10px 0 4px}
      .gift-popup__price{font-size:13px;margin-bottom:8px}
      .gift-popup__desc{font-size:12px;line-height:1.4;color:#444;margin-bottom:10px}
      .gift-popup__label{display:block;font-size:12px;margin:8px 0 6px}
      .gift-popup__swatches{display:flex;gap:8px}
      .swatch{font-size:12px;padding:8px 10px;border:1px solid #000;background:#fff;cursor:pointer}
      .swatch.is-active{background:#000;color:#fff}
      .gift-popup__select select{width:100%;padding:10px 12px;border:1px solid #000;background:#fff;font-size:12px}
      .gift-popup__cta{width:100%;margin-top:12px;background:#000;color:#fff;border:0;padding:12px 14px;cursor:pointer}
    `;
    var tag = document.createElement('style');
    tag.id = 'gift-popup-inline-css';
    tag.appendChild(document.createTextNode(css));
    document.head.appendChild(tag);
  }

  // 4) فتح/إغلاق
  function bindHandlers() {
    document.body.addEventListener('click', function (e) {
      // فتح
      var trigger = e.target.closest('[data-popup-open]');
      if (trigger) {
        var id = trigger.getAttribute('data-popup-open');
        var popup = document.querySelector('.gift-popup[data-popup="'+id+'"]');
        if (popup) {
          popup.classList.add('is-open');
          popup.setAttribute('aria-hidden','false');
          popup.querySelector('.gift-popup__close')?.focus();
          e.preventDefault();
          return;
        }
      }
      // إغلاق بالـ X
      if (e.target.closest('.gift-popup__close')) {
        var p = e.target.closest('.gift-popup');
        p.classList.remove('is-open');
        p.setAttribute('aria-hidden','true');
        return;
      }
      // إغلاق بالضغط على الخلفية
      if (e.target.classList.contains('gift-popup')) {
        e.target.classList.remove('is-open');
        e.target.setAttribute('aria-hidden','true');
      }
    });

    // إغلاق بـ ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.gift-popup.is-open').forEach(function(p){
          p.classList.remove('is-open');
          p.setAttribute('aria-hidden','true');
        });
      }
    });
  }

  // init بعد ما عناصر الشبكة تبقى في الدوم
  function init() {
    injectCSS();
    ensureTriggers();

    // أنشئ بوب-اب تجريبي لكل كارت لو مش موجود
    document.querySelectorAll('.grid-item').forEach(function (card, i) {
      var n = i + 1;
      var id = 'look-' + n;
      var img = card.querySelector('img');
      ensurePopup(id, img ? img.getAttribute('src') : '', img ? img.getAttribute('alt') : ('Look '+n));
      // اربط السبآن/الصورة بـ data-popup-open لو مش متضبوطة
      var plus = card.querySelector('[data-popup-open]') || card.querySelector('[class*="plus-icon"]');
      if (plus && !plus.getAttribute('data-popup-open')) plus.setAttribute('data-popup-open', id);
    });

    bindHandlers();
  }

  // اشتغل فورًا لو الـ DOM جاهز
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>
