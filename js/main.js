// TechnoServices — interactions front (JavaScript vanilla)

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("mainNav");
  const backTop = document.getElementById("backToTop");

  // Navbar opaque + bouton "haut de page" au défilement
  const onScroll = () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle("scrolled", y > 60);
    if (backTop) backTop.classList.toggle("show", y > 400);
  };
  window.addEventListener("scroll", onScroll);
  onScroll();

  // Retour en haut
  if (backTop) {
    backTop.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  }

  // Fermer le menu mobile après un clic sur un lien d'ancre
  const collapse = document.getElementById("navItems");
  document.querySelectorAll('#navItems a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (collapse && collapse.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(collapse).hide();
      }
    });
  });

  // Animation simple des compteurs lorsqu'ils deviennent visibles
  const counters = document.querySelectorAll(".counter");
  const animate = (el) => {
    const raw = el.textContent.trim();
    const target = parseInt(raw, 10);
    if (Number.isNaN(target)) return;
    const suffix = raw.replace(/[0-9]/g, "");
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current + suffix;
    }, 30);
  };

  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => obs.observe(c));
  }
});
