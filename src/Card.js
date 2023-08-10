import React from 'react'
//rfce + tab

//temp is given in kelvins
function Card({data}) {
    console.log(data);
  return (
    <div>
      <h1>Location: {data.name} {data.sys.country}</h1>
      <h2>Feels like: {data.main.feels_like - 273.15}</h2>
      <h2>Humidity: {data.main.humidity}</h2>  
      <h2>Wind Speed: {data.wind.speed}</h2>
    </div>
  )
}

export default Card