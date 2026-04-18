
/* BACKGROUND STARS */
const containers = document.querySelectorAll(".space");
containers.forEach(container => {
  const stars = [];

  for (let i = 0; i < 20; i++) {
    const el = document.createElement("div");
    el.classList.add("star");

    const star = {
      el,
      x: Math.random() * container.clientWidth,
      y: Math.random() * container.clientHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3
    };

    stars.push(star);
    container.appendChild(el);
  }

  function animate() {
    const w = container.clientWidth;
    const h = container.clientHeight;

    stars.forEach(star => {
      star.x += star.vx;
      star.y += star.vy;

      if (star.x <= 0 || star.x >= w) star.vx *= -1;
      if (star.y <= 0 || star.y >= h) star.vy *= -1;

      star.el.style.transform = `translate(${star.x}px, ${star.y}px)`;
    });

    requestAnimationFrame(animate);
  }

  animate();
});


/* CARD MOVEMENT */
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--x", x + "px");
    card.style.setProperty("--y", y + "px");
  });

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 25;  // arriba/abajo
    const rotateY = (x - centerX) / 25;  // izquierda/derecha

    card.style.transform = `
      rotateX(${-rotateX}deg)
      rotateY(${rotateY}deg)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0)";
  });

});



/* SLIDES UP /SLIDES RIGHT */
const elementsUp = document.querySelectorAll(".slideUpScroll");

const observerUp = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${index * 0.2}s`;
      entry.target.classList.add("show");
    }
  });
});

elementsUp.forEach(el => observerUp.observe(el));

const elementsRight = document.querySelectorAll(".slideRightScroll");

const observerRight = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${index * 0.2}s`;
      entry.target.classList.add("show");
    }
  });
});

elementsRight.forEach(el => observerRight.observe(el));


/* NAV LINKS */
const links = document.querySelectorAll(".nav-link");

links.forEach(link => {
  link.addEventListener("click", () => {

    // quitar active de todos
    links.forEach(l => l.classList.remove("active"));

    // agregar active al clickeado
    link.classList.add("active");

  });
});

/* PESTAÑAS DE PROYECTOS */
function mostrar(id) {
  // ocultar todos
  document.querySelectorAll('.proyectos').forEach(div => {
    div.classList.add('hidden');
  });

  // mostrar el seleccionado
  document.getElementById(id).classList.remove('hidden');
}

/* SCROLL DE PROYECTOS */
function getActivo() {
  return document.querySelector('.proyectos:not(.hidden)');
}

function scrollIzq() {
  const activo = getActivo();
  activo.scrollBy({
    left: -200,
    behavior: 'smooth'
  });
}

function scrollDer() {
  const activo = getActivo();
  activo.scrollBy({
    left: 200,
    behavior: 'smooth'
  });
}