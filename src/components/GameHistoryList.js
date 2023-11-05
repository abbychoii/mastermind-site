import "./GameHistoryList.css";
import GameHistory from "./GameHistory";

function GameHistoryList({ games, loadGame }) {
  // <GameHistory game_idx={idx + 1} game={game}></GameHistory>;

  return (
    <div className='game-history-list'>
      <h2>Game History</h2>
      <div>
        {games.map((game, idx) => {
          return (
            <div key={idx}>
              <GameHistory
                game_idx={idx}
                game={game}
                loadGame={loadGame}
              ></GameHistory>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default GameHistoryList;
