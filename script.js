/* ─────────────────────────────────────────────
   THEME TOGGLE
───────────────────────────────────────────── */
const root        = document.documentElement;
const themeButton = document.querySelector("[data-theme-toggle]");

let currentTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
root.setAttribute("data-theme", currentTheme);

if (themeButton) {
  themeButton.addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", currentTheme);
  });
}

/* ─────────────────────────────────────────────
   CURSOR AMBIENT GLOW
   Moves a large, blurred radial gradient to
   follow the mouse with a gentle lag.
───────────────────────────────────────────── */
const glow = document.getElementById("cursorGlow");

if (glow && window.matchMedia("(pointer: fine)").matches) {
  // Only run on devices that have a precise pointer (mouse / trackpad).
  // On touch-only devices the glow is hidden via CSS anyway.

  let mouseX = 0, mouseY = 0;
  let glowX  = 0, glowY  = 0;
  let visible = false;

  // Track raw cursor position
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!visible) {
      // Fade in on first move
      glow.style.opacity = "1";
      visible = true;
    }
  });

  // Hide when cursor leaves the window
  document.addEventListener("mouseleave", () => {
    glow.style.opacity = "0";
    visible = false;
  });

  // Smooth interpolation loop — eases the blob towards the cursor
  // Adjust the 0.08 factor to change how "sticky" the lag feels:
  //   lower = more lag / dreamier (try 0.04)
  //   higher = snappier / less lag (try 0.2)
  const LERP = 0.08;

  function lerp(a, b, t) { return a + (b - a) * t; }

  function tick() {
    glowX = lerp(glowX, mouseX, LERP);
    glowY = lerp(glowY, mouseY, LERP);

    glow.style.left = glowX + "px";
    glow.style.top  = glowY + "px";

    requestAnimationFrame(tick);
  }

  tick();
}

/* ─────────────────────────────────────────────
   MOBILE MENU
───────────────────────────────────────────── */
const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

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

/* ─────────────────────────────────────────────
   PROJECT EXPAND / COLLAPSE
───────────────────────────────────────────── */
document.querySelectorAll(".project-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const card     = button.closest(".project-card");
    const expanded = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!expanded));
    button.textContent = expanded ? "Read more" : "Show less";
    card.classList.toggle("open");
  });
});
