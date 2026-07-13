import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '../api.config';
import { HttpClient } from '@angular/common/http';
import { Producto as modelProducto } from '../../model/productos';
import { CrearProductoDto } from '../../model/dto/crear-producto.dto';
import { ActualizarProductoDto } from '../../model/dto/actualizar-producto.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Producto {


  private http = inject(HttpClient)
  // private api = "http://localhost:3000/productos"
  private api = 'https://distribuidorabackapiproto-production.up.railway.app/productos';

  getAll() {
    return this.http.get<modelProducto[]>(this.api);
  }

  getById(id:number){
    return this.http.get<modelProducto>(`${this.api}/${id}`)
  }

  create(data: CrearProductoDto){
    return this.http.post<CrearProductoDto>(this.api,data)
  }

  increment(id: number, data:{increment:number}){
    return this.http.patch(`${this.api}/increment/${id}`,data)
  }

  update(id:number,data:ActualizarProductoDto){
    return this.http.patch(`${this.api}/${id}`,data)
  }

  delete(id:number){
    return this.http.delete(`${this.api}/${id}`)
  }

  buscar(query: string): Observable<modelProducto[]> {
   console.log('HTTP QUERY:', query);
    return this.http.get<modelProducto[]>(
    `${this.api}/search?query=${query}`
  );
}


}
