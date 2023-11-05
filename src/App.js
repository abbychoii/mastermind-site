import "./App.css";
import axios from "axios";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import SinglePlayer from "./components/pages/SinglePlayer";
import Profile from "./components/pages/Profile";

function App() {
  const URL = "http://localhost:5000/game";

  const [showDifficulty, setShowDifficulty] = useState(true);
  const [showCustom, setShowCustom] = useState(false);

  //storing difficulty information that will be used to generate a game (storing the state for the form)
  const [boardDifficultyForm, setBoardDifficultyForm] = useState({
    label: "Easy",
    length: 4,
    guesses: 10,
  });

  const [profileForm, setProfileForm] = useState({
    username: "",
    password: "",
  });

  const [profile, setProfile] = useState({
    username: "",
    user_id: 0,
    user_games: [],
    games_won: 0,
    games_lost: 0,
  });

  //storing guess input from user
  const [guess, setGuess] = useState("");

  //storing combination information in state
  const [board, setBoard] = useState({
    game_id: 0, //game_id is 0 when there is no game being played
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
    setBoardDifficultyForm((prevDiff) => ({
      guesses: 10,
      length: difficulty[newDifficulty],
      label: newDifficulty,
    }));
  };

  // Handle difficulty of board (when using custom difficulty)
  const handleCustomInput = (e) => {
    console.log(e);
    const custom = e.target.value;
    setBoardDifficultyForm((prevCustom) => ({
      ...prevCustom,
      label: "Custom",
      [e.target.name]: custom,
    }));
  };

  // Handle user guess input
  const handleChange = async (e) => {
    console.log(e);
    if (e.target.name === "guess") {
      const guess = e.target.value;
      if (/^[0-7]*$/.test(guess) && guess.length <= board.difficulty.length) {
        setGuess(String(guess));
      }
    } else if (e.target.name === "username") {
      const formValue = e.target.value;
      if (/^[a-z0-9]*$/.test(formValue) && formValue.length <= 10) {
        setProfileForm({ ...profileForm, username: formValue });
      }
    } else if (e.target.name === "password") {
      const formValue = e.target.value;
      if (/^[a-zA-Z0-9]*$/.test(formValue) && formValue.length <= 15) {
        setProfileForm({ ...profileForm, password: formValue });
      }
    }
  };

  //check if you already have a game going
  const checkNewBoard = () => {
    if (board.combo) {
      const userChoice = window.confirm(
        "Are you sure you want to quit this game and generate a new " +
          boardDifficultyForm.label +
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
      code_length: boardDifficultyForm.length,
      num_guesses: boardDifficultyForm.guesses,
    };
    // axios call to flask backend
    axios
      .post(URL, params)
      .then((response) => {
        console.log(response);
        const game_dict = response.data;
        setBoard({
          game_id: game_dict.game_id,
          combo: game_dict.num_combo,
          difficulty: {
            label: boardDifficultyForm.label,
            length: boardDifficultyForm.length,
            guesses: boardDifficultyForm.guesses,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });

    if (board.combo) {
      setGameState({ won: false, guesses: [] });
      setGuess("");
      setBoardDifficultyForm({ label: "Easy", length: 4, guesses: 10 });
    }
  };

  // Handle submitting user guess check to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);

    const guessData = { guess: guess };
    axios
      .post(`${URL}/${board.game_id}/guess`, guessData)
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
  const handleLoginSubmit = async (profileForm) => {
    axios
      .get("http://localhost:5000/user", profileForm)
      .then((response) => {
        console.log(response);
        const user_dict = response.data;
        setProfile({
          username: user_dict.username,
          user_id: user_dict.user_id,
          user_games: user_dict.user_games,
          games_won: user_dict.games_won,
          games_lost: user_dict.games_lost,
        });
      })
      .catch((error) => {
        console.log(error);
        alert("User not found. Please try again.");
      });
    // if you know that you have successfully logged in, then you can clear the form
    if (profile.username) {
      setProfileForm({ username: "", password: "" });
    }
  };

  const handleRegisterSubmit = async (profileForm) => {
    axios
      .put("http://localhost:5000/user", profileForm)
      .then((response) => {
        console.log(response);
        const user_dict = response.data;
        setProfile({
          username: user_dict.username,
          user_id: user_dict.user_id,
          user_games: user_dict.user_games,
          games_won: user_dict.games_won,
          games_lost: user_dict.games_lost,
        });
      })
      .catch((error) => {
        console.log(error);
        alert("Invalid username or password, please try again.");
      });
    // if you know that you have successfully logged in, then you can clear the form
    if (profile.username) {
      setProfileForm({ username: "", password: "" });
    }
  };

  const gameContinues = () => {
    return (
      gameState.guesses.length < board.difficulty.guesses && !gameState.won
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home loggedIn={profile.username} />}></Route>
        <Route
          path='/singleplayer'
          element={
            <SinglePlayer
              guess={guess}
              loggedIn={profile.username}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              gameState={gameState}
              board={board}
              boardDifficulty={boardDifficultyForm}
              handleCustomInput={handleCustomInput}
              checkNewBoard={checkNewBoard}
              showCustom={showCustom}
              setShowCustom={setShowCustom}
              handleDifficulty={handleDifficulty}
              showDifficulty={showDifficulty}
              setShowDifficulty={setShowDifficulty}
              gameContinues={gameContinues}
            />
          }
        ></Route>
        <Route
          path='/profile'
          element={
            <Profile
              profile={profile}
              profileForm={profileForm}
              handleChange={handleChange}
              handleRegisterSubmit={handleRegisterSubmit}
              handleLoginSubmit={handleLoginSubmit}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
    // <div>
    //   <Home></Home>
    //   <div className='app'>
    //     {/* <DailyChallenge></DailyChallenge> */}
    //   </div>
    // </div>
  );
}

export default App;
