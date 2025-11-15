function createImg(src) {
  const imgDiv = document.createElement('img')
  imgDiv.src = src

  return imgDiv
}

function $(tagName) {
  return document.createElement(tagName)
}

export function createMovieCard(movie, { genres = [] } = {}) {
  const card = $('div')
  card.classList.add('card-media')

  let src = ''
  // === POSTER ===
  if (movie.poster_path) {
    src = 'https://image.tmdb.org/t/p/original' + movie.poster_path
  } else {
    src = '/assets/images/not-found-img.png'
  }
  const img = createImg(src)
  img.classList.add('img-media')
  img.id = 'img-media'
  img.alt = movie.title

  // === TÍTULO ===
  const title = $('h2')
  title.classList.add('title-media')
  title.id = 'title-media'
  title.textContent = movie.title ? movie.title : '---'

  // === INFO DO FILME (rating + data) ===
  const info = $('div')
  info.classList.add('info-media')

  const ratingInfo = $('div')
  ratingInfo.classList.add('rating-info')

  const star = $('p')
  star.innerHTML = `<i class="fa-solid fa-star"></i>`

  const ratingP = $('p')
  ratingP.classList.add('rating')
  ratingP.id = 'rating'
  ratingP.innerHTML = `<span id="rating-number">${
    movie.vote_average ? movie.vote_average.toFixed(2) : '---'
  }</span>/10`
  ratingInfo.append(star, ratingP)

  const dateP = $('p')
  dateP.classList.add('data-media')
  dateP.id = 'data-media'
  dateP.textContent = movie.release_date ? movie.release_date : '---'

  info.append(ratingInfo, dateP)

  // === GÊNEROS ===
  const genresDiv = $('div')
  genresDiv.classList.add('genres-media')

  genres = movie.genres
    ? movie.genres
    : genres.filter((g) => movie.genre_ids.includes(g.id))

  genres.slice(0, 3).forEach((g) => {
    const genreDiv = $('div')
    genreDiv.classList.add('genre')

    const p = $('p')
    p.textContent = g.name

    genreDiv.appendChild(p)
    genresDiv.appendChild(genreDiv)
  })

  // === CONTAINER COM INFORMAÇÕES
  const contentDiv = $('div')
  contentDiv.classList.add('media-content')
  contentDiv.append(title, info, genresDiv)

  // === MONTAGEM FINAL ===
  card.append(img, contentDiv)

  return card
}

export function createTVCard(tv, { genres = [] } = {}) {
  const card = $('div')
  card.classList.add('card-media')

  let src = ''
  // === POSTER ===
  if (tv.poster_path) {
    src = 'https://image.tmdb.org/t/p/original' + tv.poster_path
  } else {
    src = '/assets/images/not-found-img.png'
  }
  const img = createImg(src)
  img.classList.add('img-media')
  img.id = 'img-media'
  img.alt = tv.name

  // === TÍTULO ===
  const title = $('h2')
  title.classList.add('title-media')
  title.id = 'title-media'
  title.textContent = tv.name ? tv.name : '---'

  // === INFO Da SÉRIE (rating + data) ===
  const info = $('div')
  info.classList.add('info-media')

  const ratingInfo = $('div')
  ratingInfo.classList.add('rating-info')

  const star = $('p')
  star.innerHTML = `<i class="fa-solid fa-star"></i>`

  const ratingP = $('p')
  ratingP.classList.add('rating')
  ratingP.id = 'rating'
  ratingP.innerHTML = `<span id="rating-number">${
    tv.vote_average ? tv.vote_average.toFixed(2) : '---'
  }</span>/10`
  ratingInfo.append(star, ratingP)

  const dateP = $('p')
  dateP.classList.add('data-media')
  dateP.id = 'data-media'
  dateP.textContent = tv.first_air_date ? tv.first_air_date : '---'

  info.append(ratingInfo, dateP)

  // === GÊNEROS ===
  const genresDiv = $('div')
  genresDiv.classList.add('genres-media')

  genres = tv.genres
    ? tv.genres
    : genres.filter((g) => tv.genre_ids.includes(g.id))

  genres.slice(0, 3).forEach((g) => {
    const genreDiv = $('div')
    genreDiv.classList.add('genre')

    const p = $('p')
    p.textContent = g.name

    genreDiv.appendChild(p)
    genresDiv.appendChild(genreDiv)
  })

  // === CONTAINER COM INFORMAÇÕES
  const contentDiv = $('div')
  contentDiv.classList.add('media-content')
  contentDiv.append(title, info, genresDiv)

  // === MONTAGEM FINAL ===
  card.append(img, contentDiv)

  return card
}
