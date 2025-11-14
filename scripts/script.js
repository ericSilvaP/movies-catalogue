import { createMovieCard } from './elementsFactory.js'
import { filterByGenre, TMDb } from './tmdb.js'

export const API_READ_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNmIzYWJkNGNiOGUwNzVmOWJmY2VmOTc0MjBmOTcwYiIsIm5iZiI6MTc2MjUzODI3NS4wNTUsInN1YiI6IjY5MGUzMzIzMTJjYTQ3NmQ1YWRkMTM0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nQVRoTRaMxb23ama7ncrz-4yfoLpE-gytcNskMwsD0E'
const moviesGrid = document.querySelector('.movie-cards')
const tmdb = new TMDb(API_READ_KEY)

tmdb
  .getMovie(680)
  .then((movie) => {
    moviesGrid.appendChild(createMovieCard(movie))
  })
  .catch((err) => {
    console.error(err)
  })

// tmdb
//   .getCompany(10220)
//   .then((person) => {
//     console.log(person.name)
//   })
//   .catch((err) => {
//     console.error(err)
//   })

const seriesGenres = await tmdb.getSeriesGenresList()
// console.log(seriesGenres.genres.map((genre) => genre.name))

const movies = await tmdb.searchMovie('ocean', {
  page: 10,
  includeAdult: true,
})
// console.log(movies.results)

console.log(filterByGenre(movies.results, 1))

const season = await tmdb.getSeriesSeason(123, 1)
// console.log(season)

const episode = await tmdb.getSeriesEpisode(123, 1, 3)
// console.log(episode)

const popular = await tmdb.getPopular('tv', { page: 3 })
// console.log(popular)

const trending = await tmdb.getTrending('movie', 'day', 3)
// console.log(trending)
