import { Component, inject } from '@angular/core';
import { ReactiveFormsModule,FormControl, FormGroup,Validators} from '@angular/forms';
import { CrearProductoDto } from '../../../model/dto/crear-producto.dto';
import { Categoria } from '../../../core/services/categoria';
import { AsyncPipe } from '@angular/common';
import { Producto } from '../../../core/services/producto';

@Component({
  selector: 'app-producto-form',
  imports: [ReactiveFormsModule,AsyncPipe],
  standalone: true,
  templateUrl:'./producto-form.html',
  styleUrl: './producto-form.css',
})


export class ProductoForm {

  private categoriaServices = inject(Categoria)
  private productoServices = inject(Producto)
  categorias$ = this.categoriaServices.getAll()

  formModel = new FormGroup({
    nombre: new FormControl('', {
      nonNullable: true
    }),

    descripcion: new FormControl('', {
      nonNullable: true
    }),

    precioCompra: new FormControl(0, {
      nonNullable: true
    }),

    precioVenta: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required,Validators.min(1)]
    }),

    stock: new FormControl(0, {
      nonNullable: true
    }),

    categoriaId: new FormControl(0, {
      nonNullable: true
    })

  });

    guardar() {
    if (this.formModel.invalid) {
      this.formModel.markAllAsTouched();
      return;
    }

    
    const producto:CrearProductoDto = this.formModel.getRawValue()
    producto.categoriaId = Number(producto.categoriaId)
     
    console.log(producto);

    this.productoServices.create(producto).subscribe({
      next: ()=> {
        this.formModel.reset()
        alert('poroducto creado correctamente')
      }
    })
  }



  }
