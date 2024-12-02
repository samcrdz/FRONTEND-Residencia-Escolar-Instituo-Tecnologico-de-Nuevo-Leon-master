"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  // Estado para almacenar las instalaciones
  const [installations, setInstallations] = useState([]);
  // Estado para contar las instalaciones activas (completadas)
  const [activeInstallations, setActiveInstallations] = useState(0);
  // Estado para contar las instalaciones inactivas (no completadas)
  const [inactiveInstallations, setInactiveInstallations] = useState(0);

  // useEffect para realizar la solicitud de instalaciones cuando el componente se monta
  useEffect(() => {
    const fetchInstallations = async () => {
      // Realiza una solicitud GET al backend para obtener las instalaciones
      const response = await fetch("http://localhost:3000/instalaciones");
      const data = await response.json();  // Convierte la respuesta a JSON

      // Filtra las instalaciones activas (completadas) y las inactivas
      const active = data.filter(
        (installation) => installation.estado === "completado"
      ).length;
      const inactive = data.filter(
        (installation) => installation.estado !== "completado"
      ).length;

      // Establece los valores en el estado
      setInstallations(data);
      setActiveInstallations(active);
      setInactiveInstallations(inactive);
    };

    // Llama a la función para obtener las instalaciones
    fetchInstallations();
  }, []);  // El array vacío asegura que solo se ejecute una vez al montar el componente

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard de Instalaciones</h1>

      {/* Resumen de estadísticas clave */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sección para mostrar el número de instalaciones activas */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Instalaciones Activas</h2>
          <p className="text-3xl font-bold text-green-600">
            {activeInstallations}
          </p>
        </div>

        {/* Sección para mostrar el número de instalaciones inactivas */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">
            Instalaciones Inactivas
          </h2>
          <p className="text-3xl font-bold text-red-600">
            {inactiveInstallations}
          </p>
        </div>
      </div>

      {/* Lista de instalaciones recientes */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Instalaciones Recientes</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2">Cliente</th>
                <th className="px-4 py-2">Producto</th>
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Descripción</th>
                <th className="px-4 py-2">Costo</th>
                <th className="px-4 py-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {/* Mapea las instalaciones y las muestra en una tabla */}
              {installations.map((installation, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{installation.cliente_nombre}</td>
                  <td className="px-4 py-2">{installation.producto_nombre}</td>
                  <td className="px-4 py-2">
                    {/* Formatea la fecha de instalación */}
                    {new Date(
                      installation.fecha_instalacion
                    ).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{installation.descripcion}</td>
                  <td className="px-4 py-2">
                    ${installation.costo_instalacion}
                  </td>
                  <td className="px-4 py-2">
                    {/* Estilo dinámico según el estado de la instalación */}
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        installation.estado === "completado"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {installation.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
