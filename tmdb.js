export class TMBd {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.baseURL = 'https://api.themoviedb.org/3'
    this.GETOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
    }
  }

  appendToResponseURL(extraAttrs) {
    return `&append_to_response=${extraAttrs.join(',')}`
  }

  defaultSearchURL(query, language, page, includeAdult, type) {
    return `${this.baseURL}/search/${type}?query=${encodeURIComponent(
      query
    )}&language=${language}&include_adult=${includeAdult}&page=${page}`
  }

  async fetchJSON(url, errorMessage) {
    try {
      const response = await fetch(url, this.GETOptions)
      if (!response.ok)
        throw new Error(`${errorMessage} (status: ${response.status})`)
      return await response.json()
    } catch (error) {
      console.error(`❌ [TMDb Error]: ${error.message}`)
      throw error
    }
  }

  async getMovie(movieId, appendToResponse = [], language = 'pt-BR') {
    let url = `${this.baseURL}/movie/${movieId}?language=${language}`
    if (appendToResponse.length > 0)
      url += this.appendToResponseURL(appendToResponse)
    return this.fetchJSON(url, 'Movie not found')
  }

  async getSeries(seriesId, appendToResponse = [], language = 'pt-BR') {
    let url = `${this.baseURL}/tv/${seriesId}?language=${language}`
    if (appendToResponse.length > 0)
      url += this.appendToResponseURL(appendToResponse)
    return this.fetchJSON(url, 'Series not found')
  }

  async getSeriesSeason(
    seriesId,
    seasonNumber,
    appendToResponse = [],
    language = 'pt-BR'
  ) {
    let url = `${this.baseURL}/tv/${seriesId}/season/${seasonNumber}?language=${language}`
    if (appendToResponse.length > 0)
      url += this.appendToResponseURL(appendToResponse)
    return this.fetchJSON(url, 'Season not found')
  }

  async getSeriesEpisode(
    seriesId,
    seasonNumber,
    episodeNumber,
    appendToResponse = [],
    language = 'pt-BR'
  ) {
    let url = `${this.baseURL}/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}?language=${language}`
    if (appendToResponse.length > 0)
      url += this.appendToResponseURL(appendToResponse)
    return this.fetchJSON(url, 'Episode not found')
  }

  async getPerson(personId, appendToResponse = [], language = 'pt-BR') {
    let url = `${this.baseURL}/person/${personId}?language=${language}`
    if (appendToResponse.length > 0)
      url += this.appendToResponseURL(appendToResponse)
    return this.fetchJSON(url, 'Person not found')
  }

  async getCompany(companyId) {
    const url = `${this.baseURL}/company/${companyId}`
    return this.fetchJSON(url, 'Company not found')
  }

  async getPopular(type, { page = 1, language = 'pt-BR', region = '' } = {}) {
    let url = `${this.baseURL}/${type}/popular?language=${language}&page=${page}`
    if (region !== '') url += `&region=${region}`
    return this.fetchJSON(url, `No popular ${type} found`)
  }

  async getTrending(type, timeWindow, page = 1, language = 'pt-BR') {
    let url = `${this.baseURL}/trending/${type}/${timeWindow}?language=${language}&page=${page}`
    return this.fetchJSON(url, `No trending ${type} found`)
  }

  async getMovieGenresList(language = 'pt-BR') {
    const url = `${this.baseURL}/genre/movie/list?language=${language}`
    return this.fetchJSON(url, 'Error fetching movie genres')
  }

  async getSeriesGenresList(language = 'pt-BR') {
    const url = `${this.baseURL}/genre/tv/list?language=${language}`
    return this.fetchJSON(url, 'Error fetching series genres')
  }

  async searchMovie(
    query,
    {
      appendToResponse = [],
      language = 'pt-BR',
      includeAdult = false,
      primaryReleaseYear = 0,
      page = 1,
      region = '',
      year = 0,
    } = {}
  ) {
    let url = this.defaultSearchURL(
      query,
      language,
      page,
      includeAdult,
      'movie'
    )
    if (appendToResponse.length > 0)
      url += this.appendToResponseURL(appendToResponse)
    if (primaryReleaseYear) url += `&primary_release_year=${primaryReleaseYear}`
    if (year) url += `&year=${year}`
    if (region) url += `&region=${region}`
    return this.fetchJSON(url, 'No movies found')
  }

  async searchSeries(
    query,
    {
      language = 'pt-BR',
      includeAdult = false,
      firstAirDateYear = 0,
      page = 1,
      year = 0,
    } = {}
  ) {
    let url = this.defaultSearchURL(query, language, page, includeAdult, 'tv')
    if (firstAirDateYear) url += `&first_air_date_year=${firstAirDateYear}`
    if (year) url += `&year=${year}`
    return this.fetchJSON(url, 'No series found')
  }

  async searchPerson(
    query,
    { language = 'pt-BR', includeAdult = false, page = 1 } = {}
  ) {
    let url = this.defaultSearchURL(
      query,
      language,
      page,
      includeAdult,
      'person'
    )
    return this.fetchJSON(url, 'No person found')
  }

  async searchMulti(
    query,
    { language = 'pt-BR', includeAdult = false, page = 1 } = {}
  ) {
    let url = this.defaultSearchURL(
      query,
      language,
      page,
      includeAdult,
      'multi'
    )
    return this.fetchJSON(url, 'No series, movie or person found')
  }
}

export function filterByGenre(list, genreId) {
  if (!Array.isArray(list)) {
    console.error('List parameter must be array o be filtered')
    return []
  }

  return list.filter(
    (item) => Array.isArray(item.genre_ids) && item.genre_ids.includes(genreId)
  )
}
