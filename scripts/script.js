import { createMovieCard } from './elementsFactory.js'
import { filterByGenre, TMBd } from './tmdb.js'

const API_READ_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNmIzYWJkNGNiOGUwNzVmOWJmY2VmOTc0MjBmOTcwYiIsIm5iZiI6MTc2MjUzODI3NS4wNTUsInN1YiI6IjY5MGUzMzIzMTJjYTQ3NmQ1YWRkMTM0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nQVRoTRaMxb23ama7ncrz-4yfoLpE-gytcNskMwsD0E'
const LANGUAGE = 'pt-BR'
const url = `https://api.themoviedb.org/3/search/movie?query=Ocean&language=${LANGUAGE}`
const imgURL = 'https://image.tmdb.org/t/p/original'
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_READ_KEY}`,
  },
}
const moviesGrid = document.querySelector('#movies')
const tmdb = new TMBd(API_READ_KEY)

const json = fetch(url, options)
  .then((res) => res.json())
  .then((json) => {
    for (const movie of json.results) {
      moviesGrid.appendChild(createMovieCard(movie))
    }
    return json
  })
  .catch((err) => console.error(err))

json.then((json) => {
  console.log(json)
})

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
console.log(seriesGenres.genres.map((genre) => genre.name))

const movies = await tmdb.searchMovie('ocean', {
  page: 10,
  includeAdult: true,
})
console.log(movies.results)

console.log(filterByGenre(movies.results, 35))

const season = await tmdb.getSeriesSeason(123, 1)
console.log(season)

const episode = await tmdb.getSeriesEpisode(123, 1, 3)
console.log(episode)

const popular = await tmdb.getPopular('tv', { page: 3 })
console.log(popular)

const trending = await tmdb.getTrending('movie', 'day', 3)
console.log(trending)
