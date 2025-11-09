// Cierre del offcanvas al hacer click en un enlace
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

//Lenguajes
const langButtons = document.querySelectorAll("[data-language]");
const textsToChange = document.querySelectorAll("[data-section]");
console.log(textsToChange);

langButtons.forEach((button) => {
    button.addEventListener("click", () => {
        fetch(`../languages/${button.dataset.language}.json`)
            .then(res => res.json())
            .then(data => {
                textsToChange.forEach((el) => {
                    const section = el.dataset.section;
                    const value = el.dataset.value;

                    el.innerHTML = data[section][value];
                })
            })
    })
})

