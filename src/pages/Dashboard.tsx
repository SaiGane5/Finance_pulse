import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [cashFlow, setCashFlow] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://0.0.0.0:8000/api/cash-flow/AAPL');
        setCashFlow(response.data[0]);
      } catch (error) {
        console.error('Error fetching cash flow data:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: ['Operating Cash Flow', 'Investing Cash Flow', 'Financing Cash Flow'],
    datasets: [
      {
        label: 'Cash Flow (in millions)',
        data: cashFlow ? [
          cashFlow.operatingCashFlow / 1000000 || 0,
          cashFlow.investingCashFlow / 1000000 || 0,
          cashFlow.financingCashFlow / 1000000 || 0
        ] : [],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: cashFlow ? Math.max(
          cashFlow.operatingCashFlow / 1000000 || 0,
          cashFlow.investingCashFlow / 1000000 || 0,
          cashFlow.financingCashFlow / 1000000 || 0
        ) + 10 : 10, // Adds padding to the max value
      },
      x: {
        title: {
          display: true,
          text: 'Cash Flow Categories',
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Cash Flow Overview (IBM)</h2>
        <div className="chart-container">
          {cashFlow ? (
            <Line data={chartData} options={options} />
          ) : (
            <p>Loading cash flow data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
