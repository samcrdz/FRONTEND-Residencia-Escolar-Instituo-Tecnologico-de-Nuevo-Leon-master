// POST
export const handleSubmitClients = async (e) => {
  e.preventDefault();  // Previene el comportamiento predeterminado del formulario (evita la recarga de la página)

  const formData = new FormData(e.target);  // Crea un objeto FormData a partir de los datos del formulario
  const data = {  // Extrae los valores del formulario y los guarda en un objeto
    nombre: formData.get("nombre"),
    direccion: formData.get("direccion"),
    telefono: formData.get("telefono"),
  };

  try {
    // Realiza una solicitud POST al servidor para guardar el nuevo cliente
    const response = await fetch("http://localhost:3000/clientes/cliente", {
      method: "POST",  // Método HTTP POST para enviar los datos
      headers: {
        "Content-Type": "application/json",  // Establece el tipo de contenido como JSON
      },
      body: JSON.stringify(data),  // Convierte los datos del formulario a formato JSON
    });

    if (response.ok) {  // Verifica si la respuesta fue exitosa (código 200-299)
      alert("Cliente guardado exitosamente");  // Muestra un mensaje de éxito

      setTimeout(() => {
        window.location.reload()  // Recarga la página después de 2 segundos
      }, 2000);

    } else {
      alert("Error al guardar el cliente");  // Muestra un mensaje si ocurre un error en la respuesta
    }
  } catch (error) {
    console.error("Error:", error);  // Imprime el error en la consola si ocurre una excepción
    alert("Error al enviar los datos");  // Muestra un mensaje genérico si la solicitud falla
  }
};

// PUT (EDITAR)
export const updateClient = async (selectedClient, data) => {
  if (!selectedClient) return;  // Si no hay cliente seleccionado, sale de la función

  try {
    // Realiza una solicitud PUT para actualizar los datos del cliente
    const response = await fetch(
      `http://localhost:3000/clientes/cliente/${selectedClient.id}`,
      {
        method: "PUT",  // Método HTTP PUT para actualizar los datos
        headers: {
          "Content-Type": "application/json",  // Establece el tipo de contenido como JSON
        },
        body: JSON.stringify(data),  // Convierte los nuevos datos a formato JSON
      }
    );

    if (!response.ok) {  // Verifica si la respuesta fue exitosa (código 200-299)
      const errorData = await response.json();  // Si hay error, obtiene el mensaje de error desde la respuesta
      throw new Error(errorData.message);  // Lanza un error con el mensaje obtenido
    }

    return true;  // Retorna `true` si la actualización fue exitosa
  } catch (error) {
    throw new Error("Error al actualizar el producto: " + error.message);  // Lanza un error si ocurre alguna excepción
  }
};
