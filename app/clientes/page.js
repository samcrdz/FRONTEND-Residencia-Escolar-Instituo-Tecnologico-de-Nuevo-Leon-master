"use client";

import { Grid } from "gridjs-react";
import { _ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { useState } from "react";
import Loader from "@/components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import ClientsForm from "@/components/Forms/ClientsForm";
import { handleSubmitClients, updateClient } from "@/services/fetchClientes";
import ActionsClients from "@/components/ActionsTable/ActionsClients";
import { table_columns_clientes } from "@/utils/staticData";

export default function ClientesPage() {
  // Estado para manejar la visibilidad del modal
  const [modal, setModal] = useState(false);
  // Estado para manejar el estado de carga (loading) de los datos
  const [loading, setLoading] = useState(true);
  // Estado para almacenar el cliente seleccionado (para actualizar)
  const [selectedClient, setSelectedClient] = useState(null);

  // Función para eliminar un cliente
  const handleDelete = async (id) => {
    // Confirma si el usuario está seguro de eliminar el cliente
    const confirmDelete = confirm(
      "¿Estás seguro de que deseas eliminar este cliente?"
    );
    if (confirmDelete) {
      try {
        // Realiza una solicitud DELETE al backend para eliminar el cliente
        const response = await fetch(
          `http://localhost:3000/clientes/cliente/${id}`,
          {
            method: "DELETE",
          }
        );

        // Si la respuesta no es OK, lanza un error
        if (!response.ok) {
          throw new Error("Error al eliminar el cliente");
        }

        // Si la eliminación es exitosa, muestra un mensaje
        alert("Cliente eliminado exitosamente");
        setLoading(true);  // Vuelve a cargar los datos
      } catch (error) {
        alert(error.message);  // Muestra el error en caso de fallo
      }
    }
  };

  // Función para crear o actualizar un cliente
  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();  // Evita la recarga de la página al enviar el formulario

    const formData = new FormData(e.target);  // Obtiene los datos del formulario
    const data = {
      nombre: formData.get("nombre"),
      direccion: formData.get("direccion"),
      telefono: formData.get("telefono"),
    };

    try {
      // Si hay un cliente seleccionado (editar)
      if (selectedClient) {
        await updateClient(selectedClient, data);  // Llama a la función de actualización
        alert("Cliente actualizado exitosamente");
        window.location.reload();  // Recarga la página para mostrar los cambios
        setLoading(true);
      } else {
        // Si no hay cliente seleccionado (crear)
        await handleSubmitClients(e);  // Llama a la función para guardar el nuevo cliente
        alert("Cliente guardado exitosamente");
        window.location.reload();  // Recarga la página para mostrar el nuevo cliente
        setLoading(true);
      }
    } catch (error) {
      alert(error.message);  // Muestra cualquier error ocurrido
    }
  };

  return (
    <div className="grid justify-center px-10">
      {/* Cabecera de la página */}
      <div className="flex justify-between items-center">
        <h1 className="text-yellow-400 font-bold text-4xl">Tabla de Clientes</h1>
        <button
          className="text-md bg-green-800 px-5 py-1.5 rounded-md text-white font-semibold hover:text-opacity-40 transition-all"
          onClick={() => {
            setSelectedClient(null);  // Resetea el cliente seleccionado al hacer clic en "Agregar"
            setModal(true);  // Abre el modal para crear un nuevo cliente
          }}
        >
          Agregar <FontAwesomeIcon icon={faCirclePlus} />
        </button>
      </div>

      {/* Mostrar el formulario del cliente si el modal está activado */}
      {modal && (
        <ClientsForm
          handleCreateOrUpdate={handleCreateOrUpdate}  // Pasa la función para crear o actualizar
          setModal={setModal}  // Controla la visibilidad del modal
          selectedClient={selectedClient}  // Pasa el cliente seleccionado para editar
        />
      )}

      {/* Mostrar un loader mientras los datos se están cargando */}
      {loading && <Loader />}

      {/* Contenedor de la tabla de clientes */}
      <div className="container max-w-7xl">
        <Grid
          server={{
            url: "http://localhost:3000/clientes",  // URL de la API para obtener los clientes
            handle: async (res) => {
              setLoading(false);  // Desactiva el loading cuando se obtienen los datos
              if (res.status === 404) return { data: [] };  // Si no hay datos, retorna un array vacío
              if (res.ok) return await res.json();  // Si la respuesta es correcta, convierte a JSON

              throw new Error("Error al obtener los datos");  // Si ocurre un error, lo lanza
            },
            then: (data) =>
              data.map((cliente) => [
                cliente.nombre,
                cliente.direccion,
                cliente.telefono,
                _(
                  <ActionsClients
                    setModal={setModal}  // Pasa la función para abrir el modal
                    handleDelete={handleDelete}  // Pasa la función de eliminación
                    cliente={cliente}  // Pasa los datos del cliente
                    setSelectedClient={setSelectedClient}  // Pasa la función para seleccionar un cliente
                  />
                ),
              ]),
          }}
          columns={table_columns_clientes}  // Define las columnas de la tabla
          search={true}  // Habilita la búsqueda
          sort={true}  // Habilita el ordenamiento
          pagination={{
            limit: 6,  // Establece el límite de registros por página
          }}
        />
      </div>
    </div>
  );
}
