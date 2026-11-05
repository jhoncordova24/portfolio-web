if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

document.addEventListener("DOMContentLoaded", () => {
  window.scrollTo(0, 0);

  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 600,
      once: true,
      offset: 50,
    });
  }

  const iconNodes = document.querySelectorAll("[data-icon]");
  iconNodes.forEach(async (el) => {
    const iconName = el.dataset.icon;
    try {
      const res = await fetch(`assets/img/icons/${iconName}.svg`);
      if (!res.ok) throw new Error("Icono no encontrado");
      const svgText = await res.text();
      el.innerHTML = svgText;
      const svg = el.querySelector("svg");
      if (svg) {
        svg.setAttribute("class", "w-full h-full fill-current");
      }
    } catch (err) {
      console.warn(`No se pudo cargar el SVG: ${iconName}`, err);
    }
  });

  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  const sunSVG = `
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  `;

  const moonSVG = `
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  `;
  
  function renderThemeIcon() {
    const isDark = document.documentElement.classList.contains("dark");
    if (themeIcon) {
      themeIcon.innerHTML = isDark ? sunSVG : moonSVG;
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const isDark = document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      renderThemeIcon();
    });
  }
  renderThemeIcon();

  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  const modal = document.getElementById("proyecto2Modal");
  const openModalBtns = document.querySelectorAll(
    "[data-modal-target='proyecto2Modal']",
  );
  const closeModalBtn =
    document.querySelector("[data-modal-close]") ||
    document.getElementById("closeModalBtn");
  const track = document.getElementById("modalCarouselTrack");
  const prevSlide = document.getElementById("prevSlide");
  const nextSlide = document.getElementById("nextSlide");

  let currentSlide = 0;

  if (modal) {
    openModalBtns.forEach((btn) => {
      btn.addEventListener("click", () => modal.classList.remove("hidden"));
    });
  }
  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener("click", () =>
      modal.classList.add("hidden"),
    );
  }
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.add("hidden");
    });
  }

  if (track && prevSlide && nextSlide) {
    const totalSlides = track.children.length;
    prevSlide.addEventListener("click", () => {
      currentSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
    });
    nextSlide.addEventListener("click", () => {
      currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
    });
  }

  const langButtons = document.querySelectorAll("[data-language]");
  const textsToChange = document.querySelectorAll("[data-section]");

  function changeLanguage(lang) {
    fetch(`languages/${lang}.json`)
      .then((res) => res.json())
      .then((data) => {
        textsToChange.forEach((el) => {
          const section = el.dataset.section;
          const value = el.dataset.value;
          if (data[section] && data[section][value]) {
            el.innerHTML = data[section][value];
          }
        });
        document.documentElement.lang = lang;
      })
      .catch((err) => console.error("Error al cargar idioma:", err));
  }

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => changeLanguage(btn.dataset.language));
  });
});

const navbarContainer = document.getElementById("navbar-container");

function handleNavbarScroll() {
  if (!navbarContainer) return;

  if (window.scrollY > 30) {
    navbarContainer.classList.add(
      "max-w-2xl",
      "h-12",
      "rounded-full",
      "bg-surface/75",
      "backdrop-blur-md",
      "border-subtle",
      "shadow-lg",
      "shadow-black/5",
    );
    navbarContainer.classList.remove("max-w-5xl", "h-16", "border-transparent");
  } else {
    navbarContainer.classList.remove(
      "max-w-2xl",
      "h-12",
      "rounded-full",
      "bg-surface/75",
      "backdrop-blur-md",
      "border-subtle",
      "shadow-lg",
      "shadow-black/5",
    );
    navbarContainer.classList.add("max-w-5xl", "h-16", "border-transparent");
  }
}

window.addEventListener("scroll", handleNavbarScroll);
handleNavbarScroll();
