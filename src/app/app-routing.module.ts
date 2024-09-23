import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

// Home
import { HomePage } from './pages/home/home';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ClienteDetalleComponent } from './pages/clientes/cliente-detalle/cliente-detalle.component';
import { DireccionesComponent } from './pages/clientes/direcciones/direcciones.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { RolesComponent } from './pages/empleados/roles/roles.component';
import { EmpleadoDetalleComponent } from './pages/empleados/empleado-detalle/empleado-detalle.component';
import { CotizacionesComponent } from './pages/ventas/cotizaciones/cotizaciones.component';
import { VentasComponent } from './pages/ventas/ventas/ventas.component';
import { VentaDetalleComponent } from './pages/ventas/ventas/venta-detalle/venta-detalle.component';
import { CotizacionDetalleComponent } from './pages/ventas/cotizaciones/cotizacion-detalle/cotizacion-detalle.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePage, data: { title: 'Home'} },
  { path: 'clientes', component: ClientesComponent, data: { title: 'Clientes'} },
  { path: 'clienteDetalle/:uidCliente',  component: ClienteDetalleComponent, data: { title: 'Cliente Detalle'} },
  { path: 'clientesDirecciones', component: DireccionesComponent, data: { title: 'Direcciones'} },
  { path: 'cotizaciones', component: CotizacionesComponent, data: { title: 'Cotizaciones'} },
  { path: 'cotizacionDetalle/:uidCotizacion',  component: CotizacionDetalleComponent, data: { title: 'Cotización Detalle'} },
  { path: 'ventas', component: VentasComponent, data: { title: 'Ventas'} },
  { path: 'ventaDetalle/:uidCliente',  component: VentaDetalleComponent, data: { title: 'Venta Detalle'} },
  { path: 'empleados', component: EmpleadosComponent, data: { title: 'Empleados'} },
  { path: 'empleadoDetalle/:uidEmpleado',  component: EmpleadoDetalleComponent, data: { title: 'Empleado Detalle'} },
  { path: 'roles', component: RolesComponent, data: { title: 'Roles'} },

  
	// { path: '**', component: ErrorPage }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
