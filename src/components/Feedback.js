import "./Feedback.css";

function Feedback({ board, gameState, maxGuesses, gameContinuesCallback }) {
  const tries = gameState.guesses.length;
  console.log(gameState.guesses.length);
  console.log(maxGuesses);
  const cont = gameContinuesCallback();
  console.log(cont);

  return (
    <div className='feedback'>
      <h2 className='feedback-title'>Feedback</h2>
      <p className='feedback-info'>Tries Remaining: {maxGuesses - tries}</p>
      <p className='feedback-info'>
        Hints Remaining: {gameState.guesses[tries - 1].hints}
      </p>
      <div>
        {gameState.guesses.map((guessInfo, idx) => {
          return (
            <div key={idx + 1} className='feedback-item'>
              Try {idx + 1}: {guessInfo.guess} |{" "}
              {gameState.guesses[idx].feedback}
            </div>
          );
        })}
      </div>
      {gameState.won ? (
        <p className='feedback-won'>You win!</p>
      ) : cont ? (
        <p className='feedback-info'>Keep Guessing!</p>
      ) : (
        <p className='feedback-lost'>
          Better luck next time, the combination was {board}
        </p>
      )}
    </div>
  );
}

export default Feedback;
