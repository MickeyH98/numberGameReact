import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.startStandardGame = this.startStandardGame.bind(this);
    this.startExpertGame = this.startExpertGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.Display = this.Display.bind(this);
    this.onChangeGuess = this.onChangeGuess.bind(this);
    this.onClickGuess = this.onClickGuess.bind(this);
    this.afterWinButton = this.afterWinButton.bind(this);
    this.state = {
      Gamemode: 'chooseGamemode',
      Guess: '',
      GuessesList: [],
      HighGuessesList: [],
      LowGuessesList: [],
      TargetGuess: null,
      Message: '',
      standardHS: null,
      expertHS: null
    };
  }

  startStandardGame(){
    let newState = [...this.state];
    newState.Guess = '';
    newState.TargetGuess = null;
    newState.GuessesList = [];
    newState.HighGuessesList = [];
    newState.LowGuessesList = [];
    newState.Gamemode = "standard";
    newState.Message = "Im thinking of a number between 1 and 10";
    newState.TargetGuess = Math.floor(Math.random() * 10 + 1);
    this.setState(newState);
  }

  startExpertGame(){
    let newState = [...this.state];
    newState.Guess = '';
    newState.TargetGuess = null;
    newState.GuessesList = [];
    newState.HighGuessesList = [];
    newState.LowGuessesList = [];
    newState.Gamemode = "expert";
    newState.Message = "Im thinking of a number between 1 and 100";
    newState.TargetGuess = Math.floor(Math.random() * 100 + 1);
    this.setState(newState);
  }

  onChangeGuess(event){
    let guess = event.target.value;
    this.setState({Guess: guess});
  }

  onClickGuess(){
    let guess = parseInt(this.state.Guess, 10);
    let winningNumber = parseInt(this.state.TargetGuess, 10);
    let newGamemode = this.state.Gamemode;
    let newMessage = this.state.Message;
    let newGuessesList = [...this.state.GuessesList];
    let newHighGuessesList = [...this.state.HighGuessesList];
    let newLowGuessesList = [...this.state.LowGuessesList];
    let newStandardHS = this.state.standardHS;
    let newExpertHS = this.state.expertHS;
    if(this.state.Guess === '' || isNaN(this.state.Guess)){
      newMessage = "Please enter a number";
      this.setState({
        Message: newMessage
      });
      return;
    }

    newGuessesList.push(guess);

     if( guess === winningNumber ) {
       if ( this.state.Gamemode === "standard" ){
         if ( newGuessesList.length < newStandardHS || !newStandardHS){
           newStandardHS = newGuessesList.length;
         }
       } else if ( this.state.Gamemode === "expert" ){
         if ( newGuessesList.length < newExpertHS || !newExpertHS){
           newExpertHS = newGuessesList.length;
         }
       }
       newGamemode = "winner";
       newMessage = "Congratulations!";
     } else if ( guess > winningNumber ){
       newMessage = "Too high!";
       newHighGuessesList.push(guess);
     } else if ( guess < winningNumber ){
       newMessage = "Too low!";
       newLowGuessesList.push(guess);
     }

    this.setState({
      Guess: '',
      GuessesList: newGuessesList,
      HighGuessesList: newHighGuessesList,
      LowGuessesList: newLowGuessesList,
      Gamemode: newGamemode,
      Message: newMessage,
      standardHS: newStandardHS,
      expertHS: newExpertHS
    });
  }

  resetGame(){
    let newState = [...this.state];
    newState.Gamemode = "chooseGamemode";
    newState.Guess = null;
    newState.TargetGuess = null;
    newState.GuessesList = [];
    newState.HighGuessesList = [];
    newState.LowGuessesList = [];
    this.setState(newState);
  }

  afterWinButton(){
    let newState = [...this.state];
    newState.Gamemode = "chooseGamemode";
    newState.Guess = null;
    newState.TargetGuess = null;
    newState.GuessesList = [];
    newState.HighGuessesList = [];
    newState.LowGuessesList = [];
    this.setState(newState);
  }

  Display(){
    let Gamemode = this.state.Gamemode;
    if(Gamemode === "chooseGamemode"){
      return(
      <div className="startGame">
        <p className="startGameP">Start Game</p>
        <button className="startStandardButton" onClick={this.startStandardGame}>Standard</button>
        <button className="startExpertButton" onClick={this.startExpertGame}>Expert</button>
      </div>
    )
  }else if(Gamemode === "standard"){
    return(
      <div className="standardGame">
        <p>Standard (1-10)</p>
        <input className="inputField" type="text" value={this.state.Guess} onChange={(event)=>{this.onChangeGuess(event)}}/>
        <input
          className="button"
          type="button"
          value="Guess"
          onClick={this.onClickGuess}
        />
        <p>{this.state.Message}</p>
        <p>Low Guesses: </p>
        <p>{this.state.LowGuessesList.join(", ")}</p>
        <p>High Guesses: </p>
        <p>{this.state.HighGuessesList.join(", ")}</p>
        <button className="button" onClick={this.startExpertGame}>Too Easy?</button>
      </div>
    )
  }else if(Gamemode === "expert"){
    return(
      <div className="expertGame">
        <p>Expert (1-100)</p>
        <input className="inputField" type="text" value={this.state.Guess} onChange={(event)=>{this.onChangeGuess(event)}}/>
        <input
          className="button"
          type="button"
          value="Guess"
          onClick={this.onClickGuess}
        />
        <p>{this.state.Message}</p>
        <p>Low Guesses: </p>
        <p>{this.state.LowGuessesList.join(", ")}</p>
        <p>High Guesses: </p>
        <p>{this.state.HighGuessesList.join(", ")}</p>
        <button className="button" onClick={this.startStandardGame}>Too Hard?</button>
      </div>
    )
  }else if(Gamemode === "winner"){
    return(
      <div className="winner">
        <p>{this.state.Message}</p>
        <p>The answer was {this.state.TargetGuess}</p>
        <p>It took you {this.state.GuessesList.length} tries, here they are: {this.state.GuessesList.join(", ")}</p>
        <button className="button" onClick={this.afterWinButton}>Thanks</button>
      </div>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <this.Display />
        <div className="stats">
          <p className="tries">Current Tries: {this.state.GuessesList.length}</p>
          <p className="highScore">Standard HS: {this.state.standardHS}</p>
          <p className="highScore">Expert HS: {this.state.expertHS}</p>
          <input onClick={this.resetGame} type="button" value="Reset"/>
        </div>
      </div>
    );
  }
}

export default App;

// Create a guessing game app in React.
// When the page loads, display a header that says Start Game and underneath that have two buttons.
// One button should read Standard and the other should read Expert.
// If the user clicks Standard, randomly generate a number between 1 and 10 for the user to guess. Expert should be between 1 and 100.
// Once either of these buttons is clicked, the game starts.
// There should be an input for the user to guess a number and submit.
// There should be a place that shows how many guesses they have made.
// Once the user guesses, tell them whether their guess was too high or too low.
// Once the user wins, display a message telling them that they have won and how many guesses it took.
// Keep track of the least number of tries it takes the user to win. This is the "High Score".
// If the user beats their high score, congratulate them.
// Keep separate track of the high score for the standard and expert levels.
// Have a reset button if the user gets tired of trying.
