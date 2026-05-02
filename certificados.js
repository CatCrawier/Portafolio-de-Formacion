const certificados = [
  {
    title: "Gestión de Equipos Ágiles",
    source: "Platzi x CESDE",
    hours: 10,
    date: "2026-05-02",
    file: "Gestion de Equipos Agiles.pdf"
  },
  {
    title: "Java SE: SQL y Bases de Datos",
    source: "Platzi x CESDE",
    hours: 15,
    date: "2026-05-02",
    file: "Java SE SQL y Bases de Datos.pdf"
  },
  {
    title: "Fundamentos de Bases de Datos y SQL",
    source: "Platzi x CESDE",
    hours: 12,
    date: "2026-04-30",
    file: "SQL.pdf"
  },
  {
    title: "Introducción a la Inteligencia Artificial",
    source: "Platzi x CESDE",
    hours: 4,
    date: "2026-04-23",
    file: "Introduccion_IA.pdf"
  },
  {
    title: "Responsive Design: Maquetación Mobile First",
    source: "Platzi x CESDE",
    hours: 9,
    date: "2026-04-23",
    file: "Responsive_Design.pdf"
  },
  {
    title: "Prompt Engineering",
    source: "Platzi x CESDE",
    hours: 13,
    date: "2026-04-21",
    file: "Prompt_Engineering.pdf"
  },
  {
    title: "Fundamentos de JavaScript",
    source: "Platzi x CESDE",
    hours: 16,
    date: "2026-03-26",
    file: "Fundamentos_JS.pdf"
  },
  {
    title: "Gestión de Proyectos con Jira",
    source: "Platzi x CESDE",
    hours: 12,
    date: "2026-03-26",
    file: "Jira.pdf"
  },
  {
    title: "Programación Básica",
    source: "Platzi x CESDE",
    hours: 29,
    date: "2026-03-26",
    file: "Programacion_Basica.pdf"
  },
  {
    title: "Visualización de Datos para BI",
    source: "Platzi x CESDE",
    hours: 13,
    date: "2026-03-24",
    file: "BI.pdf"
  },
  {
    title: "Fundamentos de Python",
    source: "Platzi x CESDE",
    hours: 16,
    date: "2026-03-23",
    file: "Fundamentos_Python.pdf"
  },
  {
    title: "Pensamiento Lógico",
    source: "Platzi x CESDE",
    hours: 12,
    date: "2026-03-22",
    file: "Pensamiento_Logico.pdf"
  },
  {
    title: "Redacción y Ortografía",
    source: "CESDE - Escuela Empresarial",
    hours: 30,
    date: "2026-03-22",
    file: "Redaccion.pdf"
  },
  {
    title: "Cátedra Ser Emprendedor",
    source: "CESDE - Escuela Empresarial",
    hours: 12,
    date: "2026-03-22",
    file: "Catedra.pdf"
  },
  {
    title: "Gestión de las Emociones",
    source: "CESDE - Escuela Empresarial",
    hours: 16,
    date: "2026-03-22",
    file: "Emociones.pdf"
  },
  {
    title: "Excel desde Cero",
    source: "CESDE - Escuela Empresarial",
    hours: 34,
    date: "2026-03-21",
    file: "Excel.pdf"
  }
];

const fmtFecha = new Intl.DateTimeFormat("es-CO", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function formatearFecha(isoDate) {
  return fmtFecha.format(new Date(isoDate));
}

const estado = {
  indiceActual: 0,
  abierto: false,
};

let tarjetaAnterior = null;

const CARPETA_PDF = "PDF";

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

function rutaBase(file) {
  return `${CARPETA_PDF}/${encodeURI(file)}`;
}

function rutaPDF(file) {
  return `${rutaBase(file)}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`;
}

function crearTarjeta(certificado, index) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "tarjeta";
  tarjeta.tabIndex = 0;
  tarjeta.setAttribute("role", "button");
  tarjeta.setAttribute("aria-label", `Abrir certificado ${certificado.title}`);
  tarjeta.style.animationDelay = `${index * 0.05}s`;

  tarjeta.innerHTML = `
    <div class="marco-miniatura">
      <div class="placeholder-miniatura" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
        <span>PDF</span>
      </div>
    </div>
    <div class="cuerpo-tarjeta">
      <div class="fuente-tarjeta">${certificado.source}</div>
      <div class="titulo-tarjeta">${certificado.title}</div>
      <div class="meta-tarjeta">
        <span class="pastilla">${certificado.hours} horas</span>
        <time datetime="${certificado.date}">${formatearFecha(certificado.date)}</time>
      </div>
      <div class="pista-ver">Ver certificado completo</div>
    </div>
  `;

  tarjeta.addEventListener("click", () => abrirModal(index, tarjeta));
  tarjeta.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      abrirModal(index, tarjeta);
    }
  });

  galeria.appendChild(tarjeta);
}

function actualizarModal() {
  const cert = certificados[estado.indiceActual];

  fuenteModal.textContent   = cert.source;
  tituloModal.textContent   = cert.title;
  metaModal.textContent     = `${cert.hours} horas · ${formatearFecha(cert.date)}`;
  contadorModal.textContent = `${estado.indiceActual + 1} / ${certificados.length}`;

  const cargando = document.getElementById("cargando-modal");
  const errorModal = document.getElementById("error-modal");

  pdfModal.onload  = null;
  pdfModal.onerror = null;
  pdfModal.src     = "about:blank";

  cargando.hidden  = false;
  errorModal.hidden = true;
  pdfModal.classList.add("cargando");

  pdfModal.onload = () => {
    cargando.hidden = true;
    pdfModal.classList.remove("cargando");
  };

  pdfModal.onerror = () => {
    cargando.hidden  = true;
    errorModal.hidden = false;
    pdfModal.classList.remove("cargando");
  };

  pdfModal.src   = rutaPDF(cert.file);
  pdfModal.title = cert.title;
  descargarModal.href = rutaBase(cert.file);
}

const TITULO_BASE = document.title;

function abrirModal(index, elemento) {
  tarjetaAnterior = elemento || null;
  estado.indiceActual = index;
  estado.abierto = true;
  actualizarModal();
  document.title = `${certificados[index].title} — Adrián Vásquez Pérez`;
  modal.removeAttribute("inert");
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
  btnCerrar.focus();
}

function cerrarModal() {
  estado.abierto = false;
  document.title = TITULO_BASE;
  modal.classList.remove("open");
  modal.setAttribute("inert", "");
  document.body.style.overflow = "";
  modal.addEventListener("transitionend", () => {
    if (!estado.abierto) {
      pdfModal.src = "about:blank";
      tarjetaAnterior?.focus();
    }
  }, { once: true });
}

function navegar(direccion) {
  estado.indiceActual = (estado.indiceActual + direccion + certificados.length) % certificados.length;
  actualizarModal();
}

btnCerrar.addEventListener("click", cerrarModal);
btnAnterior.addEventListener("click", () => navegar(-1));
btnSiguiente.addEventListener("click", () => navegar(1));

modal.addEventListener("click", (e) => {
  if (e.target === modal) cerrarModal();
});

document.addEventListener("keydown", (e) => {
  if (!estado.abierto) return;
  if (e.key === "Escape")     cerrarModal();
  if (e.key === "ArrowRight") navegar(1);
  if (e.key === "ArrowLeft")  navegar(-1);
});

certificados.forEach(crearTarjeta);

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

const totalHoras = certificados.reduce((suma, c) => suma + c.hours, 0);
document.getElementById("total-horas").textContent = `${totalHoras} horas de formación en total`;