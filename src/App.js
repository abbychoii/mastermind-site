import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Feedback from "./components/Feedback";
import GuessForm from "./components/GuessForm";
import Difficulty from "./components/Difficulty";

function App() {
  const URL = "http://localhost:5000/game";

  const [showInstruction, setShowInstruction] = useState(true);
  const [showDifficulty, setShowDifficulty] = useState(true);
  const [showCustom, setShowCustom] = useState(false);

  //storing difficulty information for the forms
  const [boardDifficulty, setBoardDifficulty] = useState({
    label: "Easy",
    length: 4,
    guesses: 10,
  });
  //storing guess input from user
  const [guess, setGuess] = useState("");

  //storing combination information in state
  const [board, setBoard] = useState({
    combo: "",
    difficulty: {
      label: "",
      length: 0,
      guesses: 10,
    },
  });
  //storing user guess in state (used for storing form info)

  // storing history of guesses in state
  const [gameState, setGameState] = useState({
    won: false,
    guesses: [],
  });

  // Handle difficulty of board (when using preset difficulties)
  const handleDifficulty = (newDifficulty) => {
    const difficulty = { Easy: 4, Medium: 5, Hard: 6 };
    setBoardDifficulty((prevDiff) => ({
      guesses: 10,
      length: difficulty[newDifficulty],
      label: newDifficulty,
    }));
  };

  // Handle difficulty of board (when using custom difficulty)
  const handleCustomInput = (e) => {
    console.log(e);
    const custom = e.target.value;
    setBoardDifficulty((prevCustom) => ({
      ...prevCustom,
      label: "Custom",
      [e.target.name]: custom,
    }));
  };

  // Handle user guess input
  const handleChange = (e) => {
    console.log(e);
    const guess = e.target.value;
    if (/^[0-7]*$/.test(guess) && guess.length <= board.difficulty.length) {
      setGuess(guess);
    }
  };

  //check if you already have a game going
  const checkNewBoard = () => {
    if (board.combo) {
      const userChoice = window.confirm(
        "Are you sure you want to quit this game and generate a new " +
          boardDifficulty.label +
          "-Level board?"
      );
      if (userChoice) {
        generateBoard();
      }
    } else {
      generateBoard();
    }
  };

  // Generate a new board
  const generateBoard = async () => {
    const params = {
      num_min: 0,
      num_max: 7,
      code_length: boardDifficulty.length,
      num_guesses: boardDifficulty.guesses,
    };
    // axios call to flask backend
    axios
      .post(URL, params)
      .then((response) => {
        console.log(response);
        setBoard(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    if (board.combo) {
      setGameState({ won: false, guesses: [] });
      setGuess("");
      setBoardDifficulty({ label: "Easy", length: 4, guesses: 10 });
    }
  };

  // Handle submitting user guess check to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);

    const guessData = { guess: guess };
    axios
      .post(`http://localhost:5000/${board.game_id}/guess`, guessData)
      .then((response) => {
        console.log(response);
        const guesses = gameState.guesses;
        const newGameState = {
          won: response.data.game_won,
          guesses: [...guesses, response.data],
        };
        setGameState(newGameState);
      })
      .catch((error) => {
        console.log(error);
      });

    setGuess("");
  };

  const gameContinues = () => {
    return (
      gameState.guesses.length < board.difficulty.guesses && !gameState.won
    );
  };

  return (
    <div className='app'>
      <h1 className='app-title'>Welcome to Mastermind!</h1>

      <button onClick={() => setShowInstruction(!showInstruction)}>
        {showInstruction ? "Hide Instructions" : "Show Instructions"}
      </button>
      {showInstruction ? (
        <div className='instructions'>
          <p className='app-description'>
            Mastermind is a code-breaking challenge where you will try to crack
            a secret combination in just 10 tries. Have fun trying to crack the
            code!{" "}
          </p>
          <ul>
            <li>
              The computer will generate a secret combination: 4-digits (easy),
              5-digits (medium), 6-digits (hard).
            </li>
            <li>
              Each digit in the secret number will be within the range of 0 - 7,
              inclusive.{" "}
            </li>
            <li>
              You will have 10 attempts to guess this number, which can have
              repeating digits.
            </li>
            <li>
              After each guess, you will receive feedback on how many digits you
              correctly guessed and/or how many digits are in the correct
              location.
            </li>
            <li>
              Use the feedback to get closer to the number within 10 tries!
            </li>
            <li>
              If you find yourself struggling, you can always ask for a quick
              hint ;)
            </li>
          </ul>
          <p>
            If you really want further customization, you can also choose the
            number of digits and guesses! Note: the number of digits must
            between 2 and 10, while the number of guesses must between 2 and 20.
          </p>
        </div>
      ) : null}
      {/* <DailyChallenge></DailyChallenge> */}
      <div className='single-player'>
        <h2 className='game-title'>Single Player</h2>
        {/* checking if a difficulty level has been selected before generating a board */}
        {board.difficulty.label ? (
          <p className='game-difficulty-info'>
            {board.difficulty.label} ({board.difficulty.length}-digits,{" "}
            {board.difficulty.guesses} guesses)
          </p>
        ) : null}
        {gameState.guesses.length ? (
          <Feedback
            maxGuesses={board.difficulty.guesses}
            gameState={gameState}
            board={board.combo}
            gameContinuesCallback={gameContinues}
          ></Feedback>
        ) : null}
        {/* checking that a board has been generated before you can start guessing */}
        {/* need to check whether or not the game has been won before continuing to show the guess form... */}
        {board.combo &&
        !gameState.won &&
        gameState.guesses.length < board.difficulty.guesses ? (
          <GuessForm
            guess={guess}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            boardDifficulty={boardDifficulty}
          ></GuessForm>
        ) : null}
        <br></br>
        <Difficulty
          board={board}
          boardDifficulty={boardDifficulty}
          handleCustomInput={handleCustomInput}
          checkNewBoard={checkNewBoard}
          showCustom={showCustom}
          setShowCustom={setShowCustom}
          handleDifficulty={handleDifficulty}
          showDifficulty={showDifficulty}
          setShowDifficulty={setShowDifficulty}
        ></Difficulty>
      </div>
    </div>
  );
}

export default App;
