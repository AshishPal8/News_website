const API_KEY = "aab00d7691a648b7a8f6f4a323639c2e";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
  window.location.reload();
}

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  console.log(data);
  bindData(data.articles);
}

function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");

  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDateInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

function fillDateInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name}  •  ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

let curSelectednav = null;
function onNavItemClick(id) {
  fetchNews(id);

  const navItem = document.getElementById(id);
  curSelectednav?.classList.remove("active");
  curSelectednav = navItem;
  curSelectednav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  curSelectednav?.classList.remove("active");
  curSelectednav = null;
});
