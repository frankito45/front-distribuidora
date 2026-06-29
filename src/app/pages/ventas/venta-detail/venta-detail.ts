import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Venta } from '../../../core/services/venta';
import { Venta as ModelVenta } from '../../../model/venta';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Producto } from '../../../core/services/producto';
import { FormsModule } from '@angular/forms';
import { Producto as ModelProducto } from '../../../model/productos';
import { StickyOffset } from '@angular/cdk/table';


@Component({
  selector: 'app-venta-detail',
  imports: [AsyncPipe,FormsModule],
  templateUrl: './venta-detail.html',
  styleUrl: './venta-detail.css',
})
export class VentaDetail{
  private ventaService = inject(Venta)
  private productoService = inject(Producto)
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  id = Number(this.route.snapshot.paramMap.get('id'))
  venta$:Observable<ModelVenta> = this.ventaService.getById(this.id);

  productos$: Observable<ModelProducto[]> =
  this.productoService.buscar('');
  busqueda = ''
 productoSeleccionado:  ModelProducto | null = null;

  cantidad = 1;
  
  buscarProducto() {
    console.log('BUSQUEDA:',this.busqueda)
    this.productos$ =
      this.productoService.buscar(this.busqueda);
  }

  seleccionarProducto(producto: ModelProducto) {
    this.productoSeleccionado = producto;
  }

  
 agregarProducto(){
  if(!this.productoSeleccionado){
    return
  }
  console.log(this.id,this.productoSeleccionado.id,this.cantidad)
  this.ventaService.agregarProductos(
    this.id,
      {
        producto: this.productoSeleccionado.id,
        cantidad: this.cantidad
      }
    
  ).subscribe({
    next:() => {
      this.recargarVenta();

      this.busqueda = ''
      this.productoSeleccionado = null
      this.cantidad = 1
      this.cdr.detectChanges()
    }
  })
 }

 recargarVenta(){
  this.venta$ = this.ventaService.getById(this.id)
 }

 toggleCancelarVenta(ventaId:number,productoId:number){
    this.ventaService.desagregarProducto(ventaId,productoId).subscribe({
      next:()=>{
        this.recargarVenta()
        this.cdr.detectChanges()
      }
    })
 }

 toggleCancelarEstado(metodoPago:string){
  this.ventaService.cancelarVenta(this.id,metodoPago).subscribe({
    next: ()=>{
      this.recargarVenta()
      this.cdr.detectChanges()
    }
  })
 }
 
 toggleConfirmarVenta(metodoPago:string){
  this.ventaService.confirmarVenta(this.id,metodoPago).subscribe({
    next: ()=>{
      this.recargarVenta()
      this.cdr.detectChanges()
    }
  })
 }
 



 

  

}






