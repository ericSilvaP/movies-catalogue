import { API_READ_KEY } from './constants.js'
import { createMediaDetailsPage } from './elementsFactory.js'
import { hideLoading, showLoading } from './loading.js'
import { TMDb } from './tmdb.js'

showLoading()
const tmdb = new TMDb(API_READ_KEY)
const params = new URLSearchParams(window.location.search)
const id = params.get('id')
const movie = await tmdb.getMovie(id, ['credits', 'images', 'recommendations'])
const genres = await tmdb.getMovieGenresList()
const main = document.querySelector('main')

console.log(movie)
main.appendChild(createMediaDetailsPage(movie, genres.genres))
hideLoading()
