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
import { Informe } from './pages/informe/informe';
import { Historial } from './pages/historial/historial';
import { Login } from './pages/login/login';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'producto',
    component: ProductoList,
    canActivate: [authGuard]
  },
  {
    path: 'productos/nuevo',
    component: ProductoForm,
    canActivate: [authGuard]
  },
  {
    path: 'categoria',
    component: CategoriaList,
    canActivate: [authGuard]
  },
  {
    path: 'categoria/nuevo',
    component: CategoriaForm,
    canActivate: [authGuard]
  },
  {
    path: 'cliente',
    component: ClienteList,
    canActivate: [authGuard]
  },
  {
    path: 'cliente/nuevo',
    component: ClienteForm,
    canActivate: [authGuard]
  },
  {
    path: 'venta',
    component: VentaList,
    canActivate: [authGuard]
  },
  {
    path: 'ventas/nuevo',
    component: VentaForm,
    canActivate: [authGuard]
  },
  {
    path: 'ventas/:id',
    component: VentaDetail,
    canActivate: [authGuard]
  },
  {
    path: 'historial',
    component: Historial,
    canActivate: [authGuard]
  },
  {
    path: 'mas',
    component: Informe,
    canActivate: [authGuard]
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];