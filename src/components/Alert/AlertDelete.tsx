import Swal from "sweetalert2";

interface ConfirmOptions {
  title?: string;
  text?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmColor?: string;
  cancelColor?: string;
}

export async function AlertDelete(options?: ConfirmOptions): Promise<boolean> {
  const result = await Swal.fire({
    title: options?.title || "¿Estás seguro?",
    text: options?.text || "Esta acción no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: options?.confirmColor || "#16a34a",
    cancelButtonColor: options?.cancelColor || "#d33",
    confirmButtonText: options?.confirmButtonText || "Sí, continuar",
    cancelButtonText: options?.cancelButtonText || "Cancelar",
  });

  return result.isConfirmed;
}
