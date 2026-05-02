const certificados = [
  {
    title: "Gestión de Equipos Ágiles",
    source: "Platzi x CESDE",
    hours: "10 horas",
    date: "02 may 2026",
    file: "Gestion de Equipos Agiles.pdf"
  },
  {
    title: "Java SE: SQL y Bases de Datos",
    source: "Platzi x CESDE",
    hours: "15 horas",
    date: "02 may 2026",
    file: "Java SE SQL y Bases de Datos.pdf"
  },
  {
    title: "Fundamentos de Bases de Datos y SQL",
    source: "Platzi x CESDE",
    hours: "12 horas",
    date: "30 abr 2026",
    file: "SQL.pdf"
  },
  {
    title: "Introducción a la Inteligencia Artificial",
    source: "Platzi x CESDE",
    hours: "4 horas",
    date: "23 abr 2026",
    file: "Introduccion_IA.pdf"
  },
  {
    title: "Responsive Design: Maquetación Mobile First",
    source: "Platzi x CESDE",
    hours: "9 horas",
    date: "23 abr 2026",
    file: "Responsive_Design.pdf"
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
    title: "Gestión de Proyectos con Jira",
    source: "Platzi x CESDE",
    hours: "12 horas",
    date: "26 mar 2026",
    file: "Jira.pdf"
  },
  {
    title: "Programación Básica",
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

// ── Estado ────────────────────────────────────────────────────────────────────
const estado = {
  indiceActual: 0,
  abierto: false,
};

const CARPETA_PDF = "PDF";

// ── Referencias al DOM ────────────────────────────────────────────────────────
const galeria        = document.getElementById("galeria");
const modal          = document.getElementById("modal");
const fuenteModal    = document.getElementById("fuente-modal");
const tituloModal    = document.getElementById("titulo-modal");
const metaModal      = document.getElementById("meta-modal");
const contadorModal  = document.getElementById("contador-modal");
const pdfModal       = document.getElementById("pdf-modal");
const descargarModal = document.getElementById("descargar-modal");
const btnCerrar      = document.getElementById("btn-cerrar");
const btnAnterior    = document.getElementById("btn-anterior");
const btnSiguiente   = document.getElementById("btn-siguiente");

// ── Utilidades ────────────────────────────────────────────────────────────────
function rutaPDF(file) {
  return `${CARPETA_PDF}/${encodeURIComponent(file)}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`;
}

// ── Galería ───────────────────────────────────────────────────────────────────
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
        src="${rutaPDF(certificado.file)}"
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
  tarjeta.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      abrirModal(index);
    }
  });

  galeria.appendChild(tarjeta);
}

// ── Modal ─────────────────────────────────────────────────────────────────────
function actualizarModal() {
  const cert = certificados[estado.indiceActual];

  fuenteModal.textContent   = cert.source;
  tituloModal.textContent   = cert.title;
  metaModal.textContent     = `${cert.hours} · ${cert.date}`;
  contadorModal.textContent = `${estado.indiceActual + 1} / ${certificados.length}`;

  // Cargar el PDF solo al abrir el modal, no antes
  pdfModal.src          = rutaPDF(cert.file);
  pdfModal.title        = cert.title;
  descargarModal.href   = `${CARPETA_PDF}/${encodeURIComponent(cert.file)}`;
}

function abrirModal(index) {
  estado.indiceActual = index;
  estado.abierto = true;
  actualizarModal();
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
  btnCerrar.focus();
}

function cerrarModal() {
  estado.abierto = false;
  modal.classList.remove("open");
  document.body.style.overflow = "";
  // Liberar el iframe tras la transición CSS (250ms) para no cortarla
  setTimeout(() => { pdfModal.src = ""; }, 250);
}

function navegar(direccion) {
  estado.indiceActual = (estado.indiceActual + direccion + certificados.length) % certificados.length;
  actualizarModal();
}

// ── Eventos ───────────────────────────────────────────────────────────────────
btnCerrar.addEventListener("click", cerrarModal);
btnAnterior.addEventListener("click", () => navegar(-1));
btnSiguiente.addEventListener("click", () => navegar(1));

// Cerrar al hacer clic en el fondo del modal
modal.addEventListener("click", (e) => {
  if (e.target === modal) cerrarModal();
});

// Teclado: Escape cierra, flechas navegan
document.addEventListener("keydown", (e) => {
  if (!estado.abierto) return;
  if (e.key === "Escape")     cerrarModal();
  if (e.key === "ArrowRight") navegar(1);
  if (e.key === "ArrowLeft")  navegar(-1);
});

// ── Inicializar galería ───────────────────────────────────────────────────────
certificados.forEach(crearTarjeta);

// ── Trampa de foco en el modal ────────────────────────────────────────────────
modal.addEventListener("keydown", (e) => {
  if (e.key !== "Tab") return;

  const focusables = Array.from(
    modal.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])')
  ).filter((el) => !el.disabled);

  const primero = focusables[0];
  const ultimo  = focusables[focusables.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === primero) {
      e.preventDefault();
      ultimo.focus();
    }
  } else {
    if (document.activeElement === ultimo) {
      e.preventDefault();
      primero.focus();
    }
  }
});

// ── Total de horas en el encabezado ──────────────────────────────────────────
const totalHoras = certificados.reduce((suma, c) => suma + parseInt(c.hours), 0);
document.getElementById("total-horas").textContent = `${totalHoras} horas de formación en total`;