import "./App.css";
import axios from "axios";
import { useState } from "react";
import Feedback from "./components/Feedback";
import DailyChallenge from "./components/DailyChallenge";

function App() {
  const URL = "http://localhost:5000/mastermind";

  const [showInstruction, setShowInstruction] = useState(true);
  const [showDifficulty, setShowDifficulty] = useState(true);
  const [showCustom, setShowCustom] = useState(false);

  //storing difficulty information in state (used for generating new boards)
  const [boardDifficulty, setBoardDifficulty] = useState({
    label: "Easy",
    length: 4,
    guesses: 10,
  });

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
  const [guess, setGuess] = useState("");

  // storing history of guesses in state
  const [gameState, setGameState] = useState([]);

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
  const generateBoard = () => {
    // axios
    //   .get(URL)
    //   .then((response) => {
    //     const newBoard = {
    //       combo: response.data.board,
    //       difficulty: response.data.difficulty,
    //     };
    //     setBoard(newBoard);

    //     // if you had a previous game going, reset the game state + board difficulty form
    //     if (board.combo) {
    //       setGameState([]);
    //       setGuess("");
    //       setBoardDifficulty({ label: "", length: 0, guesses: 10 });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    //hard coding sample data to test
    if (boardDifficulty.label === "Easy") {
      setBoard({
        combo: [1, 2, 3, 4],
        difficulty: boardDifficulty,
      });
    } else if (boardDifficulty.label === "Medium") {
      setBoard({ difficulty: boardDifficulty, combo: [1, 2, 3, 4, 5] });
    } else if (boardDifficulty.label === "Hard") {
      setBoard({ difficulty: boardDifficulty, combo: [1, 2, 3, 4, 5, 6] });
    } else if (boardDifficulty.label === "Custom") {
      setBoard({
        difficulty: boardDifficulty.label,
        combo: new Array(boardDifficulty.length).fill(1),
      });
    }

    if (board.combo) {
      setGameState([]);
      setGuess("");
      setBoardDifficulty({ label: "", length: 0, guesses: 10 });
    }
  };

  // Handle submitting user guess check to backend
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);

    const guessData = { guess: guess, combo: board.combo };

    // axios call to flask backend
    // axios
    //   .post(URL, guessData)
    //   .then((response) => {
    //     console.log(response);

    //     const newGameState = [...gameState];
    //     const newGuess = {
    //       guess: guessData.guess,
    //       continue: response.data.continue,
    //       win: response.data.win,
    //       feedback: response.data.feedback,
    //       // corrNum: response.data.corrNum,
    //       // corrPos: response.data.corrPos,
    //       hints: response.data.hints,
    //       time: response.data.time,
    //     };
    //     newGameState.push(newGuess);

    //     setGameState(newGameState);
    //     setGuess("");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    //hard code sample data to test
    setGuess("");
    setGameState((prevGameState) => [
      ...prevGameState,
      {
        guess: guess,
        continue: true,
        win: false,
        feedback: "0 correct numbers, 0 correct positions",
        hints: 3,
        time: 0,
      },
    ]);
  };

  return (
    <div className='App'>
      <h1>Welcome to Mastermind!</h1>
      <p>
        Mastermind is a code-breaking challenge where you will try to crack a
        secret combination in just 10 tries. Have fun trying to crack the code!{" "}
      </p>
      <button onClick={() => setShowInstruction(!showInstruction)}>
        {showInstruction ? "Hide Instructions" : "Show Instructions"}
      </button>
      {showInstruction ? (
        <div>
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
            number of digits and guesses! Note: the number of digits must be
            less than 10, and the number of guesses must between 2 and 20.
          </p>
        </div>
      ) : null}
      <DailyChallenge></DailyChallenge>
      <div className='difficulty'>
        <button onClick={() => setShowDifficulty(!showDifficulty)}>
          {showDifficulty
            ? "Hide Difficulty Setting"
            : "Show Difficulty Setting"}
        </button>
        {showDifficulty ? (
          <div>
            <h3>Difficulty Level Setting</h3>
            <p>
              {boardDifficulty.label} ({boardDifficulty.length}-digit(s),{" "}
              {boardDifficulty.guesses} guesses)
            </p>
            <label htmlFor='difficulty'>
              Choose a Preset Difficulty Level:{" "}
            </label>
            <button
              onClick={() => {
                handleDifficulty("Easy");
              }}
            >
              Easy (4-digits)
            </button>
            <button
              onClick={() => {
                handleDifficulty("Medium");
              }}
            >
              Medium (5-digits)
            </button>
            <button
              onClick={() => {
                handleDifficulty("Hard");
              }}
            >
              Hard (6-digits)
            </button>
            <br></br>
            <div>
              <button
                onClick={() => {
                  setShowCustom(!showCustom);
                }}
              >
                {showCustom
                  ? "Hide Custom Difficulty"
                  : "Show Custom Difficulty"}
              </button>
              {showCustom ? (
                <div>
                  {" "}
                  <label htmlFor='custom'>
                    Custom Difficulty: {boardDifficulty.length}-digit(s),{" "}
                    {boardDifficulty.guesses} guesses
                  </label>
                  <form id='custom' onSubmit={checkNewBoard}>
                    <label htmlFor='length'>
                      Length of Code ({boardDifficulty.length}):{" "}
                    </label>
                    <br></br>
                    <input
                      id='length'
                      type='range'
                      min='1'
                      max='10'
                      name='length'
                      value={boardDifficulty.length}
                      onChange={handleCustomInput}
                    />
                    <br></br>
                    <label htmlFor='guesses'>
                      Number of Guesses ({boardDifficulty.guesses}):{" "}
                    </label>
                    <br></br>
                    <input
                      id='guesses'
                      type='range'
                      min='2'
                      max='20'
                      name='guesses'
                      value={boardDifficulty.guesses}
                      onChange={handleCustomInput}
                    />
                    <br></br>
                  </form>
                </div>
              ) : null}
            </div>
            <br></br>
            {boardDifficulty.label ? (
              <button id='generateBoardBtn' onClick={() => checkNewBoard()}>
                Generate {board.combo[0] ? "New" : null} {boardDifficulty.label}
                -Level Code
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className='SinglePlayer'>
        <h2>Single Player</h2>
        {/* checking if a difficulty level has been selected before generating a board */}
        {board.difficulty.label
          ? board.difficulty.label +
            " (" +
            board.difficulty.length +
            "-digits, " +
            board.difficulty.guesses +
            " guesses)"
          : null}
        {gameState.length ? (
          <Feedback
            guesses={board.difficulty.guesses}
            gameState={gameState}
          ></Feedback>
        ) : null}
        {/* checking that a board has been generated before you can start guessing */}
        {board.combo[0] &&
        (gameState.length < board.difficulty.guesses || gameState.continue) ? (
          <form onSubmit={handleSubmit}>
            <input
              type='number'
              name='combo'
              placeholder={"*".repeat(board.difficulty.length)}
              value={guess}
              onChange={handleChange}
            />
            <button
              type='submit'
              disabled={guess.length < board.difficulty.length}
            >
              Submit
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
}

export default App;
