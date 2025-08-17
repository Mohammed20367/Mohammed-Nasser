(function(){
  function openPopup(id){var p=document.querySelector('.gift-popup[data-popup="'+id+'"]');if(p){p.classList.add('is-open');p.setAttribute('aria-hidden','false');}}
  function closePopup(p){p.classList.remove('is-open');p.setAttribute('aria-hidden','true');}

  // فتح من أي [data-popup-open]
  document.addEventListener('click',function(e){
    var t=e.target.closest('[data-popup-open]'); if(!t) return;
    e.preventDefault(); openPopup(t.getAttribute('data-popup-open'));
  }, true);

  // إغلاق
  document.addEventListener('click',function(e){
    if(e.target.closest('.gift-popup__close')){ closePopup(e.target.closest('.gift-popup')); }
    else if(e.target.classList.contains('gift-popup')){ closePopup(e.target); }
  });

  // ESC
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){ document.querySelectorAll('.gift-popup.is-open').forEach(closePopup); }
  });

  // تبديل حالة اللون
  document.addEventListener('click',function(e){
    var sw=e.target.closest('.gift-swatch'); if(!sw) return;
    var wrap=sw.closest('.gift-popup'); if(!wrap) return;
    wrap.querySelectorAll('.gift-swatch').forEach(function(b){b.classList.remove('is-active');});
    sw.classList.add('is-active');
  });
})();