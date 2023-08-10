import Map from './Maps.js';
import React, { useState, useEffect } from 'react';
import Card from './Card.js';
const apikey = '0A_kuH0XYspmtiIk5SY6UnaWeHm6s7NO6qpzoEVlpXA';


function App() {


  //look into states and hooks documentatino provided by react
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      })

      //get api, and store as a JSON- >look into JSONS
      console.log (process.env.REACT_APP_API_KEY);
      console.log (process.env.REACT_APP_API_URL);
      await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setData(data)
      })

      //ITSS GIVVIVNNNGG:Failed to load resource: the server responded with a status of 400 (Bad Request) but it works tho :) now it doesnt:(

    }

    fetchData();


  }, [lat, long]); //why?

  return (

    <div className="App">
      <h1>{lat} {long}</h1>
      {(typeof data.main != 'undefined') ? (
        <Card data={data}/>
        
      ): (
        <div></div>
      )}

    <div>
      <Map apikey={apikey} />
    </div>

    </div>

  );
};

export default App;
