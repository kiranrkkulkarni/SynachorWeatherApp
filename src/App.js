import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Getweather from "./components/getWeather"

class App extends Component {
  render() {
    return (
      <div className="container">
        <Getweather />
      </div>
    );
  }
}

export default App;
