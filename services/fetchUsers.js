export const handleSubmitUser = async (e) => {
  e.preventDefault();  // Previene el comportamiento predeterminado del formulario (evita la recarga de la página)

  const formData = new FormData(e.target);  // Crea un objeto FormData a partir de los datos del formulario
  const data = {  // Extrae los valores del formulario y los guarda en un objeto
    nombre: formData.get("nombre"),  // Nombre del usuario
    usuario: formData.get("usuario"),  // Nombre de usuario
    email: formData.get("email"),  // Correo electrónico del usuario
    contraseña: formData.get("contraseña"),  // Contraseña del usuario
    rol: formData.get("rol"),  // Rol asignado al usuario (ej. administrador, usuario común)
    estado: formData.get("estado") === "true",  // Convierte el valor del estado a booleano (true/false)
  };

  try {
    // Realiza una solicitud POST para guardar el nuevo usuario
    const response = await fetch("http://localhost:3000/usuarios/usuario", {
      method: "POST",  // Método HTTP POST para enviar los datos
      headers: {
        "Content-Type": "application/json",  // Establece el tipo de contenido como JSON
      },
      body: JSON.stringify(data),  // Convierte los datos del formulario a formato JSON
    });

    if (response.ok) {  // Verifica si la respuesta fue exitosa (código 200-299)
      alert("Usuario guardado exitosamente");  // Muestra un mensaje de éxito

      setTimeout(() => {
        window.location.reload();  // Recarga la página después de 2 segundos
      }, 2000);

    } else {
      alert("Error al guardar usuario");  // Muestra un mensaje si ocurre un error en la respuesta
    }
  } catch (error) {
    console.error("Error:", error);  // Imprime el error en la consola si ocurre una excepción
    alert("Error al enviar los datos");  // Muestra un mensaje genérico si la solicitud falla
  }
};
