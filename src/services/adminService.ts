import axiosClient from "../api/axiosClient";

export const adminService = {
  getAllOwners: async () => {
    const response = await axiosClient.get("/plantations/owners"); // Obtener todos los usuarios que son propietarios de plantaciones
    return response.data;
  },

 getOwnersPlantations: async (userId: string) => {
  const response = await axiosClient.get(`/plantations/owners/${userId}`);
  return response.data; // contiene { status, data }
  },


  getUserPlantations: async (userId: string) => {
    const response = await axiosClient.get(`/plantations/user/${userId}`); // Obtener todas las plantaciones de un usuario específico
    return response.data;
  },
};
