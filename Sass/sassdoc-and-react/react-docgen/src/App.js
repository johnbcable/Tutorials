import React, { Component } from 'react';
import data from './docs/components.json';
import Docs from './components/Docs';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Docs data={data} />
      </div>
    );
  }
}

export default App;
