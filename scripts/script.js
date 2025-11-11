import { TMBd } from './tmdb.js'

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

function createImg(src) {
  const imgDiv = document.createElement('img')
  imgDiv.src = src

  return imgDiv
}

function createMovieCard(movie) {
  const movieCard = document.createElement('div')
  const poster = document.createElement('div')
  const titleDiv = document.createElement('div')
  const subTitleDiv = document.createElement('div')
  const releaseDateDiv = document.createElement('div')
  const ratingDiv = document.createElement('div')
  const title = document.createElement('h2')
  const description = document.createElement('p')

  movieCard.classList.add('movie-container')
  poster.classList.add('poster')
  poster.appendChild(
    createImg('https://image.tmdb.org/t/p/original' + movie.poster_path)
  )

  title.textContent = movie.title
  titleDiv.classList.add('title')
  titleDiv.appendChild(title)

  subTitleDiv.classList.add('sub-title')
  releaseDateDiv.classList.add('release-date')
  ratingDiv.classList.add('rating')
  releaseDateDiv.textContent = movie.release_date
  ratingDiv.textContent = movie.vote_average
  subTitleDiv.append(releaseDateDiv, ratingDiv)

  description.textContent = movie.overview
    ? movie.overview
    : 'Sinopse não disponível'

  movieCard.append(poster, titleDiv, subTitleDiv, description)
  return movieCard
}

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

tmdb
  .getCompany(10220)
  .then((person) => {
    console.log(person.name)
  })
  .catch((err) => {
    console.error(err)
  })

const seriesGenres = await tmdb.getSeriesGenresList()
console.log(seriesGenres.genres.map((genre) => genre.name))

const movies = await tmdb.searchMulti('bill', {
  page: 10,
  includeAdult: true,
})
console.log(movies.results)

const season = await tmdb.getSeriesSeason(123, 1)
console.log(season)

const episode = await tmdb.getSeriesEpisode(123, 1, 3)
console.log(episode)

const popular = await tmdb.getPopular('tv', { page: 3 })
console.log(popular)

const trending = await tmdb.getTrending('movie', 'day', 3)
console.log(trending)
