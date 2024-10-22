import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AlertCircle, BarChart2, DollarSign, Globe, Home } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import LiquidityForecast from './pages/LiquidityForecast';
import NewsAnalysis from './pages/NewsAnalysis';
import MarketInsights from './pages/MarketInsights';
import Alerts from './pages/Alerts';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <nav className="w-64 bg-white shadow-lg">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-blue-600">Financial Pulse</h1>
          </div>
          <ul className="space-y-2 p-4">
            <li>
              <Link to="/" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                <Home size={20} />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/forecast" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                <BarChart2 size={20} />
                <span>Liquidity Forecast</span>
              </Link>
            </li>
            <li>
              <Link to="/news" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                <Globe size={20} />
                <span>News Analysis</span>
              </Link>
            </li>
            <li>
              <Link to="/market" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                <DollarSign size={20} />
                <span>Market Insights</span>
              </Link>
            </li>
            <li>
              <Link to="/alerts" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
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