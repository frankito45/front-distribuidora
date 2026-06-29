import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CrearClienteDto } from '../../../model/dto/crear-cliente.dto';
import { RouterLink } from "@angular/router";
import { Cliente } from '../../../core/services/cliente';

@Component({
  selector: 'app-cliente-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './cliente-form.html',
  styleUrl: './cliente-form.css',
})
export class ClienteForm {
  private serviceCliente = inject(Cliente)
  formModel = new FormGroup({
    nombre: new FormControl('',{
      nonNullable:true
    }),
    telefono: new FormControl('',{
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
    this.serviceCliente.create(cliente).subscribe({
      next: () => {
        alert('Cliente creado con Exito')
        this.formModel.reset()
      }
    })
    
    console.log(cliente)
  }

}
