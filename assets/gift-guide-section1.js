(function(){
  function openPopup(id){var p=document.querySelector('.gift-popup[data-popup="'+id+'"]');if(p){p.classList.add('is-open');p.setAttribute('aria-hidden','false');}}
  function closePopup(p){p.classList.remove('is-open');p.setAttribute('aria-hidden','true');}
  document.addEventListener('click',function(e){
    var t=e.target.closest('[data-popup-open]'); if(t){e.preventDefault(); openPopup(t.getAttribute('data-popup-open'));}
    if(e.target.closest('.gift-popup__close')){ closePopup(e.target.closest('.gift-popup')); }
    else if(e.target.classList.contains('gift-popup')){ closePopup(e.target); }
  });
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){document.querySelectorAll('.gift-popup.is-open').forEach(closePopup);}});
  document.addEventListener('click',function(e){
    var sw=e.target.closest('.gift-swatch'); if(!sw) return;
    var wrap=sw.closest('.gift-popup'); wrap.querySelectorAll('.gift-swatch').forEach(b=>b.classList.remove('is-active'));
    sw.classList.add('is-active');
  });
})();