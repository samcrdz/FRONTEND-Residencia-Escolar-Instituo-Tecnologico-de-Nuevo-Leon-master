// POST (Crear nueva instalación)
export const handleSubmitInstallation = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = {
    cliente_id: formData.get("cliente"),
    producto_id: formData.get("producto"),
    fecha_instalacion: formData.get("fecha_instalacion"),
    descripcion: formData.get("descripcion"),
    costo_instalacion: parseFloat(formData.get("costo_instalacion")),
    estado: formData.get("estado"),
  };

  try {
    const response = await fetch(
      "http://localhost:3000/instalaciones/instalacion",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      alert("Instalación guardada exitosamente");

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      alert("Error al guardar la instalación");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error al enviar los datos");
  }
};

// PUT (Editar instalación existente)
export const updateInstallation = async (selectedInstallation, data) => {
  if (!selectedInstallation) return;

  try {
    const response = await fetch(
      `http://localhost:3000/instalaciones/instalacion/${selectedInstallation.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return true;
  } catch (error) {
    throw new Error("Error al actualizar la instalación: " + error.message);
  }
};
