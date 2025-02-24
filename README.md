Weather App

This is a simple weather application built with React. It fetches real-time weather data from the OpenWeather API and displays weather conditions based on user input.

Features

Get real-time weather updates for any city

Automatically saves searched cities in local storage

Displays temperature, humidity, wind speed, cloud coverage, and weather conditions

Updates date and time dynamically

Technologies Used

React.js

Tailwind CSS for styling

OpenWeather API

LocalStorage for data persistence

Installation

Clone the repository:

git clone https://github.com/Sneh-a123/weatherApi.git

Navigate to the project directory:

cd weather-app

Install dependencies:

npm install

Start the development server:

npm start

Deployment

To deploy the application, you can use:

npm run build

Then, host the build/ directory on a static hosting service like Vercel, Netlify, or GitHub Pages.

API Key Setup

This app requires an API key from OpenWeather. You can get one from OpenWeather.
Replace the API key in the App.js file:

const apiKey = "dbd0bb89dad3907d9fa77489f2935ff1";

