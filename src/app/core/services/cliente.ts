import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente as ModelCliente } from '../../model/cliente';
import { ActualizarClienteDto } from '../../model/dto/actualizar-cliente.dto';
import { CrearClienteDto } from '../../model/dto/crear-cliente.dto';
@Injectable({
  providedIn: 'root',
})
export class Cliente {

  private http = inject(HttpClient)
//  private api = 'http://localhost:3000/clientes';
 private api = 'https://distribuidorabackapiproto-production.up.railway.app/clientes';

  
  getAll(){
    return this.http.get<ModelCliente[]>(this.api)
  }

  getById(id: number){
    return this.http.get<ModelCliente>(this.api)
  }

  create(data: CrearClienteDto ){
    return this.http.post<CrearClienteDto>(this.api,data)
  }

  updateCliente(id: number,data: ActualizarClienteDto){
    return this.http.patch(`${this.api}/actualizar/${id}` ,data)
  }

  delete(id:number){
    return this.http.delete(`${this.api}/${id}`)
  }

  getFilterBarrio(barrioId:number){
    return this.http.get<ModelCliente[]>(`${this.api}/filtrar?barrioId=${barrioId}`)
  }

}
