import "./CustomDifficulty.css";

function CustomDifficulty({
  boardDifficulty,
  handleCustomInput,
  checkNewBoard,
}) {
  return (
    <div className='custom-difficulty-form'>
      <label htmlFor='custom' className='difficulty-label'>
        Custom Difficulty:
      </label>
      <form id='custom' onSubmit={checkNewBoard}>
        <div className='difficulty-btns'>
          <div className='difficulty-btn-custom'>
            <label htmlFor='length'>
              Length of Code ({boardDifficulty.length}):
            </label>
            <input
              id='length'
              type='range'
              min='2'
              max='10'
              name='length'
              value={boardDifficulty.length}
              onChange={handleCustomInput}
            />
          </div>
          <div className='difficulty-btn-custom'>
            <label htmlFor='guesses'>
              Number of Guesses ({boardDifficulty.guesses}):
            </label>
            <input
              id='guesses'
              type='range'
              min='2'
              max='20'
              name='guesses'
              value={boardDifficulty.guesses}
              onChange={handleCustomInput}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default CustomDifficulty;
