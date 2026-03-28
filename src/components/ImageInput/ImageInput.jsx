import styles from "./ImageInput.module.css";
import NoDraggableImg from "../NoDraggableImg/NoDraggableImg";

function ImageInput({
  img,
  loadImage,
  containerClassName = "",
  inputClassName = "",
  photoClassName = "",
}) {
  return (
    <div className={`${styles["img"]} ${containerClassName}`}>
      <input
        type="file"
        className={`${styles["avatar-input"]} ${inputClassName}`}
        onChange={(e) => loadImage(e.target)}
      />
      <NoDraggableImg
        className={`${styles["photo"]} ${photoClassName}`}
        src={img}
      />
    </div>
  );
}

export default ImageInput;
