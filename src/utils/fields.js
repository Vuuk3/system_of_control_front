import { mail, building, address, person, field } from "./icons";

export const LOGIN_FIELDS = [
  {
    name: "email",
    inputType: "email",
    maxLength: 32,
    placeholder: "Электронная почта",
    logo: mail,
  },
];

export const REGISTER_FIELDS = [
  {
    name: "name",
    inputType: "text",
    maxLength: 50,
    placeholder: "Имя компании",
    logo: building,
  },
  {
    name: "legal_address",
    inputType: "text",
    maxLength: 80,
    placeholder: "Юридический адрес",
    logo: address,
  },
  {
    name: "business_area",
    inputType: "text",
    maxLength: 40,
    placeholder: "Сфера деятельности",
    logo: field,
  },
  {
    name: "contact_name",
    inputType: "text",
    maxLength: 60,
    placeholder: "ФИО контактного лица",
    logo: person,
  },
  {
    name: "email",
    inputType: "email",
    maxLength: 32,
    placeholder: "Электронная почта контактного лица",
    logo: mail,
  },

  {
    name: "user_email",
    inputType: "email",
    maxLength: 32,
    placeholder: "Электронная почта",
    logo: mail,
  },
];

export const EDIT_FIELDS = [
  {
    name: "name",
    inputType: "text",
    maxLength: 50,
    placeholder: "Имя компании",
    logo: building,
  },
  {
    name: "legal_address",
    inputType: "text",
    maxLength: 80,
    placeholder: "Юридический адрес",
    logo: address,
  },
  {
    name: "contact_name",
    inputType: "text",
    maxLength: 60,
    placeholder: "ФИО контактного лица",
    logo: person,
  },
  {
    name: "email",
    inputType: "email",
    maxLength: 32,
    placeholder: "Электронная почта контактного лица",
    logo: mail,
  },
  {
    name: "business_area",
    inputType: "text",
    maxLength: 40,
    placeholder: "Сфера деятельности",
    logo: field,
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
