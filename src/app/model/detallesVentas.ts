import { Producto } from './productos';

export interface DetalleVenta {
  id: number;

  cantidad: number;
  precio: number;
  subtotal: number;

  ventaId: number;
  productoId: number;

  producto: Producto;
}