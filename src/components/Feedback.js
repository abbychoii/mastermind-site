function Feedback({ board, gameState, maxGuesses, gameContinuesCallback }) {
  const tries = gameState.guesses.length;
  console.log(gameState.guesses.length);
  console.log(maxGuesses);
  const cont = gameContinuesCallback();
  console.log(cont);

  return (
    <div>
      <h2>Feedback</h2>
      <p>Tries Remaining: {maxGuesses - tries} </p>{" "}
      <p>Hints Remaining: {gameState.guesses[tries - 1].hints}</p>
      <div>
        {gameState.guesses.map((guessInfo, idx) => {
          return (
            <div key={idx + 1}>
              Try {idx + 1}: {guessInfo.guess} |{" "}
              {gameState.guesses[idx].feedback}
            </div>
          );
        })}
      </div>
      {gameState.won ? (
        <p>You win!</p>
      ) : cont ? (
        <p>Keep Guessing!</p>
      ) : (
        <p>Better luck next time, the combination was {board}</p>
      )}
    </div>
  );
}

export default Feedback;
