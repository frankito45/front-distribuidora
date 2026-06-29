import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categorias } from '../../model/categoria';
import { CrearCategoriaDto } from '../../model/dto/crear-categoria.dto';
import { ActualizarCategoriaDto } from '../../model/dto/actualizar-categoria.dto';

@Injectable({
  providedIn: 'root',
})
export class Categoria {
  
 private http = inject(HttpClient) 
 private api = 'https://distribuidorabackapiproto-production.up.railway.app/categoria'

  
  getAll(){
    return this.http.get<Categorias[]>(this.api)
  }

  getById(id:number){
    return this.http.get<Categoria>(`${this.api}/${id}`)
  }

  update(id: number, data:ActualizarCategoriaDto){
    return this.http.patch(`${this.api}/${id}`,data)
  }

  delete(id: number){
    return this.http.delete(`${this.api}/${id}`)
  }

  create(data:CrearCategoriaDto){
    return this.http.post(`${this.api}`,data)
  }
  

}
