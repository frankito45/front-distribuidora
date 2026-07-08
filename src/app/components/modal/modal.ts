import { Component, EventEmitter, Input, Output, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  
  @Input({ required: true })
  mostrar!: boolean;
  @Output() cerrarModal = new EventEmitter<void>();


  toggleCerrarModal(){
    console.log('emitiendo')
    this.cerrarModal.emit()
  }


}
