import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Cliente as clienteServises } from '../../../core/services/cliente';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import {  Cliente as modelCliente } from '../../../model/cliente';
import { RouterLink } from "@angular/router";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActualizarClienteDto } from '../../../model/dto/actualizar-cliente.dto';
import { Modal } from "../../../components/modal/modal";
import { Barrio } from '../../../model/barrio';
import { Barrios } from '../../../core/services/barrios';
import { crearBarrioDto } from '../../../model/dto/crear-barrio.dto';

@Component({
  selector: 'app-cliente-list',
  imports: [AsyncPipe, RouterLink, FormsModule, Modal, ReactiveFormsModule],
  templateUrl: './cliente-list.html',
  styleUrl: './cliente-list.css',
})


export class ClienteList {
  private clienteServises = inject(clienteServises)
  private barriosServises = inject(Barrios)
  private cdr = inject(ChangeDetectorRef);

  barrios$: Observable<Barrio[]> = this.barriosServises.getBarrio()
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
    console.log(data)
    this.clienteIdActualizar = data.id
    this.actualizarCliente = {
      nombre: data.nombre,
      barrioId: Number(data.barrioId),
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
          this.cancelarUpdate();
          this.recargarCliente();
          this.cdr.detectChanges();
        }
      })
    }
  }

  // formulario Barrio
  barrioFormulario = false

  formModelBarrio = new FormGroup({
    nombre: new FormControl('',{
      nonNullable:true
    })
  })

  abrirFormBarrio(){
    this.barrioFormulario = true
  }

  cerrarFormBarrio(){
    this.barrioFormulario = false
  }

  recargarBarrio(){
    this.barrios$ = this.barriosServises.getBarrio()
  }

  guardarBarrio(){

    if(this.formModelBarrio.invalid){
      this.formModelBarrio.markAllAsTouched();
      return;
    }

    const barrio:crearBarrioDto = this.formModelBarrio.getRawValue()
    this.barriosServises.createBarrio(barrio).subscribe({
      next:()=>{
        
      },
      complete:() => {
        this.barrioFormulario = false
        this.recargarBarrio()
        this.cdr.detectChanges()
      }
    })


  }

  toggleDeleteBarrio(id:number){
    this.barriosServises.deleteBarrio(id).subscribe({
      next:()=>{
      },
      complete:()=>{
        this.recargarBarrio()
        this.cdr.detectChanges()
      },
    })
  }

  






}
