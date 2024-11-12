import './style.css'
import { INews, IArticle, ISource, IID } from './interfaces/INews';
import { languagesWithCodes } from './countries';

const API_KEY = 'apiKey=e9431aa735db410ebb9fcb58d7053da5';
const BASE_URL = `https://newsapi.org/v2/everything?`;

//* -------------------- Selecting HTML Elements --------------------
const searchKeywordInput = document.querySelector('#searchKeyword') as HTMLInputElement;
const languageSelect = document.querySelector('#languageSelect') as HTMLSelectElement;
const sortBySelect = document.querySelector('#sortBySelect') as HTMLSelectElement;
const searchBtn = document.querySelector('button') as HTMLButtonElement;
const showResultsDiv = document.querySelector('#showResults') as HTMLDivElement;

//| ------------------ Creating Option Elements ------------------
languagesWithCodes.forEach((language) => {
  const optionElement = document.createElement('option') as HTMLOptionElement;
  optionElement.textContent = language[0];
  optionElement.value = language[1];
  languageSelect.appendChild(optionElement);
})

//? -------------------- Declaring functions --------------------
function searchNews(url: string) {
  fetch(url)
    .then((response) => {
      return response.json();
    }).then((data: any) => {
      const news = data as INews;
      news.articles.forEach((article) => createArticles(article.title, article.description, article.urlToImage, article.url));
    })
}

function createArticles(title: string, description: string, imgUrl: string | null, link: string) {
  //* ------------------ Creating HTML elements ------------------
  const articleContainer = document.createElement('div') as HTMLDivElement;
  articleContainer.classList.add('article__container');
  const titleHeadline = document.createElement('h3') as HTMLHeadElement;
  const descriptionPElement = document.createElement('div') as HTMLParagraphElement;
  const articleImg = document.createElement('img') as HTMLImageElement;
  const articleLink = document.createElement('a') as HTMLAnchorElement;
  const linkBtn = document.createElement('button') as HTMLButtonElement;

  //* ------------------ Assigning data ------------------
  titleHeadline.textContent = title;
  descriptionPElement.textContent = description;
  imgUrl ? articleImg.src = imgUrl : articleImg.src = 'https://placeholder.pics/svg/150x150/DEDEDE/555555/Image%20not%20found';
  articleLink.href = link;
  linkBtn.textContent = 'Zum Artikel';

  //* ------------------ Apendding HTML elements ------------------
  articleLink.appendChild(linkBtn);
  articleContainer.append(titleHeadline, descriptionPElement, articleImg, articleLink);
  showResultsDiv.appendChild(articleContainer);
}

//? ------------------ Button events ------------------
searchBtn.addEventListener('click', () => {
  showResultsDiv.innerHTML = '';

  const language_URL = `language=${languageSelect.value}`;
  const sortBy_URL = `sortBy=${sortBySelect.value}`;
  const searchKeyword = searchKeywordInput.value.trim();
  const search_URL = `${BASE_URL}q=${searchKeyword}&${sortBy_URL}&${language_URL}&${API_KEY}`;
  searchNews(search_URL);
})

console.log(`${BASE_URL}q=Berlin&language=en&${API_KEY}`);
