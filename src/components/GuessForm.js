import "./GuessForm.css";
function GuessForm({ guess, handleChange, handleSubmit, board }) {
  return (
    <form onSubmit={handleSubmit} className='guess-form'>
      <input
        type='text'
        name='guess'
        placeholder={"*".repeat(board.combo.length)}
        value={guess}
        onChange={(e) => handleChange(e)}
        className='guess-input'
      />
      <button
        type='submit'
        disabled={guess.length < board.combo.length}
        className='guess-button'
      >
        Submit Guess
      </button>
    </form>
  );
}

export default GuessForm;
