function loadProjects() {
    const container = document.getElementById('project-container');
    
    if (!container) {
        console.error("Project container element not found. Please ensure the target HTML element has the ID 'project-container'.");
        return;
    }
    
    fetch('resources/projects/projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(projects => {
            
            projects.forEach(project => {
                const projectItem = document.createElement('div');
                projectItem.className = 'project-item';
                let secondaryButtonHTML = '';
                if (project.secondaryLink && project.secondaryButtonText) {
                    
                    secondaryButtonHTML = `
                        <br>
                        <a href="${project.secondaryLink}" target="_blank" rel="noopener noreferrer">
                            <button class="view-project-btn">${project.secondaryButtonText}</button>
                        </a>
                    `;
                }
                
                projectItem.innerHTML = `
                    <div class="project-header">
                        <h3 class="project-title">${project.title}</h3>
                    </div>
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
        })
        .catch(e => {
            
            console.error('Error loading projects:', e);
            container.innerHTML = '<p>Sorry, projects could not be loaded at this time. Please check the console for details.</p>';
        });
}
document.addEventListener('DOMContentLoaded', loadProjects);