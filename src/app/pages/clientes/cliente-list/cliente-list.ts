import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Cliente as clienteServises } from '../../../core/services/cliente';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import {  Cliente as modelCliente } from '../../../model/cliente';
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { ActualizarClienteDto } from '../../../model/dto/actualizar-cliente.dto';

@Component({
  selector: 'app-cliente-list',
  imports: [AsyncPipe, RouterLink,FormsModule],
  templateUrl: './cliente-list.html',
  styleUrl: './cliente-list.css',
})


export class ClienteList {
  private clienteServises = inject(clienteServises)
  private cdr = inject(ChangeDetectorRef);

  clientes$: Observable<modelCliente[]> = this.clienteServises.getAll()

  recargarCliente(){
    this.clienteServises.getAll()
    .subscribe(data => {
      console.log('NUEVAS CATEGORIAS', data);
    });
    console.log('recargando')
    this.clientes$ =
    this.clienteServises.getAll();
  }


  toggleEliminar(data:modelCliente ){
    const eliminar = ()=> {
      this.clienteServises.delete(data.id).subscribe({
        next:()=> {
          this.recargarCliente()
          this.cdr.detectChanges()
        }
      })
    } 

    const result = confirm(`seguro que deas eliminar el cliente:${data.nombre} `)
    
    if(result){
      console.log(result)
      eliminar()
    }
  }

  actualizarCliente: ActualizarClienteDto | null = null
  clienteIdActualizar: number | null = null;

  cancelarUpdate (){
    this.actualizarCliente = null
    this.clienteIdActualizar = null
  }
  toggleUpdate(data:modelCliente ){
    this.clienteIdActualizar = data.id
    this.actualizarCliente = {
      nombre: data.nombre,
      direccion: data.direccion,
      telefono: data.telefono,
      email: data.email
    }
  }
  guardarCambios(){
    if(this.actualizarCliente && this.clienteIdActualizar){
      this.clienteServises.updateCliente(this.clienteIdActualizar, this.actualizarCliente)
      .subscribe({
        next:()=>{
          console.log(this.actualizarCliente)
          this.recargarCliente();
          this.cdr.detectChanges();
          this.cancelarUpdate();
        }
      })
    }
  }

}
