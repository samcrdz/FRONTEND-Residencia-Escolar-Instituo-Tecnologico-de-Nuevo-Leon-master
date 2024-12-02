export const handleSubmitUser = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = {
    nombre: formData.get("nombre"),
    usuario: formData.get("usuario"),
    email: formData.get("email"),
    contraseña: formData.get("contraseña"),
    rol: formData.get("rol"),
    estado: formData.get("estado") === "true",  // Convertir a booleano
  };

  try {
    const response = await fetch("http://localhost:3000/usuarios/usuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Usuario guardado exitosamente");

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      alert("Error al guardar usuario");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error al enviar los datos");
  }
};
