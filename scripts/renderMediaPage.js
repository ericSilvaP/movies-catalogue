import { createPagination } from '/scripts/pagination.js'

export async function renderMediaPage({
  tmdb,
  cardCreator,
  discoverFunction,
  discoverOptions,
  genresFunction,
  emptyMessage,
  grid,
  paginationDiv,
  type = 'multi',
}) {
  const params = new URLSearchParams(window.location.search)
  const title = document.querySelector('.title-section')
  let searchParam = params.get('query')

  const genresData = await genresFunction()
  const genres = genresData.genres

  async function fetchPage(page = 1) {
    if (!searchParam) {
      return await discoverFunction({ ...discoverOptions, page })
    }

    searchParam = searchParam.trim()

    if (searchParam === '') {
      grid.textContent =
        'Pesquise no CatMovie uma palavra ou frase na caixa acima'
      return { results: [], total_pages: 1 }
    }

    title.textContent = `Pesquisa por "${searchParam}"`

    let data
    if (type === 'movie') data = await tmdb.searchMovie(searchParam, page)
    else if (type === 'tv') data = await tmdb.searchTV(searchParam, page)
    else data = await tmdb.searchMulti(searchParam, page)

    // multi → filtrar
    if (type === 'multi') {
      data.results = data.results.filter(
        (i) => i.media_type === 'movie' || i.media_type === 'tv'
      )
    }

    if (!data.results.length) {
      grid.textContent = emptyMessage
    }

    return data
  }

  const pagination = createPagination({
    paginationDiv,
    grid,
    fetchPage,
    cardCreator,
    genres,
  })

  pagination.load(1)
}
