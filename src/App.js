import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import SinglePlayer from "./components/pages/SinglePlayer";
import Profile from "./components/pages/Profile";

function App() {
  const URL = "https://masterminds-backend-6e111276e906.herokuapp.com";

  // Get profile from localStorage or initialize it to empty profile
  const [profile, setProfile] = useState(
    JSON.parse(window.localStorage.getItem("profile")) || {
      username: "",
      user_id: 0,
      user_games: [],
    }
  );

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

  //storing guess input from user
  const [guess, setGuess] = useState("");

  //storing combination information in state
  const [board, setBoard] = useState(
    JSON.parse(window.localStorage.getItem("board")) || {
      game_id: 0, //game_id is 0 when there is no game being played
      combo: "",
      difficulty: {
        label: "",
        length: 0,
        guesses: 10,
      },
    }
  );
  //storing user guess in state (used for storing form info)

  // storing history of guesses in state
  const [gameState, setGameState] = useState(
    JSON.parse(window.localStorage.getItem("gameState")) || {
      won: false,
      guesses: [],
    }
  );

  useEffect(() => {
    window.localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    window.localStorage.setItem("gameState", JSON.stringify(gameState));
  }, [gameState]);

  useEffect(() => {
    window.localStorage.setItem("board", JSON.stringify(board));
  }, [board]);

  // Make a GET request for the profile whenever the profile page is loaded
  const fetchProfile = async (profile) => {
    try {
      if (profile.user_id) {
        const response = await axios.get(
          `https://masterminds-backend-6e111276e906.herokuapp.com/user/${profile.user_id}`
        );
        setProfile(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [hint, setHint] = useState("");

  const getHint = async () => {
    axios
      .get(
        `https://masterminds-backend-6e111276e906.herokuapp.com/game/${board.game_id}/hint`
      )
      .then((response) => {
        setHint(response.data.hint);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      guesses_allowed: boardDifficultyForm.guesses,
      game_label: boardDifficultyForm.label,
    };
    if (profile.user_id) {
      params["user_id"] = profile.user_id;
    }
    // axios call to flask backend
    axios
      .post(`${URL}/game`, params)
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
        setGameState({ won: false, guesses: [] });
        setGuess("");
        setBoardDifficultyForm({ label: "Easy", length: 4, guesses: 10 });
        setHint("");
        fetchProfile(profile); // call fetchProfile after the post request is completed
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handle submitting user guess check to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);

    const guessData = { guess: guess };
    axios
      .post(`${URL}/game/${board.game_id}/guess`, guessData)
      .then((response) => {
        console.log(response);
        const guesses = gameState.guesses;
        const newGameState = {
          won: response.data.game_won,
          guesses: [...guesses, response.data],
        };
        setGameState(newGameState);
        setHint("");
        setGuess("");
        fetchProfile(profile);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    const profile = {
      username: profileForm.username,
      password: profileForm.password,
    };
    axios
      .post(`${URL}/user/authenticate`, profile)
      .then((response) => {
        console.log(response);
        const user_dict = response.data;
        setProfile({
          username: user_dict.username,
          user_id: user_dict.user_id,
          user_games: user_dict.user_games,
        });
        setProfileForm({ username: "", password: "" });
        fetchProfile(profile);
      })
      .catch((error) => {
        console.log(error);
        alert("User not found. Please try again.");
      });

    // if you know that you have successfully logged in, then you can clear the form
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    const profile = {
      username: profileForm.username,
      password: profileForm.password,
    };
    axios
      .post(`${URL}/user`, profile)
      .then((response) => {
        console.log(response);
        const user_dict = response.data;
        setProfile({
          username: user_dict.username,
          user_id: user_dict.user_id,
          user_games: user_dict.user_games,
        });
        setProfileForm({ username: "", password: "" });
        fetchProfile(profile);
      })
      .catch((error) => {
        console.log(error);
        alert("Invalid username or password, please try again.");
      });
    // if you know that you have successfully logged in, then you can clear the form
  };

  const gameContinues = () => {
    return (
      gameState.guesses.length < board.difficulty.guesses && !gameState.won
    );
  };

  const loadGame = async (game_id) => {
    axios
      .get(`${URL}/game/${game_id}`)
      .then((response) => {
        console.log(response);
        const game_dict = response.data;
        setBoard({
          game_id: game_dict.game_id,
          combo: game_dict.num_combo,
          difficulty: {
            label: game_dict.game_label,
            length: game_dict.num_combo.length,
            guesses: game_dict.guesses_allowed,
          },
        });
        setGameState({ won: false, guesses: game_dict.guesses });
        setGuess("");
        setHint("");
        setBoardDifficultyForm({ label: "Easy", length: 4, guesses: 10 });
        fetchProfile(profile);
        window.location.href =
          "https://masterminds-9a215e501a94.herokuapp.com/singleplayer";
      })
      .catch((error) => {
        console.log(error);
        alert("Error loading game.");
      });
  };

  const signOut = () => {
    setProfile({ username: "", user_id: 0, user_games: [] });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Home loggedIn={profile.username} signOut={signOut} />}
        ></Route>
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
              signOut={signOut}
              hint={hint}
              getHint={getHint}
            />
          }
        ></Route>
        <Route
          path='/profile'
          element={
            <Profile
              signOut={signOut}
              profile={profile}
              profileForm={profileForm}
              handleChange={handleChange}
              handleRegisterSubmit={handleRegisterSubmit}
              handleLoginSubmit={handleLoginSubmit}
              loadGame={loadGame}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
