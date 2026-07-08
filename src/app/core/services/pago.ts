import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface  PagoInput {
  monto: number;
  metodo:  "EFECTIVO" | "TRANSFERENCIA" | "CUENTA_CORRIENTE";
}

@Injectable({
  providedIn: 'root',
})


export class Pago {
  // https://distribuidorabackapiproto-production.up.railway.app
  private api = 'https://distribuidorabackapiproto-production.up.railway.app/pago'
  private http = inject(HttpClient)

  hacerPago(idVenta:number,data:PagoInput[]){
    return  this.http.post(`${this.api}/${idVenta}`,data)
  }
}
