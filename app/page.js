"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logo_empresa } from "@/public";
import Image from "next/image";
import { loginFormFields } from "@/utils/staticData";
import BarLoader from "@/components/BarLoader";

export default function Login() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const setSessionCookie = (value) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + 1 * 60 * 60 * 1000);
    document.cookie = `cookie-sesion=${value}; expires=${expires.toUTCString()}; path=/;`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ usuario, contraseña }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error en la respuesta del servidor:", errorText);
        setError("Error al iniciar sesión: " + errorText);
        setLoading(false);
        return;
      }

      const data = await res.json();
      console.log("Mensaje del backend:", data.message);
      console.log("Cookies actuales:", document.cookie);

      console.log(data.user.nombre);
      localStorage.setItem(`usuario`, JSON.stringify({
        nombre: data.user.nombre,
        usuario: data.user.usuario,
        email: data.user.email,
        rol: data.user.rol,
      }));


      // Establecer la cookie de sesión
      setSessionCookie(data.sessionToken || "defaultToken");

      setError("");
      router.push("/dashboard");


    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Error al iniciar sesión: " + error.message);
    } finally {
      setLoading(false);
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
                  setUsuario(value);
                } else if (id === "contraseña") {
                  setContraseña(value);
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
