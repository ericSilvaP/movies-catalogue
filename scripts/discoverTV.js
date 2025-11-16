import { API_READ_KEY } from './constants.js'
import { createTVCard } from './elementsFactory.js'
import { renderMediaPage } from './renderMediaPage.js'
import { TMDb } from './tmdb.js'

const tmdb = new TMDb(API_READ_KEY)
const currentYear = new Date().getFullYear()
const mediaGrid = document.querySelector('.media-cards')
const paginationDiv = document.querySelector('#pagination')

renderMediaPage({
  tmdb,
  type: 'tv',
  cardCreator: createTVCard,
  discoverFunction: tmdb.discoverTV.bind(tmdb),
  discoverOptions: { firstAirYear: currentYear },
  genresFunction: tmdb.getTVGenresList.bind(tmdb),
  grid: mediaGrid,
  emptyMessage: 'Nenhuma série encontrada.',
  paginationDiv: paginationDiv,
})
