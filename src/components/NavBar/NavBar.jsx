import styles from "./NavBar.module.css";
import { Link, useLocation } from "react-router";

function NavBar() {
  const location = useLocation();
  const links = [
    { link: "/personal_account", text: "Главная страница" },
    { link: "/employees", text: "Персонал" },
    { link: "/salaries", text: "Зарплаты" },
    { link: null, text: "Расписание смен" },
    { link: null, text: "Заявки" },
    { link: null, text: "Показать QR-код" },
  ];
  return (
    <ul className={styles["navigation"]}>
      {links.map((l) =>
        l.link != location.pathname ? (
          <li key={l.text}>
            <Link to={l.link} className={styles["link"]}>
              {l.text}
            </Link>
          </li>
        ) : null,
      )}
    </ul>
  );
}

export default NavBar;
