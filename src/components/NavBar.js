import "./NavBar.css";

const NavBar = ({ loggedIn, signOut }) => {
  return (
    <div className='navbar'>
      <div className='nav-left'>
        <a
          href='https://masterminds-9a215e501a94.herokuapp.com/'
          className='nav-button'
        >
          Mastermind 🧠
        </a>
      </div>
      <div className='nav-right'>
        <a
          href='https://masterminds-9a215e501a94.herokuapp.com/singleplayer'
          className='nav-button'
        >
          Single Player
        </a>
        <a
          href='https://masterminds-9a215e501a94.herokuapp.com/profile'
          className='nav-button'
        >
          {loggedIn ? "Profile" : "Login"}
        </a>
        {loggedIn ? (
          <button className='nav-button button' onClick={signOut}>
            Sign Out
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default NavBar;
