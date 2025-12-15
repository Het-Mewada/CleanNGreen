import express from "express";
import axios from "axios";
import filterDuplicates from "../utils/filterDuplicateNews.js";

async function fetchNews (req, res) {
  try {
    const { source = "gnews", limit = 3 } = req.query;
    let articles = [];

    // if (source === "newsapi") {
    //   const response = await axios.get(
    //     "https://newsapi.org/v2/everything",
    //     {
    //       params: {
    //         q: 'environment AND sustainability AND "clean energy"',
    //         sortBy: "publishedAt",
    //         pageSize: limit,
    //         apiKey: process.env.NEWSAPI_KEY,
    //       },
    //     }
    //   );


    //   articles = response.data.articles.map((a) => ({
    //     id: a.url,
    //     title: a.title,
    //     summary: a.description || "No description available",
    //     image: a.urlToImage || "/images/news-placeholder.png",
    //     date: a.publishedAt,
    //     source: a.source?.name || "Unknown Source",
    //     url: a.url,
    //   }));
    // }

    if (source === "gnews") {
      const response = await axios.get(
        "https://gnews.io/api/v4/search",
        {
          params: {
            q: '(environment OR climate OR "clean energy" OR "renewable energy" OR pollution OR biodiversity OR "carbon emissions") AND NOT (politics OR war OR sports OR entertainment)',
            sortBy: "publishedAt",
            pageSize: limit,
            lang: "en",
            apikey: process.env.GNEWS_API_KEY,
          },
        }
      );

      articles = response.data.articles.map((a) => ({
        id: a.url,
        title: a.title,
        summary: a.description || "No description available",
        image: a.image || "/images/news-placeholder.png",
        date: a.publishedAt,
        source: a.source?.name || "Unknown Source",
        url: a.url,
      }));
    }

    res.json(filterDuplicates(articles));
  } catch (err) {
    console.error("News fetch error:", err.message);
    res.status(500).json({ message: "Failed to fetch news" });
  }
};

export default fetchNews;

