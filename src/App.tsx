import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AlertCircle, BarChart2, DollarSign, Globe, Home, Moon, Sun } from 'lucide-react'; // Added Moon and Sun for dark mode toggle
import Dashboard from './pages/Dashboard';
import LiquidityForecast from './pages/LiquidityForecast';
import NewsAnalysis from './pages/NewsAnalysis';
import MarketInsights from './pages/MarketInsights';
import Alerts from './pages/Alerts';

function App() {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('theme') || 'light'; // Load saved theme or default to light
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme); // Save theme in localStorage
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className={`flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <nav className="w-64 bg-white dark:bg-gray-800 shadow-lg">
          <div className="p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Financial Pulse</h1>
            <button onClick={toggleTheme} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-md">
              {theme === 'light' ? <Moon size={20} className="text-gray-800" /> : <Sun size={20} className="text-yellow-400" />}
            </button>
          </div>
          <ul className="space-y-2 p-4">
            <li>
              <Link to="/" className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
                <Home size={20} />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/forecast" className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
                <BarChart2 size={20} />
                <span>Liquidity Forecast</span>
              </Link>
            </li>
            <li>
              <Link to="/news" className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
                <Globe size={20} />
                <span>News Analysis</span>
              </Link>
            </li>
            <li>
              <Link to="/market" className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
                <DollarSign size={20} />
                <span>Market Insights</span>
              </Link>
            </li>
            <li>
              <Link to="/alerts" className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
                <AlertCircle size={20} />
                <span>Alerts</span>
              </Link>
            </li>
          </ul>
        </nav>
        <main className="flex-1 p-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/forecast" element={<LiquidityForecast />} />
            <Route path="/news" element={<NewsAnalysis />} />
            <Route path="/market" element={<MarketInsights />} />
            <Route path="/alerts" element={<Alerts />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
