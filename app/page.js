"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logo_empresa } from "@/public";
import Image from "next/image";
import { loginFormFields } from "@/utils/staticData";
import BarLoader from "@/components/BarLoader";

export default function Login() {
  const router = useRouter();  // Obtiene el enrutador de Next.js para redirigir al usuario después del login
  const [usuario, setUsuario] = useState("");  // Estado para almacenar el valor del campo "usuario"
  const [contraseña, setContraseña] = useState("");  // Estado para almacenar el valor del campo "contraseña"
  const [error, setError] = useState("");  // Estado para almacenar los mensajes de error
  const [loading, setLoading] = useState(false);  // Estado para manejar el estado de carga (spinner)

  // Función para establecer una cookie de sesión con un valor específico y un tiempo de expiración de 1 hora
  const setSessionCookie = (value) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + 1 * 60 * 60 * 1000);  // La cookie expirará en 1 hora
    document.cookie = `cookie-sesion=${value}; expires=${expires.toUTCString()}; path=/;`;
  };

  // Función que maneja el envío del formulario de inicio de sesión
  const handleSubmit = async (e) => {
    e.preventDefault();  // Previene el comportamiento predeterminado del formulario (evitar recarga de página)
    setLoading(true);  // Activa el estado de carga (para mostrar el spinner)
    setError("");  // Resetea el estado de error

    try {
      // Realiza la solicitud POST al backend para verificar las credenciales del usuario
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",  // Método POST para enviar las credenciales
        headers: {
          "Content-Type": "application/json",  // Establece el tipo de contenido como JSON
        },
        credentials: "include",  // Incluye las cookies para manejar la sesión
        body: JSON.stringify({ usuario, contraseña }),  // Envía las credenciales como JSON
      });

      if (!res.ok) {  // Si la respuesta no es exitosa (código no 2xx)
        const errorText = await res.text();  // Obtiene el texto del error de la respuesta
        console.error("Error en la respuesta del servidor:", errorText);
        setError("Error al iniciar sesión: " + errorText);  // Establece el mensaje de error
        setLoading(false);  // Desactiva el estado de carga
        return;  // Sale de la función en caso de error
      }

      const data = await res.json();  // Convierte la respuesta en formato JSON
      console.log("Mensaje del backend:", data.message);  // Muestra el mensaje recibido del backend
      console.log("Cookies actuales:", document.cookie);  // Muestra las cookies actuales en el navegador

      console.log(data.user.nombre);  // Muestra el nombre del usuario desde los datos recibidos
      // Guarda la información del usuario en el almacenamiento local del navegador (localStorage)
      localStorage.setItem(`usuario`, JSON.stringify({
        nombre: data.user.nombre,
        usuario: data.user.usuario,
        email: data.user.email,
        rol: data.user.rol,
      }));

      // Establece la cookie de sesión con el token recibido o un valor predeterminado
      setSessionCookie(data.sessionToken || "defaultToken");

      setError("");  // Resetea cualquier mensaje de error
      router.push("/dashboard");  // Redirige al usuario a la página del dashboard

    } catch (error) {
      console.error("Error al iniciar sesión:", error);  // Muestra el error si ocurre durante la solicitud
      setError("Error al iniciar sesión: " + error.message);  // Establece el mensaje de error
    } finally {
      setLoading(false);  // Desactiva el estado de carga al finalizar la solicitud (ya sea exitosa o con error)
    }
  };

  return (
    <>
      {loading && <BarLoader />} {/* Mostrar el loader si loading es true */}

      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
          <div className="grid gap-5 justify-center">
            <Image
              src={logo_empresa}
              alt="Logo"
              width={70}
              height={100}
              className="mx-auto rounded-full"
            />
            <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
          </div>

          <form onSubmit={handleSubmit}>
            {loginFormFields.map(({ id, label, type, placeholder }, index) => {
              const handleChange = (e) => {
                const { value } = e.target;
                if (id === "usuario") {
                  setUsuario(value);  // Actualiza el estado del campo "usuario"
                } else if (id === "contraseña") {
                  setContraseña(value);  // Actualiza el estado del campo "contraseña"
                }
              };

              return (
                <div className="mb-4" key={index}>
                  <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {label}
                  </label>

                  <input
                    type={type}
                    id={id}
                    value={id === "usuario" ? usuario : contraseña}
                    onChange={handleChange}
                    required
                    className="text-black shadow-sm border outline-none border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                    placeholder={placeholder}
                  />
                </div>
              );
            })}

            <button
              type="submit"
              className="w-full bg-gray-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition duration-200"
            >
              Iniciar Sesión
            </button>
          </form>

          {error && <p className="text-red-500 mb-4">{error}</p>} {/* Mostrar errores aquí */}
        </div>
      </div>
    </>
  );
}
