document.addEventListener('DOMContentLoaded', function () {
  // فتح
  document.body.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-popup-open]');
    if (btn) {
      const id = btn.getAttribute('data-popup-open');
      const popup = document.querySelector(`.gift-popup[data-popup="${id}"]`);
      if (popup) {
        popup.classList.add('is-open');
        popup.setAttribute('aria-hidden', 'false');
        // فوكس على أول زر
        popup.querySelector('.gift-popup__close')?.focus();
      }
    }
  });

  // إغلاق بالزر أو كليك خارج الكارت
  document.body.addEventListener('click', function (e) {
    const closeBtn = e.target.closest('.gift-popup__close');
    if (closeBtn) {
      const popup = closeBtn.closest('.gift-popup');
      popup.classList.remove('is-open');
      popup.setAttribute('aria-hidden', 'true');
      return;
    }
    const overlay = e.target.classList.contains('gift-popup');
    if (overlay) {
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
