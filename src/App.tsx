import React from 'react';
import './App.css';
import ReturnsChart from "./modules/ReturnsChart";
import { SAMPLE_DATA } from "./sampleData";

function App() {
  return (
    <div className="App">
      <ReturnsChart data={SAMPLE_DATA} />
    </div>
  )
}

export default App;
