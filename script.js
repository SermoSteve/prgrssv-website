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

// Fixed category and categoryLabel alignments to match the UI
const productsData = [
    {
        id: 1,
        title: "CORE HEAVYWEIGHT TEE",
        category: "tops",
        chartType: "pump-cover",
        categoryLabel: "PUMP COVERS",
        imgFront: "2.jpg",
        imgBack: "b1.jpg",
        specs: ["(CLOTH TYPE)", "(GMS)", "(COLORS)"]
    },
    {
        id: 2,
        title: "UTILITY ATHLETIC SHORTS",
        category: "tops",
        chartType: "tank-top",
        categoryLabel: "TANK TOPS",
        imgFront: "3.jpg",
        imgBack: "b2.jpg",
        specs: ["(CLOTH TYPE)", "(GMS)", "(COLORS)"]
    },
    {
        id: 3,
        title: "COMPRESSION BASELAYER",
        category: "bottoms",
        chartType: "bottoms",
        categoryLabel: "BOTTOMS",
        imgFront: "4.jpg",
        imgBack: "b3.jpg",
        specs: ["(CLOTH TYPE)", "(GMS)", "(COLORS)"]
    }
];

// Map size chart tables dynamically for each product type
const sizeCharts = {
    'pump-cover': {
        title: 'PUMP COVER SIZE CHART',
        table: `
            <table class="size-table">
                <thead>
                    <tr><th>SIZE</th><th>CHEST</th><th>LENGTH</th><th>SHOULDER</th></tr>
                </thead>
                <tbody>
                    <tr><td>S</td><td data-in="40-42" data-cm="101-106">40-42</td><td data-in="29" data-cm="73">29</td><td data-in="20" data-cm="51">20</td></tr>
                    <tr><td>M</td><td data-in="42-44" data-cm="106-111">42-44</td><td data-in="30" data-cm="76">30</td><td data-in="21" data-cm="53">21</td></tr>
                    <tr><td>L</td><td data-in="44-46" data-cm="111-116">44-46</td><td data-in="31" data-cm="78">31</td><td data-in="22" data-cm="56">22</td></tr>
                    <tr><td>XL</td><td data-in="46-48" data-cm="116-121">46-48</td><td data-in="32" data-cm="81">32</td><td data-in="23" data-cm="58">23</td></tr>
                </tbody>
            </table>`
    },
    'tank-top': {
        title: 'TANK TOP SIZE CHART',
        table: `
            <table class="size-table">
                <thead>
                    <tr><th>SIZE</th><th>CHEST</th><th>LENGTH</th></tr>
                </thead>
                <tbody>
                    <tr><td>S</td><td data-in="36-38" data-cm="91-96">36-38</td><td data-in="28" data-cm="71">28</td></tr>
                    <tr><td>M</td><td data-in="38-40" data-cm="96-101">38-40</td><td data-in="29" data-cm="74">29</td></tr>
                    <tr><td>L</td><td data-in="40-42" data-cm="101-106">40-42</td><td data-in="30" data-cm="76">30</td></tr>
                    <tr><td>XL</td><td data-in="42-44" data-cm="106-111">42-44</td><td data-in="31" data-cm="79">31</td></tr>
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
                    <tr><td>S</td><td data-in="28-30" data-cm="71-76">28-30</td><td data-in="35-37" data-cm="89-94">35-37</td><td data-in="15" data-cm="38">15</td></tr>
                    <tr><td>M</td><td data-in="31-33" data-cm="79-84">31-33</td><td data-in="38-40" data-cm="97-102">38-40</td><td data-in="15.5" data-cm="39.5">15.5</td></tr>
                    <tr><td>L</td><td data-in="34-36" data-cm="86-91">34-36</td><td data-in="41-43" data-cm="104-109">41-43</td><td data-in="16" data-cm="41">16</td></tr>
                    <tr><td>XL</td><td data-in="37-39" data-cm="94-99">37-39</td><td data-in="44-46" data-cm="112-117">44-46</td><td data-in="16.5" data-cm="42">16.5</td></tr>
                </tbody>
            </table>`
    }
};

// ==========================================================================
// 2. DYNAMIC RENDER FUNCTIONS
// ==========================================================================

function renderCommunityShowcase() {
    const grid = document.getElementById('communityGrid');
    if (!grid) return;

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

function openSizeChart(chartType) {
    const modal = document.getElementById('size-chart-modal');
    const titleEl = document.getElementById('modal-chart-title');
    const containerEl = document.getElementById('size-table-container');

    const data = sizeCharts[chartType] || sizeCharts['pump-cover'];

    if (titleEl) titleEl.innerText = data.title;
    if (containerEl) containerEl.innerHTML = data.table;

    // Reset unit toggle buttons back to Inches by default when opening
    document.querySelectorAll('.unit-btn').forEach(btn => btn.classList.remove('active'));
    const defaultInchesBtn = document.querySelector('.unit-btn[onclick*="in"]');
    if (defaultInchesBtn) defaultInchesBtn.classList.add('active');

    if (modal) {
        modal.classList.remove('is-closing');
        modal.classList.add('is-active');
        modal.style.display = 'flex';
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
    evt.currentTarget.classList.add('active');

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
    
    // Attach close listener to all elements with class .modal-close
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
                    card.style.display = 'block';
                } else {
                    card.classList.add('is-hidden');
                    card.style.display = 'none';
                }
            });
        });
    });
});
