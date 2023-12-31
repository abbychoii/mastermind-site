import "./Banner.css";

function Banner({ loggedIn, showBanner, setShowBanner }) {
  return (
    <div>
      {showBanner ? (
        <div className='login-banner'>
          <button
            className='close-banner-btn'
            onClick={() => setShowBanner(false)}
          >
            X
          </button>
          {loggedIn ? (
            <p className='banner-text'>Welcome back, {loggedIn}!</p>
          ) : (
            <div className='banner-text'>
              <h3>Reminder: Please log in to access all features</h3>
              <p>
                Don't have an account?{" "}
                <a href='https://masterminds-9a215e501a94.herokuapp.com/profile'>
                  Register here
                </a>
              </p>
            </div>
          )}{" "}
        </div>
      ) : null}
    </div>
  );
}
export default Banner;
