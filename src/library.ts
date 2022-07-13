import {createArticles, getArticles } from "./articles";

localStorage.removeItem('loglevel:webpack-dev-server')
let ids = Object.keys(localStorage)
let search = new URLSearchParams(document.location.search)

const articles = document.getElementById('articles') as HTMLDivElement
const info = document.createElement('h1') as HTMLHeadingElement
articles.append(info)

if (ids.length > 0) {
  let url = 'https://api.spaceflightnewsapi.net/v3/articles?id=' + ids.join('&id=')
  url += search.has('sort')? `&_sort=${search.get('sort')}` : ''
  url += search.has('order')? `:${search.get('order')}` : ''

  let articles = await getArticles(url)
  info.innerText = 'Saved articles'
  createArticles(articles)

}
else {
  info.innerText = 'No articles saved! Return to home page and save some.'
}

const saveButtons = document.querySelectorAll('.save')
for (let button of saveButtons) {
  button.addEventListener('click', () => {
    // @ts-ignore
    let buttonArticle = button.parentElement.parentElement
    // @ts-ignore
    articles.removeChild(buttonArticle)
  })
}