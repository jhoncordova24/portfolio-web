if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.scrollTo(0, 0);

document.addEventListener("DOMContentLoaded", function () {
  window.scrollTo(0, 0);

  const offcanvasElement = document.getElementById("offcanvasNavbar");
  if (offcanvasElement) {
    const navLinks = offcanvasElement.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
        if (offcanvas) {
          offcanvas.hide();
        }
      });
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

  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      changeLanguage(button.dataset.language);
    });
  });
});

window.addEventListener("load", function () {
  window.scrollTo(0, 0);
});
