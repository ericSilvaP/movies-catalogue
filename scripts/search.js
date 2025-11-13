import { createMovieCard } from './elementsFactory.js'
import { API_READ_KEY } from './script.js'
import { TMBd } from './tmdb.js'

const params = new URLSearchParams(window.location.search)
const searchParam = params.get('query').trim()
const moviesGrid = document.querySelector('#movies')
const tmdb = new TMBd(API_READ_KEY)

if (searchParam !== undefined && searchParam !== '') {
  const movies = await tmdb.searchMovie(searchParam)
  for (let movie of movies.results)
    moviesGrid.appendChild(createMovieCard(movie))
} else {
  moviesGrid.textContent =
    'Pesquise no CatMovie uma palavra ou frase na caixa acima'
}
