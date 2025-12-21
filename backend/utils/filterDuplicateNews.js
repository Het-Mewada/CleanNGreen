import stringSimilarity from "string-similarity";

export default function filterDuplicates(articles) {
  const filtered = [];
  for (let i = 0; i < articles.length; i++) {
    const current = articles[i];

    const isDuplicate = filtered.some((article) => {
      const score = stringSimilarity.compareTwoStrings(
        current.title,
        article.title
      );
      return score > 0.85;
    });

    if (!isDuplicate) {
      filtered.push(current);
    }
  }

  return filtered;
}
