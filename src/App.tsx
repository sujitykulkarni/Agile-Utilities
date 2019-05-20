import React from 'react';
import { Calculator } from './components/calculator';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>JIRA Time Calculator</h1>
      </header>
      <Calculator/>
    </div>
  );
}

export default App;
