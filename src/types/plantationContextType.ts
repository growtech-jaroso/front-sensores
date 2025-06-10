import { Plantation } from "../interfaces/Plantation";

export interface plantationContextType {
    plantations: Plantation[];
    loading: boolean;
    currentPage: number;
    totalPages: number;
    fetchPlantations: (page: number) => Promise<void>;
  }