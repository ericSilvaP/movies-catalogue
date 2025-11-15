import { createMovieCard } from './elementsFactory.js'
import { API_READ_KEY } from './script.js'
import { TMDb } from './tmdb.js'

const params = new URLSearchParams(window.location.search)
const moviesGrid = document.querySelector('.movie-cards')
const tmdb = new TMDb(API_READ_KEY)
let searchParam = params.get('query')
const moviesGenres = await tmdb.getMovieGenresList()

if (searchParam.trim() !== '') {
  searchParam = searchParam.trim()

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
    moviesGrid.textContent = 'Erro ao buscar filmes. Tente novamente.'
  }
} else {
  moviesGrid.textContent =
    'Pesquise no CatMovie uma palavra ou frase na caixa acima'
}
