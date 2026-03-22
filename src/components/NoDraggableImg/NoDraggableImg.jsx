function NoDraggableImg({ className, src, onClick, title = null }) {
  return (
    <img
      className={className}
      title={title}
      src={src}
      draggable={false}
      onClick={onClick}
    />
  );
}

export default NoDraggableImg;
