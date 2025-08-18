document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.querySelector('.custom-dropdown');
    const header = dropdown.querySelector('.dropdown-header');
    const options = dropdown.querySelector('.dropdown-options');
    const optionItems = dropdown.querySelectorAll('.dropdown-option');
    
    // متغيرات الـ drag scroll
    let isScrolling = false;
    let startY = 0;
    let scrollTop = 0;
    
    // Toggle dropdown
    header.addEventListener('click', function(e) {
        e.stopPropagation();
        header.classList.toggle('active');
        options.classList.toggle('show');
    });
    
    // Handle option selection
    optionItems.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            // منع الاختيار أثناء السكرول
            if (!isScrolling) {
                const value = this.getAttribute('data-value');
                
                // Update header text
                header.textContent = value;
                header.classList.add('selected');
                header.setAttribute('data-selected', value);
                
                // Update selected option styling
                optionItems.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                
                // Close dropdown
                header.classList.remove('active');
                options.classList.remove('show');
                
                console.log('Selected size:', value);
            }
        });
    });

    // Drag Scroll functionality
    options.addEventListener('mousedown', function(e) {
        isScrolling = true;
        startY = e.pageY - options.offsetTop;
        scrollTop = options.scrollTop;
        options.style.cursor = 'grabbing';
        e.preventDefault();
    });

    options.addEventListener('mouseleave', function() {
        isScrolling = false;
        options.style.cursor = 'grab';
    });

    options.addEventListener('mouseup', function() {
        isScrolling = false;
        options.style.cursor = 'grab';
    });

    options.addEventListener('mousemove', function(e) {
        if (!isScrolling) return;
        e.preventDefault();
        const y = e.pageY - options.offsetTop;
        const walk = (y - startY) * 2;
        options.scrollTop = scrollTop - walk;
    });

    options.addEventListener('wheel', function(e) {
        e.preventDefault();
        this.scrollTop += e.deltaY * 0.5;
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.custom-dropdown')) {
            header.classList.remove('active');
            options.classList.remove('show');
            isScrolling = false;
        }
    });

    document.addEventListener('mouseup', function() {
        isScrolling = false;
        if (options) options.style.cursor = 'grab';
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            header.classList.remove('active');
            options.classList.remove('show');
            isScrolling = false;
        }
    });
});