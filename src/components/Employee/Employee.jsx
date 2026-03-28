import styles from "./Employee.module.css";
import { person, calendar, salary, clock } from "@utils/icons";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import Dialog from "@components/Dialog/Dialog";
import Profile from "./Profile/Profile";
import Schedule from "./Schedule/Schedule";
import Salary from "./Salary/Salary";
import Buttons from "./Buttons/Buttons";
import TimeEntries from "./TimeEntries/TimeEntries";
import NoDraggableImg from "../NoDraggableImg/NoDraggableImg";

function Employee({
  mode = "add",
  id = null,
  deleteUser = null,
  data = { currency: "RUB" },
  bonus = null,
  fine = null,
  attendance = null,
  cancelFalseText,
  saveDialogText,
  saveFalseText,
  saveTrueText,
  handleCommand,
  setAvatar,
  url = null,
}) {
  const [values, setValues] = useState(data);
  const [errors, setErrors] = useState({});
  const [img, setImg] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [days, setDays] = useState(data.schedule ? data.schedule : []);
  const [cancel, setCancel] = useState(false);
  const [save, setSave] = useState(false);
  const [del, setDel] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAvatar = async () => {
      if (imgFile) {
        const formData = new FormData();
        formData.append("file", imgFile);
        await setAvatar(formData);
      }
    };
    checkAvatar();
  }, [imgFile]);

  const loadImage = async (input) => {
    const file = input.files[0];
    if (!file) return;
    setImgFile(file);
    const reader = new FileReader();

    reader.onload = () => {
      const dataURL = reader.result;
      setImg(dataURL);
    };

    reader.readAsDataURL(file);
  };

  const handleChange = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name == "rate_amount" || name == "rate_type") {
      setDays((prev) =>
        prev.map((d) => ({
          ...d,
          [name]: value,
        })),
      );
    }
  }, []);

  const deleteClick = async () => {
    setDel(false);
    try {
      await deleteUser(id);
      const channel = new BroadcastChannel("employees");
      channel.postMessage({ type: "employees-changed" });
      window.close();
      navigate("/employees");
    } catch {
      setErrors((prev) => ({
        ...prev,
        ["email"]: "Ошибка, попробуйте позже",
      }));
    }
  };

  const handleClick = async () => {
    const data = {
      ...values,
      avatar_url: url?.avatar_url || null,
      password: "1",
      schedule: days.map((d) => ({
        date: format(d.date, "yyyy-MM-dd"),
        rate_type: d.rate_type,
        rate_amount: d.rate_amount,
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
        <div className={styles["panel"]}>
          <div className={styles["header"]}>
            <NoDraggableImg className={styles["header-logo"]} src={person} />
            <h1 className={styles["header-h1"]}>
              {mode == "add" ? "Добавление сотрудника" : "Анкета сотрудника"}
            </h1>
          </div>
        </div>
        <div className={styles["cards-wrapper"]}>
          <div className={styles["cards"]}>
            <Profile
              mode={mode}
              text="Информация о сотруднике"
              cardLogo={person}
              img={img}
              loadImage={loadImage}
              handleChange={handleChange}
              values={values}
              errors={errors}
            />
            <Schedule
              text="Расписание смен"
              cardLogo={calendar}
              days={days}
              setDays={setDays}
              rate_type={values["rate_type"]}
              rate_amount={values["rate_amount"]}
            />
            <Salary
              mode={mode}
              text="Расчет зарплаты"
              cardLogo={salary}
              handleChange={handleChange}
              values={values}
              errors={errors}
              days={days}
              bonus={bonus}
              fine={fine}
              attendance={attendance}
            />
            <TimeEntries text="Посещаемость" logo={clock} values={attendance} />

            <Buttons
              mode={mode}
              setCancel={setCancel}
              setDel={setDel}
              setSave={setSave}
              setErrors={setErrors}
              values={values}
              errors={errors}
            />
          </div>
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
      <Dialog
        text="Удалить сотрудника?"
        cancelText="Отмена"
        saveText="Удалить"
        handleClick={() => deleteClick(id)}
        isOpen={del}
        onClose={() => setDel(false)}
      />
    </>
  );
}

export default Employee;
