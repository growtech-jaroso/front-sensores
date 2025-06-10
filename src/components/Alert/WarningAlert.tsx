import Swal from "sweetalert2";

interface ConfirmOptions {
  title: string;
  text: string;
}

export async function ErrorAlert(options: ConfirmOptions): Promise<boolean> {
  const result = await Swal.fire({
    title: options.title,
    text: options.text,
    icon: "error",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
  });

  return result.isConfirmed;
}
