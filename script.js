// --- LIGHTBOX FUNCTIONS ---
function openLightbox(imageSrc) {
    const lightboxModal = document.getElementById('imageModal');
    const lightboxImage = document.getElementById('expandedImg');

    if (lightboxModal && lightboxImage) {
        lightboxImage.src = imageSrc;
        lightboxModal.style.display = 'flex';
    }
}

function closeLightbox() {
    const modal = document.getElementById("imageModal");
    if (modal) {
        modal.style.display = "none";
    }
}

// --- SIZE CHART MODAL FUNCTIONS ---
function openSizeChart() {
    const modal = document.getElementById('size-chart-modal');
    if (modal) {
        modal.classList.add('is-active');
        document.body.style.overflow = 'hidden';
    }
}

function closeSizeChart() {
    const modal = document.getElementById('size-chart-modal');
    if (modal) {
        modal.classList.remove('is-active');
        document.body.style.overflow = '';
    }
}

function closeSizeChartOnOverlay(event) {
    if (event.target.id === 'size-chart-modal') {
        closeSizeChart();
    }
}

function switchUnit(evt, unit) {
    document.querySelectorAll('.unit-btn').forEach(btn => btn.classList.remove('active'));
    evt.target.classList.add('active');

    const tableCells = document.querySelectorAll('.size-table tbody td[data-in]');
    tableCells.forEach(cell => {
        if (unit === 'cm') {
            cell.textContent = cell.getAttribute('data-cm');
        } else {
            cell.textContent = cell.getAttribute('data-in');
        }
    });
}

// --- FAQ ACCORDION ---
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const answer = button.nextElementSibling;
        const isActive = faqItem.classList.contains('active');

        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.faq-answer').style.maxHeight = null;
        });

        if (!isActive) {
            faqItem.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });
});

// --- MOBILE HAMBURGER MENU ---
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navLinks = document.getElementById('navLinks');

if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// --- CATALOG FILTER FUNCTIONALITY ---
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const selectedCategory = button.getAttribute('data-category');
        const cards = document.querySelectorAll('.catalog-card');

        cards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');

            if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                card.classList.remove('is-hidden');
            } else {
                card.classList.add('is-hidden');
            }
        });
    });
});
