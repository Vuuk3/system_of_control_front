import Table from "@components/Table/Table";
import styles from "./AdjustmentsPage.module.css";

function AdjustmentsPage() {
  const adjustments = [
    { date: "2026-03-02", amount: -500, reason: "Опоздание" },
    { date: "2026-03-04", amount: 1000, reason: "Переработка" },
    { date: "2026-03-06", amount: -1000, reason: "Пропуск смены" },
    { date: "2026-03-08", amount: 1500, reason: "Хорошая выручка" },
    { date: "2026-03-10", amount: -500, reason: "Опоздание" },
    { date: "2026-03-12", amount: 2000, reason: "Перевыполнение плана" },
    { date: "2026-03-14", amount: -500, reason: "Нарушение регламента" },
    { date: "2026-03-15", amount: 1500, reason: "Дополнительная смена" },
    { date: "2026-03-02", amount: -500, reason: "Опоздание" },
    { date: "2026-03-04", amount: 1000, reason: "Переработка" },
    { date: "2026-03-06", amount: -1000, reason: "Пропуск смены" },
    { date: "2026-03-08", amount: 1500, reason: "Хорошая выручка" },
    { date: "2026-03-10", amount: -500, reason: "Опоздание" },
    { date: "2026-03-12", amount: 2000, reason: "Перевыполнение плана" },
    { date: "2026-03-14", amount: -500, reason: "Нарушение регламента" },
    { date: "2026-03-15", amount: 1500, reason: "Дополнительная смена" },

    { date: "2026-03-02", amount: -500, reason: "Опоздание" },
    { date: "2026-03-04", amount: 1000, reason: "Переработка" },
    { date: "2026-03-06", amount: -1000, reason: "Пропуск смены" },
    { date: "2026-03-08", amount: 1500, reason: "Хорошая выручка" },
    { date: "2026-03-10", amount: -500, reason: "Опоздание" },
    { date: "2026-03-12", amount: 2000, reason: "Перевыполнение плана" },
    { date: "2026-03-14", amount: -500, reason: "Нарушение регламента" },
    { date: "2026-03-15", amount: 1500, reason: "Дополнительная смена" },

    { date: "2026-03-02", amount: -500, reason: "Опоздание" },
    { date: "2026-03-04", amount: 1000, reason: "Переработка" },
    { date: "2026-03-06", amount: -1000, reason: "Пропуск смены" },
    { date: "2026-03-08", amount: 1500, reason: "Хорошая выручка" },
    { date: "2026-03-10", amount: -500, reason: "Опоздание" },
    { date: "2026-03-12", amount: 2000, reason: "Перевыполнение плана" },
    { date: "2026-03-14", amount: -500, reason: "Нарушение регламента" },
    { date: "2026-03-15", amount: 1500, reason: "Дополнительная смена" },

    { date: "2026-03-02", amount: -500, reason: "Опоздание" },
    { date: "2026-03-04", amount: 1000, reason: "Переработка" },
    { date: "2026-03-06", amount: -1000, reason: "Пропуск смены" },
    { date: "2026-03-08", amount: 1500, reason: "Хорошая выручка" },
    { date: "2026-03-10", amount: -500, reason: "Опоздание" },
    { date: "2026-03-12", amount: 2000, reason: "Перевыполнение плана" },
    { date: "2026-03-14", amount: -500, reason: "Нарушение регламента" },
    { date: "2026-03-15", amount: 1500, reason: "Дополнительная смена" },

    { date: "2026-03-02", amount: -500, reason: "Опоздание" },
    { date: "2026-03-04", amount: 1000, reason: "Переработка" },
    { date: "2026-03-06", amount: -1000, reason: "Пропуск смены" },
    { date: "2026-03-08", amount: 1500, reason: "Хорошая выручка" },
    { date: "2026-03-10", amount: -500, reason: "Опоздание" },
    { date: "2026-03-12", amount: 2000, reason: "Перевыполнение плана" },
    { date: "2026-03-14", amount: -500, reason: "Нарушение регламента" },
    { date: "2026-03-15", amount: 1500, reason: "Дополнительная смена" },
  ];
  const bonuses = adjustments.filter((adjustment) => adjustment.amount >= 0);
  const fines = adjustments.filter((adjustment) => adjustment.amount < 0);
  return (
    <>
      <div className={styles["main"]}>
        <h1 className={styles["header"]}>Премии и штрафы</h1>

        <div className={styles["profile"]}>
          <img className={styles["profile-photo"]} />
          <p className={styles["profile-name"]}>Малютин Никита Михайлович</p>
        </div>

        <div className={styles["tables"]}>
          <div className={styles["bonuses"]}>
            <h2 className={styles["adjustment-header"]}>Премии</h2>
            <Table
              headers={["Дата", "Размер", "Причина"]}
              content={bonuses.map((bonus) => [
                { type: "text", text: bonus.date },
                { type: "text", text: bonus.amount },
                { type: "text", text: bonus.reason },
              ])}
            />
            <p className={styles["bonuses-amount"]}>40000</p>
          </div>

          <div className={styles["fines"]}>
            <h2 className={styles["adjustment-header"]}>Штрафы</h2>
            <Table
              headers={["Дата", "Размер", "Причина"]}
              content={fines.map((fine) => [
                { type: "text", text: fine.date },
                { type: "text", text: fine.amount },
                { type: "text", text: fine.reason },
              ])}
            />
            <p className={styles["fines-amount"]}>3000</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdjustmentsPage;
