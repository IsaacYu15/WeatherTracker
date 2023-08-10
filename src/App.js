import Map from './Maps.js';
import React, { useState } from 'react';

const apikey = '0A_kuH0XYspmtiIk5SY6UnaWeHm6s7NO6qpzoEVlpXA';

function App() {
  return (
    <div>
      <Map apikey={apikey} />
    </div>
  );
};

export default App;
