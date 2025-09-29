const masterToggle = document.querySelector('.master-toggle');
const extraButtons = document.querySelector('.extra-buttons');
const masterIcon = masterToggle.querySelector('i');

// Load from cookies
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return "";
}

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}

// Restore state on load
window.addEventListener("DOMContentLoaded", () => {
  const saved = getCookie("extraButtons");

  if (saved) {
    // User has a saved preference
    if (saved === "show") {
      extraButtons.classList.add("show");
      masterIcon.classList.add("rotated");
    }
  } else {
    // No cookie set yet → apply defaults
    if (window.innerWidth >= 600) {
      // Desktop default = show
      extraButtons.classList.add("show");
      masterIcon.classList.add("rotated");
      setCookie("extraButtons", "show", 30);
    } else {
      // Mobile default = hide
      setCookie("extraButtons", "hide", 30);
    }
  }
});

masterToggle.addEventListener('click', () => {
  const isOpen = extraButtons.classList.toggle('show');
  masterIcon.classList.toggle('rotated', isOpen);

  // Save to cookie
  setCookie("extraButtons", isOpen ? "show" : "hide", 30);
});
