import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import { ArrowUpCircle, ArrowDownCircle, MinusCircle } from 'lucide-react';

const MarketInsights = () => {
  const [marketData, setMarketData] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any>(null);

  useEffect(() => {
    // Fetch market data and recommendations using Axios
    const fetchMarketData = async () => {
      try {
        const [marketResponse, recommendationsResponse] = await Promise.all([
          axios.get('https://finance-pulse.onrender.com/api/market'),
          axios.get('https://finance-pulse.onrender.com/api/recommendations'),
        ]);
        setMarketData(marketResponse.data);
        setRecommendations(recommendationsResponse.data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchMarketData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Market Insights</h1>
      {marketData && recommendations ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(marketData).map(([symbol, data]: [string, any]) => (
            <div key={symbol} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">{symbol}</h2>
              <div className="flex justify-between items-center mb-4">
                <span className="text-3xl font-bold">${data.price.toFixed(2)}</span>
                <span className={`flex items-center ${data.changesPercentage > 0 ? 'text-green-600' :
                  data.changesPercentage < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                  {data.changesPercentage > 0 ? <ArrowUpCircle className="mr-1" /> :
                    data.changesPercentage < 0 ? <ArrowDownCircle className="mr-1" /> :
                      <MinusCircle className="mr-1" />}
                  {data.changesPercentage.toFixed(2)}%
                </span>
              </div>
              <div className="space-y-2">
                <p><strong>Open:</strong> ${data.open.toFixed(2)}</p>
                <p><strong>High:</strong> ${data.dayHigh.toFixed(2)}</p>
                <p><strong>Low:</strong> ${data.dayLow.toFixed(2)}</p>
                <p><strong>Volume:</strong> {data.volume.toLocaleString()}</p>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Recommendation:</h3>
                <span className={`px-3 py-1 rounded ${recommendations.find((r: any) => r.symbol === symbol).recommendation.includes('Buy') ? 'bg-green-200 text-green-800' :
                  recommendations.find((r: any) => r.symbol === symbol).recommendation.includes('Sell') ? 'bg-red-200 text-red-800' :
                    'bg-yellow-200 text-yellow-800'
                  }`}>
                  {recommendations.find((r: any) => r.symbol === symbol).recommendation}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading market data...</p>
      )}
    </div>
  );
};

export default MarketInsights;
