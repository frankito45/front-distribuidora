import { Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { required } from '@angular/forms/signals';
import { Producto } from '../../core/services/producto';
import { Producto as modelProducto } from '../../model/productos';
import { Observable } from 'rxjs';
import { Venta } from '../../core/services/venta';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Spiner } from '../../shared/spiner/spiner';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar-productos',
  imports: [AsyncPipe,Spiner,FormsModule, CurrencyPipe],
  templateUrl: './agregar-productos.html',
  styleUrl: './agregar-productos.css',
})
export class AgregarProductos {

  @Input({required: true}) ventaId!: number

  @Output() productoAgregado = new EventEmitter<void>()

  private productoService = inject(Producto);
  private ventaService = inject(Venta);

  productos$:Observable<modelProducto[]> = this.productoService.buscar('productos')

  productoBuscar = '';
  producto: modelProducto| null  = null

  cantidad = 1

  loading = false;

  buscarProducto(){
    this.productos$ = this.productoService.buscar(this.productoBuscar)
  }

  seleccionarProductos(producto:modelProducto){
    this.producto = producto
  }

  cancelarSeleccion() {
    this.producto = null;
    this.cantidad = 1;
  }

  agregarProducto(){
    if(!this.producto){
      return;
    }
    this.loading = true
    this.ventaService.agregarProductos(this.ventaId,{
      producto: this.producto.id,
      cantidad: this.cantidad
    }).subscribe({
      next: ()  => {
        this.producto = null
        this.cantidad = 1 
        this.buscarProducto();
        console.log("emitiendo");
        this.productoAgregado.emit()
      },
      complete: () => {
        this.loading = false;
      }
    })
  }

}
