export interface ActualizarVentaDto {
  clienteId?: number;
  estado?: "PENDIENTE" | "CONFIRMADA" | "CANCELADA";
}