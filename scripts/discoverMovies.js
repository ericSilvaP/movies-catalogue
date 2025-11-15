import { API_READ_KEY } from './constants.js'
import { createMovieCard } from './elementsFactory.js'
import { TMDb } from './tmdb.js'

const moviesGrid = document.querySelector('.media-cards')
const tmdb = new TMDb(API_READ_KEY)
const params = new URLSearchParams(window.location.search)
let searchParam = params.get('query')
const currentYear = new Date().getFullYear()
const moviesGenres = await tmdb.getMovieGenresList()
const title = document.querySelector('.title-section')
const movies = await tmdb.discoverMovie({
  primaryReleaseYear: currentYear,
})
if (searchParam === null) {
  movies.results.forEach((movie) => {
    moviesGrid.appendChild(
      createMovieCard(movie, { genres: moviesGenres.genres })
    )
  })
} else if (searchParam.trim() !== '') {
  searchParam = searchParam.trim()
  title.textContent = `Pesquisa por "${searchParam}"`

  try {
    const movies = await tmdb.searchMovie(searchParam)

    if (movies.results.length === 0) {
      moviesGrid.textContent = 'Nenhum filme encontrado.'
    } else {
      for (const movie of movies.results) {
        moviesGrid.appendChild(
          createMovieCard(movie, { genres: moviesGenres.genres })
        )
      }
    }
  } catch (e) {
    moviesGrid.textContent = 'Erro ao buscar. Tente novamente.'
  }
} else {
  moviesGrid.textContent =
    'Pesquise no CatMovie uma palavra ou frase na caixa acima'
}
