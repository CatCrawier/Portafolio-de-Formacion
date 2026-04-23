const certificados = [
  {
    title: "Introduccion a la Inteligencia Artificial",
    source: "Platzi x CESDE",
    hours: "4 horas",
    date: "23 abr 2026",
    file: "Introduccion_IA.pdf"
  },
  {
    title: "Prompt Engineering",
    source: "Platzi x CESDE",
    hours: "13 horas",
    date: "21 abr 2026",
    file: "Prompt_Engineering.pdf"
  },
  {
    title: "Fundamentos de JavaScript",
    source: "Platzi x CESDE",
    hours: "16 horas",
    date: "26 mar 2026",
    file: "Fundamentos_JS.pdf"
  },
  {
    title: "Responsive Design",
    source: "Platzi x CESDE",
    hours: "9 horas",
    date: "23 abr 2026",
    file: "Responsive_Design.pdf"
  },
  {
    title: "Gestion de Proyectos con Jira",
    source: "Platzi x CESDE",
    hours: "12 horas",
    date: "26 mar 2026",
    file: "Jira.pdf"
  },
  {
    title: "Programacion Basica",
    source: "Platzi x CESDE",
    hours: "29 horas",
    date: "26 mar 2026",
    file: "Programacion_Basica.pdf"
  },
  {
    title: "Visualización de Datos para BI",
    source: "Platzi x CESDE",
    hours: "13 horas",
    date: "24 mar 2026",
    file: "BI.pdf"
  },
  {
    title: "Fundamentos de Python",
    source: "Platzi x CESDE",
    hours: "16 horas",
    date: "23 mar 2026",
    file: "Fundamentos_Python.pdf"
  },
  {
    title: "Pensamiento Lógico",
    source: "Platzi x CESDE",
    hours: "12 horas",
    date: "22 mar 2026",
    file: "Pensamiento_Logico.pdf"
  },
  {
    title: "Redacción y Ortografía",
    source: "CESDE - Escuela Empresarial",
    hours: "30 horas",
    date: "22 mar 2026",
    file: "Redaccion.pdf"
  },
  {
    title: "Cátedra Ser Emprendedor",
    source: "CESDE - Escuela Empresarial",
    hours: "12 horas",
    date: "22 mar 2026",
    file: "Catedra.pdf"
  },
  {
    title: "Gestión de las Emociones",
    source: "CESDE - Escuela Empresarial",
    hours: "16 horas",
    date: "22 mar 2026",
    file: "Emociones.pdf"
  },
  {
    title: "Excel desde Cero",
    source: "CESDE - Escuela Empresarial",
    hours: "34 horas",
    date: "21 mar 2026",
    file: "Excel.pdf"
  }
];

let indiceActual = 0;
const carpetaPDF = "PDF";

const galeria = document.getElementById("galeria");
const modal = document.getElementById("modal");
const fuenteModal = document.getElementById("fuente-modal");
const tituloModal = document.getElementById("titulo-modal");
const metaModal = document.getElementById("meta-modal");
const pdfModal = document.getElementById("pdf-modal");
const descargarModal = document.getElementById("descargar-modal");

function obtenerRutaPDF(file) {
  return `${carpetaPDF}/${encodeURIComponent(file)}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`;
}

function crearTarjeta(certificado, index) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "tarjeta";
  tarjeta.tabIndex = 0;
  tarjeta.setAttribute("role", "button");
  tarjeta.setAttribute("aria-label", `Abrir certificado ${certificado.title}`);

  tarjeta.innerHTML = `
    <div class="marco-miniatura">
      <iframe
        class="visor-pdf visor-pdf-tarjeta"
        src="${obtenerRutaPDF(certificado.file)}"
        title="${certificado.title}"
        loading="lazy"
      ></iframe>
    </div>
    <div class="cuerpo-tarjeta">
      <div class="fuente-tarjeta">${certificado.source}</div>
      <div class="titulo-tarjeta">${certificado.title}</div>
      <div class="meta-tarjeta">
        <span class="pastilla">${certificado.hours}</span>
        <span>${certificado.date}</span>
      </div>
      <div class="pista-ver">Ver certificado completo</div>
    </div>
  `;

  tarjeta.addEventListener("click", () => abrirModal(index));
  tarjeta.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      abrirModal(index);
    }
  });

  galeria.appendChild(tarjeta);
}

function actualizarModal() {
  const cert = certificados[indiceActual];
  const rutaPDF = obtenerRutaPDF(cert.file);

  fuenteModal.textContent = cert.source;
  tituloModal.textContent = cert.title;
  metaModal.textContent = `${cert.hours} - ${cert.date}`;
  pdfModal.src = rutaPDF;
  pdfModal.title = cert.title;
  descargarModal.href = `${carpetaPDF}/${encodeURIComponent(cert.file)}`;
}

function abrirModal(index) {
  indiceActual = index;
  actualizarModal();
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function cerrarModal() {
  modal.classList.remove("open");
  pdfModal.src = "";
  document.body.style.overflow = "";
}

function navegar(direccion) {
  indiceActual = (indiceActual + direccion + certificados.length) % certificados.length;
  actualizarModal();
}

certificados.forEach(crearTarjeta);

document.addEventListener("keydown", (event) => {
  if (!modal.classList.contains("open")) return;

  if (event.key === "Escape") cerrarModal();
  if (event.key === "ArrowRight") navegar(1);
  if (event.key === "ArrowLeft") navegar(-1);
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) cerrarModal();
});
