import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const NewsSection = ({ source = "gnews", limit = 3 }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const newsRefs = useRef([]);

  // -----------------------------
  // Fetch news from backend
  // -----------------------------
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(
          `${__API_URL__}/news/fetchNews`,
          {
            params: { source, limit },
            withCredentials: true,
          }
        );

        if (!Array.isArray(res.data)) {
          throw new Error("Invalid news response");
        }

        setNews(res.data);
      } catch (err) {
        console.error("News fetch failed:", err);
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [source, limit]);

  // -----------------------------
  // Intersection Observer animation
  // -----------------------------
  useEffect(() => {
    if (!news.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-4");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    newsRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [news]);

  // -----------------------------
  // UI states
  // -----------------------------
  if (error) {
    return (
      <section className="py-10 px-4">
        <p className="text-center text-red-500 font-semibold">{error}</p>
      </section>
    );
  }

  return (
    <section className="py-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-white mb-8">
        Latest Green News
      </h2>

      {loading ? (
        <p className="text-center text-gray-300">Loading headlines...</p>
      ) : news.length === 0 ? (
        <p className="text-center text-gray-300">No news available.</p>
      ) : (
        <div className="space-y-8 bg-[#b1e0e0] p-6 rounded-xl shadow-lg">
          {news.map((item, index) => (
            <article
              key={item.id}
              ref={(el) => (newsRefs.current[index] = el)}
              className="opacity-0 translate-y-4 transition-all duration-500 ease-out
                         flex flex-col md:flex-row gap-6 items-start"
            >
              {/* Image */}
              <div className="w-full md:w-1/3">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/images/news-placeholder.png";
                  }}
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              </div>

              {/* Content */}
              <div className="w-full md:w-2/3">
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-gray-700 mb-3 leading-relaxed">
                  {item.summary}
                </p>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-700 font-semibold
                             hover:text-green-900 transition-colors"
                >
                  Read more
                  <span className="ml-1">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default NewsSection;
