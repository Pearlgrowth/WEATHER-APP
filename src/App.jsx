import React, { useState } from 'react'
import './App.css'
import clouds from "./assets/ice.jpg"
import sun from "./assets/sun.jpg"
const api = {
  key: "f6d5fbf13d35cee6807579572036187e",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [city, setCity] = useState('')
  const [error, setError] = useState(null)

  const handleInput = (event) => {
    setCity(event.target.value)
  }

  const getData = (event) => {
    if (event.key === "Enter" && city.trim()) {
      const encodedCity = encodeURIComponent(city.trim())
      fetch(`${api.base}weather?q=${encodedCity}&units=metric&APPID=${api.key}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('City not found')
          }
          return response.json()
        })
        .then(data => {
          setWeatherData(data)
          setError(null)
        })
        .catch(error => {
          setError(error.message)
          setWeatherData(null)
        })
      setCity("")
    }
  }

  const getWeatherIcon = (weather) => {
    if (!weather) return null
    const weatherCondition = weather[0].main.toLowerCase()
    //use a switch case for alternations.
    switch (weatherCondition) {
      case 'clouds':
        return clouds
      case 'clear':
        return sun
      default:
        return null
    }
  }

  return (
    <div className="weather">
      <input
        className='text'
        placeholder='Enter the city name..'
        onChange={handleInput}
        value={city}
        onKeyDown={getData}
      />
      {error && <p>Error: {error}</p>}
      {weatherData && (
        <div> <br />
        <div className="results">
        <img
            src={getWeatherIcon(weatherData.weather)}
            alt={weatherData.weather[0].description}
            style={{ width: '900px', height: '900px'}}
          />
           <h3>Weather in {weatherData.name}</h3>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
          
        </div>
      )}
    </div>
  )
}

export default App
