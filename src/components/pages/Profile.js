import NavBar from "../NavBar";
import Login from "../Login";
import "./Profile.css";

function Profile({
  handleChange,
  profile,
  profileForm,
  handleRegisterSubmit,
  handleLoginSubmit,
}) {
  return (
    <div>
      <NavBar loggedIn={profile.username}></NavBar>
      {profile.username ? (
        <div className='profile-block'>
          <h1>Profile</h1>
          <h3>Username: {profile.username}</h3>
          {/* <h3>User ID: {user.user_id}</h3> */}
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
