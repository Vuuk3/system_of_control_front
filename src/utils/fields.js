import { mail, building, address, person, field, inn } from "./icons";

export const LOGIN_FIELDS = [
  {
    name: "email",
    inputType: "email",
    maxLength: 32,
    header: "Электронная почта",
    placeholder: "ivanov@company.ru",
    logo: mail,
  },
];

export const REGISTER_FIELDS = [
  {
    name: "name",
    inputType: "text",
    maxLength: 50,
    header: "Имя компании",
    placeholder: "ООО «Ромашка»",
    logo: building,
  },
  {
    name: "legal_address",
    inputType: "text",
    maxLength: 80,
    header: "Юридический адрес",
    placeholder: "г. Москва, ул. Ленина, д. 1",
    logo: address,
  },
  {
    name: "business_area",
    inputType: "text",
    maxLength: 40,
    header: "Сфера деятельности",
    placeholder: "Информационные технологии",
    logo: field,
  },
  {
    name: "bik",
    inputType: "text",
    maxLength: 9,
    header: "БИК",
    placeholder: "044525225",
    logo: inn,
  },
  {
    name: "inn",
    inputType: "text",
    maxLength: 10,
    header: "ИНН",
    placeholder: "7707083893",
    logo: inn,
  },
  {
    name: "contact_surname",
    inputType: "text",
    maxLength: 60,
    header: "Фамилия контактного лица",
    placeholder: "Иванов",
    logo: person,
  },
  {
    name: "contact_name",
    inputType: "text",
    maxLength: 60,
    header: "Имя контактного лица",
    placeholder: "Иван",
    logo: person,
  },
  {
    name: "contact_patronymic",
    inputType: "text",
    maxLength: 60,
    header: "Отчество контактного лица",
    placeholder: "Иванович (необязательно)",
    logo: person,
  },
  {
    name: "email",
    inputType: "email",
    maxLength: 32,
    header: "Электронная почта контактного лица",
    placeholder: "ivanov@company.ru",
    logo: mail,
  },
  {
    name: "user_email",
    inputType: "email",
    maxLength: 32,
    header: "Электронная почта",
    placeholder: "ivanov@company.ru",
    logo: mail,
  },
];

export const EDIT_FIELDS = [
  {
    name: "name",
    inputType: "text",
    maxLength: 50,
    header: "Имя компании",
    placeholder: "ООО «Ромашка»",
    logo: building,
  },
  {
    name: "legal_address",
    inputType: "text",
    maxLength: 80,
    header: "Юридический адрес",
    placeholder: "г. Москва, ул. Ленина, д. 1",
    logo: address,
  },
  {
    name: "business_area",
    inputType: "text",
    maxLength: 40,
    header: "Сфера деятельности",
    placeholder: "Информационные технологии",
    logo: field,
  },
  {
    name: "full_name",
    inputType: "text",
    maxLength: 60,
    header: "ФИО контактного лица",
    placeholder: "Иванов Иван Иванович",
    logo: person,
  },
  {
    name: "email",
    inputType: "email",
    maxLength: 32,
    header: "Электронная почта контактного лица",
    placeholder: "ivanov@company.ru",
    logo: mail,
  },
];

export const EMPLOYEE_FIELDS = [
  { name: "full_name", inputType: "text", maxLength: 60, placeholder: "ФИО" },
  {
    name: "position",
    inputType: "text",
    maxLength: 50,
    placeholder: "Должность",
  },
  { name: "email", inputType: "email", maxLength: 32, placeholder: "Почта" },
  {
    name: "phone",
    inputType: "tel",
    maxLength: 18,
    placeholder: "Номер телефона",
  },
];
