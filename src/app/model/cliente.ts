import { Barrio } from './barrio';
import { Venta } from './venta';

export interface Cliente {
  id: number;

  nombre: string;

  telefono?: string;

  email?: string;

  direccion?: string;
  
  barrioId?: number;
  
  createdAt: string;

  barrio?: Barrio ;
  
  ventas?: Venta[];
}