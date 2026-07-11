import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CrearClienteDto } from '../../../model/dto/crear-cliente.dto';
import { RouterLink } from "@angular/router";
import { Cliente } from '../../../core/services/cliente';
import { Barrios } from '../../../core/services/barrios';
import { Observable } from 'rxjs';
import { Barrio } from '../../../model/barrio';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-cliente-form',
  imports: [ReactiveFormsModule, RouterLink, AsyncPipe],
  templateUrl: './cliente-form.html',
  styleUrl: './cliente-form.css',
})
export class ClienteForm {
  private serviceCliente = inject(Cliente)
  private serviceBarrio = inject(Barrios)
  barrios$:Observable<Barrio[] | null> = this.serviceBarrio.getBarrio()


  formModel = new FormGroup({
    nombre: new FormControl('',{
      nonNullable:true
    }),
    telefono: new FormControl('',{
      nonNullable:true
    }),
    barrioId: new FormControl(0,{
      nonNullable:true
    }),
    direccion: new FormControl('',{
      nonNullable:true
    }),
  })

  guardar(){
    
    if(this.formModel.invalid){
      this.formModel.markAllAsTouched();
      return
    }
    const cliente:CrearClienteDto = this.formModel.getRawValue()
    cliente.barrioId = Number(cliente.barrioId);
    this.serviceCliente.create(cliente).subscribe({
      next: () => {
        alert('Cliente creado con Exito')
        this.formModel.reset()
      }
    })
    
    console.log(cliente)
  }

  

}
