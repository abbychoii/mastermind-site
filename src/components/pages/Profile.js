import NavBar from "../NavBar";
import Login from "../Login";
import GameHistoryList from "../GameHistoryList";
import "./Profile.css";

function Profile({
  handleChange,
  profile,
  profileForm,
  handleRegisterSubmit,
  handleLoginSubmit,
  signOut,
  loadGame,
}) {
  return (
    <div>
      <NavBar loggedIn={profile.username} signOut={signOut}></NavBar>
      {profile.username ? (
        <div>
          <div className='profile-block'>
            <h2>Profile</h2>
            <h3>Username: {profile.username}</h3>
            {/* <h3>User ID: {user.user_id}</h3> */}
            <h3>Games Played: {profile.user_games.length}</h3>
          </div>
          {profile.user_games.length ? (
            <GameHistoryList
              games={profile.user_games}
              loadGame={loadGame}
            ></GameHistoryList>
          ) : null}
        </div>
      ) : (
        <div className='profile-block'>
          <h1>Profile</h1>
          <h3>Please log in to view your profile.</h3>
          <Login
            handleChange={handleChange}
            profileForm={profileForm}
            handleRegisterSubmit={handleRegisterSubmit}
            handleLoginSubmit={handleLoginSubmit}
          ></Login>
        </div>
      )}
    </div>
  );
}
export default Profile;
