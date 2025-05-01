import Swal from "sweetalert2";

export const showAlert = async (
  type: "success" | "error",
  title: string,
  text: string,
  confirmButtonText?: string,
  autoClose: boolean = false
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const config: any = {
    icon: type,
    title,
    text,
    timerProgressBar: autoClose,
  };

  if (autoClose) {
    config.showConfirmButton = false;
    config.timer = 1500; // duración en ms antes de cerrar automáticamente
  } else {
    config.confirmButtonText = confirmButtonText || "Aceptar";
  }

  return await Swal.fire(config);
};
