document.addEventListener('DOMContentLoaded', () => {
  // Global modal open function (used in inline onclick)
  window.openImageModal = function (imageSrc, projectTitle) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image-banner');
    const modalTitle = modal?.querySelector('.window-title');
    if (!modal || !modalImg) return;

    modalImg.src = imageSrc;
    if (modalTitle) {
      modalTitle.textContent = projectTitle || 'Project Banner';
    }
    navigator.vibrate([30])
    modal.classList.add('visible');
    document.body.style.overflow = 'hidden';
    tryShowModalMessage('image-modal');
  };

  // Close the image modal
  function closeImageModal() {
    const modal = document.getElementById('image-modal');
    if (modal) {
      modal.classList.remove('visible');
      document.body.style.overflow = 'auto';
    }
  }

  // Click outside to close (backdrop)
  const imageModal = document.getElementById('image-modal');
  if (imageModal) {
    imageModal.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        closeImageModal();
      }
    });
  }

  // Lazy loading setup
  const lazyObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-src');
        if (src) {
          img.src = src;
          img.onload = () => {
            img.removeAttribute('data-src');
            img.style.opacity = '1';
          };
        }
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '100px', // preload a bit before visible
    threshold: 0.1
  });

  // Load projects dynamically
  function loadProjects() {
    const container = document.getElementById('project-container');
    if (!container) {
      console.error("Project container not found.");
      return;
    }

    fetch('resources/projects/projects.json')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then(projects => {
        container.innerHTML = ''; // clear before rendering

        projects.forEach(project => {
          const projectItem = document.createElement('div');
          projectItem.className = 'project-item';

          // Secondary button (if available)
          let secondaryButtonHTML = '';
          if (project.secondaryLink && project.secondaryButtonText) {
            secondaryButtonHTML = `
              <br>
              <a href="${project.secondaryLink}" target="_blank" rel="noopener noreferrer">
                <button class="view-project-btn">${project.secondaryButtonText}</button>
              </a>`;
          }

          // Banner image — uses lazy loading via data-src
          let bannerHTML = '';
          if (project.banner) {
            const safeSrc = project.banner.replace(/'/g, "\\'");
            const safeTitle = project.title.replace(/'/g, "\\'");
            bannerHTML = `
              <div class="project-banner">
                <a class="banner-button" type="button" 
                        onclick="openImageModal('${safeSrc}', '${safeTitle}')"
                        aria-label="Open project banner">
                  <img class="banner-clickable" 
                       data-src="${project.banner}" 
                       alt="Project Banner"
                       style="opacity:0; transition:opacity 0.3s ease;">
                </a>
              </div>`;
          }

          // Full project card
          projectItem.innerHTML = `
            <div class="project-header">
              <h3 class="project-title">${project.title}</h3>
            </div>
            ${bannerHTML}
            <div class="project-description">
              <p>${project.description}</p>
            </div>
            <div class="project-footer">
              <a href="${project.link}" target="_blank" rel="noopener noreferrer">
                <button class="view-project-btn">${project.buttonText}</button>
              </a>
              ${secondaryButtonHTML}
            </div>
          `;

          container.appendChild(projectItem);
        });

        // Start observing all lazy images
        container.querySelectorAll('img[data-src]').forEach(img => lazyObserver.observe(img));

        // Re-attach hover/click sounds only once
        if (window.attachHoverListeners) {
          window.attachHoverListeners();
        }
      })
      .catch(e => {
        console.error('Error loading projects:', e);
        container.innerHTML = '<p>Unable to load projects.</p>';
      });
  }

  loadProjects();
});
