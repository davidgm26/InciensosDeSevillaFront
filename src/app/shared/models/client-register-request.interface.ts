import { RegisterRequest } from "./register-request.interface";

export interface ClientRegisterRequest extends RegisterRequest{
    username: string;
    password: string;
    rol:number;
    nombre: string;
    apellidos: string;
    dni: string;
    telefono:string;
    direccion:string;
    correo: string;
}
