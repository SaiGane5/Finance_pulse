import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LiquidityForecast = () => {
  const [forecast, setForecast] = useState<any[]>([]);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axios.get('http://0.0.0.0:8000/api/forecast');
        setForecast(response.data);
      } catch (error) {
        console.error('Error fetching forecast data:', error);
      }
    };

    fetchForecast();
  }, []);

  const chartData = {
    labels: forecast.map(d => new Date(d.ds).toLocaleDateString()),
    datasets: [
      {
        label: 'Forecasted Liquidity',
        data: forecast.map(d => d.yhat),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Lower Bound',
        data: forecast.map(d => d.yhat_lower),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Upper Bound',
        data: forecast.map(d => d.yhat_upper),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Liquidity Forecast</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">365-Day Liquidity Forecast</h2>
        <div className="chart-container"> {/* Add the chart-container class here */}
          {forecast.length > 0 ? (
            <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
          ) : (
            <p>Loading forecast data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiquidityForecast;
