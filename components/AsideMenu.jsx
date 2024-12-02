"use client";

import { logo_empresa } from "@/public";
import { asideMenuLinks } from "@/utils/staticData";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AsideMenu() {
  const path = usePathname();
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem(`usuario`));

    if (usuario) {
      setNombre(usuario.nombre);
      setEmail(usuario.email);
    }

    console.log(usuario);
  }, []);

  // Función para borrar todas las cookies
  const clearCookies = () => {
    const cookies = document.cookie.split(";");

    for (const cookie of cookies) {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
  };

  // Manejar el evento de logout
  const handleLogout = () => {
    localStorage.clear();
    clearCookies();
    router.push("/");
  };

  // Obtener la primera letra del nombre y del apellido
  const getInitials = (name) => {
    const nameParts = name.split(" ");
    const initials = nameParts
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase();
    return initials;
  };

  const initials = getInitials(nombre);

  return (
    <div className="xl:rounded-r grid grid-rows-1 lg:grid-rows-[auto,1fr,auto] h-screen w-full sm:w-72 bg-gray-900">
      {/* Logo y empresa */}
      <div className="hidden xl:flex p-6 items-center space-x-3">
        <Image
          src={logo_empresa}
          width={50}
          height={50}
          className="bg-white rounded-full p-[2px]"
          alt="logo de la empresa"
        />
        <p className="text-2xl leading-6 text-white">Empresa</p>
      </div>

      {/* Menú de navegación */}
      <div className="flex flex-col items-center p-4 gap-10 border-gray-600 border-b">
        {asideMenuLinks.map((link, index) => (
          <Link
            href={link.url}
            key={index}
            id={path && path.startsWith(link.url) ? "active" : null}
            className="flex justify-start items-center space-x-6 w-full text-white rounded"
          >
            <FontAwesomeIcon icon={link.icon} />
            <p className="text-base leading-4">{link.label}</p>
          </Link>
        ))}
      </div>

      {/* Usuario en la parte inferior */}
      <div className="grid justify-center gap-5 p-4 bg-gray-800">
        <div className="grid lg:flex justify-center items-center gap-5">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-600 text-white text-lg font-bold">{initials}</div>
          <div className="flex flex-col items-start">
            <p className="cursor-pointer text-sm leading-5 text-white">
              {nombre}
            </p>
            <p className="cursor-pointer text-xs leading-3 text-gray-300">
              {email}
            </p>
          </div>
        </div>

        <div
          className="flex items-center cursor-pointer text-white"
          onClick={handleLogout}
        >
          <FontAwesomeIcon icon={faRightFromBracket} className="mr-1" />
          <span className="text-sm">Log Out</span>
        </div>
      </div>
    </div>
  );
}
