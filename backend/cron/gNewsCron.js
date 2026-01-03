import cron from "node-cron";
import newsCache from "../models/newCacheModel.js";
import { fetchGNews } from "../services/newService.js";

export function startNewsCron(limit = 10) {
  cron.schedule(
    "0 */3 * * *",
    async () => {
      try {
        console.log("News Cron Started at : ", Date.now());

        const articles = await fetchGNews(limit);

        await newsCache.findOneAndUpdate(
          {
            source: "gnews",
          },
          { articles, lastUpdatedAt: new Date() },
          { upsert: true }
        );
        console.log("GNews cache updated successfully");
      } catch (error) {
        console.log("GNews fetch Failed : ", error.message);
      }
    },
    { runOnInit: true }
  );
}
