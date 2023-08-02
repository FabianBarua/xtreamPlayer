const itemsPerPage = 21;
let currentPage = 1;
let series = [];
const searchInput = document.getElementById("searchInput");

function fetchseries() {
  fetch('https://connecttvapp.xyz/player_api.php?username=homeondemand&password=vR5jZPUJSWCY&action=get_series')
    .then((response) => response.json())
    .then((data) => processData(data))
    .catch((error) => console.error("Error fetching data:", error));
}

function processData(data) {
  series = data;
  displayseries();
  displayPagination();
}

function displayseries() {
  const seriesGrid = document.getElementById("seriesGrid");
  seriesGrid.innerHTML = "";

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredseries = filterseries();

  for (let i = startIndex; i < endIndex && i < filteredseries.length; i++) {
    const serie = filteredseries[i];

    const card = createserieCard(serie);

    seriesGrid.appendChild(card);
  }
}

function createserieCard(serie) {
  const card = document.createElement("div");
  card.className = "bg-gray-800 rounded-lg shadow-md p-4 flex flex-col justify-between h-full"; // Cambio de color de fondo de la tarjeta

  const logoElement = document.createElement("img");
  logoElement.alt = serie.name;
  logoElement.className = "w-24 h-auto mb-2 mx-auto rounded-md";
  logoElement.src = serie.cover ? serie.cover : "../img/cargando.gif";

  logoElement.onerror = function () {
    logoElement.src = "../img/cargando.gif";
  };

  const titleElement = document.createElement("h2");
  titleElement.className = "text-lg font-bold text-center mb-2 text-white"; // Cambio de color del texto a blanco
  titleElement.textContent = serie.name;

  const linkElement = document.createElement("a");
  linkElement.href = serie.series_id ? `../view#${serie.series_id}` : "#";

  linkElement.textContent = "Ver serie";
  linkElement.className = "block w-full bg-blue-500 text-white text-center py-2 rounded-lg hover:bg-blue-600"; // Cambio de colores y estilo del enlace

  linkElement.setAttribute("data-boton", serie.name);

  card.appendChild(logoElement);
  card.appendChild(titleElement);
  card.appendChild(linkElement);
  return card;
}


function filterseries() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  if (searchTerm === "") {
    return series;
  }

  return series.filter((serie) => serie.name.toLowerCase().includes(searchTerm));
}

function displayPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(filterseries().length / itemsPerPage);

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
    displayseries();
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

function randomizeseries() {
  for (let i = series.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [series[i], series[j]] = [series[j], series[i]];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", () => {
    currentPage = 1;
    displayseries();
    displayPagination();
  });

  const randomButton = document.getElementById("randomButton");
  randomButton.addEventListener("click", () => {
    randomizeseries();
    displayseries();
    displayPagination();
  });

  fetchseries();

  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      currentPage = 1;
      displayseries();
      displayPagination();
    }
  });
});
