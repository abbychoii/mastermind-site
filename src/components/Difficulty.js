import CustomDifficultyForm from "./CustomDifficulty";

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
          <h3>Difficulty Level Setting</h3>
          <p>Choose a Preset Difficulty Level: </p>
          <button
            onClick={() => {
              handleDifficulty("Easy");
            }}
          >
            Easy (4-digits)
          </button>
          <button
            onClick={() => {
              handleDifficulty("Medium");
            }}
          >
            Medium (5-digits)
          </button>
          <button
            onClick={() => {
              handleDifficulty("Hard");
            }}
          >
            Hard (6-digits)
          </button>
          <br></br>
          <div>
            <button
              onClick={() => {
                setShowCustom(!showCustom);
              }}
            >
              {showCustom ? "Hide Custom Difficulty" : "Show Custom Difficulty"}
            </button>
            {showCustom ? (
              <CustomDifficultyForm
                boardDifficulty={boardDifficulty}
                handleCustomInput={handleCustomInput}
                checkNewBoard={checkNewBoard}
              ></CustomDifficultyForm>
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
