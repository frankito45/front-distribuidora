import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-modal',
  imports: [],
  template: `
    @if(show){

      <div class="bg-opacity-50 flex items-center justify-center z-50 mb-10 ">
        <div class="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center w-2xs">
          <p class="text-lg font-semibold mb-4">{{ message }}</p>
          <div class="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
      
    }
  `,
  styleUrl: './loading-modal.css',
})
export class LoadingModal {
 @Input() show = false;         // bandera para mostrar/ocultar
  @Input() message = 'Cargando...'; // mensaje configurable
}
