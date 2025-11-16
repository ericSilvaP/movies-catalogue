import { API_READ_KEY } from './constants.js'
import { createMediaDetailsPage } from './elementsFactory.js'
import { hideLoading, showLoading } from './loading.js'
import { TMDb } from './tmdb.js'

showLoading()
const tmdb = new TMDb(API_READ_KEY)
const params = new URLSearchParams(window.location.search)
const id = params.get('id')
const tv = await tmdb.getTV(id, ['credits', 'images', 'recommendations'])
const genres = await tmdb.getTVGenresList()
const main = document.querySelector('main')

console.log(tv)
main.appendChild(createMediaDetailsPage(tv, genres.genres))
hideLoading()
