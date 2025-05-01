export interface User {
    _id?: string; // MongoDB ObjectId como string
    username: string;
    email: string;
    roles: UserRole[];
  }
  
  export type UserRole = "USER" | "SUPPORT" | "ADMIN";
  