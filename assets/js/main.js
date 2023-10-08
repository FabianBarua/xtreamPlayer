const itemsPerPage = 21;
let currentPage = 1;
let filmes = [];
const searchInput = document.getElementById("searchInput");

function fetchfilmes() {
  fetch('https://connecttvapp.xyz/player_api.php?username=homeondemand&password=vR5jZPUJSWCY&action=get_vod_streams')
    .then((response) => response.json())
    .then((data) => processData(data))
    .catch((error) => console.error("Error fetching data:", error));
}

function processData(data) {
  filmes = data;
  displayfilmes();
  displayPagination();
}

function displayfilmes() {
  const filmesGrid = document.getElementById("moviesGrid");
  filmesGrid.innerHTML = "";

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredfilmes = filterfilmes();

  for (let i = startIndex; i < endIndex && i < filteredfilmes.length; i++) {
    const filme = filteredfilmes[i];

    const card = createfilmeCard(filme);

    filmesGrid.appendChild(card);
  }
}

function createfilmeCard(filme) {
  const card = document.createElement("div");
  card.className = "bg-gray-800 rounded-lg shadow-md p-4 flex flex-col justify-between h-full"; // Cambio de color de fondo de la tarjeta

  const logoElement = document.createElement("img");
  logoElement.alt = filme.name;
  logoElement.className = "w-24 h-auto mb-2 mx-auto rounded-md";
  logoElement.src = filme.stream_icon ? filme.stream_icon : "/assets/img/cargando.gif";


  const titleElement = document.createElement("h2");
  titleElement.className = "text-lg font-bold text-center mb-2 text-white"; // Cambio de color del texto a blanco
  titleElement.textContent = filme.name;

  const linkElement = document.createElement("a");
  linkElement.href = filme.stream_id ? `../play#m-${filme.stream_id}` : "#";

  linkElement.textContent = "Ver filme";
  linkElement.className = "block w-full bg-blue-500 text-white text-center py-2 rounded-lg hover:bg-blue-600"; // Cambio de colores y estilo del enlace

  linkElement.setAttribute("data-boton", filme.name);

  card.appendChild(logoElement);
  card.appendChild(titleElement);
  card.appendChild(linkElement);
  return card;
}


function removeAccents(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function filterfilmes() {
  const searchTerm = removeAccents(searchInput.value.trim().toLowerCase());

  if (searchTerm === "") {
    return filmes;
  }

  const matchingFilmes = filmes.filter((filme) => {
    const filmeName = removeAccents(filme.name.toLowerCase());

    // Comprueba si el término de búsqueda es una coincidencia exacta o parcial del nombre de la película
    const isExactMatch = filmeName === searchTerm;
    const isPartialMatch = filmeName.includes(searchTerm);

    return isExactMatch || isPartialMatch;
  });

  return matchingFilmes;
}


function displayPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(filterfilmes().length / itemsPerPage);

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);

  let prevPage = null; // Track the previous page number

  if (currentPage > 1) {
    addPageLink(pagination, "1");
    prevPage = 1;
    if (currentPage > 4) {
      addPageDots(pagination);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    // Only add the page link if it is not equal to the previous page number
    if (i !== prevPage) {
      addPageLink(pagination, i.toString());
      prevPage = i;
    }
  }

  if (currentPage < totalPages) {
    if (currentPage < totalPages - 2) {
      addPageDots(pagination);
    }
    // Only add the page link if it is not equal to the previous page number
    if (totalPages !== prevPage) {
      addPageLink(pagination, totalPages.toString());
    }
  }
}

function addPageLink(parent, page) {
  const pageLink = document.createElement("a");
  pageLink.href = "#";
  pageLink.textContent = page;
  pageLink.className = currentPage === Number(page) ? "font-bold mx-1" : "mx-1";

  pageLink.addEventListener("click", (event) => {
    event.preventDefault();
    currentPage = Number(page);
    displayfilmes();
    displayPagination();
  });

  parent.appendChild(pageLink);
}

function addPageDots(parent) {
  // Assuming parent is the "pagination" div element
  const dotsSpan = document.createElement("span");
  dotsSpan.textContent = "...";
  dotsSpan.classList.add("text-gray-400", "mx-1"); // Apply Tailwind CSS classes
  parent.appendChild(dotsSpan);
}

function randomizefilmes() {
  for (let i = filmes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [filmes[i], filmes[j]] = [filmes[j], filmes[i]];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", () => {
    currentPage = 1;
    displayfilmes();
    displayPagination();
  });

  const randomButton = document.getElementById("randomButton");
  randomButton.addEventListener("click", () => {
    randomizefilmes();
    displayfilmes();
    displayPagination();
  });

  fetchfilmes();

  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      currentPage = 1;
      displayfilmes();
      displayPagination();
    }
  });
});
