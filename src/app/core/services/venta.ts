import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Venta as ModelVenta } from '../../model/venta';
import { CrearVentaDto } from '../../model/dto/crear-ventas.dto';
import { AgregarProductoVentaDto } from '../../model/dto/agregar-producto-venta.dto';



@Injectable({
  providedIn: 'root',
})
export class Venta {

  private http = inject(HttpClient);
  private api = 'https://distribuidorabackapiproto-production.up.railway.app/venta';

getAll(params = { skip: 0, take: 10 }) {
  return this.http.get<ModelVenta[]>(`${this.api}?skip=${params.skip}&take=${params.take}`);
}

getCount(){
  return this.http.get<{result:number}>(`${this.api}/estado/count`);
}


  getById(id: number) {
    return this.http.get<ModelVenta>(`${this.api}/${id}`);
  }

  crearVenta(data: CrearVentaDto) {
    return this.http.post<ModelVenta>(
      this.api,
      data
    );
  }

  agregarProductos(
    ventaId: number,
    detalles: AgregarProductoVentaDto
  ) {
    return this.http.patch(
      `${this.api}/${ventaId}/productos`,
      detalles
    );
  }

  confirmarVenta(id: number,metodoPago:string) {
    return this.http.patch(
      `${this.api}/${id}/estado`,
      {
        estado: 'PAGADA',
        metodoPago: metodoPago
      }
    );
  }

  cancelarVenta(id: number,metodoPago:string) {
    return this.http.patch(
      `${this.api}/${id}/estado`,
      {
        estado: 'CANCELADA',
        metodoPago: metodoPago
      }
    );
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }

  getPendiente(){
    return this.http.get<ModelVenta[]>(`${this.api}/registro/pendiente`)
  }

  getDay(day:string){
    return this.http.get<ModelVenta[]>(
      `${this.api}/registro/historial`
    )
  }

  desagregarProducto(ventaId:number, productoId: number){
    return this.http.delete(`${this.api}/venta/${ventaId}/producto/${productoId}`)
  }

}