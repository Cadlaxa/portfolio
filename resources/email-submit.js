document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const submitModal = document.getElementById("submit-modal");
  const errorModal = document.getElementById("error-modal");
  const errorMessageBox = errorModal.querySelector(".error-message");
  const closeButtons = document.querySelectorAll(".close-btn");

  // Initialize EmailJS
  emailjs.init("KK-n3Gc61dVOEZLaF");

  if (!form) {
    console.error("Form with id 'contact-form' not found.");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: form.name.value,
      email: form.email.value,
      subject: form.subject.value,
      message: form.message.value
    };

    try {
      const response = await emailjs.send("service_qxlfswp", "template_p7mvspm", {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message
      });

      if (response.status === 200) {
        submitModal.classList.add("visible");
        navigator.vibrate?.([50, 150, 50]);
        form.reset();
      } else {
        showError(`Unexpected response from server: ${response.status}`);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      showError(
        error?.text ||
        error?.message ||
        "Failed to send message. Check your connection"
      );
    }
  });

  function showError(message) {
    errorMessageBox.textContent = message;
    errorModal.classList.add("visible");
    navigator.vibrate?.([50, 150, 50]);
  }

  // Close modals when clicking the × button
  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest(".modal-container").classList.remove("visible");
    });
  });

  // Optional: close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === submitModal || e.target === errorModal) {
      e.target.classList.remove("visible");
    }
  });
});
