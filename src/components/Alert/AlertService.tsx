import Swal from 'sweetalert2';

export const showAlert = async (type: 'success' | 'error', title: string, text: string, confirmButtonText?: string) => {
  const config = {
    icon: type,
    title: title,
    text: text,
    confirmButtonText: confirmButtonText || 'Aceptar',
  };

  await Swal.fire(config);
};
