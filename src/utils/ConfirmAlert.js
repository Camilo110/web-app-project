import toast from 'react-hot-toast';

export const ConfirmAlert = async (onSubmit, fetch, data) => {

  const messages ={
    loading: "Creating record...",
    success: "Record created successfully!",
    error: "Failed to create record. Please try again."
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
