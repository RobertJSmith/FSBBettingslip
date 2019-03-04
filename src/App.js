import React, { Component } from 'react';
import './App.css';
import FavouritesList from './components/FavouritesList';
import BetSlipCounter from './components/BetSlipCounter';
import mediator from './components/FavouritesMediator';

class App extends Component {
  constructor(props) {
    super(props);
    mediator.listenToPort();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="componentWrapper">
            <BetSlipCounter/>
            <FavouritesList/>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
