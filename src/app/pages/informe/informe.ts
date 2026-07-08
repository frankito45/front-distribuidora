import { Component, inject, OnInit } from '@angular/core';
import { Venta } from '../../core/services/venta';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-informe',
  imports: [FormsModule,CurrencyPipe],
  templateUrl: './informe.html',
  styleUrl: './informe.css',
})
export class Informe implements OnInit{


 private serviceVenta = inject(Venta);

  fecha: string = new Date().toISOString().split('T')[0];

  informe: any = null;

  dineroCaja: number = 0;

  ngOnInit(): void {
    this.buscarInforme();
  }

  buscarInforme(): void {
    this.serviceVenta.getInforme(this.fecha).subscribe({
      next: (resp) => {
        this.informe = resp;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  hoy(): void {
    this.fecha = new Date().toISOString().split('T')[0];
    this.buscarInforme();
  }

  get diferenciaCaja(): number {
    if (!this.informe) {
      return 0;
    }

    return this.dineroCaja - this.informe.efectivo;
  }
}
