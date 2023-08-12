import Map from './Maps.js';
import React, { useState, useEffect } from 'react';
import Card from './Card.js';


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
      await fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&APPID="+process.env.REACT_APP_API_KEY, {
        method: 'POST',  
        mode: 'cors'
      })
      .then(response => {
        return response.json()
      })
      .then(data => {
        setData(data)
      })
    }

    fetchData();


  }, [lat, long]); //why?

  return (

    <div className="App">
      {(typeof data.main != 'undefined') ? (
        <Card data={data}/>
      ): (
        <div></div>
      )}

      {(typeof data.main != 'undefined') ? (
         <Map apikey={process.env.REACT_APP_API_KEY_HEREMAPS} newLat={lat} newLong={long} />

      ): (
        <div></div>
      )}



    



    </div>

  );
};

export default App;
