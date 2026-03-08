import { mail, building, address, person, field } from "./icons";

export const LOGIN_FIELDS = [
  {
    name: "email",
    inputType: "email",
    maxLength: 32,
    placeholder: "Email",
    logo: mail,
  },
];

export const REGISTER_FIELDS = [
  {
    name: "name",
    inputType: "text",
    maxLength: 50,
    placeholder: "Company name",
    logo: building,
  },
  {
    name: "legal_address",
    inputType: "text",
    maxLength: 80,
    placeholder: "Address",
    logo: address,
  },
  {
    name: "contact_name",
    inputType: "text",
    maxLength: 60,
    placeholder: "FIO",
    logo: person,
  },
  {
    name: "email",
    inputType: "email",
    maxLength: 32,
    placeholder: "Contact email",
    logo: mail,
  },
  {
    name: "business_area",
    inputType: "text",
    maxLength: 40,
    placeholder: "Field of activity",
    logo: field,
  },
  {
    name: "user_email",
    inputType: "email",
    maxLength: 32,
    placeholder: "Email",
    logo: mail,
  },
];

export const EDIT_FIELDS = [
  {
    name: "name",
    inputType: "text",
    maxLength: 50,
    placeholder: "Company name",
    logo: building,
  },
  {
    name: "legal_address",
    inputType: "text",
    maxLength: 80,
    placeholder: "Address",
    logo: address,
  },
  {
    name: "contact_name",
    inputType: "text",
    maxLength: 60,
    placeholder: "FIO",
    logo: person,
  },
  {
    name: "email",
    inputType: "email",
    maxLength: 32,
    placeholder: "Contact email",
    logo: mail,
  },
  {
    name: "business_area",
    inputType: "text",
    maxLength: 40,
    placeholder: "Field of activity",
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
