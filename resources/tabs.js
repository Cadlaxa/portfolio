const tabButtons = document.querySelectorAll('.tab-btn');
const sections = document.querySelectorAll('.tab-content');

function loadTab(sectionId) {
  const section = document.getElementById(sectionId);

  // Prevent reloading if already loaded
  if (section.dataset.loaded === "true") return;

  const template = document.getElementById(`${sectionId}-template`);
  if (!template) return;

  section.innerHTML = template.innerHTML;
  section.dataset.loaded = "true";

  if (sectionId === "edits-sec") {
    loadEdits();
  }
  if (sectionId === "codes-sec") {
    loadProjects?.(); // Optional if you have a projects.js loader
  }
}

// =============================
// Load Instagram Edits Section
// =============================
function loadEdits() {
  const container = document.getElementById("edits-container");
  if (!container) return;

  fetch("resources/projects/edits.json")
    .then(res => res.json())
    .then(edits => {
      container.innerHTML = "";

      edits.forEach(edit => {
        const div = document.createElement("div");
        div.classList.add("edit-item");

        div.innerHTML = `
          <div class="img-banner">
            <blockquote class="instagram-media"
                        data-instgrm-permalink="${edit.link}"
                        data-instgrm-version="14"
                        style="background:#ffa60000; margin:auto; width:10%; border-radius:3px; padding:30; box-shadow:none; max-width:540px; min-width:326px; ">
            </blockquote>
          </div>
          <div class="project-footer">
            <a href="${edit.link}" target="_blank">
              <button class="view-project-btn">${edit.buttonText || "View Post"}</button>
            </a>
          </div>
        `;

        container.appendChild(div);
      });

      // Initialize Instagram embeds
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      } else {
        const script = document.createElement("script");
        script.src = "https://www.instagram.com/embed.js";
        script.async = true;
        document.body.appendChild(script);
      }
    })
    .catch(err => console.error("Error loading edits:", err));
}

// =============================
// Tab button click handling
// =============================
tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.target;

    tabButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    sections.forEach(sec => sec.classList.remove("active"));
    document.getElementById(target).classList.add("active");

    loadTab(target);
  });
});

// Load default tab on page load
loadTab("codes-sec");
