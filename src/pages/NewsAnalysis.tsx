import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios

const NewsAnalysis = () => {
  const [newsData, setNewsData] = useState<any>(null);

  useEffect(() => {
    // Fetch news data using Axios
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://finance-pulse.onrender.com/api/news');
        setNewsData(response.data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">News Analysis</h1>
      {newsData ? (
        <div className="space-y-4">
          {newsData.news.articles.slice(0, 5).map((article: any, index: number) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-600 mb-4">{article.description}</p>
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded ${newsData.impact[index].impact === 'Positive' ? 'bg-green-200 text-green-800' :
                  newsData.impact[index].impact === 'Negative' ? 'bg-red-200 text-red-800' :
                    'bg-yellow-200 text-yellow-800'
                  }`}>
                  {newsData.impact[index].impact} Impact
                </span>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Read more</a>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold">Named Entities:</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {newsData.entities[index].entities.map((entity: any, entityIndex: number) => (
                    <span key={entityIndex} className="px-2 py-1 bg-gray-200 rounded text-sm">
                      {entity.text} ({entity.label})
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading news data...</p>
      )}
    </div>
  );
};

export default NewsAnalysis;
