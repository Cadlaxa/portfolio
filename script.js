document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.querySelector('.main-window');
    const navIcons = document.querySelectorAll('.icon-item[data-target]');
    const closeButtons = document.querySelectorAll('.close-btn');
    const modalContainers = document.querySelectorAll('.modal-container');
    const toggleModalBtn = document.querySelector('.toggle-modal-btn');
    let highestZIndex = 1000;
    let activeModal = null; // Variable to store the currently active modal

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

    // --- Z-Index Management for Multiple Windows ---
    function bringToFront(modalWindow) {
        highestZIndex++;
        modalWindow.style.zIndex = highestZIndex;
    }

    // --- Modal Opening ---
    navIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const targetId = icon.dataset.target;
            const targetModalContainer = document.getElementById(targetId);
            if (targetModalContainer) {
                targetModalContainer.classList.add('visible');
                const targetModalWindow = targetModalContainer.querySelector('.modal-window');
                if (targetModalWindow) {
                    bringToFront(targetModalWindow);
                }
                // Show the floating button and set the active modal
                toggleModalBtn.style.display = 'block';
                activeModal = targetModalContainer;
            }
        });
    });

    // --- Modal Closing and Reset ---
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const parentModalContainer = button.closest('.modal-container');
            if (parentModalContainer) {
                parentModalContainer.classList.remove('visible');
            }
            // Hide the floating button
            toggleModalBtn.style.display = 'none';
            activeModal = null;
        });
    });

    // Reset window position and size after closing animation finishes
    modalContainers.forEach(container => {
        const modalWindow = container.querySelector('.modal-window');
        if (modalWindow) {
            modalWindow.addEventListener('transitionend', (e) => {
                // Check if the closing transition has finished
                if (e.propertyName === 'transform' && !container.classList.contains('visible')) {
                    // Reset position and size for next open
                    modalWindow.style.left = '';
                    modalWindow.style.top = '';
                    modalWindow.style.width = '';
                    modalWindow.style.height = '';
                }
            });
        }
    });

    // Handle clicks on modals to bring them to the front
    modalContainers.forEach(container => {
        container.addEventListener('mousedown', (e) => {
            const modalWindow = e.target.closest('.modal-window');
            if (modalWindow) {
                bringToFront(modalWindow);
            }
        });
    });

    // --- Floating Button Toggle Functionality ---
    toggleModalBtn.addEventListener('click', () => {
        if (activeModal) {
            activeModal.classList.toggle('visible');
            const icon = toggleModalBtn.querySelector('i');
            if (activeModal.classList.contains('visible')) {
                icon.classList.remove('fa-square-plus');
                icon.classList.add('fa-square-minus');
            } else {
                icon.classList.remove('fa-square-minus');
                icon.classList.add('fa-square-plus');
            }
        }
    });

    // --- Draggable Window Functionality ---
    let activeDraggable = null;
    let initialX, initialY;

    function dragStart(e) {
        const modalWindow = e.target.closest('.modal-window');
        if (!modalWindow || !e.target.classList.contains('handle')) return;

        e.preventDefault();

        activeDraggable = modalWindow;
        activeDraggable.classList.add('is-dragging');

        const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

        const rect = activeDraggable.getBoundingClientRect();
        initialX = clientX - rect.left;
        initialY = clientY - rect.top;

        activeDraggable.style.position = 'absolute';
        activeDraggable.style.left = `${rect.left}px`;
        activeDraggable.style.top = `${rect.top}px`;

        activeDraggable.style.cursor = 'grabbing';
        bringToFront(activeDraggable);
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

        const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

        const newX = clientX - initialX;
        const newY = clientY - initialY;

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
        const modalWindow = e.target.closest('.modal-window');
        if (!modalWindow || !e.target.classList.contains('resize-handle')) return;

        e.preventDefault();

        activeResizable = modalWindow;
        activeResizable.classList.add('is-resizing');

        const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

        startX = clientX;
        startY = clientY;
        startWidth = activeResizable.offsetWidth;
        startHeight = activeResizable.offsetHeight;

        activeResizable.style.cursor = 'nwse-resize';
        bringToFront(activeResizable);
    }

    function resizeEnd() {
        if (activeResizable) {
            activeResizable.classList.remove('is-resizing');
            activeResizable.style.cursor = 'grab';
            activeResizable = null;
        }
    }

    function resize(e) {
        if (!activeResizable) return;
        
        const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

        const width = startWidth + clientX - startX;
        const height = startHeight + clientY - startY;

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
    
    // Remove icon hover effects for mobile
    if (window.innerWidth <= 768) {
      const allIconItems = document.querySelectorAll('.icon-item');
      allIconItems.forEach(item => {
        item.style.transform = 'none';
      });
    }
});