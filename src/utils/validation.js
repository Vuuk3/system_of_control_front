export function validation(values) {
  const newErrors = {};
  const emailRegex = new RegExp(
    "^([A-Za-z0-9._%+-])+@+([a-z0-9.-])+\\.[a-z]{2,}$",
  );
  const fioRegex = new RegExp(
    "^[A-ZА-Я][a-zа-я]+(-[A-ZА-Я][a-zа-я]+)?\\s[A-ZА-Я][a-zа-я]+(\\s[A-ZА-Я][a-zа-я]+)?$",
    "u",
  );
  const surnameRegex = new RegExp("^[A-ZА-Я][a-zа-я]+(-[A-ZА-Я][a-zа-я])?$");
  const nameRegex = new RegExp("^[A-ZА-Я][a-zа-я]{1,}$");
  const patronymicRegex = new RegExp("^[A-ZА-Я][a-zа-я]{1,}$|^$");
  const phoneRegex = new RegExp("^\\+?[1-9]\\d{7,14}$");
  const salaryRegex = new RegExp("^[0-9]{1,}(\\.[0-9]{1,})?$");

  const fields = [
    {
      field: "user_email",
      regex: emailRegex,
      errorMessage: "Адрес некорректен",
    },
    { field: "name" },
    { field: "legal_address" },
    {
      field: "contact_name",
      regex: nameRegex,
      errorMessage: 'Не соответствует формату: "Иван"',
    },
    {
      field: "contact_surname",
      regex: surnameRegex,
      errorMessage: 'Не соотетствует формату "Иванов"',
    },
    {
      field: "contact_patronymic",
      regex: patronymicRegex,
      errorMessage: 'Не соответствует формату "Иванов"',
    },
    { field: "email", regex: emailRegex, errorMessage: "Адрес некорректен" },
    { field: "business_area" },
    { field: "password" },
    {
      field: "phone",
      regex: phoneRegex,
      errorMessage: "Номер телефона некорректен",
    },
    { field: "position" },
    {
      field: "rate_amount",
      regex: salaryRegex,
      errorMessage: "Некорректное значение",
    },
    {
      field: "full_name",
      regex: fioRegex,
      errorMessage: 'Не соответствует формату: "Иванов Иван Иавнович"',
    },
  ];

  fields.forEach(({ field, regex, errorMessage }) => {
    if (field in values) {
      if (values[field].length == 0 && field != "contact_patronymic") {
        newErrors[field] = "Заполните поле";
      } else if (regex && !regex.test(values[field])) {
        newErrors[field] = errorMessage;
      }
    }
  });
  return newErrors;
}
