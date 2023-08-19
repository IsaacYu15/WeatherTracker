import Map from './Maps.js';
import './App.css';

function App() {

  return (

    <div className="App">

      <div className="Hero">
        <h1>WEATHER APP</h1>
        <p>Click on the map, based on the latitude and longitude  you will be able to see weather stastics!</p>
      </div>

      <Map apikey={process.env.REACT_APP_API_KEY_HEREMAPS}/>

    </div>

  );
};

export default App;
