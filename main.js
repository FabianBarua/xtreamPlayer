const itemsPerPage = 21;
let currentPage = 1;
let movies = [];
const searchInput = document.getElementById("searchInput");


function fetchMovies() {
  fetch('m3ulist.m3u')
    .then((response) => response.text())
    .then((data) => processData(data))
    .catch((error) => console.error("Error fetching data:", error));
}

function processData(data) {
  const lines = data.split("\n");
  movies = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith("#EXTINF:")) {
      const title = line.match(/tvg-name="([^"]*)"/)[1];
      const logo = line.match(/tvg-logo="([^"]*)"/)[1];
      const url = lines[i + 1].trim();

      if (title && logo && url) {
        movies.push({ title, logo, url });
      }
    }
  }

  displayMovies();
  displayPagination();
}

function displayMovies() {
  const moviesGrid = document.getElementById("moviesGrid");
  moviesGrid.innerHTML = "";

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredMovies = filterMovies();

  for (let i = startIndex; i < endIndex && i < filteredMovies.length; i++) {
    const movie = filteredMovies[i];

    const card = createMovieCard(movie);

    moviesGrid.appendChild(card);

  }
}




function createMovieCard(movie) {
  const card = document.createElement("div");
  card.className = "bg-white rounded-lg shadow-md p-4 flex flex-col justify-between h-full";

  const logoElement = document.createElement("img");
  logoElement.alt = movie.title;
  logoElement.className = "w-24 h-auto mb-2 mx-auto rounded-md";
  logoElement.src = movie.logo ? movie.logo : "cargando.gif";

  logoElement.onerror = function () {
    logoElement.src = "cargando.gif";
  };

  const titleElement = document.createElement("h2");
  titleElement.className = "text-lg font-bold text-center mb-2";
  titleElement.textContent = movie.title;

  const linkElement = document.createElement("a");
  linkElement.href = movie.url;
  linkElement.textContent = "Ver película";
  linkElement.className = "block w-full bg-blue-500 text-white text-center py-2 rounded-lg hover:bg-blue-600";

  card.appendChild(logoElement);
  card.appendChild(titleElement);
  card.appendChild(linkElement);
  return card;
}


function filterMovies() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  if (searchTerm === "") {
    return movies;
  }

  return movies.filter((movie) => movie.title.toLowerCase().includes(searchTerm));
}

function displayPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(filterMovies().length / itemsPerPage);

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
    displayMovies();
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

document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", () => {
    currentPage = 1;
    displayMovies();
    displayPagination();
  });

  fetchMovies();

  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      currentPage = 1;
      displayMovies();
      displayPagination();
    }
  });
  
});
