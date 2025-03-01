import { CrearLineaDto } from "./crear-linea-dto.interface";

export interface CrearPedido {
    lineasPedidosDto: CrearLineaDto[];
    fecha:            Date;
    total:            number;
    direccionDeEntrega: string;
}
