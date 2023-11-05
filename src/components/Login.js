import "./Login.css";

function Login({
  handleChange,
  profileForm,
  handleRegisterSubmit,
  handleLoginSubmit,
}) {
  return (
    <div className='login-block'>
      <h3>Login to Profile</h3>
      <form onSubmit={handleLoginSubmit}>
        <label htmlFor='username'>Username: </label>
        <input
          type='text'
          id='username'
          name='username'
          value={profileForm.username}
          onChange={(e) => handleChange(e)}
          required
        ></input>
        <br />
        <label htmlFor='password'>Password: </label>
        <input
          type='password'
          id='password'
          name='password'
          value={profileForm.password}
          onChange={(e) => handleChange(e)}
          required
        ></input>
        <br />
        <button
          type='submit'
          disabled={!profileForm.username || !profileForm.password}
        >
          Login
        </button>
      </form>
      <br />
      <p>
        Don't have an account?{" "}
        <button
          disabled={!profileForm.username || !profileForm.password}
          onClick={handleRegisterSubmit}
        >
          Register as new user
        </button>
      </p>
    </div>
  );
}
export default Login;
