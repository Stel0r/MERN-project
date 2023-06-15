import Button from 'react-bootstrap/Button'
import React, { useState } from 'react';
import './App.css';

function App() {


  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <img src="logo.svg" className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button variant="primary" onClick={() => setCount(count + 1)}>
          Clicked {count} times
        </Button>
      </header>
    </div>
  );
}

export default App;
