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

  async getMovie(movieId, appendToResponse = [], language = 'pt-BR') {
    let url = `${this.baseURL}/movie/${movieId}?language=${language}`
    if (appendToResponse.length > 0) {
      url += this.appendToResponseURL(appendToResponse)
    }

    try {
      const response = await fetch(url, this.GETOptions)
      if (!response.ok)
        throw new Error(`Falha ao buscar o filme (status: ${response.status})`)
      const data = await response.json()
      return data
    } catch (error) {
      throw error
    }
  }

  async getSeries(seriesId, appendToResponse = [], language = 'pt-BR') {
    const url = `${this.baseURL}/tv/${seriesId}?language=${language}`
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

  async getPerson(personId, appendToResponse = [], language = 'pt-BR') {
    const url = `${this.baseURL}/person/${personId}?language=${language}`
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
}
