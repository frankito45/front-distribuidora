import { Component, inject } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CrearCategoriaDto } from '../../../model/dto/crear-categoria.dto';
import { Categoria } from '../../../core/services/categoria';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-categoria-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './categoria-form.html',
  styleUrl: './categoria-form.css',
})
export class CategoriaForm {
  private categoriaService = inject(Categoria)

  formModel = new FormGroup({
    nombre: new FormControl('',{nonNullable:true})
  })

  guardar(){
    if(this.formModel.invalid){
      this.formModel.markAllAsTouched()
      return;
    }

    const categoria:CrearCategoriaDto = this.formModel.getRawValue()
    
    this.categoriaService.create(categoria).subscribe(
      {
        next: () =>{
          alert('Categoría creada')
          this.formModel.reset();
        }
      }
    )

  }


}
