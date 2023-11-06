import NavBar from "../NavBar";
import "./Home.css";

function Home({ loggedIn, signOut }) {
  return (
    <div>
      <NavBar loggedIn={loggedIn} signOut={signOut}></NavBar>
      <div className='title-block'>
        <h1 className='app-title'>Welcome to Mastermind!</h1>
        <div className='instructions'>
          <p className='app-description'>
            Mastermind is a code-breaking challenge where you will try to crack
            a secret combination in just 10 tries. Have fun trying to crack the
            code!{" "}
          </p>
          <ul>
            <li>
              The computer will generate a secret combination: 4-digits (easy),
              5-digits (medium), 6-digits (hard).
            </li>
            <li>
              Each digit in the secret number will be within the range of 0 - 7,
              inclusive.{" "}
            </li>
            <li>
              You will have 10 attempts to guess this number, which can have
              repeating digits.
            </li>
            <li>
              After each guess, you will receive feedback on how many digits you
              correctly guessed and/or how many digits are in the correct
              location.
            </li>
            <li>
              Use the feedback to get closer to the number within 10 tries!
            </li>
            <li>
              If you find yourself struggling, you can always ask for a quick
              hint!
            </li>
          </ul>
          <p>
            If you really want further customization, you can also choose the
            number of digits and guesses! The number of digits must between 2
            and 10, while the number of guesses must between 2 and 20.
          </p>
        </div>
        <button
          id='single-player-game-btn'
          onClick={() =>
            (window.location.href =
              "https://masterminds-9a215e501a94.herokuapp.com/singleplayer")
          }
        >
          {" "}
          Go to Play Mastermind 🧠
        </button>
      </div>
    </div>
  );
}
export default Home;
