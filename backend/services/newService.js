import axios from "axios";
import filterDuplicates from "../utils/filterDuplicateNews.js";

export async function fetchGNews(limit = 10) {
  const response = await axios.get("https://gnews.io/api/v4/search", {
    params: {
      q: '(environment OR climate OR "clean energy" OR "renewable energy" OR pollution OR biodiversity OR "carbon emissions") AND NOT (politics OR war OR sports OR entertainment)',
      sortBy: "publishedAt",
      pageSize: limit,
      lang: "en",
      apikey: process.env.GNEWS_API_KEY,
    },
  });

  const articles = response.data.articles.map((a) => ({
    id: a.url,
    title: a.title,
    summary: a.description || "No description available",
    image: a.image || "/images/news-placeholder.png",
    date: a.publishedAt,
    source: a.source?.name || "Unknown Source",
    url: a.url,
  }));

  return filterDuplicates(articles);
}
