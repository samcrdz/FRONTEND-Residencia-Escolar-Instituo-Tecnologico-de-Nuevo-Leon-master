// POST
export const handleSubmitClients = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = {
    nombre: formData.get("nombre"),
    direccion: formData.get("direccion"),
    telefono: formData.get("telefono"),
  };

  try {
    const response = await fetch("http://localhost:3000/clientes/cliente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Cliente guardado exitosamente");

      setTimeout(() => {
        window.location.reload()
      }, 2000);

    } else {
      alert("Error al guardar el cliente");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error al enviar los datos");
  }
};

// PUT (EDITAR)
export const updateClient = async (selectedClient, data) => {
  if (!selectedClient) return;

  try {
    const response = await fetch(
      `http://localhost:3000/clientes/cliente/${selectedClient.id}`,
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
    throw new Error("Error al actualizar el producto: " + error.message);
  }
};