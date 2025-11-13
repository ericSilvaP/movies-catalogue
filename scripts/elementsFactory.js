function createImg(src) {
  const imgDiv = document.createElement('img')
  imgDiv.src = src

  return imgDiv
}

export function createMovieCard(movie) {
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
