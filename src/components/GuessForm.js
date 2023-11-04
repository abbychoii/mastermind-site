function GuessForm({ guess, handleChange, handleSubmit, boardDifficulty }) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='combo'
        placeholder={"*".repeat(boardDifficulty.length)}
        value={guess}
        onChange={handleChange}
      />
      <button type='submit' disabled={guess.length < boardDifficulty.length}>
        Submit Guess
      </button>
    </form>
  );
}

export default GuessForm;
