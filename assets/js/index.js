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

// Animacion infinita
const scrollers = document.querySelectorAll(".scroller");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", true);

    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}

