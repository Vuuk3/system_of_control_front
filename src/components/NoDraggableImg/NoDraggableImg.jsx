function NoDraggableImg({ className, src, onClick }) {
  return (
    <img className={className} src={src} draggable={false} onClick={onClick} />
  );
}

export default NoDraggableImg;
