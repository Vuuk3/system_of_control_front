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
      {LINKS_LIST.map((l) => (
        <li key={l.text}>
          <NoDraggableLink
            to={l.link}
            className={`${styles["link"]} ${l.link == location.pathname ? styles["checked"] : ""}`}
          >
            {l.text}
          </NoDraggableLink>
        </li>
      ))}
    </ul>
  );
}

export default NavBar;
