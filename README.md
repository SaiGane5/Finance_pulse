# Financial Pulse

Financial Pulse is a comprehensive financial monitoring and analysis tool that provides real-time insights into liquidity, market trends, and news impact on financial decisions.

## Features

- Dashboard with cash flow overview
- AI-driven liquidity forecasting
- News analysis with sentiment and entity recognition
- Market insights with real-time data and investment recommendations
- Real-time alerts system

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Python (v3.8 or later)
- pip (Python package manager)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/financial-pulse.git
   cd financial-pulse
   ```

2. Install backend dependencies:
   ```
   cd src/backend
   pip install -r requirements.txt
   cd ../..
   ```


### Running the Application

1. Start the backend server:
   ```
   uvicorn app.main:app --reload
   ```

2. In a new terminal, start the frontend development server:
   ```
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000` to view the application.

## Deployment

To deploy the application, follow these steps:

1. Build the frontend:
   ```
   npm run build
   ```

2. Deploy the backend to a Python-compatible hosting service (e.g., Heroku, DigitalOcean).

3. Update the API endpoint in the frontend configuration to point to your deployed backend.

4. Deploy the frontend to a static hosting service (e.g., Netlify, Vercel).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
