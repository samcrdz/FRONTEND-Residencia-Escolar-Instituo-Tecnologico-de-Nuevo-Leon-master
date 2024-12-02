import { usersFormFields } from "@/utils/staticData";

export default function UserForm({ handleCreateOrUpdate, setModal }) {  // Recibe `setModal` como prop
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10"
      id="modal_animation"
    >
      <div className="bg-white shadow-lg rounded-lg p-8 space-y-6 max-w-lg w-full">
        <form onSubmit={handleCreateOrUpdate} className="space-y-6 text-black">
          <div className="grid grid-cols-1 gap-4">
            {usersFormFields.map((field, index) => (
              <div key={index}>
                <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor={field.db_field}
                >
                  {field.label_text}
                </label>
                <input
                  type={field.input_type}
                  name={field.db_field}
                  placeholder={field.placeholder}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500 focus:outline-none sm:text-sm"
                  required
                />
              </div>
            ))}
          </div>

          {/* Select para el Rol */}
          <div>
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="rol"
            >
              Rol
            </label>
            <select
              name="rol"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500 focus:outline-none sm:text-sm"
              required
            >
              <option value="">Selecciona un rol</option>
              <option value="admin">Admin</option>
              <option value="usuario">Usuario</option>
            </select>
          </div>

          {/* Select para el Estado */}
          <div>
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="estado"
            >
              Estado
            </label>
            <select
              name="estado"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500 focus:outline-none sm:text-sm"
              required
            >
              <option value="">Selecciona un estado</option>
              <option value="true">Activo</option>  {/* Actualizado para ser booleano */}
              <option value="false">Inactivo</option> {/* Actualizado para ser booleano */}
            </select>
          </div>

          {/* CTA buttons */}
          <div className="text-center flex gap-10">
            <button
              onClick={() => setModal(false)}  // Ocultar el modal al cancelar
              className="w-full bg-red-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition ease-in-out duration-150 focus:outline-none"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-full bg-green-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition ease-in-out duration-150 focus:outline-none"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
