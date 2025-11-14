function createImg(src) {
  const imgDiv = document.createElement('img')
  imgDiv.src = src

  return imgDiv
}

function $(tagName) {
  return document.createElement(tagName)
}

export function createMovieCard(movie) {
  const card = $('div')
  card.classList.add('card-movie')

  // === POSTER ===
  const img = createImg(
    'https://image.tmdb.org/t/p/original' + movie.poster_path
  )
  img.classList.add('img-movie')
  img.id = 'img-movie'
  img.alt = movie.title

  // === TÍTULO ===
  const title = $('h2')
  title.classList.add('title-movie')
  title.id = 'title-movie'
  title.textContent = movie.title

  // === INFO DO FILME (rating + data) ===
  const info = $('div')
  info.classList.add('info-movie')

  const ratingInfo = $('div')
  ratingInfo.classList.add('rating-info')

  const star = $('p')
  star.innerHTML = `<i class="fa-solid fa-star"></i>`

  const ratingP = $('p')
  ratingP.classList.add('rating')
  ratingP.id = 'rating'
  ratingP.innerHTML = `<span id="rating-number">${movie.vote_average}</span>/10`

  ratingInfo.append(star, ratingP)

  const dateP = $('p')
  dateP.classList.add('data-movie')
  dateP.id = 'data-movie'
  dateP.textContent = movie.release_date

  info.append(ratingInfo, dateP)

  // === GÊNEROS ===
  const genresDiv = $('div')
  genresDiv.classList.add('genres-movie')

  movie.genres?.forEach((g) => {
    const genreDiv = $('div')
    genreDiv.classList.add('genre')

    const p = $('p')
    p.textContent = g.name

    genreDiv.appendChild(p)
    genresDiv.appendChild(genreDiv)
  })

  // === MONTAGEM FINAL ===
  card.append(img, title, info, genresDiv)

  return card
}
