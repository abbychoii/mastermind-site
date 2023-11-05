import "./GameHistory.css";

function GameHistory({ game_idx, game, loadGame }) {
  const game_unfinished = Boolean(
    game.guesses.length < game.guesses_allowed && !game.game_won
  );
  return (
    <div className='game-history'>
      <div>
        <div className='game-info'>
          <h4>
            Game {game_idx + 1}{" "}
            {game.game_label ? `(${game.game_label})` : null} | Game Won:{" "}
            {game.game_won ? "Won" : game_unfinished ? "Unfinished" : "Lost"} |
            Date: {game.date_created}
          </h4>
          <h5>
            Length of Code: {game.num_combo.length} | Guesses Allowed:{" "}
            {game.guesses_allowed}
          </h5>
        </div>
        <div>
          {game.guesses.map((guess, idx) => {
            return (
              <p className='game-history-try' key={idx}>
                Guess {idx + 1}: {guess.guess} | {guess.feedback}
              </p>
            );
          })}
        </div>
        <br />
        {game_unfinished ? (
          <button
            onClick={() => {
              loadGame(game.game_id);
            }}
          >
            Continue Game?{" "}
          </button>
        ) : null}
        {game.guesses.length < game.guesses_allowed && !game.game_won ? null : (
          <p>
            Final Combination: <span id='num-combo'>{game.num_combo}</span>
          </p>
        )}
      </div>
    </div>
  );
}
export default GameHistory;
