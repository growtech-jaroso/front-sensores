import axiosClient from "../api/axiosClient";
import { Plantation } from "../interfaces/Plantation";
import {IndicatorStatus} from "../types/indicatorStatus.ts";

interface MetaData {
  total_items: number;
  item_count: number;
  items_per_page: number;
  total_pages: number;
  current_page: number;
}

interface PlantationResponse {
  data: Plantation[];
  meta: MetaData;
}

interface Params {
  page?: number;
  limit?: number;
  search?: string;
  status?: IndicatorStatus
}

const getPlantations = async ({ page = 1, limit = 10, search, status }: Params): Promise<PlantationResponse> => {
  const response = await axiosClient.get("/plantations", {
    params: { page, limit, search, status },
  });
  

  if (!response.data || !Array.isArray(response.data.data)) {
    throw new Error("Formato de respuesta inválido desde /plantations");
  }

  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};

export const getPlantationById = async (plantationId: string): Promise<Plantation> => {
  const response = await axiosClient.get(`/plantations/${plantationId}`);
  return response.data.data as Plantation;
};


export default {
  getPlantations,
};
