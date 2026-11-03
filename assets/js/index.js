document.addEventListener("DOMContentLoaded", function () {
  var offcanvasElement = document.getElementById("offcanvasNavbar");
  var navLinks = offcanvasElement.querySelectorAll(".nav-link");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      var offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
      if (offcanvas) {
        offcanvas.hide();
      }
    });
  });
});

// Lenguajes
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
      localStorage.setItem("selectedLanguage", lang);
    })
    .catch((err) => console.error("Error al cargar idioma:", err));
}

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    changeLanguage(button.dataset.language);
  });
});

const savedLanguage = localStorage.getItem("selectedLanguage") || "es";
changeLanguage(savedLanguage);
