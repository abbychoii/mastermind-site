import { useState } from "react";
import NavBar from "../NavBar";
import "./SinglePlayer.css";
import GuessForm from "../GuessForm";
import Feedback from "../Feedback";
import Difficulty from "../Difficulty";
import Banner from "../Banner";

function SinglePlayer({
  guess,
  signOut,
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
  loggedIn,
  hint,
  getHint,
}) {
  const [showBanner, setShowBanner] = useState(true);
  const [showRules, setShowRules] = useState(false);

  return (
    <div>
      <NavBar signOut={signOut} loggedIn={loggedIn}></NavBar>
      <div className='game-block'>
        <h1 className='page-title'>Mastermind</h1>
        {showBanner ? (
          <Banner
            loggedIn={loggedIn}
            showBanner={showBanner}
            setShowBanner={setShowBanner}
          ></Banner>
        ) : null}
        <div className='rules'>
          <button
            className='show-rules-btn'
            onClick={() => setShowRules(!showRules)}
          >
            {showRules ? "Hide Rules" : "Show Rules"}
          </button>
          {showRules ? (
            <ul>
              <li>
                The computer will generate a secret combination: 4-digits
                (easy), 5-digits (medium), 6-digits (hard).
              </li>
              <li>
                Each digit in the secret number will be within the range of 0 -
                7, inclusive.{" "}
              </li>
              <li>
                You will have 10 attempts to guess this number, which can have
                repeating digits.
              </li>
              <li>
                After each guess, you will receive feedback on how many digits
                you correctly guessed and/or how many digits are in the correct
                location.
              </li>
              <li>
                Use the feedback to get closer to the number within 10 tries!
              </li>
              <li>
                If you find yourself struggling, you can always ask for a quick
                hint!
              </li>
            </ul>
          ) : null}
        </div>
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
            getHint={getHint}
            hint={hint}
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
