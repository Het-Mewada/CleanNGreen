import NewsCache from "../models/newCacheModel.js";

async function fetchNews(req, res) {
  try {
    const cache = await NewsCache.findOne({ source: "gnews" });
    console.log("cache : ", cache);
    if (!cache || !cache.articles.length) {
      return res.status(503).json({
        message: "News temporarily unavailable. Please try again later.",
      });
    }
    console.log("got news from here");
    res,
      json({
        lastUpdatedAt: cache.lastUpdatedAt,
        articles: cache.articles,
      });
  } catch (error) {
    console.log("News Serve error : ", error.message);
    res.status(500).json({ message: "Failed to load news" });
  }
}
export default fetchNews;
