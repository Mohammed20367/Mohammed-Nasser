// Product Popup Modal - JavaScript Functionality

// DOM Elements
const productPopupOverlay = document.getElementById("productPopupOverlay");
const productPopupContent = document.getElementById("productPopupContent");
const closeProductPopup = document.getElementById("closeProductPopup");
const colorOptions = document.querySelectorAll(".color-option");
const addToCartButton = document.getElementById("addToCartButton");

// Size Dropdown Elements
const sizeDropdown = document.getElementById("sizeDropdown");
const sizeDropdownTrigger = document.getElementById("sizeDropdownTrigger");
const sizeDropdownOptions = document.getElementById("sizeDropdownOptions");
const sizeDropdownText = document.getElementById("sizeDropdownText");
const sizeDropdownArrow = document.getElementById("sizeDropdownArrow");

// State Variables
let selectedColor = "white";
let selectedSize = "";
let isDropdownOpen = false;

// Initialize Popup Functionality
function initializeProductPopup() {
    // Close button event listener
    closeProductPopup.addEventListener("click", closePopup);
    
    // Overlay click to close (but not content click)
    productPopupOverlay.addEventListener("click", handleOverlayClick);
    productPopupContent.addEventListener("click", function(e) {
        e.stopPropagation();
    });

    // Color selection event listeners
    colorOptions.forEach(function(colorBtn) {
        colorBtn.addEventListener("click", function() {
            selectColor(this.getAttribute("data-color"));
        });
    });

    // Size dropdown event listeners
    sizeDropdownTrigger.addEventListener("click", toggleSizeDropdown);

    // Size option selection
    const sizeOptions = document.querySelectorAll(".dropdown-option");
    sizeOptions.forEach(function(option) {
        option.addEventListener("click", function() {
            const size = this.getAttribute("data-size");
            const sizeText = this.textContent;
            selectSize(size, sizeText);
        });
    });

    // Add to cart button
    addToCartButton.addEventListener("click", handleAddToCart);

    // Close dropdown when clicking outside
    document.addEventListener("click", function(event) {
        if (!sizeDropdown.contains(event.target) && isDropdownOpen) {
            toggleSizeDropdown();
        }
    });

    // Escape key to close popup
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape" && !productPopupOverlay.classList.contains("popup-hidden")) {
            closePopup();
        }
    });
}

// Open Popup Function
function openProductPopup() {
    productPopupOverlay.classList.remove("popup-hidden");
    document.body.style.overflow = "hidden"; // Prevent background scroll
}

// Close Popup Function
function closePopup() {
    productPopupOverlay.classList.add("popup-hidden");
    document.body.style.overflow = "auto"; // Restore background scroll
    
    // Close dropdown if open
    if (isDropdownOpen) {
        toggleSizeDropdown();
    }
}

// Handle Overlay Click
function handleOverlayClick(e) {
    if (e.target === productPopupOverlay) {
        closePopup();
    }
}

// Color Selection Function
function selectColor(color) {
    selectedColor = color;

    // Remove selected class from all color options
    colorOptions.forEach(function(btn) {
        btn.classList.remove("color-selected");
    });

    // Add selected class to clicked option
    event.target.classList.add("color-selected");
}

// Size Selection Function
function selectSize(size, sizeText) {
    selectedSize = size;

    // Update dropdown text
    sizeDropdownText.textContent = sizeText;
    sizeDropdownText.classList.remove("dropdown-placeholder");

    // Update selected option styling
    const sizeOptions = document.querySelectorAll(".dropdown-option");
    sizeOptions.forEach(function(option) {
        option.classList.remove("option-selected");
    });
    event.target.classList.add("option-selected");

    // Close dropdown
    toggleSizeDropdown();
}

// Toggle Size Dropdown
function toggleSizeDropdown() {
    isDropdownOpen = !isDropdownOpen;
    
    sizeDropdownOptions.classList.toggle("dropdown-show", isDropdownOpen);
    sizeDropdownArrow.classList.toggle("dropdown-rotated", isDropdownOpen);
    sizeDropdownTrigger.classList.toggle("dropdown-active", isDropdownOpen);
}

// Handle Add to Cart
function handleAddToCart() {
    if (!selectedSize) {
        alert("Please select a size first!");
        return;
    }
    
    // هنا تقدر تحط الكود بتاع Shopify للإضافة للسلة
    alert(`Added to cart: ${selectedSize.toUpperCase()} ${selectedColor} Orange Wide Leg - 980,00€`);
    
    // يمكنك إغلاق الـ popup بعد الإضافة للسلة
    closePopup();
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    initializeProductPopup();
});

// Cleanup function
window.addEventListener("beforeunload", function() {
    document.body.style.overflow = "auto";
});

// Export functions for external use (إذا كنت محتاج تستدعي الـ popup من مكان تاني)
window.openProductPopup = openProductPopup;
window.closeProductPopup = closePopup;