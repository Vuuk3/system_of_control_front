import styles from "./Applications.module.css";
import Menu from "@components/Menu/Menu";
import Title from "@components/Title/Title";
import { mail } from "@utils/icons";
import ApplicationCard from "@components/ApplicationCard/ApplicationCard";
import { MOCK_APPLICATIONS } from "@utils/mockData";

function Applications() {
    return (
        <>
            <Title text="Заявки" />
            <div className={styles["main"]}>
                <Menu header_text="Заявки" header_logo={mail} />

                <div className={styles["content"]}>
                    <div className={styles["list-wrapper"]}>
                        <div className={styles["header"]}>
                            <h2 className={styles["title"]}>Новые отклики</h2>
                            <span className={styles["count"]}>{MOCK_APPLICATIONS.length}</span>
                        </div>

                        <div className={styles["applications-list"]}>
                            {MOCK_APPLICATIONS.map(app => (
                                <ApplicationCard key={app.id} data={app} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Applications;