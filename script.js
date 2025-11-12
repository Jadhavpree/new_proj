/* ========== Intersection animations (same logic, safe) ========== */
document.addEventListener("DOMContentLoaded", () => {
  const animatedItems = document.querySelectorAll(".fade-in, .slide-up, .zoom-in");
  const options = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        obs.unobserve(entry.target);
      }
    });
  }, options);

  animatedItems.forEach(item => observer.observe(item));

  /* ========== Scroll to top button ========== */
  const scrollBtn = document.getElementById("scrollTop");
  if (scrollBtn) {
    const toggleScrollBtn = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      scrollBtn.style.display = (scrollY > 250) ? "block" : "none";
    };
    window.addEventListener("scroll", toggleScrollBtn);
    toggleScrollBtn();
    scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ========== Mobile nav toggle ========== */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      navLinks.classList.toggle("show");
    });

    // close mobile nav when a link is clicked (improves UX)
    navLinks.addEventListener("click", (e) => {
      if (e.target.tagName === "A" && navLinks.classList.contains("show")) {
        navLinks.classList.remove("show");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ========== Theme toggle ========== */
  const themeBtn = document.getElementById("toggleTheme");
  if (themeBtn) {
    // restore saved theme
    const saved = localStorage.getItem("theme");
    if (saved === "light") document.body.classList.add("light-mode");

    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      const isLight = document.body.classList.contains("light-mode");
      themeBtn.setAttribute("aria-pressed", String(isLight));
      localStorage.setItem("theme", isLight ? "light" : "dark");
    });
  }

  // Avoid jump on reload (mobile)
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
});
