export interface CrearProductoDto {
  nombre: string;
  descripcion?: string;
  precioCompra: number;
  precioVenta: number;
  stock: number;
  categoriaId: number;
}