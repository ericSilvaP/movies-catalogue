function createImg(src) {
  const img = document.createElement('img')
  img.src = src
  return img
}

function $(tagName) {
  return document.createElement(tagName)
}

function getPoster(src) {
  return src
    ? 'https://image.tmdb.org/t/p/original' + src
    : '/assets/images/not-found-img.png'
}

function resolveGenres(media, genres) {
  return media.genres
    ? media.genres
    : genres.filter((g) => media.genre_ids?.includes(g.id))
}

function createMediaCard(
  media,
  { titleKey = 'title', dateKey = 'release_date', genres = [] } = {}
) {
  // === CARD ===
  const card = $('div')
  card.classList.add('card-media')

  // === POSTER ===
  const img = createImg(getPoster(media.poster_path))
  img.classList.add('img-media')
  img.id = 'img-media'
  img.alt = media[titleKey]

  // === TÍTULO ===
  const title = $('h2')
  title.classList.add('title-media')
  title.id = 'title-media'
  title.textContent = media[titleKey] || '---'

  // === INFO (rating + data) ===
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
    media.vote_average ? media.vote_average.toFixed(2) : '---'
  }</span>/10`

  ratingInfo.append(star, ratingP)

  const dateP = $('p')
  dateP.classList.add('data-media')
  dateP.id = 'data-media'
  dateP.textContent = media[dateKey] || '---'

  info.append(ratingInfo, dateP)

  // === GÊNEROS ===
  const genresDiv = $('div')
  genresDiv.classList.add('genres-media')

  const resolvedGenres = resolveGenres(media, genres)

  resolvedGenres.slice(0, 3).forEach((g) => {
    const div = $('div')
    div.classList.add('genre')

    const p = $('p')
    p.textContent = g.name

    div.appendChild(p)
    genresDiv.appendChild(div)
  })

  // === CONTAINER ===
  const contentDiv = $('div')
  contentDiv.classList.add('media-content')
  contentDiv.append(title, info, genresDiv)

  // === FINAL ===
  card.append(img, contentDiv)
  return card
}

export function createMovieCard(movie, options = {}) {
  return createMediaCard(movie, {
    titleKey: 'title',
    dateKey: 'release_date',
    ...options,
  })
}

export function createTVCard(tv, options = {}) {
  return createMediaCard(tv, {
    titleKey: 'name',
    dateKey: 'first_air_date',
    ...options,
  })
}
