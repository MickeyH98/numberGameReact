import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      standardNum : 'test'
    };
  }

  render() {

    function standardNumGen(){
      let winNum = Math.floor(Math.random()*10)
      console.log("winNum = ", winNum);
    }

    function standardGuess(){
      let guessedNum = '';
    }

    // update state
    function onChangeStandardNum(evt) {
      this.setState({
        standardNum : evt.target.value
      });
      console.log(this.state.standardNum);
    }

    function onClickStandardNum(){
      console.log(this.state.standardNum);
    }

    return (
      <div className="App">
        <div className="startGame">
          <p>Start Game</p>
          <button onClick={standardNumGen}>Standard</button>
          <button>Expert</button>
        </div>

        <div className="standardGame">
          <p>Standard Game</p>
          <input
          type="text"
          onChange={(evt) => this.onChangeStandardNum(evt)}/>
          <input
          type="button"
          value="Guess"
          onClick={(evt) => this.onClickStandardNum(evt)}
          />
        </div>

        <div className="expertGame">
          <p>Expert Game</p>
          <input type="text"/>
          <button>Guess</button>
        </div>

        <div className="stats">
          <p className="tries">Current Tries: 0</p>
          <p className="highScore">HS Standard: 0</p>
          <p className="highScore">HS Expert: 0</p>
          <input type="button" value="Reset"/>
        </div>
      </div>
    );
  }
}

export default App;

// Create a guessing game app in React.
//
// When the page loads, display a header that says Start Game and underneath that have two buttons. One button should read Standard and the other should read Expert. If the user clicks Standard, randomly generate a number between 1 and 10 for the user to guess. Expert should be between 1 and 100. Once either of these buttons is clicked, the game starts.
//
// There should be an input for the user to guess a number and submit.
// There should be a place that shows how many guesses they have made.
// Once the user guesses, tell them whether their guess was too high or too low.
// Once the user wins, display a message telling them that they have won and how many guesses it took.
// Keep track of the least number of tries it takes the user to win. This is the "High Score". If the user beats their high score, congratulate them.
// Keep separate track of the high score for the standard and expert levels.
// Have a reset button if the user gets tired of trying.
