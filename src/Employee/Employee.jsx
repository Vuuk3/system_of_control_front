import styles from "./Employee.module.css";
import { person, calendar, salary, company } from "../utils/icons";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import Dialog from "../Dialog/Dialog";
import Profile from "./Profile/Profile";
import Schedule from "./Schedule/Schedule";
import Salary from "./Salary/Salary";
import Buttons from "./Buttons/Buttons";

function Employee({
  id = null,
  isEdit = true,
  setIsEdit = null,
  data = { currency: "RUB" },
  bonus = null,
  fine = null,
  cancelFalseText,
  saveDialogText,
  saveFalseText,
  saveTrueText,
  handleCommand,
}) {
  const [values, setValues] = useState(data);
  const [errors, setErrors] = useState({});
  const [days, setDays] = useState(data.schedule ? data.schedule : []);
  const [cancel, setCancel] = useState(false);
  const [save, setSave] = useState(false);
  const navigate = useNavigate();

  const handleChange = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    if (setIsEdit) {
      setIsEdit(true);
    }
  }, []);

  const handleClick = async () => {
    const data = {
      ...values,
      schedule: days.map((d) => ({
        date: format(d.date, "yyyy-MM-dd"),
        start_time: "08:00:00",
        end_time: "18:00:00",
      })),
    };
    setSave(false);
    try {
      if (handleCommand.length == 1) {
        await handleCommand(data);
      } else if (handleCommand.length == 2) {
        await handleCommand(id, data);
      }
      const channel = new BroadcastChannel("employees");
      channel.postMessage({ type: "employees-changed" });
      window.close();
      navigate("/employees");
    } catch (err) {
      if (err.response?.data?.detail == "User with this email already exists") {
        setErrors((prev) => ({
          ...prev,
          ["email"]: "Email занят",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          ["email"]: "Ошибка, попробуйте позже",
        }));
      }
    }
  };
  return (
    <>
      <div className={styles["main"]}>
        <div className={styles["header"]}>
          <img className={styles["header-logo"]} src={person} />
          <h1 className={styles["header-h1"]}>Анкета сотрудника</h1>
        </div>
        <div className={styles["cards"]}>
          <Profile
            text="Информация о сотруднике"
            cardLogo={person}
            img={company}
            handleChange={handleChange}
            values={values}
            errors={errors}
          />
          <Schedule
            text="Расписание смен"
            cardLogo={calendar}
            days={days}
            setDays={setDays}
            setEdit={setIsEdit}
          />
          <Salary
            text="Расчет зарплаты"
            cardLogo={salary}
            handleChange={handleChange}
            values={values}
            errors={errors}
            days={days}
            bonus={bonus}
            fine={fine}
          />
          <Buttons
            isEdit={isEdit}
            setCancel={setCancel}
            setSave={setSave}
            setErrors={setErrors}
            values={values}
            errors={errors}
          />
        </div>
      </div>
      <Dialog
        text="Внимание! Изменения не сохранятся"
        cancelText={cancelFalseText}
        saveText="Отменить"
        handleClick={() => window.close()}
        isOpen={cancel}
        onClose={() => setCancel(false)}
      />
      <Dialog
        text={saveDialogText}
        cancelText={saveFalseText}
        saveText={saveTrueText}
        handleClick={() => handleClick()}
        isOpen={save}
        onClose={() => setSave(false)}
      />
    </>
  );
}

export default Employee;
