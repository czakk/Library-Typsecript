export async function getArticles(url: string){
  return await fetch(url)
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log('ERROR'))
}

const articlesContainer = document.getElementById('articles') as HTMLDivElement
// @ts-ignore
export function createArticles(articles) {
  for (let articleData of articles) {
    const article = document.createElement('div') as HTMLDivElement
    article.classList.add('article')

    const photo = document.createElement('div') as HTMLDivElement
    photo.classList.add('photo')
    const image = document.createElement('img') as HTMLImageElement
    image.src = articleData['imageUrl']
    image.alt = 'Article Photo'
    photo.appendChild(image)

    const info = document.createElement('div') as HTMLDivElement
    info.classList.add('info')
    const infoBy = document.createElement('div') as HTMLDivElement
    infoBy.innerText = `By ${articleData['newsSite']}`

    const infoPublished = document.createElement('div') as HTMLDivElement
    infoPublished.innerText = `Published ${articleData['publishedAt'].slice(0, 10)}`
    info.append(infoBy, infoPublished)

    const summary = document.createElement('div') as HTMLDivElement
    summary.classList.add('summary')

    const title = document.createElement('span') as HTMLSpanElement
    const summaryText = document.createElement('p') as HTMLParagraphElement
    summaryText.innerText = `${articleData['summary'].slice(0, 197)}` + '...'
    title.classList.add('title')
    title.innerText = `${articleData['title']}`
    summary.append(title, summaryText)

    const buttons = document.createElement('div') as HTMLDivElement
    buttons.classList.add('buttons')
    const readButton = document.createElement('button') as HTMLButtonElement
    const saveButton = document.createElement('button') as HTMLButtonElement
    readButton.innerText = 'Read Article'
    readButton.onclick = () => {
      location.href = `${articleData['url']}`
    }
    saveButton.id = articleData['id']
    saveButton.classList.add('save')
    saveButton.innerText = saveButton.id in localStorage ? 'Remove Article' : 'Save Article'

    saveButton.addEventListener('click', () => {
      saveButton.innerText = saveButton.innerText == 'Save Article' ? 'Remove Article' : 'Save Article'
      saveButton.id in localStorage ? localStorage.removeItem(saveButton.id) : localStorage.setItem(saveButton.id, '')
    })

    buttons.append(readButton, saveButton)

    article.append(photo, info, summary, buttons)
    articlesContainer.appendChild(article)
  }
}