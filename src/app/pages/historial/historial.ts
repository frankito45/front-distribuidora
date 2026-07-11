import { Component, inject } from '@angular/core';
import { Venta } from '../../core/services/venta';
import { Observable } from 'rxjs';
import { Venta as ModelVenta } from '../../model/venta';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial',
  imports: [AsyncPipe,DatePipe],
  templateUrl: './historial.html',
  styleUrl: './historial.css',
})
export class Historial {
  private servicesVenta = inject(Venta)

  take = 10;
  skip = 0;

  ventas$:Observable<ModelVenta[] | null> = this.servicesVenta.getAll({skip:this.skip, take:this.take}); 
  private router = inject(Router);

  abrirDetalles(ventaId:number){
    this.router.navigate(['/ventas', ventaId]);
  }
  
  cargarVentas() {
    this.ventas$ = this.servicesVenta.getAll({skip:this.skip, take:this.take});
  }

toggleSiguiente() {
  this.skip += this.take;
  this.cargarVentas();
}
toggleAnterior() {
  if (this.skip >= this.take) {
    this.skip -= this.take;
    this.cargarVentas();
  }
}


}
