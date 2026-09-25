export function initNavigation() {
  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".primary-nav");

  if (!header || !menuButton || !nav) return;

  const mobile = window.matchMedia("(max-width: 1023px)");
  const syncHeaderHeight = () => {
    document.documentElement.style.setProperty("--header-height", `${Math.ceil(header.getBoundingClientRect().height)}px`);
  };

  const setMenuOpen = (open) => {
    const expanded = open && mobile.matches;
    header.classList.toggle("menu-open", expanded);
    menuButton.setAttribute("aria-expanded", String(expanded));
    menuButton.setAttribute("aria-label", expanded ? "Fechar menu" : "Abrir menu");
    syncHeaderHeight();
  };

  menuButton.addEventListener("click", () => {
    setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
  });

  nav.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    setMenuOpen(false);
    const target = document.getElementById(link.hash.slice(1));
    const heading = target?.querySelector('[tabindex="-1"]');
    if (heading) requestAnimationFrame(() => heading.focus({ preventScroll: true }));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      menuButton.focus();
    }
  });

  mobile.addEventListener("change", () => setMenuOpen(false));
  window.addEventListener("resize", syncHeaderHeight);

  const updateScrollState = () => {
    const shouldShrink = window.scrollY > 16;
    if (header.classList.contains("is-scrolled") !== shouldShrink) {
      header.classList.toggle("is-scrolled", shouldShrink);
      syncHeaderHeight();
    }
  };
  window.addEventListener("scroll", updateScrollState, { passive: true });

  menuButton.hidden = false;
  document.documentElement.classList.add("has-js");
  updateScrollState();
  syncHeaderHeight();
  if ("ResizeObserver" in window) new ResizeObserver(syncHeaderHeight).observe(header);
}
