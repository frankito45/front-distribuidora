import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pago } from '../../core/services/pago';
import { Spiner } from "../../shared/spiner/spiner";

interface PagoForm {
  metodo: "EFECTIVO" | "TRANSFERENCIA" | "CUENTA_CORRIENTE";
  monto: number;
}

@Component({
  selector: 'app-formulario-pago',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Spiner
],
  templateUrl: './formulario-pago.componet.html',
  styleUrl: './formulario-pago.componet.css',
})


export class FormularioPagoComponet  implements OnChanges {
  servicePago = inject(Pago)
  @Input() ventaId!: number;
  @Input() total!: number;

  @Output() pagoRealizado = new EventEmitter<void>();
  @Output() cerrarModal = new EventEmitter<void>();

metodos: PagoForm["metodo"][] = [
  "EFECTIVO",
  "TRANSFERENCIA",
  "CUENTA_CORRIENTE"
];

  pagos: PagoForm[] = [];

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['total']) {

      this.pagos = [
        {
          metodo: 'EFECTIVO',
          monto: this.total
        }
      ];

    }

  }

  load = false

  agregarPago() {

    const disponibles = this.metodos.filter(
      m => !this.pagos.some(p => p.metodo === m)
    );

    if (!disponibles.length) return;

    this.pagos.push({
      metodo: disponibles[0],
      monto: 0
    });

  }

  eliminarPago(index: number) {

    this.pagos.splice(index, 1);

  }

  completarSaldo(index: number) {

    const otros = this.pagos
      .filter((_, i) => i !== index)
      .reduce((t, p) => t + Number(p.monto), 0);

    this.pagos[index].monto = this.total - otros;

  }

  get totalPagado() {

    return this.pagos.reduce(
      (t, p) => t + Number(p.monto),
      0
    );

  }

  get saldo() {

    return this.total - this.totalPagado;

  }

  confirmarPago() {

    if (this.saldo !== 0) return;
    this.load = true
    this.servicePago.hacerPago(
      this.ventaId,
      this.pagos
    ).subscribe({
      next: () => {
        this.pagoRealizado.emit()
      },
      error: (err) => {
        console.error(err);
      },
      complete:() => this.load = false
    });

  }
  
  cerrar(){
      this.cerrarModal.emit()
  }

  crearOferta(){}

}
