"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { _ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { Grid } from "gridjs-react";
import { table_columns_usuarios } from "@/utils/staticData";
import UserForm from "@/components/Forms/UsersForm";
import ActionsUsers from "@/components/ActionsTable/ActionsUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { handleSubmitUser, updateUser } from "@/services/fetchUsers"; // Asegúrate de importar la función de actualizar usuario

export default function UsuariosPage() {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Función para crear o actualizar un usuario
  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target); // Obtiene los datos del formulario
    const data = {
      nombre: formData.get("nombre"),
      usuario: formData.get("usuario"),
      email: formData.get("email"),
      contraseña: formData.get("contraseña"),
      rol: formData.get("rol"),
      estado: formData.get("estado"),
    };

    try {
      // Si existe un usuario seleccionado, se hace una actualización
      if (selectedUser) {
        await updateUser(selectedUser, data); // Llama a la función de actualización
        alert("Usuario actualizado exitosamente");
        window.location.reload(); // Recarga la página para mostrar los cambios
        setLoading(true);
      } else {
        // Si no hay usuario seleccionado, se crea un nuevo usuario
        await handleSubmitUser(e); // Llama a la función de creación
        alert("Usuario guardado exitosamente");
        window.location.reload(); // Recarga la página para mostrar el nuevo usuario
        setLoading(true);
      }
    } catch (error) {
      alert(error.message); // Muestra un mensaje de error si ocurre
    }
  };

  // Función para eliminar un usuario
  const handleDelete = async (id) => {
    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (confirmDelete) {
      try {
        // Realiza una solicitud DELETE al backend para eliminar el usuario
        const response = await fetch(`http://localhost:3000/usuarios/usuario/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Error al eliminar usuarios");
        }
        alert("Usuario eliminado exitosamente");
        setLoading(true); // Vuelve a cargar los datos
      } catch (error) {
        alert(error.message); // Muestra el error si ocurre
      }
    }
  };

  return (
    <div className="grid justify-center px-10">
      {/* Cabecera de la página */}
      <div className="flex justify-between items-center">
        <h1 className="text-yellow-400 font-bold text-4xl">Tabla de Usuarios</h1>

        {/* Botón para agregar un usuario */}
        <button
          className="text-md bg-green-800 px-5 py-1.5 rounded-md text-white font-semibold hover:text-opacity-40 transition-all"
          onClick={() => {
            setSelectedUser(null); // Resetea el usuario seleccionado al hacer clic en "Agregar"
            setModal(true); // Abre el modal para agregar un nuevo usuario
          }}
        >
          Agregar <FontAwesomeIcon icon={faCirclePlus} />
        </button>
      </div>

      {/* Mostrar loader mientras los datos se cargan */}
      {loading && <Loader />}

      {/* Mostrar el formulario si el modal está activado */}
      {modal && (
        <UserForm
          handleCreateOrUpdate={handleCreateOrUpdate} // Pasa la función para crear o actualizar el usuario
          setModal={setModal} // Controla la visibilidad del modal
          selectedUser={selectedUser} // Pasa el usuario seleccionado (si está editando)
        />
      )}

      {/* Tabla de usuarios */}
      <div className="container max-w-7xl">
        <Grid
          server={{
            url: "http://localhost:3000/usuarios", // URL para obtener los usuarios
            handle: async (res) => {
              setLoading(false); // Desactiva el estado de carga cuando se obtienen los datos
              if (res.status === 404) return { data: [] }; // Si no se encuentran usuarios, devuelve un array vacío
              if (res.ok) return await res.json(); // Si la respuesta es correcta, convierte a JSON

              throw new Error("Error al obtener los datos"); // Lanza un error si hay un problema
            },
            then: (data) =>
              data.map((usuario) => [
                usuario.nombre,
                usuario.usuario,
                usuario.email,
                usuario.rol,
                _(
                  <span className={usuario.estado ? "text-green-500" : "text-red-500"}>
                    {usuario.estado ? "Activo" : "Inactivo"}
                  </span>
                ),
                _(
                  <ActionsUsers
                    handleDelete={handleDelete} // Pasa la función para eliminar el usuario
                    usuario={usuario} // Pasa los datos del usuario
                  />
                ),
              ]),
          }}
          columns={table_columns_usuarios} // Definir las columnas de la tabla
          search={true} // Habilita la búsqueda
          sort={true} // Habilita el ordenamiento
          pagination={{
            limit: 6, // Establece el límite de registros por página
          }}
        />
      </div>
    </div>
  );
}
