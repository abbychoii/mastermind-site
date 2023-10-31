import "./App.css";
import axios from "axios";
import { useState } from "react";
import Feedback from "./components/Feedback";
import DailyChallenge from "./components/DailyChallenge";

function App() {
  const URL = "http://localhost:5000/mastermind";

  const [showInstruction, setShowInstruction] = useState(true);
  const [showDifficulty, setShowDifficulty] = useState(true);

  //storing difficulty information in state (used for generating new boards)
  const [boardDifficulty, setBoardDifficulty] = useState({
    label: "",
    length: 0,
    guesses: 10,
  });

  //storing custom difficulty information in state (used for storing form info)
  const [custom, setCustom] = useState({
    length: "",
    guesses: "",
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
      ...prevDiff,
      length: difficulty[newDifficulty],
      label: newDifficulty,
    }));
  };

  // Handle difficulty of board (when using custom difficulty)
  const handleCustomInput = (e) => {
    console.log(e);
    const custom = e.target.value;
    if (e.target.name === "guesses") {
      if (/^[0-9]*$/.test(custom) && custom.length <= 20) {
        setCustom((prevCustom) => {
          return { ...prevCustom, guesses: custom };
        });
      }
    } else if (e.target.name === "length") {
      if (/^[0-9]*$/.test(custom) && custom.length <= 10) {
        setCustom((prevCustom) => {
          return { ...prevCustom, length: custom };
        });
      }
    }
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    console.log(e);

    setBoardDifficulty({
      label: "Custom",
      length: custom.length,
      guesses: custom.guesses,
    });
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
        difficulty: boardDifficulty,
        combo: new Array(custom.length).fill(1),
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
        feedback: "",
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
            less than 10, and the number of guesses must be less than 20.
          </p>
        </div>
      ) : null}
      <DailyChallenge></DailyChallenge>
      <div className='difficulty'>
        <h3>Difficulty Level: </h3>
        <button onClick={() => setShowDifficulty(!showDifficulty)}>
          {showDifficulty ? "Hide Difficulty" : "Show Difficulty"}
        </button>
        {showDifficulty ? (
          <div>
            <label htmlFor='difficulty'>Choose a Difficulty Level: </label>
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
            <label htmlFor='custom'>Custom Difficulty: </label>
            <form id='custom' onSubmit={handleCustomSubmit}>
              <label htmlFor='length'>Length of Code (1-10): </label>
              <input
                id='length'
                type='number'
                name='length'
                value={custom.length}
                onChange={handleCustomInput}
              />
              <br></br>
              <label htmlFor='guesses'>Number of Guesses (1-20): </label>
              <input
                id='guesses'
                type='number'
                name='guesses'
                value={custom.guesses}
                onChange={handleCustomInput}
              />
              <button
                type='submit'
                disabled={custom.guesses.length < 1 || custom.length.length < 1}
              >
                Customize Difficulty
              </button>
            </form>
            {/* <button onClick={() => handleDifficulty("Custom")}>Custom</button> */}
            {boardDifficulty.label ? (
              <div>
                <button onClick={() => checkNewBoard()}>
                  Generate {board.combo[0] ? "New" : null}{" "}
                  {boardDifficulty.label}-Level Code
                </button>
              </div>
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
