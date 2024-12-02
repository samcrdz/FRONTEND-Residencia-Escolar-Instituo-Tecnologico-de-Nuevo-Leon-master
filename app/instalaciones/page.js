"use client";

import ActionsInstallation from "@/components/ActionsTable/ActionsInstallation";
import InstallationForm from "@/components/Forms/InstallationForm";
import Loader from "@/components/Loader";
import {
  handleSubmitInstallation,
  updateInstallation,
} from "@/services/fetchInstalacion";
import { table_columns_instalacion } from "@/utils/staticData";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid } from "gridjs-react";
import { _ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { useState, useEffect } from "react";

export default function InstalacionPage() {
  const [modal, setModal] = useState(false);
  const [selectedInstallation, setSelectedInstallation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);

  // Llamada para obtener clientes y productos
  useEffect(() => {
    const fetchClientsAndProducts = async () => {
      try {
        const [clientRes, productRes] = await Promise.all([
          fetch("http://localhost:3000/clientes"),
          fetch("http://localhost:3000/productos"),
        ]);

        const clientsData = await clientRes.json();
        const productsData = await productRes.json();

        setClients(clientsData);
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener clientes o productos", error);
        setLoading(false);
      }
    };

    fetchClientsAndProducts();
  }, []);

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      cliente_id: formData.get("cliente"),
      producto_id: formData.get("producto"),
      fecha_instalacion: formData.get("fecha_instalacion"),
      descripcion: formData.get("descripcion"),
      costo_instalacion: formData.get("costo_instalacion"),
      estado: formData.get("estado"),
    };

    try {
      if (selectedInstallation) {
        await updateInstallation(selectedInstallation, data);
        alert("Instalación actualizada exitosamente");
        window.location.reload();
      } else {
        await handleSubmitInstallation(e);
        alert("Instalación guardada exitosamente");
        window.location.reload();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "¿Estás seguro de que deseas eliminar esta instalacion?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:3000/instalaciones/instalacion/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Error al eliminar el producto");
        }
        alert("Producto eliminado exitosamente");
        setLoading(true);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="grid justify-center px-10">
      <div className="flex justify-between items-center">
        <h1 className="text-yellow-400 font-bold text-4xl">Lista de Instalaciones</h1>
        <button
          className="text-md bg-green-800 px-5 py-1.5 rounded-md text-white font-semibold hover:text-opacity-40 transition-all"
          onClick={() => {
            setSelectedInstallation(null);
            setModal(true);
          }}
        >
          Agregar <FontAwesomeIcon icon={faCirclePlus} />
        </button>
      </div>

      {modal && (
        <InstallationForm
          handleCreateOrUpdate={handleCreateOrUpdate}
          setModal={setModal}
          selectedInstallation={selectedInstallation}
          clients={clients}
          products={products}
        />
      )}

      {loading && <Loader />}

      <div className="container max-w-7xl">
        <Grid
          server={{
            url: "http://localhost:3000/instalaciones",
            handle: async (res) => {
              setLoading(false);
              if (res.status === 404) return await { data: [] };
              if (res.ok) return await res.json();

              throw new Error("Error al obtener los datos");
            },
            then: (data) =>
              data.map((instalacion) => [
                instalacion.cliente_nombre,
                instalacion.producto_nombre,
                new Date(instalacion.fecha_instalacion).toLocaleDateString(
                  "es-MX",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                ),
                instalacion.descripcion,
                parseFloat(instalacion.costo_instalacion).toLocaleString(
                  "es-MX",
                  {
                    style: "currency",
                    currency: "MXN",
                  }
                ),
                instalacion.estado,
                _(
                  <ActionsInstallation
                  handleDelete={handleDelete}
                    instalacion={instalacion}
                    setSelectedInstallation={setSelectedInstallation} 
                    setModal={setModal} 
                  />
                ),
              ]),
          }}
          columns={table_columns_instalacion}
          search={true}
          sort={true}
          pagination={{
            limit: 6,
          }}
        />
      </div>
    </div>
  );
}
