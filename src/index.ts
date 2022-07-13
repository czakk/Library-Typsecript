import { createArticles, getArticles } from "./articles";

async function getArticlesCount(url: string) {
  return await fetch(url)
    .then(res => res.json())
    .then(data => data)
}

let totalArticles = await getArticlesCount('https://api.spaceflightnewsapi.net/v3/articles/count')
const limitInput = document.getElementById('limit') as HTMLInputElement
limitInput.max = totalArticles

let limit: number
let search = new URLSearchParams(document.location.search)

// @ts-ignore
limit = search.has('limit')? search.get('limit') : 15

let url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=${limit}`
let articles = await getArticles(url)

const articlesContainer = document.getElementById('articles') as HTMLDivElement
const header = document.createElement('h2') as HTMLHeadingElement
header.innerText = `Fetched articles: ${articles.length} of ${totalArticles}`
articlesContainer.append(header)

let start = 0
let stop = 5

createArticles(articles.slice(start, stop))


document.addEventListener('scroll', async () => {

  let margin = document.documentElement.offsetHeight - window.innerHeight - 10;
  if (document.documentElement.scrollTop > margin) {
    start += 5
    stop += 5
    createArticles(articles.slice(start, stop))
  }
});