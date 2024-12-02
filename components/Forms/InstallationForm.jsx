export default function InstallationForm({
  handleCreateOrUpdate,
  setModal,
  selectedInstallation,
  clients,
  products,
}) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10"
      id="modal_animation"
    >
      <div className="bg-white shadow-lg rounded-lg p-8 space-y-6 max-w-2xl w-full">
        <form onSubmit={handleCreateOrUpdate} className="space-y-6 text-black">
          {/* fila 1 */}
          <div className="grid gap-8 grid-cols-3">
            {/* Select Cliente */}
            <div>
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="cliente"
              >
                Cliente
              </label>
              <select
                name="cliente"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                defaultValue={selectedInstallation?.cliente_id || ""}
                required
              >
                <option value="">Seleccione un cliente</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Producto */}
            <div>
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="producto"
              >
                Producto
              </label>
              <select
                name="producto"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                defaultValue={selectedInstallation?.producto_id || ""}
                required
              >
                <option value="">Seleccione un producto</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Estado */}
            <div>
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="estado"
              >
                Estado
              </label>
              <select
                name="estado"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                defaultValue={selectedInstallation?.estado || ""}
                required
              >
                <option value="">Seleccione un estado</option>
                <option value="pendiente">Pendiente</option>
                <option value="en_proceso">En proceso</option>
                <option value="terminado">Terminado</option>
              </select>
            </div>
          </div>

          {/* fila 2 */}
          <div className="grid gap-8 grid-cols-2">
          {/* Otros campos (fecha, descripción, costo) */}
            <div>
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="fecha_instalacion"
              >
                Fecha de Instalación
              </label>
              <input
                type="date"
                name="fecha_instalacion"
                defaultValue={selectedInstallation?.fecha_instalacion || ""}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="costo_instalacion"
              >
                Costo de Instalación
              </label>
              <input
                type="text"
                name="costo_instalacion"
                defaultValue={selectedInstallation?.costo_instalacion || ""}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="descripcion"
            >
              Descripción
            </label>
            <textarea
              name="descripcion"
              defaultValue={selectedInstallation?.descripcion || ""}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              rows={10}
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setModal(false)}
              className="px-4 py-2 bg-gray-400 rounded-md text-white hover:bg-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 rounded-md text-white hover:bg-green-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
