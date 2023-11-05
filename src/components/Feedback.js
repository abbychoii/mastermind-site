import "./Feedback.css";

function Feedback({
  board,
  gameState,
  maxGuesses,
  gameContinuesCallback,
  hint,
  getHint,
}) {
  const tries = gameState.guesses.length;
  const cont = gameContinuesCallback();

  return (
    <div className='feedback'>
      <h2 className='feedback-title'>Feedback</h2>
      <p className='feedback-info'>Tries Remaining: {maxGuesses - tries}</p>
      <div>
        {gameState.guesses.map((guessInfo, idx) => {
          return (
            <div key={idx + 1} className='feedback-item'>
              <p className='feedback-try'>Try {idx + 1}: </p>
              {guessInfo.guess.split("").map((char, charIdx) => (
                <span
                  key={charIdx}
                  className={`feedback-character ${
                    gameState.won
                      ? "feedback-character-won"
                      : "feedback-character-lost"
                  }`}
                >
                  {char}
                </span>
              ))}
              <p>{gameState.guesses[idx].feedback}</p>
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
      {gameState.won ? null : (
        <div>
          {hint ? <p className='feedback-hint'>Hint: {hint}</p> : null}
          <button
            onClick={getHint}
            className='feedback-hint'
            disabled={gameState.guesses.length === 0 || hint}
          >
            Get Hint
          </button>
        </div>
      )}
    </div>
  );
}

export default Feedback;
