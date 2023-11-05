import { useState } from "react";
import NavBar from "../NavBar";
import "./SinglePlayer.css";
import GuessForm from "../GuessForm";
import Feedback from "../Feedback";
import Difficulty from "../Difficulty";
import Banner from "../Banner";

function SinglePlayer({
  guess,
  loggedIn,
  handleChange,
  handleSubmit,
  board,
  boardDifficulty,
  handleCustomInput,
  checkNewBoard,
  setShowCustom,
  showCustom,
  handleDifficulty,
  showDifficulty,
  setShowDifficulty,
  gameState,
  gameContinues,
}) {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div>
      <NavBar loggedIn={loggedIn}></NavBar>
      <div className='game-block'>
        <h1 className='page-title'>Mastermind</h1>
        {showBanner ? (
          <Banner
            loggedIn={loggedIn}
            showBanner={showBanner}
            setShowBanner={setShowBanner}
          ></Banner>
        ) : null}
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
            board={board}
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
export default SinglePlayer;
