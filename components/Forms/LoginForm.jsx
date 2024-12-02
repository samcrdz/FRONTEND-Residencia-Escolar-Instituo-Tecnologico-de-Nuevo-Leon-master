import { loginFormFields } from "@/utils/staticData";
import { useState } from "react";

export default function LoginForm({ handleLogin }) {
  const [formValues, setFormValues] = useState({
    usuario: "",
    contraseña: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(formValues.usuario, formValues.contraseña);
  };

  return (
    <form onSubmit={handleSubmit}>
      {loginFormFields.map(({ id, label, type, placeholder }) => (
        <div className="mb-4" key={id}>
          <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
          <input
            type={type}
            id={id}
            value={formValues[id]}
            onChange={handleChange}
            required
            className="text-black shadow-sm border outline-none border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
            placeholder={placeholder}
          />
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-gray-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition duration-200"
      >
        Iniciar Sesión
      </button>
    </form>
  );
}
