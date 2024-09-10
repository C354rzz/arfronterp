import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

// Home
import { HomePage } from './pages/home/home';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ClienteDetalleComponent } from './pages/clientes/cliente-detalle/cliente-detalle.component';
import { DireccionesComponent } from './pages/clientes/direcciones/direcciones.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePage, data: { title: 'Home'} },
  { path: 'clientes', component: ClientesComponent, data: { title: 'Clientes'} },
  { path: 'clienteDetalle/:uidCliente',  component: ClienteDetalleComponent, data: { title: 'ClienteDetalle'} },
  { path: 'clientesDirecciones', component: DireccionesComponent, data: { title: 'Direcciones'} },
  
	// { path: '**', component: ErrorPage }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
