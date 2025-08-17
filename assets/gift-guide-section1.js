document.addEventListener('DOMContentLoaded', function () {
  // فتح البوب-اب عند الضغط على + (بالـ data-attr أو بالترقيم)
  document.body.addEventListener('click', function (e) {
    const trigger = e.target.closest(
      '[data-popup-open], .plus-icon1, .plus-icon2, .plus-icon3, .plus-icon4, .plus-icon5, .plus-icon6'
    );
    if (!trigger) return;

    // 1) حاول تقرأ الـ id من data-popup-open
    let id = trigger.getAttribute && trigger.getAttribute('data-popup-open');

    // 2) لو مش موجود، اشتقّه من اسم الكلاس (plus-iconN → look-N)
    if (!id) {
      const cls = [...trigger.classList].find(c => c.startsWith('plus-icon'));
      if (cls) {
        const n = cls.replace('plus-icon', ''); // "1".."6"
        id = `look-${n}`;
      }
    }

    if (!id) return;

    const popup = document.querySelector(`.gift-popup[data-popup="${id}"]`);
    if (popup) {
      popup.classList.add('is-open');
      popup.setAttribute('aria-hidden', 'false');
      popup.querySelector('.gift-popup__close')?.focus();
    }
  });

  // إغلاق (X) أو كليك على الخلفية
  document.body.addEventListener('click', function (e) {
    if (e.target.matches('.gift-popup__close')) {
      const p = e.target.closest('.gift-popup');
      p.classList.remove('is-open');
      p.setAttribute('aria-hidden', 'true');
    } else if (e.target.classList.contains('gift-popup')) {
      e.target.classList.remove('is-open');
      e.target.setAttribute('aria-hidden', 'true');
    }
  });

  // إغلاق بـ ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.gift-popup.is-open').forEach(p => {
        p.classList.remove('is-open');
        p.setAttribute('aria-hidden', 'true');
      });
    }
  });
});
