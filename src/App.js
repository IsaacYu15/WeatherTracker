import Map from './Maps.js';
import './App.css';

function App() {

  return (

    <div className="App">

      <Map apikey={process.env.REACT_APP_API_KEY_HEREMAPS}/>

    </div>

  );
};

export default App;
