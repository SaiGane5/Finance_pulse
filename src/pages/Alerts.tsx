import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const Alerts = () => {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    // Simulated alerts data
    const simulatedAlerts = [
      { id: 1, type: 'warning', message: 'Liquidity levels approaching lower threshold', timestamp: new Date().toISOString() },
      { id: 2, type: 'info', message: 'New market data available for analysis', timestamp: new Date(Date.now() - 3600000).toISOString() },
      { id: 3, type: 'success', message: 'Investment recommendation executed successfully', timestamp: new Date(Date.now() - 7200000).toISOString() },
    ];
    setAlerts(simulatedAlerts);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Alerts</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Alerts</h2>
        {alerts.length > 0 ? (
          <ul className="space-y-4">
            {alerts.map(alert => (
              <li key={alert.id} className={`p-4 rounded-lg ${
                alert.type === 'warning' ? 'bg-yellow-100' :
                alert.type === 'info' ? 'bg-blue-100' :
                'bg-green-100'
              }`}>
                <div className="flex items-center">
                  {alert.type === 'warning' ? (
                    <AlertCircle className="text-yellow-600 mr-2" />
                  ) : alert.type === 'info' ? (
                    <AlertCircle className="text-blue-600 mr-2" />
                  ) : (
                    <CheckCircle className="text-green-600 mr-2" />
                  )}
                  <span className="font-semibold">{alert.message}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {new Date(alert.timestamp).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent alerts</p>
        )}
      </div>
    </div>
  );
};

export default Alerts;