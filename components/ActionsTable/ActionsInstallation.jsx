import { faFileEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// ActionsInstallation.js
export default function ActionsInstallation({
  setModal,
  handleDelete,
  instalacion,
  setSelectedInstallation,
}) {
  return (
    <div className="flex justify-center gap-5">
      {/* Botón para EDITAR producto */}
      <button
        className="text-xl rounded-md text-yellow-400 hover:text-opacity-40 transition-all"
        onClick={() => {
          setSelectedInstallation(instalacion);
          setModal(true);
        }}
      >
        <FontAwesomeIcon icon={faFileEdit} />
      </button>

      {/* Botón para ELIMINAR producto */}
      <button
        className="text-xl rounded-md text-red-400 hover:text-opacity-40 transition-all"
        onClick={() => {
          handleDelete(instalacion.id);
        }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
}
