export function validation(values) {
  const newErrors = {};
  const emailRegex = new RegExp(
    "^([A-Za-z0-9._%+-])+@+([a-z0-9.-])+\\.[a-z]{2,}$",
  );
  const fioRegex = new RegExp(
    "^[A-ZА-Я][a-zа-я]+(-[A-ZА-Я][a-zа-я]+)?\\s[A-ZА-Я][a-zа-я]+(\\s[A-ZА-Я][a-zа-я]+)?$",
    "u",
  );
  const phoneRegex = new RegExp("^\\+?[1-9]\\d{7,14}$");

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
      regex: fioRegex,
      errorMessage: 'Не соответствует формату: "Иванов Иван Иавнович"',
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
    { field: "rate_amount" },
    {
      field: "full_name",
      regex: fioRegex,
      errorMessage: 'Не соответствует формату: "Иванов Иван Иавнович"',
    },
  ];

  fields.forEach(({ field, regex, errorMessage }) => {
    if (field in values) {
      if (values[field].length == 0) {
        newErrors[field] = "Заполните поле";
      } else if (regex && !regex.test(values[field])) {
        newErrors[field] = errorMessage;
      }
    }
  });
  return newErrors;
}
