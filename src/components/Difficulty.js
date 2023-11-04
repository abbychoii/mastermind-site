import CustomDifficulty from "./CustomDifficulty";
import "./Difficulty.css";

function Difficulty({
  board,
  boardDifficulty,
  handleCustomInput,
  checkNewBoard,
  showCustom,
  setShowCustom,
  handleDifficulty,
  showDifficulty,
  setShowDifficulty,
}) {
  return (
    <div className='difficulty'>
      <button onClick={() => setShowDifficulty(!showDifficulty)}>
        {showDifficulty ? "Hide Difficulty Setting" : "Show Difficulty Setting"}
      </button>
      {showDifficulty ? (
        <div>
          <h3 id='difficulty-setting'>Difficulty Level Setting</h3>
          <div id='difficulty-preset'>
            <label htmlFor='difficulty-btns' className='difficulty-label'>
              Choose a Preset Difficulty Level:{" "}
            </label>
            <div className='difficulty-btns'>
              <button
                className='difficulty-btn'
                onClick={() => {
                  handleDifficulty("Easy");
                }}
              >
                Easy (4-digits)
              </button>
              <button
                className='difficulty-btn'
                onClick={() => {
                  handleDifficulty("Medium");
                }}
              >
                Medium (5-digits)
              </button>
              <button
                className='difficulty-btn'
                onClick={() => {
                  handleDifficulty("Hard");
                }}
              >
                Hard (6-digits)
              </button>
            </div>
          </div>
          <div>
            <button
              onClick={() => {
                setShowCustom(!showCustom);
              }}
            >
              {showCustom ? "Hide Custom Difficulty" : "Show Custom Difficulty"}
            </button>
            {showCustom ? (
              <CustomDifficulty
                boardDifficulty={boardDifficulty}
                handleCustomInput={handleCustomInput}
                checkNewBoard={checkNewBoard}
              ></CustomDifficulty>
            ) : null}
          </div>
          <br></br>
          <label htmlFor='generateBoardBtn'>
            {boardDifficulty.label} ({boardDifficulty.length}-digit(s),{" "}
            {boardDifficulty.guesses} guesses):{" "}
          </label>
          {boardDifficulty.label ? (
            <button id='generateBoardBtn' onClick={() => checkNewBoard()}>
              Generate {board.combo ? "New" : null} {boardDifficulty.label}
              -Level Code
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
export default Difficulty;
