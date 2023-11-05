import "./NavBar.css";

const NavBar = ({ loggedIn }) => {
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
          {loggedIn ? "Profile" : "Log In"}
        </a>
      </div>
    </div>
  );
};

export default NavBar;
