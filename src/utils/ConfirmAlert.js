import toast from 'react-hot-toast';

export const ConfirmAlert = async (onSubmit, fetch, data) => {

  const messages ={
    loading: "Creando",
    success: "Registro creado exitosamente.",
    error: "Error al crear el registro."
  }

 
    toast.promise(
      onSubmit(data), 
      {
        success: () => {
          fetch();
          return messages.success;
        },
        error: messages.error
      }
    );
};
