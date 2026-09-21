document.addEventListener('DOMContentLoaded', () => {
    const modalOverlay = document.querySelector('.modal-overlay');
    const closeBtn = document.querySelector('.modal-close');
    const sizeChartTriggers = document.querySelectorAll('.size-chart-trigger');

    // Function to open modal
    function openModal() {
        modalOverlay.classList.remove('is-closing');
        modalOverlay.classList.add('is-active');
        document.body.style.overflow = 'hidden'; // Prevents background scrolling
    }

    // Function to close modal with exit animation
    function closeModal() {
        if (!modalOverlay.classList.contains('is-active')) return;

        modalOverlay.classList.add('is-closing');
        
        // Wait for the exit animation duration (220ms) before hiding
        setTimeout(() => {
            modalOverlay.classList.remove('is-active');
            modalOverlay.classList.remove('is-closing');
            document.body.style.overflow = ''; // Restores background scrolling
        }, 220);
    }

    // Event Listeners for trigger buttons
    sizeChartTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    // Close button click
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close on overlay backdrop click
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('is-active')) {
            closeModal();
        }
    });
});
