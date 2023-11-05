import "./NavBar.css";

const NavBar = ({ loggedIn, signOut }) => {
  return (
    <div className='navbar'>
      <div className='nav-left'>
        <a href='http://localhost:3000/' className='nav-button'>
          Mastermind 🧠
        </a>
      </div>
      <div className='nav-right'>
        <a href='http://localhost:3000/singleplayer' className='nav-button'>
          Single Player
        </a>
        <a href='http://localhost:3000/profile' className='nav-button'>
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
