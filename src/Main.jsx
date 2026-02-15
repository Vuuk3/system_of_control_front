import styles from "./Main.module.css";
import logo from "./assets/main.svg";

function Main() {
  return (
    <>
      <img className="logo" src={logo} />
      <div className="header">
        <h5 className="header-left">Staff</h5>
        <h5 className="header-right">Tracker</h5>
      </div>
      <p className="slogan">Эффективно управляйте своим персоналом</p>
      <p className="our-functions">
        Мы помогаем вам отслеживать рабочее время, заработную плату и многое
        другое, обеспечивая эффективное управление персоналом
      </p>
      <div className="links">
        <a className="links__element register" href="/register">
          Начать
        </a>
        <a className="links__element login" href="/login">
          Войти
        </a>
      </div>
    </>
  );
}

export default Main;
