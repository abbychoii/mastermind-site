function CustomDifficultyForm({
  boardDifficulty,
  handleCustomInput,
  checkNewBoard,
}) {
  return (
    <div>
      <label htmlFor='custom'>Custom Difficulty:</label>
      <form id='custom' onSubmit={checkNewBoard}>
        <label htmlFor='length'>
          Length of Code ({boardDifficulty.length}):
        </label>
        <br></br>
        <input
          id='length'
          type='range'
          min='2'
          max='10'
          name='length'
          value={boardDifficulty.length}
          onChange={handleCustomInput}
        />
        <br></br>
        <label htmlFor='guesses'>
          Number of Guesses ({boardDifficulty.guesses}):
        </label>
        <br></br>
        <input
          id='guesses'
          type='range'
          min='2'
          max='20'
          name='guesses'
          value={boardDifficulty.guesses}
          onChange={handleCustomInput}
        />
        <br></br>
      </form>
    </div>
  );
}

export default CustomDifficultyForm;
