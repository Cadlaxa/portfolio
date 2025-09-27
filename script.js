document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.querySelector('.main-window');
    const navIcons = document.querySelectorAll('.icon-item[data-target]');
    const closeButtons = document.querySelectorAll('.close-btn');
    const MobileCloseButtons = document.querySelectorAll('.nav-bar');
    const modalContainers = document.querySelectorAll('.modal-container');
    const toggleModalBtn = document.querySelector('.toggle-modal-btn');
    let highestZIndex = 1000;
    let activeModal = null;

    document.addEventListener('contextmenu', function (event) {
        // Prevent the context menu from appearing
        event.preventDefault();
    });

    const element = document.querySelector('.cad-name-special');
    if (element) {
        const text = element.textContent;
        element.textContent = '';

        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.animationDelay = `${index * 0.1}s`;
            element.appendChild(span);
        });
    }

    // Select all link-item elements
    const linkItems = document.querySelectorAll('.link-item');
    linkItems.forEach(item => {
        item.addEventListener('click', () => {
            const url = item.dataset.link;
            if (url) {
                window.open(url, '_blank', 'noopener,noreferrer');
            }
        });
    });

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
                    navigator.vibrate([50, 150, 50])
                }
                toggleModalBtn.style.display = 'block';
                activeModal = targetModalContainer;
            }
        });
    });

    // --- Modal Closing and Reset ---
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const parentModalContainer = button.closest('.modal-container');
            if (window.innerWidth > 600) {
                closeButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const parentModalContainer = button.closest('.modal-container');
                        if (parentModalContainer) {
                            parentModalContainer.classList.remove('visible');
                        }
                        toggleModalBtn.style.display = 'none';
                        activeModal = null;
                    });
                });
            }

        });
    });

    MobileCloseButtons.forEach(button => {
        let startY1 = 0;
        let endY1 = 0;
        let moved = false;

        button.addEventListener('touchstart', e => {
            startY1 = e.touches[0].clientY;
            endY1 = startY1;
            moved = false;
        });

        button.addEventListener('touchmove', e => {
            endY1 = e.touches[0].clientY;
            moved = true; // mark that a move happened
        });

        button.addEventListener('touchend', () => {
            if (moved && startY1 - endY1 > 50) {
                const parentModalContainer = button.closest('.modal-container');
                if (parentModalContainer) {
                    parentModalContainer.classList.remove('visible');
                }
                navigator.vibrate([30])
                toggleModalBtn.style.display = 'none';
                activeModal = null;
            }
            startY1 = endY1 = 0;
            moved = false;
        });
    });

    // Reset window position and size after closing animation finishes
    modalContainers.forEach(container => {
        const modalWindow = container.querySelector('.modal-window');
        if (modalWindow) {
            modalWindow.addEventListener('transitionend', (e) => {
                if (e.propertyName === 'transform' && !container.classList.contains('visible')) {
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
        // This is the key fix. Check if the element is the close button and return early if it is.
        if (e.target.classList.contains('close-btn')) {
            return;
        }

        const handle = e.target.closest('.window-header.handle');
        if (!handle) return;

        e.preventDefault();

        activeDraggable = handle.closest('.modal-window, .nav-bar');
        if (!activeDraggable) return;

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

    if (window.innerWidth <= 768) {
        const allIconItems = document.querySelectorAll('.icon-item');
        allIconItems.forEach(item => {
            item.style.transform = 'none';
        });
    }

    // Function to handle the FAQ dropdown
    function setupFaqDropdown() {
        const faqQuestions = document.querySelectorAll('.faq-question');

        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const faqAnswer = faqItem.querySelector('.faq-answer');
                faqItem.classList.toggle('open');
                navigator.vibrate([20])
            });
        });
    }

    setupFaqDropdown();


    const faqIcon = document.getElementById('faq-icon');
    const faqModal = document.getElementById('faq-modal');

    if (faqIcon && faqModal) {
        faqIcon.addEventListener('click', () => {
            faqModal.classList.add('visible');
        });

        faqModal.querySelector('.close-btn').addEventListener('click', () => {
            faqModal.classList.remove('visible');
        });

        faqModal.addEventListener('click', (e) => {
            if (e.target === faqModal) {
                faqModal.classList.remove('visible');
            }
        });
    }

    const boat = document.querySelector('.boat');
    let boatLeft = 10;
    let isDragging = false;
    let startX1;
    let startBoatLeft;

    // --- Helper function to get the correct clientX from mouse or touch event ---
    function getClientX(e) {
        return e.touches ? e.touches[0].clientX : e.clientX;
    }

    // --- Start Dragging (Mouse or Touch) ---
    const startDrag = (e) => {
        isDragging = true;
        startX1 = getClientX(e);
        startBoatLeft = boatLeft;
        boat.style.cursor = 'grabbing';
        e.preventDefault();
    };

    // --- End Dragging (Mouse or Touch) ---
    const endDrag = () => {
        isDragging = false;
        boat.style.cursor = 'grab';
    };

    // --- Move Boat (Mouse or Touch) ---
    const moveBoat = (e) => {
        if (!isDragging) return;

        const mouseDeltaX = getClientX(e) - startX1;
        const newBoatLeft = startBoatLeft + (mouseDeltaX / window.innerWidth) * 100;

        // Boundary checks
        if (newBoatLeft >= 5 && newBoatLeft <= 60) {
            boatLeft = newBoatLeft;
            boat.style.left = `${boatLeft}vw`;
        }
    };

    // --- Add all event listeners ---
    window.addEventListener('keydown', (e) => {
        if (e.keyCode === 37 && boatLeft > 5) { // left arrow
            boatLeft = boatLeft - 5;
            boat.style.left = `${boatLeft}vw`;
        }

        if (e.keyCode === 39 && boatLeft < 60) { // right arrow
            boatLeft = boatLeft + 5;
            boat.style.left = `${boatLeft}vw`;
        }
    });

    // For Mouse
    boat.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', moveBoat);
    document.addEventListener('mouseup', endDrag);

    // For Touch
    boat.addEventListener('touchstart', startDrag);
    document.addEventListener('touchmove', moveBoat);
    document.addEventListener('touchend', endDrag);
    
    // navbar animation
    document.addEventListener("DOMContentLoaded", () => {
        const navBar = document.querySelector(".nav-bar");

        function triggerBounce() {
            void navBar.offsetWidth;

            const duration = 600 * 3; // 600ms * 3 loops = 1800ms
            const randomDelay = Math.random() * 7000 + 3000; // 3s–10s
            setTimeout(triggerBounce, duration + randomDelay);
        }

        setTimeout(triggerBounce, 4000);
    });

});