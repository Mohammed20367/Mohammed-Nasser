
document.querySelectorAll('.js-open-modal').forEach(btn => {
  btn.addEventListener('click', function () {
    const modalId = this.getAttribute('data-modal');
    document.getElementById(modalId).style.display = 'flex';
  });
});

document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', function () {
    this.closest('.modal').style.display = 'none';
  });
});

window.addEventListener('click', function (e) {
  if (e.target.classList.contains('modal')) {
    e.target.style.display = 'none';
  }
});
