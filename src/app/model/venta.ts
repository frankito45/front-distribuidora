import { Cliente } from './cliente';
import { DetalleVenta } from './detallesVentas';
import { Pago } from './pago';


export interface Venta {
  id: number;

  fecha: string;

  total: number;
  oferta:number

  estado: 'PENDIENTE' | 'PAGADA' | 'CANCELADA';
  metodoPago: 'EFECTIVO' | 'TRANSFERENCIA' | 'TARJETA'

  clienteId?: number;
  cliente?: Cliente;

  detalles: DetalleVenta[];
  pagos: Pago[]
}