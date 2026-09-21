// ==========================================================================
// 1. DATA ARRAYS
// ==========================================================================

const communityData = [
    {
        id: 1,
        image: "1.jpg",
        tag: "OUTFIT OF THE MONTH",
        handle: "@MARCUS_FIT",
        outfit: "CORE OVERSIZED TEE + UTILITY SHORTS",
        isFeatured: true
    },
    {
        id: 2,
        image: "2.jpg",
        tag: "SPOTLIGHT",
        handle: "@ALEX_TRAINS",
        outfit: "PROGRESSION HOODIE",
        isFeatured: false
    },
    {
        id: 3,
        image: "3.jpg",
        tag: "SPOTLIGHT",
        handle: "@JORDAN_LIFTS",
        outfit: "HYBRID ATHLETIC TANK",
        isFeatured: false
    },
    {
        id: 4,
        image: "4.jpg",
        tag: "SPOTLIGHT",
        handle: "@DEVON_RUNS",
        outfit: "CORE HEAVYWEIGHT TEE",
        isFeatured: false
    },
    {
        id: 5,
        image: "5.jpg",
        tag: "SPOTLIGHT",
        handle: "@KAI_HYBRID",
        outfit: "TRAINING UTILITY SHORTS",
        isFeatured: false
    }
];

const productsData = [
    {
        id: 1,
        category: "tops",
        categoryLabel: "Core Tops",
        title: "Baaaaanggg!!!",
        imgFront: "2.jpg",
        imgBack: "2-back.jpg",
        specs: ["JAY"]
    },
    {
        id: 2,
        category: "bottoms",
        categoryLabel: "Bottoms",
        title: "3 Idiots",
        imgFront: "3.jpg",
        imgBack: "3-back.jpg",
        specs: ["Jay", "OJ", "Steve"]
    },
    {
        id: 3,
        category: "baselayers",
        categoryLabel: "Base Layers",
        title: "Ang Talaaaap",
        imgFront: "4.jpg",
        imgBack: "4-back.jpg",
        specs: ["Roldan", "OJ", "Steve"]
    }
];

// ==========================================================================
// 2. DYNAMIC RENDER FUNCTIONS
// ==========================================================================

function renderCommunityShowcase() {
    const grid = document.getElementById('communityGrid');
    if (!grid) return;

    grid.innerHTML = communityData.map(item => `
        <div class="showcase-card ${item.isFeatured ? 'featured-main' : ''}">
            <img src="${item.image}" alt="PRGRSSV Community Feature ${item.id}" class="showcase-img" onclick="openLightbox('${item.image}')">
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
                    <img src="${item.imgFront}" alt="${item.title} - Front" class="img-primary" onclick="openLightbox('${item.imgFront}')">
                    <img src="${item.imgBack}" alt="${item.title} - Back" class="img-hover" onclick="openLightbox('${item.imgBack}')">
                </div>
                <div class="card-info">
                    <span class="category-tag">${item.categoryLabel}</span>
                    <h3>${item.title}</h3>
                    <ul class="specs-list">
                        ${specsHTML}
                    </ul>
                    <button class="size-chart-trigger" onclick="openSizeChart()">VIEW SIZE CHART</button>
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
        document.body.classList.add('modal-open');
    }
}

function closeLightbox() {
    const modal = document.getElementById("imageModal");
    if (modal) {
        modal.style.display = "none";
        document.body.classList.remove('modal-open');
    }
}

// ==========================================================================
// 4. SIZE CHART MODAL & UNIT FUNCTIONS
// ==========================================================================

function openSizeChart() {
    const modal = document.getElementById('size-chart-modal') || document.querySelector('.modal-overlay');
    if (modal) {
        modal.classList.remove('is-closing');
        modal.classList.add('is-active');
        document.body.classList.add('modal-open');
    }
}

function closeSizeChart() {
    const modal = document.getElementById('size-chart-modal') || document.querySelector('.modal-overlay');
    if (modal) {
        modal.classList.add('is-closing');
        modal.classList.remove('is-active');
        document.body.classList.remove('modal-open');

        setTimeout(() => {
            modal.classList.remove('is-closing');
        }, 220);
    }
}

function switchUnit(evt, unit) {
    document.querySelectorAll('.unit-btn').forEach(btn => btn.classList.remove('active'));
    evt.currentTarget.classList.add('active'); // Fixed target issue

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
            }
        });
    }

    // 3. Size Chart Modal Close Triggers
    const sizeModal = document.getElementById('size-chart-modal') || document.querySelector('.modal-overlay');
    const closeBtn = document.querySelector('.modal-close');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeSizeChart);
    }

    if (sizeModal) {
        sizeModal.addEventListener('click', (e) => {
            if (e.target === sizeModal) {
                closeSizeChart();
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

    // 6. Mobile Hamburger Menu
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
                } else {
                    card.classList.add('is-hidden');
                }
            });
        });
    });
});
/* ==========================================================================
   DROP SECTION & CONTACT FORM STYLES
   ========================================================================== */

.drop-section {
    position: relative;
    background-color: #0a0a0a;
    padding: 80px 20px;
    overflow: hidden;
    color: #ffffff;
    width: 100%;
}

.watermark-bg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 18vw;
    font-weight: 900;
    color: rgba(255, 255, 255, 0.02);
    letter-spacing: 0.1em;
    user-select: none;
    pointer-events: none;
    white-space: nowrap;
}

.drop-container {
    position: relative;
    z-index: 2;
    max-width: 680px;
    margin: 0 auto;
    text-align: center;
}

.drop-title {
    font-size: 2.25rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 12px;
    color: #ffffff;
}

.drop-subtitle {
    color: #a1a1aa;
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 40px;
}

/* Contact Form Layout */
.contact-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    text-align: left;
    margin-bottom: 40px;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.input-group label {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #888888;
    text-transform: uppercase;
    display: block;
}

/* Base Form Input Styling */
.input-group input,
.input-group textarea {
    width: 100%;
    box-sizing: border-box;
    background-color: #121212;
    border: 1px solid #262626;
    border-radius: 4px;
    padding: 14px 16px;
    color: #ffffff;
    font-size: 0.95rem;
    font-family: inherit;
    outline: none;
    transition: border-color 0.2s ease, background-color 0.2s ease;
}

.input-group input:focus,
.input-group textarea:focus {
    border-color: #ffffff;
    background-color: #161616;
}

.input-group textarea {
    resize: vertical;
    min-height: 120px;
}

/* Submit Button */
.submit-btn {
    width: 100%;
    padding: 16px;
    background-color: #ffffff;
    color: #000000;
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.1s ease;
    margin-top: 10px;
}

.submit-btn:hover {
    background-color: #e4e4e7;
}

.submit-btn:active {
    transform: scale(0.99);
}

/* Direct Inquiries & Social Links Container */
.contact-direct {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
}

.contact-direct p {
    color: #a1a1aa;
    font-size: 0.9rem;
}

.contact-link {
    color: #ffffff;
    text-decoration: underline;
}

.socials-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
}

.socials-label {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #888888;
    text-transform: uppercase;
}

.social-icons {
    display: flex;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
}

.social-icon {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px;
    background-color: #121212;
    border: 1px solid #262626;
    border-radius: 6px;
    color: #ffffff;
    text-decoration: none;
    font-size: 0.85rem;
    font-weight: 600;
    transition: background-color 0.2s ease, border-color 0.2s ease;
}

.social-icon:hover {
    background-color: #1e1e1e;
    border-color: #404040;
}

/* Mobile Responsiveness */
@media (max-width: 600px) {
    .form-row {
        grid-template-columns: 1fr;
    }
}
