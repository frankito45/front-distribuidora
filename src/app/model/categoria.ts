import { Producto } from "./productos";

export interface Categorias {
  id: number;
  nombre: string;
  productos: Producto[]
}