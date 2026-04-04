import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import NoDraggableLink from "../NoDraggableLink/NoDraggableLink";
import styles from "./NavBar.module.css";
import { LINKS_LIST } from "@utils/navLinks";

function NavBar({ visibleLinks, setVisibleLinks }) {
  const navRef = useRef(null);
  const prevRef = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const resizeObserver = new ResizeObserver(() => {
      if (prevRef.current !== nav.clientWidth) {
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
  }, [setVisibleLinks]);

  return (
    <ul
      className={styles["navigation"]}
      ref={navRef}
      style={{ visibility: visibleLinks ? "visible" : "hidden" }}
    >
      {LINKS_LIST.map((l) => {
        const isActive = l.link === location.pathname;
        const isDisabled = !l.link;

        return (
          <li key={l.text} className={styles["list-item"]}>
            <NoDraggableLink
              to={l.link || "#"}
              className={`${styles["link"]} ${isActive ? styles["checked"] : ""} ${isDisabled ? styles["disabled"] : ""}`}
            >
              {l.text}
            </NoDraggableLink>
          </li>
        );
      })}
    </ul>
  );
}

export default NavBar;