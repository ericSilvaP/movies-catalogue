export class TMBd {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.baseURL = 'https://api.themoviedb.org/3'
  }

  async getMovie(movieId, appendToResponse = [], language = 'pt-BR') {
    let url = `${this.baseURL}/movie/${movieId}?language=${language}`
    if (appendToResponse.length > 0) {
      url += `&append_to_response=${appendToResponse.join(',')}`
    }
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
    }

    try {
      const response = await fetch(url, options)
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
      url += `&append_to_response=${appendToResponse.join(',')}`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
    }

    try {
      const response = await fetch(url, options)
      if (!response.ok)
        throw new Error(`Series not found error (status: ${response.status})`)
      const data = await response.json()
      return data
    } catch (error) {
      throw error
    }
  }
}
