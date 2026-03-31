import { useEffect, useRef } from "react";
import NoDraggableLink from "../NoDraggableLink/NoDraggableLink";
import styles from "./NavBar.module.css";
import { useLocation } from "react-router";
import { LINKS_LIST } from "@utils/navLinks";

function NavBar({ visibleLinks, setVisibleLinks }) {
  const navRef = useRef(null);
  const prevRef = useRef(0);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const resizeObserver = new ResizeObserver(() => {
      if (prevRef.current != nav.clientWidth) {
        if (nav.scrollWidth > nav.clientWidth) {
          setVisibleLinks(false);
        } else {
          setVisibleLinks(true);
        }

        prevRef.current = nav.clientWidth;
      }
    });
    resizeObserver.observe(nav);

    return () => resizeObserver.disconnect();
  }, []);
  const location = useLocation();
  return (
    <ul
      className={styles["navigation"]}
      ref={navRef}
      style={{ visibility: visibleLinks ? "visible" : "hidden" }}
    >
      {LINKS_LIST.map((link) => (
        <li key={link.text}>
          <NoDraggableLink
            to={link.link}
            className={`${styles["link"]} ${link.link == location.pathname ? styles["checked"] : ""}`}
          >
            {link.text}
          </NoDraggableLink>
        </li>
      ))}
    </ul>
  );
}

export default NavBar;
