import Swal from 'sweetalert2';

export const DeleteAlert = async (onSubmit, fetch, data) => {
  try {
    const result = await Swal.fire({
      title: "¿Está Seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Eliminar",
      cancelButtonText: "Cancelar"
    });

    if (result.isConfirmed) {
      const response = await onSubmit(data);
      if (response.status === 200) {
        await new Promise(resolve => setTimeout(resolve, 50));
        await fetch(); // Espera a que se actualice la lista
        Swal.fire({
          title: "Eliminado!",
          text: "El registro fue eliminado exitosamente.",
          icon: "success"
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "El registro NO fue eliminado.",
          icon: "error"
        });
      }
    }
  } catch (error) {
    // Maneja errores globales
    Swal.fire({
      title: "Error!",
      text: "Algo está mal, Por favor intente de nuevo.",
      icon: "error"
    });
    console.error("DeleteAlert error:", error);
  }
};
