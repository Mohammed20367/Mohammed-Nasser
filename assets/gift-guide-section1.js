document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.querySelector('.custom-dropdown');
    const header = dropdown.querySelector('.dropdown-header');
    const text = dropdown.querySelector('.dropdown-text'); // 👈 النص بس
    const options = dropdown.querySelector('.dropdown-options');
    const optionItems = dropdown.querySelectorAll('.dropdown-option');
    
    let isScrolling = false;
    let startY = 0;
    let scrollTop = 0;
    
    // فتح/غلق
    header.addEventListener('click', function(e) {
        e.stopPropagation();
        header.classList.toggle('active');
        options.classList.toggle('show');
    });
    
    // اختيار مقاس
    optionItems.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            if (!isScrolling) {
                const value = this.getAttribute('data-value');
                text.textContent = value; // 👈 بدل ما نمسح الهيدر كله
                optionItems.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                header.classList.remove('active');
                options.classList.remove('show');
                console.log('Selected size:', value);
            }
        });
    });
});
