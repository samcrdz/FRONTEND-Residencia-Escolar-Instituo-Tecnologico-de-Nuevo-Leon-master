import { faFile, faFileEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ActionsUsers({
  setModal,
  handleDelete,
  usuario,
  setSelectedUser,
}) {
  return (
    <div className="flex justify-center gap-5">
      {/* Botón para EDITAR producto */}
      {/* <button
        className="text-xl rounded-md text-yellow-400 hover:text-opacity-40 transition-all"
        onClick={() => {
          setSelectedUser(usuario);
          setModal(true);
        }}
      >
        <FontAwesomeIcon icon={faFileEdit} />
      </button> */}

      {/* Botón para ELIMINAR producto */}
      <button
        className="text-xl rounded-md text-red-400 hover:text-opacity-40 transition-all"
        onClick={() => {
          handleDelete(usuario.id);
        }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
}