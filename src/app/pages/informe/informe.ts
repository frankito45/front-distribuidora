import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Venta } from '../../core/services/venta';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Content } from "../../components/content/content";
import { LoaderComponent } from "../../components/loader-component/loader-component";

@Component({
  selector: 'app-informe',
  imports: [FormsModule, CurrencyPipe, LoaderComponent],
  templateUrl: './informe.html',
  styleUrl: './informe.css',
})
export class Informe implements OnInit{

 private cdr = inject(ChangeDetectorRef);
 private serviceVenta = inject(Venta);

  formeLoad: boolean = false

  fecha: string = new Date().toISOString().split('T')[0];

  informe: any = null;

  dineroCaja: number = 0;

  ngOnInit(): void {
    this.formeLoad = true
    this.buscarInforme();
    this.formeLoad = false
  }

  buscarInforme(): void {
    this.formeLoad = true
    console.log(this.fecha)
    this.serviceVenta.getInforme(this.fecha).subscribe({
      next: (resp) => {
        this.informe = resp;
      },
      complete:()=> {
        this.formeLoad = false
        this.cdr.detectChanges()
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
