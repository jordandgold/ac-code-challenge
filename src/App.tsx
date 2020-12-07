import React from 'react';
import { ContactsList } from "./components/ContactsList/ContactsList";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ContactsList />
      </header>
    </div>
  );
}

export default App;
