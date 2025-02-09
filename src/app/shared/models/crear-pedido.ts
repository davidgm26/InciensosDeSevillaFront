import { CrearLineaDto } from "./crear-linea-dto";

export interface CrearPedido {
    idCliente:        number;
    lineasPedidosDto: CrearLineaDto[];
    fecha:            Date;
    total:            number;
}
