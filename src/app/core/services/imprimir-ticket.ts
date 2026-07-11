import { inject, Injectable } from '@angular/core';
import { Venta } from '../../model/venta';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class TicketService {


  imprimir(venta: Venta): void {
    console.log(venta.cliente?.barrio?.nombre)
    console.log(venta.cliente?.barrio?.id)
    console.log(venta.cliente?.barrioId)
    const iframe = document.createElement('iframe');

    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';

    document.body.appendChild(iframe);

    const doc = iframe.contentDocument;

    if (!doc) {
      document.body.removeChild(iframe);
      return;
    }

    // Documento HTML
    doc.open();
    doc.close();

    // ---------- HEAD ----------
    const style = doc.createElement('style');

    style.textContent = `

    @page {
    size: 72mm auto;
    margin: 2mm;
}

body{
    width:72mm;
    margin:0;
    padding:2mm;
    font-family: Arial, sans-serif;
    font-size:15px;
}


h2{
    text-align:center;
    font-size:20px;
    margin-bottom:8px;
}
h3{
    font-size:20px;
    margin-bottom:8px;
}

p{
    margin:3px 0;
    font-size:14px;
}

hr{
    border:none;
    border-top:1px dashed #000;
    margin:8px 0;
}

.total{
    font-size:18px;
    font-weight:bold;
    text-align:right;
}
    `;

    doc.head.appendChild(style);

    // ---------- BODY ----------

    const body = doc.body;

    const titulo = doc.createElement('h2');
    titulo.textContent = 'Distribuidora El Roble ';
    body.appendChild(titulo);
    
    const ventaId = doc.createElement('p');
    ventaId.textContent = `Venta #${venta.id}`;
    body.appendChild(ventaId);

    const fecha = doc.createElement('p');
    fecha.textContent = new Date(venta.fecha).toLocaleString();
    body.appendChild(fecha);

    const cliente = doc.createElement('h3');
    cliente.textContent = `Cliente: ${venta.cliente?.nombre}`
    body.appendChild(cliente)

    const clienteBarri = doc.createElement('p')
    clienteBarri.textContent = `Barrrio: ${venta.cliente?.barrio?.nombre}`
    body.appendChild(clienteBarri)

    const clienteDireccion = doc.createElement('p')
    clienteDireccion.textContent = `Dereccion: ${venta.cliente?.direccion}`
    body.appendChild(clienteDireccion)
    
    const clienteTelefono = doc.createElement('p')
    clienteTelefono.textContent = `Telefono: ${venta.cliente?.telefono}`
    body.appendChild(clienteTelefono)
    
    const clienteEmail = doc.createElement('p')
    clienteEmail.textContent = `Email: ${venta.cliente?.email}`
    body.appendChild(clienteEmail)
    


    body.appendChild(doc.createElement('hr'));

    // Productos
    for (const detalle of venta.detalles) {

      const producto = doc.createElement('p');

      producto.textContent =
        `${detalle.producto.nombre}
        x${detalle.cantidad}
        $${detalle.subtotal}`;

      body.appendChild(producto);
    }

    body.appendChild(doc.createElement('hr'));

    // Pagos
    if (venta.pagos?.length) {

      const tituloPagos = doc.createElement('p');
      tituloPagos.textContent = 'Pagos';
      body.appendChild(tituloPagos);

      for (const pago of venta.pagos) {

        const p = doc.createElement('p');

        p.textContent =
          `${pago.metodo}: $${pago.monto}`;

        body.appendChild(p);
      }

      body.appendChild(doc.createElement('hr'));
    }

    const total = doc.createElement('p');

    total.className = 'total';
    total.textContent = `TOTAL: $${venta.total}`;

    body.appendChild(total);

    // Esperar que cargue e imprimir
    iframe.onload = () => {

      iframe.contentWindow?.focus();

      iframe.contentWindow?.print();

      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 500);

    };

    // Algunos navegadores no disparan onload en iframes vacíos.
    // Por eso llamamos manualmente.

    setTimeout(() => {

      iframe.contentWindow?.focus();

      iframe.contentWindow?.print();

      document.body.removeChild(iframe);

    }, 200);

  }

}