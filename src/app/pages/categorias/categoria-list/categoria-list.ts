import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Categoria } from '../../../core/services/categoria';
import { Observable } from 'rxjs';
import { Categorias } from '../../../model/categoria';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-categoria-list',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './categoria-list.html',
  styleUrl: './categoria-list.css',
})
export class CategoriaList {
  private categoriaService = inject(Categoria)
  private cdr = inject(ChangeDetectorRef);
  categorias$: Observable<Categorias[]> = this.categoriaService.getAll()
  categoriaAbierta: number | null = null;


  toggleArticulos(id: number) {

    if (this.categoriaAbierta === id) {
      this.categoriaAbierta = null;
      return;
    }

    this.categoriaAbierta = id;

  }

  recargarCategoria(){
    this.categoriaService.getAll()
    .subscribe(data => {
      console.log('NUEVAS CATEGORIAS', data);
    });
    console.log('recargando')
    this.categorias$ =
    this.categoriaService.getAll();
    
  } 

  toggleEliminar(element:Categorias){
    const eliminar = ()=> {
      this.categoriaService.delete(element.id)
      .subscribe({
        next: ()=> {
          alert(`Categoria: ${element.nombre} Eliminada `)
          this.recargarCategoria()
          this.cdr.detectChanges();
        }
      })
    }

    if(element.productos.length === 0 ){
      eliminar()
    }else{
      const result = confirm(
        'Esta categoría tiene productos. ¿Deseas eliminarla igual?'
      );

      if (result) {
        eliminar();
      }

    }
  }

}
