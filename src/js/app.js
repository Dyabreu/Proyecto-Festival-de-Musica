document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});

function iniciarApp() {
    navegacionFija();
    crearGaleria();
    scrollNav();
}

function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 5;
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
  window.addEventListener("scroll", reveal);

  function desplaza() {
    var desplazas = document.querySelectorAll(".desplaza");
    for (var i = 0; i < desplazas.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = desplazas[i].getBoundingClientRect().top;
      var elementVisible = 5;
      if (elementTop < windowHeight - elementVisible) {
        desplazas[i].classList.add("active");
      } else {
        desplazas[i].classList.remove("active");
      }
    }
  }
  window.addEventListener("scroll", desplaza);

function navegacionFija() {
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function () {
        if ( sobreFestival.getBoundingClientRect().top < 2 ) {
            barra.classList.add('fijo');
            barra.classList.add('body-scroll');
        } else {
            barra.classList.remove('fijo');
            barra.classList.remove('body-scroll');
        }
    });
}

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    enlaces.forEach( enlace => { 
        enlace.addEventListener('click', function(e) {
            e.preventDefault();

            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({ behavior: "smooth"});
        });
    });
}


function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <= 12; i++ ) {
    const imagenes = document.createElement('picture');
    imagenes.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
                <source srcset="build/img/${i}}.webp" type="image/webp">
                <img loading="lazy" width="200" height="300" src="../src/img/thumb/${i}.
                jpg" alt="Imagen galería">
    `;

    imagenes.onclick = function() { 
        mostrarImagen(i); 
    }

    galeria.appendChild(imagenes);
    }
}

function mostrarImagen(id) {  
    const imagenes = document.createElement('picture');
    imagenes.innerHTML = `
            <source srcset="build/img/grande/${id}.avif" type="image/avif">
                <source srcset="build/grande/${id}}.webp" type="image/webp">
                <img loading="lazy" width="200" height="300" src="../src/img/grande/${id}.
                jpg" alt="Imagen galería">
    `;

    //Overlay con la imagen
    const overlay = document.createElement('DIV'); 
    overlay.appendChild(imagenes);
    overlay.classList.add('overlay'); 
    overlay.onclick = function() {  
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove(); 
    }

    //Boton para cerrar el Modal 
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'x';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove(); 
    }
    overlay.appendChild(cerrarModal); 

    const body = document.querySelector('body');
    body.appendChild(overlay); 
    body.classList.add('fijar-body'); 
}