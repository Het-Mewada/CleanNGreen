import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NewsSection = ({ apiKey, newsSource = 'newsapi', limit = 3 }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        let newsData = [];

        if (newsSource === 'newsapi') {
          // Using NewsAPI (https://newsapi.org/)
          const response = await axios.get(
            `https://newsapi.org/v2/everything?q=environment AND sustainability AND "clean energy"&sortBy=publishedAt&pageSize=${limit}&apiKey=${apiKey}`
          );
          newsData = response.data.articles.map(article => ({
            id: article.url,
            title: article.title,
            summary: article.description,
            image: article.urlToImage || '/images/default-news.jpg',
            date: article.publishedAt,
            source: article.source.name,
            url: article.url
          }));
        } else if (newsSource === 'gnews') {
          // Using GNews API (https://gnews.io/)
          const response = await axios.get(
`https://gnews.io/api/v4/search?q=(environment OR climate OR "clean energy" OR "renewable energy" OR pollution OR biodiversity OR "carbon emissions") AND NOT (politics OR war OR sports OR entertainment)&sortBy=publishedAt&pageSize=${limit}&apikey=${apiKey}&lang=en`          );
          newsData = response.data.articles.map(article => ({
            id: article.url,
            title: article.title,
            summary: article.description,
            image: article.image || '/images/default-news.jpg',
            date: article.publishedAt,
            source: article.source.name,
            url: article.url
          }));
        }

        setNews(newsData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news. Please try again later.");
        setLoading(false);
        
        // Fallback data if API fails
        setNews([
          {
            id: '1',
            title: 'The Importance of Renewable Energy',
            summary: 'How solar and wind power are transforming our energy infrastructure worldwide.',
            image: '/images/news-fallback-1.jpg',
            date: new Date().toISOString(),
            source: 'Green Energy News',
            url: '#'
          },
          {
            id: '2',
            title: 'Urban Farming Initiatives Grow',
            summary: 'Cities around the world are adopting urban farming to improve food security.',
            image: '/images/news-fallback-2.jpg',
            date: new Date().toISOString(),
            source: 'Sustainable Cities',
            url: '#'
          }
        ].slice(0, limit));
      }
    };

    fetchNews();
  }, [apiKey, newsSource, limit]);

  if (error) {
    return <div className="news-error">{error}</div>;
  }

  return (
<section className="max-w-6xl mx-auto py-8 px-4">
  <h2 className="text-3xl font-bold mb-6 pb-4 border-b-3 border-black text-gray-800">Latest Green News</h2>
  
  {loading ? (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-12 h-12 border-4 border-gray-400 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-gray-600">Loading headlines...</p>
    </div>
  ) : (
    <>
      <div className="space-y-8 bg-green-200 p-4" >
        {news.map((item) => (
          <article key={item.id} className="flex flex-col md:flex-row gap-6 pb-6 border-b border-black">
            <div className="md:w-1/3">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-48 object-cover rounded"
                onError={(e) => {
                  e.target.src = 'https://img.freepik.com/free-vector/gradient-breaking-news-background_23-2151142406.jpg?semt=ais_hybrid&w=740';
                }}
              />
            </div>
            <div className="md:w-2/3">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                <span className="font-medium text-gray-600">{item.source}</span>
                <span>•</span>
                <span>{new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 hover:text-green-700 transition-colors">
                <a href={item.url} target="_blank" rel="noopener noreferrer" 
                style={{
                  textDecoration: 'none',
                  color:'black',
                }}>
                  {item.title}
                </a>
              </h3>
              <p className="text-gray-700 mb-3">{item.summary}</p>
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm font-medium text-green-700 hover:text-green-900 transition-colors inline-flex items-center"
              >
                Continue reading
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <a 
          href="https://news.google.com/search?q=environment+sustainability" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center bg-green-50 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors rounded-md"
          style={{
            textDecoration: 'none',
          }}
        >
          View all environmental news
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </>
  )}
</section>
  );
};

export default NewsSection;