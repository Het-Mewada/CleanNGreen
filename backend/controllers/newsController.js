import NewsCache from "../models/newCacheModel.js";

async function fetchNews(req, res) {
  try {
    const cache = await NewsCache.findOne({ source: "gnews" });
    if (!cache || !cache.articles.length) {
      return res.status(503).json({
        message: "News temporarily unavailable. Please try again later.",
      });
    }
    res.json({
      lastUpdatedAt: cache.lastUpdatedAt,
      articles: cache.articles,
    });
  } catch (error) {
    console.log("News Controller error : ", error.message);
    res.status(500).json({ message: "Failed to load news" });
  }
}
export default fetchNews;
