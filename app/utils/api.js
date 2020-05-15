export function fetchPopularRepos(language) {
  const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:
    ${language}&sort=stars&order=desc&type=Repositories`)

  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      if(!data.items) {
        throw new Error(data.message)
        // we'll put the catch in the UI layer rather than here. since there's nothing we can do here.
      }

      return data.items
    })
  }
