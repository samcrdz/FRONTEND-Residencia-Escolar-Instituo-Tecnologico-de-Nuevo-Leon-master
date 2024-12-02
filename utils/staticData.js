import {
  faBriefcase,
  faClipboardList,
  faCubes,
  faPeopleArrows,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const asideMenuLinks = [
  {
    url: "/dashboard",
    icon: faClipboardList,
    label: "Dashboard",
  },
  {
    url: "/usuarios",
    icon: faUser,
    label: "Usuarios",
  },
  {
    url: "/productos",
    icon: faCubes,
    label: "Productos",
  },
  {
    url: "/clientes",
    icon: faPeopleArrows,
    label: "Clientes",
  },
  {
    url: "/instalaciones",
    icon: faBriefcase,
    label: "Instalaciones",
  },
];

export const clientFormFields = [
  {
    db_field: "nombre",
    label_text: "Nombre del Cliente",
    input_type: "text",
    placeholder: "Nombre del cliente",
  },
  {
    db_field: "direccion",
    label_text: "Direccion",
    input_type: "text",
    placeholder: "Direccion del cliente",
  },
  {
    db_field: "telefono",
    label_text: "Numero de telefono",
    input_type: "text",
    placeholder: "ej. 8122941232",
  },
];

export const loginFormFields = [
  {
    id: "usuario",
    label: "Usuario",
    type: "text",
    value: "usuario",
    setValue: "setUsuario",
    placeholder: "Ingresa tu usuario",
  },
  {
    id: "contraseña",
    label: "Contraseña",
    type: "password",
    value: "contraseña",
    setValue: "setContraseña",
    placeholder: "Ingresa tu contraseña",
  },
];

export const usersFormFields = [
  {
    db_field: "nombre",
    label_text: "Nombre",
    input_type: "text",
    placeholder: "Ingresa el nombre",
  },
  {
    db_field: "usuario",
    label_text: "Usuario",
    input_type: "text",
    placeholder: "Nombre de usuario",
  },
  {
    db_field: "email",
    label_text: "Correo",
    input_type: "email",
    placeholder: "Correo",
  },
  {
    db_field: "contraseña",
    label_text: "Contraseña",
    input_type: "password",
    placeholder: "Ingresa la contraseña",
  },
];

export const table_columns_instalacion = [
  "Cliente",
  "Producto",
  "Fecha de instalación",
  "Descripción",
  "Costo",
  "Estatus",
  "Acciones",
];

export const table_columns_clientes = [
  "Nombre",
  "Direccion",
  "Telefono",
  "Acciones",
];
export const table_columns_productos = [
  "Nombre",
  "Descripción",
  "Precio",
  "Stock",
  "Acciones",
];
export const table_columns_usuarios = [
  "Nombre",
  "Usuario",
  "Correo",
  "Rol",
  "Estado",
  "Acciones",
];
