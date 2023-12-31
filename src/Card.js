import React from 'react';
import './Card.css';

//temp is given in kelvins
function Card({data})  {
  return (
    <div className = "Card">
      <h1>Location: {data.name} {data.sys.country}</h1>
      <h2>Feels like: { Math.round(data.main.feels_like - 273.15) } °C</h2>
      <h2>Humidity: {data.main.humidity} %</h2>  
      <h2>Wind Speed: {data.wind.speed} m/s</h2>
    </div>
  )
}

export default Card
