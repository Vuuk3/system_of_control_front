import styles from "./QRCode.module.css";
import Menu from "@components/Menu/Menu";
import Title from "@components/Title/Title";
import NoDraggableImg from "@components/NoDraggableImg/NoDraggableImg";
import { share, qr_code } from "@utils/icons";

function QRCodePage() {
  return (
    <>
      <Title text="QR-код для анкеты" />
      <div className={styles["main"]}>
        <Menu header_text="QR-код" header_logo={share} />
        
        <div className={styles["content"]}>
          <div className={styles["qr-card"]}>
            <div className={styles["qr-header"]}>
              <h2 className={styles["qr-title"]}>Сканируйте QR-код для отметки посещаемости</h2>
            </div>
            
            <div className={styles["qr-wrapper"]}>
              <NoDraggableImg src={qr_code} className={styles["qr-img"]} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QRCodePage;