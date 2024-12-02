"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [installations, setInstallations] = useState([]);
  const [activeInstallations, setActiveInstallations] = useState(0);
  const [inactiveInstallations, setInactiveInstallations] = useState(0);

  useEffect(() => {
    const fetchInstallations = async () => {
      const response = await fetch("http://localhost:3000/instalaciones");
      const data = await response.json();

      const active = data.filter(
        (installation) => installation.estado === "completado"
      ).length;
      const inactive = data.filter(
        (installation) => installation.estado !== "completado"
      ).length;

      setInstallations(data);
      setActiveInstallations(active);
      setInactiveInstallations(inactive);
    };

    fetchInstallations();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard de Instalaciones</h1>

      {/* Resumen de estadísticas clave */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Instalaciones Activas</h2>
          <p className="text-3xl font-bold text-green-600">
            {activeInstallations}
          </p>
        </div>

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
              {installations.map((installation, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{installation.cliente_nombre}</td>
                  <td className="px-4 py-2">{installation.producto_nombre}</td>
                  <td className="px-4 py-2">
                    {new Date(
                      installation.fecha_instalacion
                    ).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{installation.descripcion}</td>
                  <td className="px-4 py-2">
                    ${installation.costo_instalacion}
                  </td>
                  <td className="px-4 py-2">
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
