const params = new URLSearchParams(window.location.search)
const pageNumber = params.get('page')

console.log(pageNumber)
