import Swal from 'sweetalert2';

export const DeleteAlert = async (onSubmit, fetch, data) => {
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      const response = await onSubmit(data);
      if (response.status === 200) {
        await new Promise(resolve => setTimeout(resolve, 50));
        await fetch(); // Espera a que se actualice la lista
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Your file has not been deleted.",
          icon: "error"
        });
      }
    }
  } catch (error) {
    // Maneja errores globales
    Swal.fire({
      title: "Error!",
      text: "Something went wrong. Please try again later.",
      icon: "error"
    });
    console.error("DeleteAlert error:", error);
  }
};
