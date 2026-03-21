import { useEffect, useRef, useState } from "react";
import NoDraggableLink from "../NoDraggableLink/NoDraggableLink";
import styles from "./NavBar.module.css";
import { useLocation } from "react-router";
import { LINKS_LIST } from "@utils/navLinks";

function NavBar({ visibleLinks, setVisibleLinks }) {
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const widthsRef = useRef([]);
  const prevRef = useRef(0);
  const GAP = 20;
  useEffect(() => {
    const nav = navRef.current;
    const links = linksRef.current;
    if (!nav || !links) return;
    requestAnimationFrame(() => {
      widthsRef.current = links.map((link) => link?.offsetWidth || 0);
    });
    const resizeObserver = new ResizeObserver(() => {
      if (prevRef.current != nav.clientWidth) {
        const widths = widthsRef.current;
        let width = 0;
        let i = 0;
        for (i; i < links.length; i++) {
          if (!links[i]) continue;
          if (width + widths[i] > nav.clientWidth) break;
          width += widths[i] + GAP;
        }
        setVisibleLinks((prev) => prev.map((_, index) => i > index));

        prevRef.current = nav.clientWidth;
      }
    });
    resizeObserver.observe(nav);

    return () => resizeObserver.disconnect();
  }, []);
  const location = useLocation();
  return (
    <ul className={styles["navigation"]} ref={navRef}>
      {LINKS_LIST.map((l, i) =>
        l.link != location.pathname ? (
          <li
            key={l.text}
            ref={(el) => (linksRef.current[i] = el)}
            style={{
              visibility: visibleLinks[i] ? "visible" : "hidden",
              transform: visibleLinks[i] ? "none" : "scale(0)",
            }}
          >
            <NoDraggableLink to={l.link} className={styles["link"]}>
              {l.text}
            </NoDraggableLink>
          </li>
        ) : null,
      )}
    </ul>
  );
}

export default NavBar;
