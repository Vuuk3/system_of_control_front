import { Link } from "react-router";

function NoDraggableLink({ className, to, target, rel, children }) {
  return (
    <Link
      className={className}
      to={to}
      target={target}
      rel={rel}
      draggable={false}
      children={children}
    />
  );
}

export default NoDraggableLink;
