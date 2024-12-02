// POST (Crear nueva instalación)
export const handleSubmitInstallation = async (e) => {
  e.preventDefault();  // Previene el comportamiento predeterminado del formulario (evita la recarga de la página)

  const formData = new FormData(e.target);  // Crea un objeto FormData a partir de los datos del formulario
  const data = {  // Extrae los valores del formulario y los guarda en un objeto
    cliente_id: formData.get("cliente"),  // ID del cliente
    producto_id: formData.get("producto"),  // ID del producto
    fecha_instalacion: formData.get("fecha_instalacion"),  // Fecha de instalación
    descripcion: formData.get("descripcion"),  // Descripción de la instalación
    costo_instalacion: parseFloat(formData.get("costo_instalacion")),  // Convierte el costo a número flotante
    estado: formData.get("estado"),  // Estado de la instalación
  };

  try {
    // Realiza una solicitud POST para guardar la nueva instalación
    const response = await fetch(
      "http://localhost:3000/instalaciones/instalacion",
      {
        method: "POST",  // Método HTTP POST para enviar los datos
        headers: {
          "Content-Type": "application/json",  // Establece el tipo de contenido como JSON
        },
        body: JSON.stringify(data),  // Convierte los datos del formulario a formato JSON
      }
    );

    if (response.ok) {  // Verifica si la respuesta fue exitosa (código 200-299)
      alert("Instalación guardada exitosamente");  // Muestra un mensaje de éxito

      setTimeout(() => {
        window.location.reload();  // Recarga la página después de 2 segundos
      }, 2000);
    } else {
      alert("Error al guardar la instalación");  // Muestra un mensaje si ocurre un error en la respuesta
    }
  } catch (error) {
    console.error("Error:", error);  // Imprime el error en la consola si ocurre una excepción
    alert("Error al enviar los datos");  // Muestra un mensaje genérico si la solicitud falla
  }
};


// PUT (Editar instalación existente)
export const updateInstallation = async (selectedInstallation, data) => {
  if (!selectedInstallation) return;  // Si no hay instalación seleccionada, sale de la función

  try {
    // Realiza una solicitud PUT para actualizar los datos de la instalación
    const response = await fetch(
      `http://localhost:3000/instalaciones/instalacion/${selectedInstallation.id}`,
      {
        method: "PUT",  // Método HTTP PUT para actualizar los datos
        headers: {
          "Content-Type": "application/json",  // Establece el tipo de contenido como JSON
        },
        body: JSON.stringify(data),  // Convierte los nuevos datos a formato JSON
      }
    );

    if (!response.ok) {  // Verifica si la respuesta fue exitosa (código 200-299)
      const errorData = await response.json();  // Si la respuesta tiene error, extrae el mensaje de error
      throw new Error(errorData.message);  // Lanza un error con el mensaje recibido del servidor
    }

    return true;  // Retorna `true` si la actualización fue exitosa
  } catch (error) {
    throw new Error("Error al actualizar la instalación: " + error.message);  // Lanza un error si ocurre alguna excepción
  }
};
