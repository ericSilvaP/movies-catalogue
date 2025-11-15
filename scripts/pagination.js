import { API_READ_KEY } from '/scripts/constants.js'
import { TMDb } from '/scripts/tmdb.js'

const moviesGrid = document.querySelector('.media-cards')
const paginationDiv = document.querySelector('#pagination')
const tmdb = new TMDb(API_READ_KEY)

import { createMovieCard } from './elementsFactory.js'

export async function renderMovies(moviesGrid, list) {
  const tvGenres = await tmdb.getTVGenresList()
  moviesGrid.innerHTML = ''

  for (const movie of list) {
    moviesGrid.appendChild(createMovieCard(movie, { genres: tvGenres.genres }))
  }
}

export function renderPagination({
  paginationDiv,
  totalPages,
  currentPage,
  onChangePage,
  maxButtons = 10,
}) {
  paginationDiv.innerHTML = ''

  let start = Math.max(1, currentPage - Math.floor(maxButtons / 2))
  let end = Math.min(totalPages, start + maxButtons - 1)

  if (end - start < maxButtons - 1) {
    start = Math.max(1, end - maxButtons + 1)
  }

  for (let page = start; page <= end; page++) {
    const btn = document.createElement('button')
    btn.textContent = page

    if (page === currentPage) {
      btn.classList.add('active')
      btn.setAttribute('aria-current', 'page')
    }

    btn.addEventListener('click', () => onChangePage(page))
    paginationDiv.appendChild(btn)
  }
}

export function createPaginationController({
  fetchPage,
  renderMoviesFn,
  renderPaginationFn,
  mediaGrid,
  paginationDiv,
}) {
  async function load(page = 1) {
    const data = await fetchPage(page)

    renderMoviesFn(mediaGrid, data.results)

    renderPaginationFn({
      paginationDiv: paginationDiv,
      totalPages: data.total_pages,
      currentPage: page,
      onChangePage: load,
    })
  }

  return { load }
}
