import { Routes } from '@angular/router';
import { ProductoList } from './pages/productos/producto-list/producto-list';
import { ProductoForm } from './pages/productos/producto-form/producto-form';
import { CategoriaList } from './pages/categorias/categoria-list/categoria-list';
import { CategoriaForm } from './pages/categorias/categoria-form/categoria-form';
import { ClienteList } from './pages/clientes/cliente-list/cliente-list';
import { ClienteForm } from './pages/clientes/cliente-form/cliente-form';
import { VentaList } from './pages/ventas/venta-list/venta-list';
import { VentaForm } from './pages/ventas/venta-form/venta-form';
import { VentaDetail } from './pages/ventas/venta-detail/venta-detail';

export const routes: Routes = [
    {
        path: 'producto',
        component:ProductoList
    },
    {
        path: 'productos/nuevo',
        component: ProductoForm
    },
    {
        path: 'categoria',
        component: CategoriaList
    },
    {
        path: 'categoria/nuevo',
        component: CategoriaForm
    },
    {
        path: 'cliente/nuevo',
        component: ClienteForm
    },
    {
        path: 'cliente',
        component: ClienteList
    },
    {
        path: 'venta',
        component: VentaList
    },
    {
        path: 'ventas/nuevo',
        component: VentaForm
    },  
    {
    path: 'ventas/:id',
    component: VentaDetail
    }
];
