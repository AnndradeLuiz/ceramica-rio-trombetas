// Módulo de Animações Discretas e Revelação por Scroll (SPEC §§8.1, 23, 24, 34 e §35.26)
// Progressive enhancement: todo o conteúdo permanece 100% visível se JS ou observer falhar.

/**
 * Inicializa animações discretas via IntersectionObserver.
 * Não ativa movimento se o usuário preferir redução de movimento (prefers-reduced-motion).
 */
export function initAnimations() {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return;
  }

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (motionQuery.matches) {
    return;
  }

  // Elementos elegíveis para revelação suave ao rolar
  const targets = document.querySelectorAll(
    ".about, .catalog, .quality-notice, .quotation-app, .delivery-card, .location-card, .contact-card"
  );

  if (targets.length === 0) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  targets.forEach((target) => {
    target.classList.add("reveal-element");
    observer.observe(target);
  });
}
