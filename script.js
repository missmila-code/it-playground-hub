const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const revealItems = document.querySelectorAll(
  ".hero-copy, .hero-panel, .section-heading, .class-card, .page-hero, .activity-card, .dashboard-card, .construction"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item, index) => {
    item.classList.add("reveal");
    item.style.transitionDelay = `${Math.min(index * 45, 220)}ms`;
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const unlockForm = document.querySelector("[data-unlock-form]");
const protectedContent = document.querySelector("[data-protected-content]");
const unlockMessage = document.querySelector("[data-unlock-message]");
const protectedPanel = document.querySelector("[data-protected-panel]");
const teacherPassword = "teacher-demo";

if (unlockForm && protectedContent && unlockMessage && protectedPanel) {
  unlockForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(unlockForm);
    const enteredPassword = String(formData.get("teacher-password") || "").trim();

    if (enteredPassword === teacherPassword) {
      protectedContent.hidden = false;
      unlockForm.hidden = true;
      unlockMessage.textContent = "Отключено.";
      unlockMessage.classList.add("success");
      protectedPanel.querySelector(".lock-badge").textContent = "Отключено";
      return;
    }

    unlockMessage.textContent = "Грешна парола. Опитай отново.";
    unlockMessage.classList.remove("success");
  });
}
