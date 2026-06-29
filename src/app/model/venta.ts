import { Cliente } from './cliente';
import { DetalleVenta } from './detallesVentas';

export interface Venta {
  id: number;

  fecha: string;

  total: number;

  estado: 'PENDIENTE' | 'PAGADA' | 'CANCELADA';
  metodoPago: 'EFECTIVO' | 'TRANSFERENCIA' | 'TARJETA'

  clienteId?: number;
  cliente?: Cliente;

  detalles: DetalleVenta[];
}