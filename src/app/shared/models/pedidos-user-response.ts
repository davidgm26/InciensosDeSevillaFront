import { LineasPedido } from "./lineas-pedido";

export interface PedidosUserResponse {
    nombre:       string;
    estado:       string;
    fecha:        Date;
    total:        number;
    direccion:    string;
    lineasPedido: LineasPedido[];
}
