import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';

import { Venta } from '../../../core/services/venta';
import { Venta as ModelVenta } from '../../../model/venta';
import { Spiner } from "../../../shared/spiner/spiner";
import { FormularioPagoComponet } from "../../../components/formulario-pago.componet/formulario-pago.componet";
import { TicketService } from '../../../core/services/imprimir-ticket';
import { AgregarProductos } from "../../../components/agregar-productos/agregar-productos";
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Modal } from '../../../components/modal/modal';
import { FormControl, FormGroup, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-venta-detail',
  standalone:true,
  imports: [Spiner, FormularioPagoComponet, AgregarProductos, CurrencyPipe, Modal, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './venta-detail.html',
  styleUrl: './venta-detail.css',
})
export class VentaDetail implements OnInit {
  private ventaService = inject(Venta)
  private tiketService = inject(TicketService)
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth = inject(Auth);

  @Input({ required: true })
  ventaId!: number;
  venta:ModelVenta | null = null
  loadig = false
  loadinVenta = false
  
  ngOnInit() {
   if (this.ventaId) {
    this.cargarVenta();
    return;
  }

  const id = this.route.snapshot.paramMap.get('id');

  if (id) {
    this.ventaId = Number(id);
    this.cargarVenta();
  }

  }

  cargarVenta(){
    this.loadig = true
      console.log("recargando");
    this.ventaService.getById(this.ventaId).subscribe({
      next: (res) => {
        this.venta = res 
        console.log(res);
        console.log("recargando 2");
      },
      complete: () => {
        console.log('recarga recivida')
        this.cdr.detectChanges()
      },
      error: (err) =>{
        
      }
    })
   

  }

  eliminarProducto(productoId:number){
    this.ventaService.desagregarProducto(this.ventaId,productoId)
    this.cargarVenta()
  }

  agregarProducto(producto:any) {
  this.ventaService.agregarProductos(this.ventaId,producto)
  this.cargarVenta();
  }

  mostrarModalPago = false
  
  cancelar(){
    this.ventaService.cancelarVenta(this.ventaId).subscribe({
      next:() => this.cargarVenta(),
    })
    this.loadig = false
    
  }

  pagar() {
    this.mostrarModalPago = true
  }
  
  onPagoRealizado() {
    this.mostrarModalPago = false;
    this.cargarVenta();
  }

  cerrarModal(){
    this.mostrarModalPago = false
  }


  imprimirTiket(){
    if (this.venta) {
      this.tiketService.imprimir(this.venta)
    }
    
  }  

  abrirModalOferta:boolean = false
  formModelOfertas = new FormGroup({
    oferta: new FormControl<number>(0,{
      nonNullable:true
    })
  })

  toggleCerrarOferta(){
    this.abrirModalOferta= false
  }
  toggleAbrirOferta(){
    this.abrirModalOferta= true
  }
  
  agregarOferta(id:number){
    if (this.formModelOfertas.invalid) {
      this.formModelOfertas.markAsTouched()
    }

    const oferta = this.formModelOfertas.getRawValue()

    this.ventaService.crearOferta(id,oferta).subscribe({
        next:(res) => console.log('resultados',res),
        complete:() => {

          this.toggleCerrarOferta()
          this.cargarVenta()  
          this.cdr.detectChanges()
        }
    })
  }



}






