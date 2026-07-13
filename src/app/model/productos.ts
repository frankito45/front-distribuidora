import { Categorias } from "./categoria";

export interface Producto {
  
  id: number;
  nombre: string;
  descripcion?: string;
  precioCompra: number;
  precioVenta: number;
  stock: number;

  createdAt:string
  updatedAt:string

  categoriaId: number;
  categoria: Categorias;

  proveedorId?: number;
}