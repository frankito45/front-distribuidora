import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { crearBarrioDto } from '../../model/dto/crear-barrio.dto';
import { Barrio } from '../../model/barrio';
import { ActualizarBarrioDtoDto } from '../../model/dto/actualizar-barrio.dto';

@Injectable({
  providedIn: 'root',
})
export class Barrios {
  
    private http = inject(HttpClient)
    private api = 'https://distribuidorabackapiproto-production.up.railway.app/barrio'

    getBarrio(){
      return this.http.get<Barrio[]>(this.api)
    }
    createBarrio(data:crearBarrioDto){
      return this.http.post<Barrio>(this.api,data)
    }
    getIdBarrio(id:number){
      return this.http.get<Barrio>(`${this.api}/${id}`)
    }
    updateBarrio(id:number,data:ActualizarBarrioDtoDto){
      return this.http.patch<Barrio>(`${this.api}/${id}`,data)
    }
    deleteBarrio(id:number){
      return this.http.delete<any>(`${this.api}/delete/${id}`)
    }



}
