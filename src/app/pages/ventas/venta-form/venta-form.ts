import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CarritoItem } from '../../../model/carrito-item';
import { Venta } from '../../../core/services/venta';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Producto } from '../../../core/services/producto';
import { Observable } from 'rxjs';
import { Cliente as modelCliente} from '../../../model/cliente';
import { Venta as modelVenta } from '../../../model/venta';
import { Producto as ModelProducto } from '../../../model/productos';
import { Cliente } from '../../../core/services/cliente';
import { AsyncPipe } from '@angular/common';
import { CrearVentaDto } from '../../../model/dto/crear-ventas.dto';


@Component({
  selector: 'app-venta-form',
  imports: [AsyncPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './venta-form.html',
  styleUrl: './venta-form.css',
})
export class VentaForm {
  private serviceVenta = inject(Venta)
  private serviceProducto = inject(Producto)
  private serviceClientes =inject(Cliente)
    private cdr = inject(ChangeDetectorRef);
  clientes$:Observable<modelCliente[]> = this.serviceClientes.getAll()
  productos$: Observable<ModelProducto[]> = this.serviceProducto.buscar('')
  // Venta 
  ventaId: number | null  = null 
  venta$:Observable<modelVenta> | null = null

  
  formModle = new FormGroup(
    {
      clienteId: new FormControl<number |null>(null,{
        nonNullable:true
      })
    } 
  )

  recargarDetallesVenta(){
    const ventaParseado = Number(this.ventaId)
    this.venta$ = this.serviceVenta.getById(ventaParseado)
  }
  guardar(){
    if(this.formModle.invalid){
      this.formModle.markAllAsTouched();
      return
    }
    
    const venta : CrearVentaDto = this.formModle.getRawValue();
    console.log(venta)
    
    this.serviceVenta.crearVenta(venta).subscribe({
      next:(result) => {
        console.log(result)
        this.ventaId  = result.id
        if (this.ventaId) {
          this.recargarDetallesVenta()
          this.cdr.detectChanges() 
        }


      }
    })
  }
  
  productobuscar = ''
// producto a comprar
  cantidad = 1
   

  buscarProducto(){
    if (this.productobuscar !== '') {
      this.productos$ = this.serviceProducto.buscar(this.productobuscar)
      
    }{
      this.productos$ = this.serviceProducto.getAll()
    }
  }

  recargarProductos(){
    this.productos$ = this.serviceProducto.getAll()
  }

  producto: ModelProducto | null = null

  toggleProducto(data:ModelProducto){
    this.producto = data
  }

   
  agregarProducto(){
    if (!this.producto) {
      return
    }
    const ventaParseado = Number(this.ventaId)

    this.serviceVenta.agregarProductos(ventaParseado,{
      producto: this.producto.id,
      cantidad: this.cantidad
    }).subscribe({
      next:() => {
        this.recargarProducto()
        this.recargarProductos()
        this.recargarDetallesVenta()
        this.cdr.detectChanges()
      }
    })
  }

  recargarProducto(){
    if (this.producto) {
      this.producto = null
      this.cantidad = 1
    }
  }

  toggleCancelarAgregar(){
    this.producto = null
  }

  formMetodoPago = new FormGroup({
    metodoPago: new FormControl<"EFECTIVO" | "TRANSFERENCIA" | "TARJETA">("EFECTIVO", {
      nonNullable: true
    })
  });


guardarMetodoPago() {
  console.log("Método de pago seleccionado:");
}

RecargarCancelarVenta(){
  this.venta$ = null
}

toggleCancelarVenta(){
  const ventaIdParceado = Number(this.ventaId)

  const metodoPago = this.formMetodoPago.getRawValue().metodoPago;
  this.serviceVenta.cancelarVenta(ventaIdParceado,metodoPago).subscribe({
    next:()=>{
      this.RecargarCancelarVenta()
      this.recargarProducto()
      this.recargarProductos()
      this.cdr.detectChanges()
    }
  })
}

toggleComfirmarVenta(){
  const ventaIdParceado = Number(this.ventaId)
  const metodoPago = this.formMetodoPago.getRawValue().metodoPago;
  this.serviceVenta.confirmarVenta(ventaIdParceado,metodoPago).subscribe({
    next: ()=>{
      this.recargarProducto()
      this.recargarProductos()
      this.cdr.detectChanges()
    }
  })
}


}
