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

//funcion para enviar mensaje por whatsapp

function enviarWhatsapp(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const mensaje = document.getElementById("mensaje").value;

  const url =
    `https://api.whatsapp.com/send?phone=957995839&text=Hola, me llamo ${name}.\n` +
    ` Mi correo electrónico es ${email} y ${mensaje}`;

  // Verificar si alguno de los campos está vacío
  if (name === "" || email === "" || mensaje === "") {
    alert("Por favor, completa todos los campos.");
    return; // Detener la ejecución si hay campos vacíos
  }

  window.open(url, "_blank");
}

//
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active"); // Agrega la clase cuando la sección es visible
          observer.unobserve(entry.target); // Deja de observar después de activar la animación
        }
      });
    },
    {
      threshold: 0.1, // Ajusta según cuando quieras que la animación empiece (10% de visibilidad)
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
});
