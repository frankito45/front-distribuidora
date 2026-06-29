// model/carrito-item.ts

export interface CarritoItem {
  productoId: number;
  nombre: string;
  precio: number;
  cantidad: number;
  subtotal: number;
}