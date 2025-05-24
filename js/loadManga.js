let mangaData = [];
let currentPage = 1;
const itemsPerPage = 4;

fetch('data.json')
  .then(res => res.json())
  .then(data => {
    mangaData = data;
    renderManga();
  });

function renderManga() {
  const list = document.getElementById('mangaList');
  const genre = document.getElementById('genreFilter').value;
  const searchKeyword = document.getElementById('search').value.toLowerCase();

  let filtered = mangaData.filter(m => 
    (genre === "" || m.genre.includes(genre)) &&
    (m.title.toLowerCase().includes(searchKeyword))
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pagedData = filtered.slice(start, end);

  list.innerHTML = "";
  pagedData.forEach(manga => {
    list.innerHTML += `
      <div class="bg-gray-700 p-2 rounded">
        <img src="${manga.cover}" alt="${manga.title}" class="rounded mb-2">
        <h2 class="text-lg font-semibold">${manga.title}</h2>
        <p class="text-sm text-gray-300">Chapter ${manga.chapter}</p>
        <a href="detail.html?id=${manga.id}" class="text-blue-400 text-sm">Lihat Detail</a>
      </div>
    `;
  });

  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  const pag = document.getElementById('pagination');
  pag.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    pag.innerHTML += `<button onclick="changePage(${i})" class="px-3 py-1 rounded ${i === currentPage ? 'bg-blue-500' : 'bg-gray-700'}">${i}</button>`;
  }
}

function changePage(page) {
  currentPage = page;
  renderManga();
}

document.getElementById('genreFilter').addEventListener('change', () => {
  currentPage = 1;
  renderManga();
});

document.getElementById('search').addEventListener('keyup', () => {
  currentPage = 1;
  renderManga();
});
