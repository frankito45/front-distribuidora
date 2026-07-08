import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Venta } from '../../../core/services/venta';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Producto } from '../../../core/services/producto';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cliente as modelCliente} from '../../../model/cliente';
import { Venta as modelVenta } from '../../../model/venta';
import { Producto as ModelProducto } from '../../../model/productos';
import { Cliente } from '../../../core/services/cliente';
import { AsyncPipe } from '@angular/common';
import { CrearVentaDto } from '../../../model/dto/crear-ventas.dto';
import { RouterLink } from '@angular/router';
import { TicketService } from '../../../core/services/imprimir-ticket';
import { LoaderComponent } from "../../../components/loader-component/loader-component";
import { VentaDetail } from "../venta-detail/venta-detail";
import { Content } from '../../../components/content/content';


@Component({
  selector: 'app-venta-form',
  standalone: true,
  imports: [AsyncPipe, FormsModule, ReactiveFormsModule, RouterLink, LoaderComponent, Content, VentaDetail],
  templateUrl: './venta-form.html',
  styleUrl: './venta-form.css',
})

export class VentaForm {
  private serviceVenta = inject(Venta)
  private serviceProducto = inject(Producto)
  private serviceClientes =inject(Cliente)
  private cdr = inject(ChangeDetectorRef);
  private serviceTicket = inject(TicketService)

// Interno: subject que podés actualizar con .next()
  private _venta$ = new BehaviorSubject<modelVenta | null>(null);

// Público: observable que se consume en el template con | async
  venta$ = this._venta$.asObservable();

  // formulario de ventas
  clientes$:Observable<modelCliente[]> = this.serviceClientes.getAll()
  productos$: Observable<ModelProducto[]> = this.serviceProducto.buscar('')
  
  // Venta 
  ventaId: number | null  = null 

  // cargar agregar Productos
  cargaAgregarProducto:boolean = false;

  
  // crearVenta formulario
  renderizarFromulario = true
  cargarVentaFormulario = false

  // cargarventa Table
  cargarVentaTable = false

  // renderizar agregar productos y lista
  mostrarAgregarProductos = true


// confirmar crear venta
formModle = new FormGroup(
  {
    clienteId: new FormControl<number |null>(null,{
      nonNullable:true
    })
  }

)
  barrio:string = ''

  filtrarClientes(barrio:string){
    if (this.barrio !== '') {
      this.clientes$ = this.serviceClientes.getFilterBarrio(this.barrio)
    }
  }

  

  guardar(){

    if(this.formModle.invalid){
      this.formModle.markAllAsTouched();
      return
    }
    this.cargarVentaFormulario = true
    const venta : CrearVentaDto = this.formModle.getRawValue();
    console.log(venta)
    
    this.serviceVenta.crearVenta(venta).subscribe({
      next:(result) => {
        this.ventaId  = result.id
        if (this.ventaId) {
          this.recargarDetallesVenta()
        }
        
      },
      complete:()=>{
        this.renderizarFromulario = false
        this.cargarVentaFormulario = false
        this.cdr.detectChanges() 
      }
    })
  }


  RecargarCancelarVenta() {
  this._venta$.next(null);
  this.renderizarFromulario = true
  this.ventaId = null
  }

  cancelarVenta(){
    if (this.ventaId) {
      this.serviceVenta.cancelarVenta(this.ventaId)
    }
    this.RecargarCancelarVenta()
    this.mostrarModalPago = false;
    this.ventaSeleccionada = null;
    
  }



  // producto a comprar
  productobuscar = 'Productos'
  cantidad = 1
  producto: ModelProducto | null = null

  buscarProducto(){
    if (this.productobuscar !== '') {
      this.productos$ = this.serviceProducto.buscar(this.productobuscar)
    }
  }

  recargarProductos(){
    if (this.productobuscar !== '') {
    this.productos$ = this.serviceProducto.buscar(this.productobuscar)
    }
  }
   

  toggleProducto(data:ModelProducto){
    this.producto = data
  }

   
  agregarProducto(){
    if (!this.producto) {
      return
    }
    const ventaParseado = Number(this.ventaId)
    this.cargarVentaTable = true
    this.cargaAgregarProducto = true
    this.serviceVenta.agregarProductos(ventaParseado,{
      producto: this.producto.id,
      cantidad: this.cantidad
    }).subscribe({
      next:() => {
        this.recargarProducto()
        this.recargarProductos()
        this.recargarDetallesVenta()
        this.cdr.detectChanges()
      },
      complete:()=>{
        this.cargaAgregarProducto = false
        this.cargarVentaTable = false
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

  recargarDetallesVenta() {
    if (this.ventaId) {
      this.serviceVenta.getById(this.ventaId).subscribe({
        next: v => this._venta$.next(v),
        complete: () => this.cdr.detectChanges()
      });
    }
  }




// modal de pago

  mostrarModalPago = false;
  ventaSeleccionada: modelVenta | null = null;
  
  pagar(venta: modelVenta) {

    this.ventaSeleccionada = venta;

    this.mostrarModalPago = true;
  }

  cerrarModal() {
    this.mostrarModalPago = false;

    this.ventaSeleccionada = null;

  }

  onPagoRealizado() {

    this.mostrarModalPago = false;
    this.mostrarAgregarProductos = false

    this.recargarDetallesVenta();
  }


  imprimirTiket(){
    if (this.ventaSeleccionada) {
      this.serviceTicket.imprimir(this.ventaSeleccionada)
    }
    
  }  



}
