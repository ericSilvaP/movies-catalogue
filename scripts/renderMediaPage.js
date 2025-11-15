export async function renderMediaPage({
  tmdb,
  cardCreator,
  discoverFunction,
  discoverOptions,
  genresFunction,
  emptyMessage,
  grid,
  type = 'multi', // movie | tv | multi
}) {
  const params = new URLSearchParams(window.location.search)
  const title = document.querySelector('.title-section')
  let searchParam = params.get('query')

  const genresData = await genresFunction()
  const genres = genresData.genres

  if (!searchParam) {
    const data = await discoverFunction(discoverOptions)
    data.results.forEach((item) =>
      grid.appendChild(cardCreator(item, { genres }))
    )
    return
  }

  searchParam = searchParam.trim()

  if (searchParam === '') {
    grid.textContent =
      'Pesquise no CatMovie uma palavra ou frase na caixa acima'
    return
  }

  title.textContent = `Pesquisa por "${searchParam}"`

  try {
    let resultsData

    if (type === 'movie') {
      resultsData = await tmdb.searchMovie(searchParam)
    } else if (type === 'tv') {
      resultsData = await tmdb.searchTV(searchParam)
    } else {
      resultsData = await tmdb.searchMulti(searchParam)
    }

    const results = resultsData.results

    if (!results.length) {
      grid.textContent = emptyMessage
      return
    }

    results.forEach((item) => {
      if (type === 'multi') {
        if (item.media_type === 'movie' || item.media_type === 'tv') {
          grid.appendChild(cardCreator(item, { genres }))
        }
      } else {
        grid.appendChild(cardCreator(item, { genres }))
      }
    })
  } catch (err) {
    grid.textContent = 'Erro ao buscar. Tente novamente.'
  }
}
