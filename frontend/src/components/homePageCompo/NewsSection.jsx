import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const NewsSection = ({ apiKey, newsSource = 'newsapi', limit = 3 }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const newsRefs = useRef([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        let newsData = [];

        if (newsSource === 'newsapi') {
          const response = await axios.get(
            `https://newsapi.org/v2/everything?q=environment AND sustainability AND "clean energy"&sortBy=publishedAt&pageSize=${limit}&apiKey=${apiKey}`
          );
          newsData = response.data.articles.map(article => ({
            id: article.url,
            title: article.title,
            summary: article.description || "No description available",
            image: article.urlToImage || '/images/news-placeholder.png',
            date: article.publishedAt,
            source: article.source?.name || "Unknown Source",
            url: article.url
          }));
        } else if (newsSource === 'gnews') {
          const response = await axios.get(
            `https://gnews.io/api/v4/search?q=(environment OR climate OR "clean energy" OR "renewable energy" OR pollution OR biodiversity OR "carbon emissions") AND NOT (politics OR war OR sports OR entertainment)&sortBy=publishedAt&pageSize=${limit}&apikey=${apiKey}&lang=en`
          );
          newsData = response.data.articles.map(article => ({
            id: article.url,
            title: article.title,
            summary: article.description || "No description available",
            image: article.image || '/images/news-placeholder.png',
            date: article.publishedAt,
            source: article.source?.name || "Unknown Source",
            url: article.url
          }));
        }

        setNews(newsData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news. Please try again later.");
        setLoading(false);
        
        setNews([
          {
            id: '1',
            title: 'The Importance of Renewable Energy',
            summary: 'How solar and wind power are transforming our energy infrastructure worldwide.',
            image: '/images/news-placeholder.png',
            date: new Date().toISOString(),
            source: 'Green Energy News',
            url: '#'
          },
          {
            id: '2',
            title: 'Urban Farming Initiatives Grow',
            summary: 'Cities around the world are adopting urban farming to improve food security.',
            image: '/images/news-placeholder.png',
            date: new Date().toISOString(),
            source: 'Sustainable Cities',
            url: '#'
          }
        ].slice(0, limit));
      }
    };

    fetchNews();
  }, [apiKey, newsSource, limit]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-4');
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }
        });
      },
      { threshold: 0.1 }
    );

    newsRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      newsRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [news]);

  if (error) {
    return (
<div className="max-w-6xl mx-auto p-4 my-5 rounded-lg bg-red-50 border-l-4 border-red-500">
  <div className="flex items-center">
    <div className="flex-shrink-0">
      <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    </div>
    <div className="ml-3">
      <h3 className="text-sm font-medium text-red-800">{error}</h3>
    </div>
  </div>
</div>  )}

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
          <div className="space-y-8 bg-green-50 p-6 rounded-lg">
            {news.map((item, index) => (
              <article 
                key={item.id} 
                ref={el => newsRefs.current[index] = el}
                className="flex flex-col md:flex-row gap-6 pb-6 border-b border-gray-200 transition-all duration-500 ease-out opacity-0 translate-y-4"
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div className="md:w-1/3">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                    onError={(e) => {
                      e.target.src = '/images/news-placeholder.png';
                    }}
                  />
                </div>
                <div className="md:w-2/3">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                    <span className="font-medium text-gray-600">{item.source}</span>
                    <span>•</span>
                    <span>{new Date(item.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 hover:text-green-700 transition-colors">
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{
                        textDecoration:'none',
                        color:'black'
                      }}
                    >
                      {item.title}
                    </a>
                  </h3>
                  <p className="text-gray-700 mb-3">{item.summary}</p>
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm font-medium text-green-700 hover:text-green-900 transition-colors inline-flex items-center"
                    style={{
                      textDecoration:'none',
                    }}
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
              className="inline-flex items-center bg-green-100 hover:bg-green-200 px-4 py-2 border border-green-300 text-green-800 transition-colors rounded-md no-underline"
              style={{
                textDecoration:'none',
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