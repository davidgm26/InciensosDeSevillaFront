import { CrearLineaDto } from "./crear-linea-dto";

export interface CrearPedido {
    lineasPedidosDto: CrearLineaDto[];
    fecha:            Date;
    total:            number;
}
