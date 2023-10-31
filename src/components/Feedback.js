function Feedback({ gameState, guesses }) {
  const tries = gameState.length;

  return (
    <div>
      {/* <h2>Feedback</h2> */}
      <p>Tries Remaining: {guesses - tries} </p>{" "}
      {/* <p>Hints Remaining: {gameState[tries - 1].hints}</p> */}
      <div>
        {gameState.map((guess, idx) => {
          return (
            <div key={idx}>
              <p>
                Try {idx + 1}: {guess.guess} |{" "}
                {/* <p>{gameState.Feedback}</p> */}
                {gameState[tries - 1].corrNum} correct digit(s) and{" "}
                {gameState[tries - 1].corrPos} in the correct position(s)
              </p>
            </div>
          );
        })}
      </div>
      {gameState.win ? <p>You win!</p> : null}
    </div>
  );
}

export default Feedback;
