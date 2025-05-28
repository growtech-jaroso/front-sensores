import { UserRole } from "../types/userRole";

export interface User {
    id: string; // MongoDB ObjectId como string
    username: string;
    email: string;
    role: UserRole;
    token?: string;
  }