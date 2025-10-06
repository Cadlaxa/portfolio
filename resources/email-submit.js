document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const submitModal = document.getElementById("submit-modal");

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
        // Show submitted modal
        submitModal.classList.add("visible"); // Add a "visible" or "show" class
        navigator.vibrate?.([50, 150, 50]);
        form.reset();
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send message. Check your connection or EmailJS settings.");
    }
  });

  // Optional: close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === submitModal) {
      submitModal.style.display = "none";
    }
  });
});
