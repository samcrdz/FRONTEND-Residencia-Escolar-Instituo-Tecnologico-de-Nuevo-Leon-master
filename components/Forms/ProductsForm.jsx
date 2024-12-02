export default function ProductsForm({
  handleSubmit,
  setModal,
  selectedProduct,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10" id="modal_animation">
      <div className="bg-white shadow-lg rounded-lg p-8 space-y-6 max-w-2xl w-full">
        <form onSubmit={handleSubmit} className="space-y-6 text-black">
          {/* inputs | NOMBRE, PRECIO & STOCK */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="nombre"
              >
                Nombre del Producto
              </label>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre del producto"
                defaultValue={selectedProduct?.nombre || ""}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500 focus:outline-none sm:text-sm"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="precio"
              >
                Precio
              </label>
              <input
                type="text"
                name="precio"
                placeholder="Precio"
                defaultValue={selectedProduct?.precio || ""}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500 focus:outline-none sm:text-sm"
                required
                pattern="^\d+(\.\d{1,2})?$"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="stock"
              >
                Stock
              </label>
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                defaultValue={selectedProduct?.stock || ""}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500 focus:outline-none sm:text-sm"
                required
              />
            </div>
          </div>

          {/* textarea DESCRIPCION */}
          <div>
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="descripcion"
            >
              Descripción del Producto
            </label>
            <textarea
              name="descripcion"
              placeholder="Descripción del producto"
              cols={10}
              rows={4}
              defaultValue={selectedProduct?.descripcion || ""} // Llenar el campo con el valor actual o dejarlo vacío
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500 focus:outline-none sm:text-sm resize-none"
              required
            />
          </div>

          {/* CTA buttons */}
          <div className="text-center flex gap-10">
            <button
              onClick={() => setModal(false)}
              className="w-full bg-red-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition ease-in-out duration-150 focus:outline-none"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-full bg-green-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition ease-in-out duration-150 focus:outline-none"
            >
              {selectedProduct ? "Actualizar" : "Enviar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
