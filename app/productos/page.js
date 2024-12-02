"use client";

import { Grid } from "gridjs-react";
import { _ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { useState } from "react";
import ProductsForm from "@/components/Forms/ProductsForm";
import ActionsProducts from "@/components/ActionsTable/ActionsProducts";
import Loader from "@/components/Loader";
import { handleSubmitProduct, updateProduct } from "@/services/fetchProductos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faFile } from "@fortawesome/free-solid-svg-icons";
import { table_columns_productos } from "@/utils/staticData";

export default function ProductosPage() {
  // Estado para manejar la visibilidad del modal
  const [modal, setModal] = useState(false);
  // Estado para manejar el producto seleccionado (para editar)
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Estado para manejar el estado de carga de los datos
  const [loading, setLoading] = useState(true);

  // Función para crear o actualizar un producto
  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();  // Previene la recarga de la página

    const formData = new FormData(e.target);  // Obtiene los datos del formulario
    const data = {
      nombre: formData.get("nombre"),
      precio: formData.get("precio"),
      stock: formData.get("stock"),
      descripcion: formData.get("descripcion"),
    };

    try {
      // Si un producto está seleccionado, es una actualización
      if (selectedProduct) {
        await updateProduct(selectedProduct, data);  // Actualiza el producto
        alert("Producto actualizado exitosamente");
        window.location.reload();  // Recarga la página para mostrar los cambios
        setLoading(true);
      } else {
        // Si no hay producto seleccionado, es una creación
        await handleSubmitProduct(e);  // Crea un nuevo producto
        alert("Producto guardado exitosamente");
        window.location.reload();  // Recarga la página para mostrar el nuevo producto
        setLoading(true);
      }
    } catch (error) {
      alert(error.message);  // Muestra el error si ocurre
    }
  };

  // Función para eliminar un producto
  const handleDelete = async (id) => {
    // Solicita confirmación antes de eliminar
    const confirmDelete = confirm(
      "¿Estás seguro de que deseas eliminar este producto?"
    );
    if (confirmDelete) {
      try {
        // Realiza una solicitud DELETE al backend para eliminar el producto
        const response = await fetch(
          `http://localhost:3000/productos/producto/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Error al eliminar el producto");
        }

        alert("Producto eliminado exitosamente");
        setLoading(true);  // Vuelve a cargar los datos
      } catch (error) {
        alert(error.message);  // Muestra el error si ocurre
      }
    }
  };

  return (
    <div className="grid justify-center px-10">
      {/* Cabecera de la página */}
      <div className="flex justify-between items-center">
        <h1 className="text-yellow-400 font-bold text-4xl">Tabla de Productos</h1>
        {/* Botón para AGREGAR producto */}
        <button
          className="text-md bg-green-800 px-5 py-1.5 rounded-md text-white font-semibold hover:text-opacity-40 transition-all"
          onClick={() => {
            setSelectedProduct(null);  // Resetea el producto seleccionado al hacer clic en "Agregar"
            setModal(true);  // Abre el modal para agregar un nuevo producto
          }}
        >
          Agregar <FontAwesomeIcon icon={faCirclePlus} />
        </button>
      </div>

      {/* Mostrar el formulario si el modal está activado */}
      {modal && (
        <ProductsForm
          handleSubmit={handleCreateOrUpdate}  // Pasa la función para crear o actualizar un producto
          setModal={setModal}  // Controla la visibilidad del modal
          selectedProduct={selectedProduct}  // Pasa el producto seleccionado (para editar)
        />
      )}

      {/* Mostrar un loader mientras los datos se están cargando */}
      {loading && <Loader />}

      {/* Contenedor de la tabla de productos */}
      <div className="container max-w-7xl">
        <Grid
          server={{
            url: "http://localhost:3000/productos",  // URL para obtener los productos
            handle: async (res) => {
              setLoading(false);  // Desactiva el estado de carga cuando se obtienen los datos
              if (res.status === 404) return await { data: [] };  // Si no se encuentran productos, devuelve un array vacío
              if (res.ok) return await res.json();  // Si la respuesta es correcta, convierte a JSON

              throw new Error("Error al obtener los datos");  // Lanza un error si hay un problema
            },
            then: (data) =>
              data.map((producto) => [
                producto.nombre,
                producto.descripcion,
                parseFloat(producto.precio).toLocaleString("es-MX", {
                  style: "currency",
                  currency: "MXN",
                }),  // Formatea el precio como moneda
                producto.stock,
                _(
                  <ActionsProducts
                    setModal={setModal}  // Pasa la función para abrir el modal
                    handleDelete={handleDelete}  // Pasa la función de eliminación
                    producto={producto}  // Pasa los datos del producto
                    setSelectedProduct={setSelectedProduct}  // Pasa la función para seleccionar un producto
                  />
                ),
              ]),
          }}
          columns={table_columns_productos}  // Definir las columnas de la tabla
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
