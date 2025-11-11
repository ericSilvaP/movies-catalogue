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

    console.log(url)

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
}

export async function getMovie(
  movieId,
  apiKey,
  appendToResponse = [],
  language = 'pt-BR'
) {
  let url = `https://api.themoviedb.org/3/movie/${movieId}?language=${language}`
  if (appendToResponse.length > 0) {
    url += `&append_to_response=${appendToResponse.join(',')}`
  }
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
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
