import { createMovieCard } from './elementsFactory.js'
import { TMDb } from './tmdb.js'

export const API_READ_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNmIzYWJkNGNiOGUwNzVmOWJmY2VmOTc0MjBmOTcwYiIsIm5iZiI6MTc2MjUzODI3NS4wNTUsInN1YiI6IjY5MGUzMzIzMTJjYTQ3NmQ1YWRkMTM0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nQVRoTRaMxb23ama7ncrz-4yfoLpE-gytcNskMwsD0E'
const moviesGrid = document.querySelector('.movie-cards')
const tmdb = new TMDb(API_READ_KEY)
const params = new URLSearchParams(window.location.search)
let searchParam = params.get('query')

// tmdb
//   .getCompany(10220)
//   .then((person) => {
//     console.log(person.name)
//   })
//   .catch((err) => {
//     console.error(err)
//   })

const seriesGenres = await tmdb.getSeriesGenresList()
const moviesGenres = await tmdb.getMovieGenresList()
// console.log(seriesGenres.genres.map((genre) => genre.id))

const movies = await tmdb.searchMovie('d', {
  page: 120,
})
if (!searchParam) {
  movies.results.forEach((movie) => {
    moviesGrid.appendChild(
      createMovieCard(movie, { genres: moviesGenres.genres })
    )
  })
}
// console.log(movies.results)

// console.log(filterByGenre(movies.results, 1))

const season = await tmdb.getSeriesSeason(123, 1)
// console.log(season)

const episode = await tmdb.getSeriesEpisode(123, 1, 3)
// console.log(episode)

const popular = await tmdb.getPopular('tv', { page: 3 })
// console.log(popular)

const trending = await tmdb.getTrending('movie', 'day', 3)
// console.log(trending)
