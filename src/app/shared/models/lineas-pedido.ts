import { Producto } from "./producto";

export interface LineasPedido {
    producto: Producto;
    cantidad: number;
    precio:   number;
    total:    number;
}
