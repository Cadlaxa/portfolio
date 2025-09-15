document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.querySelector('.main-window');
    const navIcons = document.querySelectorAll('.icon-item[data-target]');
    const closeButtons = document.querySelectorAll('.close-btn');
    const modalContainers = document.querySelectorAll('.modal-container');

    // --- General Setup ---
    function applyFloatAnimation() {
        if (window.innerWidth > 768) {
            mainContainer.style.animationPlayState = 'running';
        } else {
            mainContainer.style.animationPlayState = 'paused';
            mainContainer.style.transform = 'none';
        }
    }

    window.addEventListener('resize', applyFloatAnimation);
    applyFloatAnimation();

    // --- Modal Opening ---
    navIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const targetId = icon.dataset.target;
            const targetModalContainer = document.getElementById(targetId);
            if (targetModalContainer) {
                targetModalContainer.classList.add('visible');
                // CSS handles the zoom-in animation by applying 'transform: scale(1)'
            }
        });
    });

    // --- Modal Closing ---
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const parentModalContainer = button.closest('.modal-container');
            if (parentModalContainer) {
                parentModalContainer.classList.remove('visible'); // Triggers CSS transition to scale(0.8)
            }
        });
    });

    // Close modal by clicking outside
    modalContainers.forEach(container => {
        container.addEventListener('click', (e) => {
            if (e.target === container) { // Check if click was directly on the overlay
                container.classList.remove('visible');
            }
        });
    });

    // --- Icon Hover Effects ---
    const allIconItems = document.querySelectorAll('.icon-item');
    allIconItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            item.style.transform = 'translateY(-8px) scale(1.05)';
        });
        item.addEventListener('mouseout', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });

    // --- Draggable Window Functionality ---
    let activeDraggable = null;
    let initialX, initialY;
    let xOffset = 0, yOffset = 0;

    function dragStart(e) {
        if (window.innerWidth <= 768) return; // Disable dragging on mobile

        const modalWindow = e.target.closest('.modal-window');
        if (!modalWindow || !e.target.classList.contains('handle')) return;

        activeDraggable = modalWindow;
        activeDraggable.classList.add('is-dragging');

        // Position the modal using top/left for dragging, instead of transform
        const rect = activeDraggable.getBoundingClientRect();
        activeDraggable.style.left = `${rect.left}px`;
        activeDraggable.style.top = `${rect.top}px`;
        initialX = e.clientX - rect.left;
        initialY = e.clientY - rect.top;

        activeDraggable.style.cursor = 'grabbing';
    }

    function dragEnd() {
        if (activeDraggable) {
            activeDraggable.classList.remove('is-dragging');
            activeDraggable.style.cursor = 'grab';
            activeDraggable = null;
        }
    }

    function drag(e) {
        if (!activeDraggable) return;
        e.preventDefault();

        const currentX = e.clientX;
        const currentY = e.clientY;

        const newX = currentX - initialX;
        const newY = currentY - initialY;

        activeDraggable.style.left = `${newX}px`;
        activeDraggable.style.top = `${newY}px`;
    }

    document.querySelectorAll('.modal-window .window-header').forEach(handle => {
        handle.classList.add('handle');
        handle.addEventListener('mousedown', dragStart);
        handle.addEventListener('touchstart', dragStart);
    });

    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('touchend', dragEnd);
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);

    // --- Resizable Window Functionality ---
    let activeResizable = null;
    let startX, startY, startWidth, startHeight;

    function resizeStart(e) {
        if (window.innerWidth <= 768) return; // Disable resizing on mobile

        const modalWindow = e.target.closest('.modal-window');
        if (!modalWindow || !e.target.classList.contains('resize-handle')) return;

        activeResizable = modalWindow;
        activeResizable.classList.add('is-resizing');

        startX = e.clientX;
        startY = e.clientY;
        startWidth = activeResizable.offsetWidth;
        startHeight = activeResizable.offsetHeight;

        activeResizable.style.cursor = 'nwse-resize';
    }

    function resizeEnd() {
        if (activeResizable) {
            activeResizable.classList.remove('is-resizing');
            activeResizable.style.cursor = 'grab'; // Revert to grab cursor if it was dragging
            activeResizable = null;
        }
    }

    function resize(e) {
        if (!activeResizable) return;
        e.preventDefault();

        const width = startWidth + e.clientX - startX;
        const height = startHeight + e.clientY - startY;

        // Set minimum dimensions to prevent modals from becoming too small
        const minWidth = 300;
        const minHeight = 200;

        activeResizable.style.width = `${Math.max(minWidth, width)}px`;
        activeResizable.style.height = `${Math.max(minHeight, height)}px`;
    }

    document.querySelectorAll('.modal-window .resize-handle').forEach(handle => {
        handle.addEventListener('mousedown', resizeStart);
        handle.addEventListener('touchstart', resizeStart);
    });

    document.addEventListener('mouseup', resizeEnd);
    document.addEventListener('touchend', resizeEnd);
    document.addEventListener('mousemove', resize);
    document.addEventListener('touchmove', resize);
});