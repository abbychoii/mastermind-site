import "./GuessForm.css";
function GuessForm({ guess, handleChange, handleSubmit, boardDifficulty }) {
  return (
    <form onSubmit={handleSubmit} className='guess-form'>
      <input
        type='text'
        name='combo'
        placeholder={"*".repeat(boardDifficulty.length)}
        value={guess}
        onChange={handleChange}
        className='guess-input'
      />
      <button
        type='submit'
        disabled={guess.length < boardDifficulty.length}
        className='guess-button'
      >
        Submit Guess
      </button>
    </form>
  );
}

export default GuessForm;
