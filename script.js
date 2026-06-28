const root = document.documentElement;
const themeButton = document.querySelector("[data-theme-toggle]");
const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const toggles = document.querySelectorAll(".project-toggle");

let currentTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
root.setAttribute("data-theme", currentTheme);

if (themeButton) {
  themeButton.addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", currentTheme);
  });
}

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    mobileMenu.classList.toggle("open");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

toggles.forEach((button) => {
  const details = button.nextElementSibling;
  if (!details) return;

  const inner = document.createElement("div");
  inner.className = "project-details-inner";

  while (details.firstChild) {
    inner.appendChild(details.firstChild);
  }
  details.appendChild(inner);

  button.addEventListener("click", () => {
    const card = button.closest(".project-card");
    const expanded = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!expanded));
    button.textContent = expanded ? "Read more" : "Show less";
    card.classList.toggle("open");
  });
});
