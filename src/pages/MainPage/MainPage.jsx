import Title from "@components/Title/Title";
import styles from "./MainPage.module.css";
import logo from "@assets/main.svg";
import NoDraggableLink from "@components/NoDraggableLink/NoDraggableLink";
import NoDraggableImg from "@components/NoDraggableImg/NoDraggableImg";

function MainPage() {
  return (
    <>
      <Title text="Staff Tracker — Управление персоналом" />
      <div className={styles["main"]}>
        
        {/* ── Контентная часть ── */}
        <div className={styles["hero-content"]}>
          <div className={styles["text-section"]}>
            <div className={styles["header"]}>
              <span className={styles["header-left"]}>Staff</span>
              <span className={styles["header-right"]}>Tracker</span>
            </div>
            
            <h1 className={styles["slogan"]}>
              Эффективно управляйте своим персоналом
            </h1>
            
            <p className={styles["description"]}>
              Мы помогаем вам отслеживать рабочее время, заработную плату и многое
              другое, обеспечивая прозрачное и эффективное управление командой.
            </p>

            <div className={styles["actions"]}>
              <NoDraggableLink to="/register" className={`${styles["btn"]} ${styles["btn-primary"]}`}>
                Начать работу
              </NoDraggableLink>
              <NoDraggableLink to="/login" className={`${styles["btn"]} ${styles["btn-secondary"]}`}>
                Войти в кабинет
              </NoDraggableLink>
            </div>
          </div>

          {/* ── Иллюстрация ── */}
          <div className={styles["image-section"]}>
            <NoDraggableImg className={styles["hero-image"]} src={logo} />
          </div>
        </div>

        {/* Фоновые элементы */}
        <div className={styles["bg-decoration"]}></div>
      </div>
    </>
  );
}

export default MainPage;