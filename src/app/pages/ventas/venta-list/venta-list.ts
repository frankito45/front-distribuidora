import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Venta } from '../../../core/services/venta';
import { Observable } from 'rxjs';
import { Venta as ModelVenta } from '../../../model/venta';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-venta-list',
  imports: [AsyncPipe,RouterLink],
  templateUrl: './venta-list.html',
  styleUrl: './venta-list.css',
})
export class VentaList {
 private ventaServices = inject(Venta)
 private cdr = inject(ChangeDetectorRef);
 ventas$:Observable<ModelVenta[]> = this.ventaServices.getPendiente() 
  datocoutn: number = 0
 recargarVentas(){
  this.ventas$ = this.ventaServices.getPendiente()
 }

 mensajeError: string = ''

irCrearVenta() {
  this.ventaServices.getCount().subscribe({
    next: (res) => {
      this.datocoutn = res.result;

      if (this.datocoutn < 10) {
        // redirigir
        window.location.href = "/ventas/nuevo"; 
        // o mejor: this.router.navigate(['/ventas/crear']);
      } else {
        this.mensajeError = "No se puede tener más de 10 ventas pendientes";
      }
    },
    error: (err) => {
      this.mensajeError = "Error al consultar ventas pendientes";
      console.error(err);
    }
  });
}


 toggleCancelarVenta(venta:ModelVenta){
  this.ventaServices.cancelarVenta(venta.id,venta.metodoPago).subscribe({
    next:() => {
      this.recargarVentas()
      this.cdr.detectChanges()
    }
  })
 }


}

