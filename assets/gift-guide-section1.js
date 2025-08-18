/* Gift popups + add-to-cart
 * - Opens popup on [data-popup-open]
 * - Color/size selection
 * - Resolves variantId from data-variant-map
 * - Calls Shopify /cart/add.js
 */

(function () {
  // ---- Utilities ----
  const qs  = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Show inline feedback (success/error)
  function showFeedback(popup, msg, ok = true) {
    const box = qs('.gift-feedback', popup);
    if (!box) return;
    box.hidden = false;
    box.textContent = msg;
    box.classList.toggle('gift-feedback--ok', ok);
    box.classList.toggle('gift-feedback--err', !ok);
  }

  // Enable CTA only when color + size chosen
  function syncCtaState(popup) {
    const colorBtn = qs('.gift-swatch.is-active', popup);
    const sizeSel  = qs('.gift-select select', popup);
    const cta      = qs('[data-action="add-to-cart"]', popup);
    const ready    = !!(colorBtn && sizeSel && sizeSel.value && sizeSel.value !== 'Choose your size');
    if (cta) cta.disabled = !ready;
  }

  // Parse variant map from data attribute
  function getVariantId(popup) {
    const mapStr = popup.getAttribute('data-variant-map');
    if (!mapStr) return null;
    let map;
    try { map = JSON.parse(mapStr); } catch (e) { return null; }

    const color = qs('.gift-swatch.is-active', popup)?.dataset.color;
    const size  = qs('.gift-select select', popup)?.value;
    if (!color || !size || !map[color]) return null;
    return map[color][size] || null;
  }

  // Shopify add to cart
  async function addToCart(variantId, qty = 1) {
    const res = await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ items: [{ id: Number(variantId), quantity: qty }] })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      const msg = err?.description || err?.message || `Add to cart failed (${res.status})`;
      throw new Error(msg);
    }
    return res.json(); // cart response
  }

  // ---- Open / Close handlers ----
  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('[data-popup-open]');
    if (!trigger) return;
    const id = trigger.getAttribute('data-popup-open');
    const popup = qs(`.gift-popup[data-popup="${id}"]`);
    if (popup) {
      popup.classList.add('is-open');
      popup.setAttribute('aria-hidden', 'false');
      // default: ensure CTA state
      syncCtaState(popup);
      e.preventDefault();
    }
  }, true); // capture to beat stopPropagation

  document.addEventListener('click', function (e) {
    if (e.target.closest('.gift-close')) {
      const p = e.target.closest('.gift-popup');
      p.classList.remove('is-open');
      p.setAttribute('aria-hidden', 'true');
      return;
    }
    if (e.target.classList.contains('gift-popup')) {
      e.target.classList.remove('is-open');
      e.target.setAttribute('aria-hidden', 'true');
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') qsa('.gift-popup.is-open').forEach(p => {
      p.classList.remove('is-open'); p.setAttribute('aria-hidden', 'true');
    });
  });

  // ---- Color selection ----
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.gift-swatch');
    if (!btn) return;
    const popup = btn.closest('.gift-popup');
    if (!popup) return;

    qsa('.gift-swatch', popup).forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');

    // Reset feedback on change
    showFeedback(popup, '', true); qs('.gift-feedback', popup).hidden = true;

    syncCtaState(popup);
  });

  // ---- Size selection ----
  document.addEventListener('change', function (e) {
    const sel = e.target.closest('.gift-select select');
    if (!sel) return;
    const popup = sel.closest('.gift-popup');
    if (!popup) return;
    // Reset feedback on change
    showFeedback(popup, '', true); qs('.gift-feedback', popup).hidden = true;

    syncCtaState(popup);
  });

  // ---- Add to cart ----
  document.addEventListener('click', async function (e) {
    const btn = e.target.closest('[data-action="add-to-cart"]');
    if (!btn) return;

    const popup = btn.closest('.gift-popup');
    const variantId = getVariantId(popup);

    if (!variantId) {
      showFeedback(popup, 'Please choose color and size.', false);
      return;
    }

    btn.disabled = true;
    btn.dataset.loading = '1';

    try {
      const cartRes = await addToCart(variantId, 1);
      showFeedback(popup, 'Added to cart ✓', true);
      // Optional hook for themes/minicart
      document.dispatchEvent(new CustomEvent('gift:added', { detail: cartRes }));
      // Close after a short delay (optional)
      setTimeout(() => {
        popup.classList.remove('is-open');
        popup.setAttribute('aria-hidden', 'true');
      }, 500);
    } catch (err) {
      showFeedback(popup, err.message || 'Add to cart failed.', false);
    } finally {
      btn.disabled = false;
      delete btn.dataset.loading;
    }
  });

  // Initial state (ensure CTAs disabled until size chosen)
  qsa('.gift-popup').forEach(syncCtaState);
})();
