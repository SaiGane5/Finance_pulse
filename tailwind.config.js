/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], // Ensure it scans all relevant files for Tailwind classes
  darkMode: 'class', // Enable dark mode based on the 'class' strategy
  theme: {
    extend: {
      colors: {
        // You can define custom dark mode colors here if needed
        darkBackground: '#1a1a2e',
        darkCard: '#16213e',
        darkText: '#e0e0e0',
        lightCard: '#ffffff',
        lightText: '#333333',
      },
    },
  },
  plugins: [],
};
