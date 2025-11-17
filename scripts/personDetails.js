import { API_READ_KEY } from './constants.js'
import { createPeopleDetails } from './elementsFactory.js'
import { TMDb } from './tmdb.js'

const tmdb = new TMDb(API_READ_KEY)
const params = new URLSearchParams(window.location.search)
const id = params.get('id')

const person = await tmdb.getPerson(id, [
  'images',
  'movie_credits',
  'tv_credits',
])

const container = document.querySelector('main')
container.appendChild(createPeopleDetails(person))
