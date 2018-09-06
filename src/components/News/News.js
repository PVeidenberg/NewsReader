const url =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=58ff8952774e495aa1046b2ce4b92a7b";

export async function getNews() {
  let result = await fetch(url).then(response => response.json());
  return result.articles;
}
