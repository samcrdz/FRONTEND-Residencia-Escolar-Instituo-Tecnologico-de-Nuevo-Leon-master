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
import { handleSubmitUser } from "@/services/fetchUsers";

export default function UsuariosPage() {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      nombre: formData.get("nombre"),
      usuario: formData.get("usuario"),
      email: formData.get("email"),
      contraseña: formData.get("contraseña"),
      rol: formData.get("rol"),
      estado: formData.get("estado"),
    };

    try {
      if (selectedUser) {
        await updateProduct(selectedProduct, data);
        alert("Producto actualizado exitosamente");
        window.location.reload();
        setLoading(true);
      } else {
        await handleSubmitUser(e);
        alert("Usuario guardado exitosamente");
        window.location.reload();
        setLoading(true);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "¿Estás seguro de que deseas eliminar este usuario?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:3000/usuarios/usuario/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Error al eliminar usuarios");
        }
        alert("Usuario eliminado exitosamente");
        setLoading(true);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="grid justify-center px-10">
      <div className="flex justify-between items-center">
        <h1 className="text-yellow-400 font-bold text-4xl">
          Tabla de Usuarios
        </h1>

        <button
          className="text-md bg-green-800 px-5 py-1.5 rounded-md text-white font-semibold hover:text-opacity-40 transition-all"
          onClick={() => {
            setSelectedUser(null);
            setModal(true);
          }}
        >
          Agregar <FontAwesomeIcon icon={faCirclePlus} />
        </button>
      </div>

      {loading && <Loader />}

      {modal && (
        <UserForm
          handleCreateOrUpdate={handleCreateOrUpdate}
          setModal={setModal}
        // setSelectedUser={setSelectedUser}
        />
      )}

      <div className="container max-w-7xl">
        <Grid
          server={{
            url: "http://localhost:3000/usuarios",
            handle: async (res) => {
              setLoading(false);
              if (res.status === 404) return { data: [] };
              if (res.ok) return await res.json();

              throw new Error("Error al obtener los datos");
            },
            then: (data) =>
              data.map((usuario) => [
                usuario.nombre,
                usuario.usuario,
                usuario.email,
                usuario.rol,
                _(
                  <span
                    className={
                      usuario.estado ? "text-green-500" : "text-red-500"
                    }
                  >
                    {usuario.estado ? "Activo" : "Inactivo"}
                  </span>
                ),
                _(
                  <ActionsUsers
                    // setModal={setModal}
                    handleDelete={handleDelete}
                    usuario={usuario}
                  // setSelectedUser={setSelectedUser}
                  />
                ),
              ]),
          }}
          columns={table_columns_usuarios}
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
