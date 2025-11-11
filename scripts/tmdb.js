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

  async getMovie(movieId, appendToResponse = [], language = 'pt-BR') {
    let url = `${this.baseURL}/movie/${movieId}?language=${language}`
    if (appendToResponse.length > 0) {
      url += this.appendToResponseURL(appendToResponse)
    }

    try {
      const response = await fetch(url, this.GETOptions)
      if (!response.ok)
        throw new Error(`Movie not found error (status: ${response.status})`)
      const data = await response.json()
      return data
    } catch (error) {
      throw error
    }
  }

  async getSeries(seriesId, appendToResponse = [], language = 'pt-BR') {
    let url = `${this.baseURL}/tv/${seriesId}?language=${language}`
    if (appendToResponse.length > 0)
      url += this.appendToResponseURL(appendToResponse)

    try {
      const response = await fetch(url, this.GETOptions)
      if (!response.ok)
        throw new Error(`Series not found error (status: ${response.status})`)
      const data = await response.json()
      return data
    } catch (error) {
      throw error
    }
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

    try {
      const response = await fetch(url, this.GETOptions)
      if (!response.ok)
        throw new Error(`Season not found (status: ${response.status})`)
      const data = await response.json()
      return data
    } catch (error) {
      throw error
    }
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

    try {
      const response = await fetch(url, this.GETOptions)
      if (!response.ok)
        throw new Error(`Episode not found (status: ${response.status})`)
      const data = await response.json()
      return data
    } catch (error) {
      throw error
    }
  }

  async getPerson(personId, appendToResponse = [], language = 'pt-BR') {
    let url = `${this.baseURL}/person/${personId}?language=${language}`
    if (appendToResponse.length > 0)
      url += this.appendToResponseURL(appendToResponse)

    try {
      const response = await fetch(url, this.GETOptions)
      if (!response.ok)
        throw new Error(`Person not found error (status: ${response.status})`)
      const data = await response.json()
      return data
    } catch (error) {
      throw error
    }
  }

  async getCompany(companyId) {
    let url = `${this.baseURL}/company/${companyId}`

    try {
      const response = await fetch(url, this.GETOptions)
      if (!response.ok)
        throw new Error(`Company not found error (status: ${response.status})`)
      const data = await response.json()
      return data
    } catch (error) {
      throw error
    }
  }

  async getMovieGenresList(language = 'pt-BR') {
    const url = `${this.baseURL}/genre/movie/list?language=${language}`
    try {
      const response = await fetch(url, this.GETOptions)
      if (!response.ok)
        throw new Error(
          `Error fetching movie genres (status: ${response.status})`
        )
      const data = await response.json()
      return data
    } catch (error) {
      throw error
    }
  }

  async getSeriesGenresList(language = 'pt-BR') {
    const url = `${this.baseURL}/genre/tv/list?language=${language}`
    try {
      const response = await fetch(url, this.GETOptions)
      if (!response.ok)
        throw new Error(
          `Error fetching series genres (status: ${response.status})`
        )
      const data = await response.json()
      return data
    } catch (error) {
      throw error
    }
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
    if (primaryReleaseYear !== 0)
      url += `&primary_release_year=${primaryReleaseYear}`
    if (year !== 0) url += `&year=${year}`
    if (region !== '') url += `&region=${region}`

    try {
      const response = await fetch(url, this.GETOptions)
      if (!response.ok)
        throw new Error(`No movies found (status ${response.status})`)
      const data = await response.json()
      return data
    } catch (error) {
      throw error
    }
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
    if (firstAirDateYear !== 0)
      url += `&first_air_date_year=${firstAirDateYear}`
    if (year !== 0) url += `&year=${year}`

    try {
      const response = await fetch(url, this.GETOptions)
      if (!response.ok)
        throw new Error(`No series found (status ${response.status})`)
      const data = await response.json()
      return data
    } catch (error) {
      throw error
    }
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

    try {
      const response = await fetch(url, this.GETOptions)
      if (!response.ok)
        throw new Error(`No person found (status ${response.status})`)
      const data = await response.json()
      return data
    } catch (error) {
      throw error
    }
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

    try {
      const response = await fetch(url, this.GETOptions)
      if (!response.ok)
        throw new Error(
          `No series, movie or person found (status ${response.status})`
        )
      const data = await response.json()
      return data
    } catch (error) {
      throw error
    }
  }
}
