import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Venta } from '../../../core/services/venta';
import { Observable } from 'rxjs';
import { Venta as ModelVenta } from '../../../model/venta';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { routes } from '../../../app.routes';

@Component({
  selector: 'app-venta-list',
  imports: [AsyncPipe],
  templateUrl: './venta-list.html',
  styleUrl: './venta-list.css',
})
export class VentaList {
 private ventaServices = inject(Venta)
 private cdr = inject(ChangeDetectorRef);
 private router = inject(Router);
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
  this.ventaServices.cancelarVenta(venta.id).subscribe({
    next:() => {
      this.recargarVentas()
      this.cdr.detectChanges()
    }
  })
 }

abrirDetalles(ventaId: number) {
  console.log('Venta:', ventaId);
  this.router.navigate(['/ventas', ventaId]);
}

}

