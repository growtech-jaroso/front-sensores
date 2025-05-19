import axiosClient from "../api/axiosClient";

export const adminService = {
  getAllOwners: async () => {
    const response = await axiosClient.get("/plantations/owners"); // Obtener todos los usuarios que son propietarios de plantaciones
    return response.data;
  },

  getUserPlantations: async (userId: string) => {
    const response = await axiosClient.get(`/plantations/user/${userId}`);
    return response.data;
  },
};
