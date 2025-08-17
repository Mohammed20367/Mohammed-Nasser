 // DOM elements
      const openModalBtn = document.getElementById("openModalBtn");
      const modalOverlay = document.getElementById("modalOverlay");
      const modalContent = document.getElementById("modalContent");
      const closeModalBtn = document.getElementById("closeModalBtn");
      const colorBtns = document.querySelectorAll(".color-option");
      const addToCartBtn = document.getElementById("addToCartBtn");

      // Custom Select elements
      const selectTrigger = document.getElementById("selectTrigger");
      const selectOptions = document.getElementById("selectOptions");
      const selectText = document.getElementById("selectText");
      const dropdownArrow = document.getElementById("dropdownArrow");
      const customSelect = document.getElementById("customSelect");

      // State variables
      let selectedColor = "blue";
      let selectedSize = "";
      let isOpen = false;

      // Initialize the page
      document.addEventListener("DOMContentLoaded", function () {
        // Add event listeners
        openModalBtn.addEventListener("click", openModal);
        closeModalBtn.addEventListener("click", closeModal);
        modalOverlay.addEventListener("click", closeModal);
        modalContent.addEventListener("click", function (e) {
          e.stopPropagation();
        });

        // Color button event listeners
        colorBtns.forEach((btn) => {
          btn.addEventListener("click", function () {
            selectColor(this.getAttribute("data-color"));
          });
        });

        // Add to cart button event listener
        addToCartBtn.addEventListener("click", addToCart);

        // Escape key event listener
        document.addEventListener("keydown", handleEscape);

        // Custom Select Functionality
        selectTrigger.addEventListener("click", function () {
          toggleDropdown();
        });

        // Handle option selection
        document.querySelectorAll(".select-option").forEach((option) => {
          option.addEventListener("click", function () {
            const value = this.getAttribute("data-value");
            const text = this.textContent;

            selectedSize = value;

            // Update selected text
            selectText.textContent = text;
            selectText.classList.remove("placeholder");

            // Update selected option styling
            document.querySelectorAll(".select-option").forEach((opt) => {
              opt.classList.remove("selected");
            });
            this.classList.add("selected");

            // Close dropdown
            toggleDropdown();
          });
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", function (event) {
          if (!customSelect.contains(event.target) && isOpen) {
            toggleDropdown();
          }
        });
      });

      // Open modal function
      function openModal() {
        modalOverlay.classList.remove("hidden");
        // Prevent body scroll when modal is open
        document.body.style.overflow = "hidden";
      }

      // Close modal function
      function closeModal() {
        modalOverlay.classList.add("hidden");
        // Restore body scroll when modal is closed
        document.body.style.overflow = "auto";
      }

      // Color selection functionality
      function selectColor(color) {
        selectedColor = color;

        // Remove active class from all color options
        const colorOptions = document.querySelectorAll(".color-option");
        colorOptions.forEach((option) => {
          option.classList.remove("blue", "black");
          option.style.backgroundColor = "";
          option.style.color = "#333";
        });

        // Add active styling to selected color
        const selectedOption = event.target;
        if (color === "blue") {
          selectedOption.style.backgroundColor = "#4a90e2";
          selectedOption.style.color = "white";
          selectedOption.classList.add("blue");
        } else if (color === "black") {
          selectedOption.style.backgroundColor = "#333";
          selectedOption.style.color = "white";
          selectedOption.classList.add("black");
        }
      }

      // Toggle dropdown function
      function toggleDropdown() {
        isOpen = !isOpen;
        selectOptions.classList.toggle("show", isOpen);
        dropdownArrow.classList.toggle("rotated", isOpen);
        selectTrigger.classList.toggle("active", isOpen);
      }

      // Add to cart function
      function addToCart() {
        if (!selectedSize) {
          alert("Please select a size first!");
          return;
        }
        alert(
          `Added to cart: ${selectedSize.toUpperCase()} ${selectedColor} Tailored Jacket`
        );
        closeModal();
      }

      // Handle escape key
      function handleEscape(event) {
        if (
          event.key === "Escape" &&
          !modalOverlay.classList.contains("hidden")
        ) {
          closeModal();
        }
      }

      // Cleanup function for when page is unloaded
      window.addEventListener("beforeunload", function () {
        // Ensure body scroll is restored
        document.body.style.overflow = "auto";
      });