import { API_READ_KEY } from './constants.js'
import { createMovieCard, createTVCard } from './elementsFactory.js'
import { TMDb } from './tmdb.js'

const moviesGrid = document.querySelector('.media-cards')
const tmdb = new TMDb(API_READ_KEY)
const params = new URLSearchParams(window.location.search)
let searchParam = params.get('query')
const currentYear = new Date().getFullYear()
const tvGenres = await tmdb.getTVGenresList()
const title = document.querySelector('.title-section')
const tv = await tmdb.discoverTV({
  firstAirYear: currentYear,
})
if (searchParam === null) {
  tv.results.forEach((movie) => {
    moviesGrid.appendChild(createTVCard(movie, { genres: tvGenres.genres }))
  })
} else if (searchParam.trim() !== '') {
  searchParam = searchParam.trim()
  title.textContent = `Pesquisa por "${searchParam}"`

  try {
    const movies = await tmdb.searchMovie(searchParam)

    if (movies.results.length === 0) {
      moviesGrid.textContent = 'Nenhuma série encontrada.'
    } else {
      for (const movie of movies.results) {
        moviesGrid.appendChild(
          createMovieCard(movie, { genres: tvGenres.genres })
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
