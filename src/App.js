import React, { Component } from 'react';
import TuringMachine from './TuringMachine'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 style={{
          fontSize: '50px',
          margin: '15px',
          color: 'white',
          textAlign: 'center',
          textShadow:'0 0 10px black',
        }}>Turing Machine</h1>
        <TuringMachine />
      </div>
    );
  }
}

export default App;
