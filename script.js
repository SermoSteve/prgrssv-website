// ==========================================================================
// 1. DATA ARRAYS
// ==========================================================================
const productsData = [
    {
        id: 1,
        title: "PROGRESSIVE",
        category: "pump-covers",
        chartType: "pump-covers",
        categoryLabel: "PUMP COVERS",
        imgFront: "soon.jpg",
        imgBack: "soon.jpg",
        specs: ["(CLOTH TYPE)", "(GMS)", "COLORS"]
    },
    {
        id: 2,
        title: "COMING SOON",
        category: "tank-tops",
        chartType: "tank-tops",
        categoryLabel: "TANK TOPS",
        imgFront: "soon.jpg",
        imgBack: "soon.jpg",
        specs: ["(CLOTH TYPE)", "(GMS)", "(COLORS)"]
    },
    {
        id: 3,
        title: "COMING SOON",
        category: "bottoms",
        chartType: "bottoms",
        categoryLabel: "BOTTOMS",
        imgFront: "soon.jpg",
        imgBack: "soon.jpg",
        specs: ["(CLOTH TYPE)", "(GMS)", "(COLORS)"]
    }
];

const sizeCharts = {
    'pump-covers': {
        title: 'PUMP COVER SIZE CHART',
        table: `
            <table class="size-table">
                <thead>
                    <tr><th>SIZE</th><th>CHEST</th><th>LENGTH</th><th>SHOULDER</th></tr>
                </thead>
                <tbody>
                    <tr><td>S</td><td data-in="N/A" data-cm="N/A">N/A</td><td data-in="N/A" data-cm="N/A">N/A</td><td data-in="N/A" data-cm="N/A">N/A</td></tr>
                    <tr><td>M</td><td data-in="N/A" data-cm="N/A">N/A</td><td data-in="N/A" data-cm="N/A">N/A</td><td data-in="N/A" data-cm="N/A">N/A</td></tr>
                    <tr><td>L</td><td data-in="N/A" data-cm="N/A">N/A</td><td data-in="N/A" data-cm="N/A">N/A</td><td data-in="N/A" data-cm="N/A">N/A</td></tr>
                    <tr><td>XL</td><td data-in="N/A" data-cm="N/A">N/A</td><td data-in="N/A" data-cm="N/A">N/A</td><td data-in="N/A" data-cm="N/A">N/A</td></tr>
                </tbody>
            </table>`
    },
    'tank-tops': {
        title: 'TANK TOP SIZE CHART',
        table: `
            <table class="size-table">
                <thead>
                    <tr><th>SIZE</th><th>CHEST</th><th>LENGTH</th></tr>
                </thead>
                <tbody>
                    <tr><td>S</td><td data-in="N/A" data-cm="N/A">N/A</td><td data-in="N/A" data-cm="N/A">N/A</td></tr>
                    <tr><td>M</td><td data-in="N/A" data-cm="N/A">N/A</td><td data-in="N/A" data-cm="N/A">N/A</td></tr>
                    <tr><td>L</td><td data-in="N/A" data-cm="N/A">N/A</td><td data-in="N/A" data-cm="N/A">N/A</td></tr>
                    <tr><td>XL</td><td data-in="N/A" data-cm="N/A">N/A</td><td data-in="N/A" data-cm="N/A">N/A</td></tr>
                </tbody>
            </table>`
    },
    'bottoms': {
        title: 'BOTTOMS SIZE CHART',
        table: `
            <table class="size-table">
                <thead>
                    <tr><th>SIZE</th><th>WAIST</th><th>HIP</th><th>LENGTH</th></tr>
                </thead>
                <tbody>
                    <tr><td>S</td><td data-in="N/A" data-cm="N/A">N/A</td><td data-in="N/A" data-cm="N/A">N/A</td><td data-in="N/A" data-cm="N/A">N/A</td></tr>
                    <tr><td>M</td><td data-in="N/A" data-cm="N/A">N/A</td><td data-in="N/A" data-cm="N/A">N/A</td><td data-in="N/A" data-cm="N/A">N/A</td></tr>
                    <tr><td>L</td><td data-in="N/A" data-cm="N/A">N/A</td><td data-in="N/A" data-cm="N/A">N/A</td><td data-in="N/A" data-cm="N/A">N/A</td></tr>
                    <tr><td>XL</td><td data-in="N/A" data-cm="N/A">N/A</td><td data-in="N/A" data-cm="N/A">N/A</td><td data-in="N/A" data-cm="N/A">N/A</td></tr>
                </tbody>
            </table>`
    }
};

// ==========================================================================
// 2. DYNAMIC RENDER FUNCTIONS
// ==========================================================================

function renderCommunityShowcase() {
    const grid = document.getElementById('communityGrid');
    if (!grid || typeof communityData === 'undefined') return;

    grid.innerHTML = communityData.map(item => `
        <div class="showcase-card ${item.isFeatured ? 'featured-main' : ''}">
            <div class="showcase-img-wrap">
                <img src="${item.image}" alt="PRGRSSV Community Feature ${item.id}" class="showcase-img" loading="lazy">
            </div>
            <div class="spotlight-badge">
                <span class="spotlight-badge-label">${item.tag}</span>
                <span class="spotlight-handle">${item.handle}</span>
                <span class="spotlight-outfit">${item.outfit}</span>
            </div>
        </div>
    `).join('');
}

function renderCatalog() {
    const grid = document.getElementById('catalogGrid');
    if (!grid) return;

    grid.innerHTML = productsData.map(item => {
        const specsHTML = item.specs.map(spec => `<li>${spec}</li>`).join('');
        return `
            <div class="catalog-card" data-category="${item.category}">
                <div class="card-image-wrap">
                    <img src="${item.imgFront}" alt="${item.title} - Front" class="img-primary" loading="lazy">
                    <img src="${item.imgBack}" alt="${item.title} - Back" class="img-hover" loading="lazy">
                </div>
                <div class="card-info">
                    <span class="category-tag">${item.categoryLabel}</span>
                    <h3>${item.title}</h3>
                    <ul class="specs-list">
                        ${specsHTML}
                    </ul>
                    <button type="button" class="size-chart-trigger" onclick="openSizeChart('${item.chartType}')">VIEW SIZE CHART</button>
                </div>
            </div>
        `;
    }).join('');
}

// ==========================================================================
// 3. LIGHTBOX FUNCTIONS
// ==========================================================================

function openLightbox(imageSrc) {
    const lightboxModal = document.getElementById('imageModal');
    const lightboxImage = document.getElementById('expandedImg');

    if (lightboxModal && lightboxImage) {
        lightboxImage.src = imageSrc;
        lightboxModal.style.position = 'fixed';
        lightboxModal.style.top = '0';
        lightboxModal.style.left = '0';
        lightboxModal.style.display = 'flex';
        lightboxModal.classList.add('is-active');
        document.body.classList.add('modal-open');
    }
}

function closeLightbox() {
    const modal = document.getElementById("imageModal");
    if (modal) {
        modal.style.display = "none";
        modal.classList.remove('is-active');
        document.body.classList.remove('modal-open');
    }
}

// ==========================================================================
// 4. SIZE CHART & CUSTOM THEME MODAL FUNCTIONS
// ==========================================================================

function openCustomModal(title, message) {
    const modal = document.getElementById('custom-modal');
    if (!modal) return;
    
    const titleEl = modal.querySelector('.modal-title');
    const messageEl = modal.querySelector('.modal-message');

    if (titleEl) titleEl.innerText = title;
    if (messageEl) messageEl.innerText = message;

    // Force viewport locking via inline styles
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.display = 'flex';
    modal.style.zIndex = '999999';

    modal.classList.add('active');
    document.body.classList.add('modal-open');
}

function closeCustomModal() {
    const modal = document.getElementById('custom-modal');
    if (modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
}

function openSizeChart(chartType) {
    const modal = document.getElementById('size-chart-modal');
    const titleEl = document.getElementById('modal-chart-title');
    const containerEl = document.getElementById('size-table-container');

    const data = sizeCharts[chartType] || sizeCharts['pump-covers'];

    if (titleEl) titleEl.innerText = data.title;
    if (containerEl) containerEl.innerHTML = data.table;

    document.querySelectorAll('.unit-btn').forEach(btn => btn.classList.remove('active'));
    const defaultInchesBtn = document.querySelector('.unit-btn[onclick*="in"]');
    if (defaultInchesBtn) defaultInchesBtn.classList.add('active');

    if (modal) {
        modal.classList.remove('is-closing');
        
        // Force absolute viewport locking to current screen position
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.display = 'flex';
        modal.style.zIndex = '999999';

        modal.classList.add('is-active');
        document.body.classList.add('modal-open');
    }
}

function closeSizeChart() {
    const modal = document.getElementById('size-chart-modal');
    if (modal) {
        modal.classList.add('is-closing');
        modal.classList.remove('is-active');

        setTimeout(() => {
            modal.classList.remove('is-closing');
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }, 220);
    }
}

function switchUnit(evt, unit) {
    document.querySelectorAll('.unit-btn').forEach(btn => btn.classList.remove('active'));
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add('active');
    }

    const tableCells = document.querySelectorAll('.size-table tbody td[data-in]');
    tableCells.forEach(cell => {
        if (unit === 'cm') {
            cell.textContent = cell.getAttribute('data-cm');
        } else {
            cell.textContent = cell.getAttribute('data-in');
        }
    });
}

// ==========================================================================
// 5. INITIALIZATION & EVENT LISTENERS
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Render Dynamic Components
    if (typeof renderCommunityShowcase === 'function') renderCommunityShowcase();
    if (typeof renderCatalog === 'function') renderCatalog();

    // Formspree AJAX Submission Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) submitBtn.disabled = true;

            const formData = new FormData(contactForm);
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    openCustomModal('THANK YOU!', 'We’ll keep you posted on our next release.');
                    contactForm.reset();
                } else {
                    openCustomModal('ERROR', 'Oops! There was a problem submitting your form.');
                }
            } catch (error) {
                openCustomModal('ERROR', 'Oops! There was a network error sending your form.');
            } finally {
                if (submitBtn) submitBtn.disabled = false;
            }
        });
    }

    // Global click delegation
    document.addEventListener('click', (e) => {
        if (e.target.closest('#modal-close-btn')) {
            closeCustomModal();
        }
        
        if (e.target.id === 'custom-modal') {
            closeCustomModal();
        }
    });

    // Size Chart & Lightbox Modal Close Triggers
    const sizeModal = document.getElementById('size-chart-modal');
    const imageModal = document.getElementById('imageModal');
    
    document.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            const targetModal = e.target.closest('.modal-overlay');
            if (targetModal && targetModal.id === 'size-chart-modal') {
                closeSizeChart();
            } else {
                closeLightbox();
            }
        });
    });

    if (sizeModal) {
        sizeModal.addEventListener('click', (e) => {
            if (e.target === sizeModal) {
                closeSizeChart();
            }
        });
    }

    if (imageModal) {
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal || e.target.classList.contains('lightbox-close')) {
                closeLightbox();
            }
        });
    }

    // Global Escape Key Listener
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSizeChart();
            closeLightbox();
            closeCustomModal();
        }
    });

    // FAQ Accordion Listener
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;
            const answer = button.nextElementSibling;
            const isActive = faqItem.classList.contains('active');

            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                const itemAnswer = item.querySelector('.faq-answer');
                if (itemAnswer) itemAnswer.style.maxHeight = null;
            });

            if (!isActive) {
                faqItem.classList.add('active');
                if (answer) answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // Mobile Hamburger Menu
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

    // Catalog Filter
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
                    card.style.display = 'block';
                } else {
                    card.classList.add('is-hidden');
                    card.style.display = 'none';
                }
            });
        });
    });
});
