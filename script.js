document.addEventListener("DOMContentLoaded", () => {
    // 1. Load Local Images directly from data-local-src
    const catalogImages = document.querySelectorAll(".card-image-wrap img");

    catalogImages.forEach((img) => {
        const localSrc = img.getAttribute("data-local-src");
        if (localSrc) {
            img.src = localSrc;
        }

        img.addEventListener("error", function () {
            this.alt = "Image unavailable";
            this.style.backgroundColor = "#111";
        });
    });

    // 2. Mobile Menu Toggle
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navLinks = document.getElementById("navLinks");

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            hamburgerBtn.classList.toggle("open");
        });
    }

    // 3. Category Filter
    const filterButtons = document.querySelectorAll(".filter-btn");
    const catalogCards = document.querySelectorAll(".catalog-card");

    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const category = btn.getAttribute("data-category");

            catalogCards.forEach((card) => {
                if (category === "all" || card.getAttribute("data-category") === category) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // 4. FAQ Accordion Toggle
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach((question) => {
        question.addEventListener("click", () => {
            const faqItem = question.parentElement;
            faqItem.classList.toggle("open");

            const icon = question.querySelector(".faq-icon");
            if (icon) {
                icon.textContent = faqItem.classList.contains("open") ? "-" : "+";
            }
        });
    });

    // 5. FIXED: Size Chart Modal Trigger Event Delegation
    document.body.addEventListener("click", (e) => {
        if (e.target && e.target.classList.contains("size-chart-trigger")) {
            e.preventDefault();
            const sizeModal = document.getElementById("size-chart-modal");
            if (sizeModal) {
                sizeModal.classList.add("active");
            }
        }
    });

    // Close modal on outside backdrop click
    const sizeModal = document.getElementById("size-chart-modal");
    if (sizeModal) {
        sizeModal.addEventListener("click", (e) => {
            if (e.target === sizeModal) {
                closeSizeChart();
            }
        });
    }
});

// 6. Global Utility Functions
function switchUnit(event, unit) {
    const buttons = document.querySelectorAll(".unit-btn");
    buttons.forEach((btn) => btn.classList.remove("active"));
    event.currentTarget.classList.add("active");

    const cells = document.querySelectorAll(".size-table [data-in]");
    cells.forEach((cell) => {
        cell.textContent = cell.getAttribute(`data-${unit}`);
    });
}

function closeSizeChart() {
    const modal = document.getElementById("size-chart-modal");
    if (modal) {
        modal.classList.remove("active");
    }
}
