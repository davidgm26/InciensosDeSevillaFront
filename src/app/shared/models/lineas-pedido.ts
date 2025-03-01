import { Producto } from "./producto.interface";

export interface LineasPedido {
    producto: Producto;
    cantidad: number;
    precio:   number;
    total:    number;
}
