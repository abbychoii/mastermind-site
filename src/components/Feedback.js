function Feedback({ gameState, guesses }) {
  const tries = gameState.length;

  return (
    <div>
      <h2>Feedback</h2>
      <p>Tries Remaining: {guesses - tries} </p>{" "}
      <p>Hints Remaining: {gameState[tries - 1].hints}</p>
      <div>
        {gameState.map((guess, idx) => {
          return (
            <div key={idx + 1}>
              Try {idx + 1}: {guess.guess} | {gameState[idx].feedback}
            </div>
          );
        })}
      </div>
      {gameState.win ? <p>You win!</p> : null}
    </div>
  );
}

export default Feedback;
