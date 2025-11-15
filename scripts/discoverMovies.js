import { API_READ_KEY } from './constants.js'
import { createMovieCard } from './elementsFactory.js'
import { renderMediaPage } from './renderMediaPage.js'
import { TMDb } from './tmdb.js'

const tmdb = new TMDb(API_READ_KEY)
const currentYear = new Date().getFullYear()
const mediaGrid = document.querySelector('.media-cards')
const paginationDiv = document.querySelector('#pagination')

renderMediaPage({
  tmdb,
  type: 'movie',
  cardCreator: createMovieCard,
  discoverFunction: tmdb.discoverMovie.bind(tmdb),
  discoverOptions: { primaryReleaseYear: currentYear },
  genresFunction: tmdb.getMovieGenresList.bind(tmdb),
  grid: mediaGrid,
  emptyMessage: 'Nenhum filme encontrado.',
  paginationDiv: paginationDiv,
})
