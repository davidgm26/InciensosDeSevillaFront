import { UserResponse } from "./user-response.interface";

export interface ClienteResponse extends UserResponse{
    nombre?:    string;
    apellidos?: null;
    correo?:    string;
    telefono?:  string;
    dni?:       string;
    direccion?: string;
}
