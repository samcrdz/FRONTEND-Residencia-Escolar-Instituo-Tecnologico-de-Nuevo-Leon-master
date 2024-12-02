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
  // Estados locales para manejar el modal, la instalación seleccionada, la carga de datos y los clientes/productos disponibles
  const [modal, setModal] = useState(false);
  const [selectedInstallation, setSelectedInstallation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);

  // useEffect para cargar los clientes y productos al inicializar el componente
  useEffect(() => {
    const fetchClientsAndProducts = async () => {
      try {
        // Hacer llamadas paralelas para obtener clientes y productos
        const [clientRes, productRes] = await Promise.all([
          fetch("http://localhost:3000/clientes"),
          fetch("http://localhost:3000/productos"),
        ]);

        // Obtener los datos de los clientes y productos
        const clientsData = await clientRes.json();
        const productsData = await productRes.json();

        // Almacenar los datos en los estados correspondientes
        setClients(clientsData);
        setProducts(productsData);
        setLoading(false); // Finaliza el estado de carga
      } catch (error) {
        console.error("Error al obtener clientes o productos", error);
        setLoading(false);
      }
    };

    fetchClientsAndProducts(); // Llamada para obtener los datos
  }, []);

  // Maneja la creación o actualización de la instalación
  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();  // Evita el comportamiento por defecto del formulario

    const formData = new FormData(e.target);  // Obtiene los datos del formulario
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
        // Si hay una instalación seleccionada, actualizarla
        await updateInstallation(selectedInstallation, data);
        alert("Instalación actualizada exitosamente");
        window.location.reload(); // Recarga la página para mostrar los cambios
      } else {
        // Si no hay instalación seleccionada, crear una nueva
        await handleSubmitInstallation(e);
        alert("Instalación guardada exitosamente");
        window.location.reload(); // Recarga la página para mostrar la nueva instalación
      }
    } catch (error) {
      alert(error.message);  // Muestra el error si ocurre
    }
  };

  // Maneja la eliminación de una instalación
  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "¿Estás seguro de que deseas eliminar esta instalación?"
    );
    if (confirmDelete) {
      try {
        // Realiza la solicitud DELETE para eliminar la instalación
        const response = await fetch(
          `http://localhost:3000/instalaciones/instalacion/${id}`,
          {
            method: "DELETE",
          }
        );

        // Verifica si la respuesta fue exitosa
        if (!response.ok) {
          throw new Error("Error al eliminar la instalación");
        }
        alert("Instalación eliminada exitosamente");
        setLoading(true); // Recarga los datos
      } catch (error) {
        alert(error.message);  // Muestra el error si ocurre
      }
    }
  };

  return (
    <div className="grid justify-center px-10">
      {/* Cabecera de la página */}
      <div className="flex justify-between items-center">
        <h1 className="text-yellow-400 font-bold text-4xl">Lista de Instalaciones</h1>
        <button
          className="text-md bg-green-800 px-5 py-1.5 rounded-md text-white font-semibold hover:text-opacity-40 transition-all"
          onClick={() => {
            setSelectedInstallation(null);  // Limpia la instalación seleccionada al agregar una nueva
            setModal(true);  // Muestra el formulario para agregar una nueva instalación
          }}
        >
          Agregar <FontAwesomeIcon icon={faCirclePlus} />
        </button>
      </div>

      {/* Si el modal está activo, muestra el formulario */}
      {modal && (
        <InstallationForm
          handleCreateOrUpdate={handleCreateOrUpdate}
          setModal={setModal}
          selectedInstallation={selectedInstallation}
          clients={clients}  // Pasa los clientes obtenidos
          products={products}  // Pasa los productos obtenidos
        />
      )}

      {/* Muestra el loader mientras los datos se están cargando */}
      {loading && <Loader />}

      <div className="container max-w-7xl">
        {/* Grid.js para mostrar las instalaciones en una tabla */}
        <Grid
          server={{
            url: "http://localhost:3000/instalaciones",
            handle: async (res) => {
              setLoading(false);  // Desactiva el loader cuando los datos son recibidos
              if (res.status === 404) return { data: [] };  // Si no hay datos, retorna un array vacío
              if (res.ok) return await res.json();  // Si la respuesta es exitosa, convierte los datos a JSON

              throw new Error("Error al obtener los datos");  // Lanza un error si algo falla
            },
            then: (data) =>
              data.map((instalacion) => [
                instalacion.cliente_nombre,  // Nombre del cliente
                instalacion.producto_nombre,  // Nombre del producto
                new Date(instalacion.fecha_instalacion).toLocaleDateString(
                  "es-MX",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                ),
                instalacion.descripcion,  // Descripción de la instalación
                parseFloat(instalacion.costo_instalacion).toLocaleString(
                  "es-MX",
                  {
                    style: "currency",
                    currency: "MXN",
                  }
                ),  // Costo de la instalación en formato moneda
                instalacion.estado,  // Estado de la instalación
                _(
                  <ActionsInstallation
                    handleDelete={handleDelete}  // Función para eliminar instalación
                    instalacion={instalacion}  // Datos de la instalación
                    setSelectedInstallation={setSelectedInstallation}  // Función para seleccionar instalación para editar
                    setModal={setModal}  // Función para abrir el modal de edición
                  />
                ),
              ]),
          }}
          columns={table_columns_instalacion}  // Define las columnas de la tabla
          search={true}  // Habilita la búsqueda
          sort={true}  // Habilita el ordenamiento
          pagination={{
            limit: 6,  // Limita el número de registros por página
          }}
        />
      </div>
    </div>
  );
}
