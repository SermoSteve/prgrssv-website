

// ==========================================================================
// 2. DYNAMIC RENDER FUNCTIONS
// ==========================================================================

function renderCommunityShowcase() {
    const grid = document.getElementById('communityGrid');
    if (!grid) return;

    grid.innerHTML = communityData.map(item => `
        <div class="showcase-card ${item.isFeatured ? 'featured-main' : ''}">
            <div class="showcase-img-wrap" onclick="openLightbox('${item.image}')">
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
                    <img src="${item.imgFront}" alt="${item.title} - Front" class="img-main" loading="lazy">
                    <img src="${item.imgBack}" alt="${item.title} - Back" class="img-hover" loading="lazy">
                </div>
                <div class="card-info">
                    <span class="category-tag">${item.categoryLabel}</span>
                    <h3>${item.title}</h3>
                    <ul class="specs-list">
                        ${specsHTML}
                    </ul>
                    <button type="button" class="size-chart-trigger" onclick="openSizeChart()">VIEW SIZE CHART</button>
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
        lightboxModal.style.display = 'flex';
        lightboxModal.classList.add('is-active');
    }
}

function closeLightbox() {
    const modal = document.getElementById("imageModal");
    if (modal) {
        modal.style.display = "none";
        modal.classList.remove('is-active');
    }
}

// ==========================================================================
// 4. SIZE CHART MODAL & UNIT FUNCTIONS
// ==========================================================================

function openSizeChart() {
    const modal = document.getElementById('size-chart-modal');
    if (modal) {
        modal.classList.remove('is-closing');
        modal.classList.add('is-active');
        modal.style.display = 'grid';
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
    // 1. Render Dynamic Components
    renderCommunityShowcase();
    renderCatalog();

    // 2. Formspree AJAX Submission Handler
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
                    alert('Thanks! Your message has been sent successfully.');
                    contactForm.reset();
                } else {
                    alert('Oops! There was a problem submitting your form.');
                }
            } catch (error) {
                alert('Oops! There was a network error sending your form.');
            } finally {
                if (submitBtn) submitBtn.disabled = false;
            }
        });
    }

    // 3. Size Chart & Lightbox Modal Close Triggers
    const sizeModal = document.getElementById('size-chart-modal');
    const imageModal = document.getElementById('imageModal');
    
    document.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            const targetModal = e.target.closest('.modal-overlay, .lightbox-modal');
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

    // 4. Global Escape Key Listener for Modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSizeChart();
            closeLightbox();
        }
    });

    // 5. FAQ Accordion Listener
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

    // 6. Mobile Hamburger Menu (Supports both ID and Class selectors)
    const hamburgerBtn = document.getElementById('hamburgerBtn') || document.querySelector('.hamburger-btn');
    const navLinks = document.getElementById('navLinks') || document.querySelector('.nav-links');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburgerBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        document.addEventListener('click', (e) => {
            if (!hamburgerBtn.contains(e.target) && !navLinks.contains(e.target)) {
                hamburgerBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // 7. Catalog Filter Functionality
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
