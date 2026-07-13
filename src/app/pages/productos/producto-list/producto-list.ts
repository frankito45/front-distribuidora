import { ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import { Producto } from '../../../core/services/producto';
import { Producto as modelProducto } from '../../../model/productos';
import { Categorias as modelCategoria } from '../../../model/categoria';
import { ActualizarProductoDto } from '../../../model/dto/actualizar-producto.dto';
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../../core/services/categoria';
import { Spiner } from "../../../shared/spiner/spiner";
import { LocalizedString } from '@angular/compiler';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [AsyncPipe, RouterLink, FormsModule, Spiner, DatePipe],
  templateUrl: './producto-list.html',
  styleUrl: './producto-list.css',
})
  export class ProductoList {
  private productoServices = inject(Producto);
  private categoriaServices = inject(Categoria)
  private cdr = inject(ChangeDetectorRef);
  auth = inject(Auth)
  user = localStorage.getItem('user')

  productos$: Observable<modelProducto[]> = this.productoServices.getAll()
  actualizarProducto: ActualizarProductoDto | null = null
  productoIdActualizar: number | null = null
  categorias$: Observable<modelCategoria[]> = this.categoriaServices.getAll()
  

  recargarProduto(){

    this.productos$ =
    this.productoServices.getAll();
  }

  busqueda = ''


  toggleEliminar(data:modelProducto){
    confirm(`seguro que quieres eliminar: ${data.nombre}`) ? 
    this.productoServices.delete(data.id)
    .subscribe({
      next:() => {
        this.recargarProduto();
        this.cdr.detectChanges();
      }
    }) :null
  }

  toggleUpdate(data:modelProducto){
    this.productoIdActualizar = data.id
    this.actualizarProducto = {
      nombre: data.nombre,
      categoriaId:data.categoriaId,
      stock:data.stock,
      precioCompra:data.precioCompra,
      precioVenta:data.precioVenta,
      descripcion:data.descripcion
    }
  }
  cancelarUpdate(){
    this.actualizarProducto = null
    this.productoIdActualizar = null
  }
  guardarCambios(){
    if(this.actualizarProducto && this.productoIdActualizar){
      this.productoServices.update(this.productoIdActualizar ,this.actualizarProducto)
      .subscribe({
        next:()=>{
          this.recargarProduto();
          this.cdr.detectChanges();
          this.cancelarUpdate();
        }
      })
    }
  }

  agregarStock:boolean = false 
  productosBuscado$:Observable<modelProducto[]> = this.productoServices.buscar('')


  toggleAgregarStock(){
    this.agregarStock = !this.agregarStock
  }
  
  buscarProducto() {
      if(this.agregarStock){
        this.productosBuscado$ = this.productoServices.buscar(this.busqueda)
      }

  }

  productoSeleccionado: modelProducto | null = null;
  mostralmodal: boolean = false;
  cantidadStock: number = 0 

  seleccionarProducto(producto:modelProducto){
    this.productoSeleccionado = producto
    this.mostralmodal = true
  }

  cerrarModal(){
    this.productoSeleccionado = null
    this.mostralmodal = false
    this.cantidadStock = 0
  }

  recargarProductosBuscado(){
    this.productosBuscado$ = this.productoServices.buscar(this.busqueda)
  }
  

  agregarStocktoggle = false
  confirmarAgregarStock(){
    if (this.agregarStock) return
    this.agregarStock = true
  
    if (this.productoSeleccionado && this.cantidadStock > 0) {
      this.productoServices.increment(this.productoSeleccionado.id,{increment: this.cantidadStock}).subscribe({
        next:() => {
          this.agregarStock = false
          this.recargarProduto()
          this.recargarProductosBuscado()
          this.cerrarModal()
          this.cdr.detectChanges()
        },
        complete:() => {
          this.agregarStock = true
        }
      })
    }
  }

}
