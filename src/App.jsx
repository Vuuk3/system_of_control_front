import "./App.css";
import vector from "./assets/vector.svg";
import lock from "./assets/lock.svg";

function Login() {
  return (
    <>
      <form method="post" className="login">
        <h5 className="header-login">Login</h5>
        <div className="username">
          <input
            type="input"
            className="username-input"
            placeholder="Username"
          />
          <img src={vector} className="username-icon" />
        </div>
        <div className="password">
          <input
            type="input"
            className="password-input"
            placeholder="Password"
          />
          <img src={lock} className="password-icon" />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        <div className="register">
          Don`t have an account?{" "}
          <a href="#" className="register-link">
            Register
          </a>
        </div>
      </form>
    </>
  );
}

export default Login;
