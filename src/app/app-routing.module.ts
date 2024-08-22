import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

// Home
import { HomePage } from './pages/home/home';
import { ClientesComponent } from './pages/clientes/clientes.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: HomePage, data: { title: 'Home'} },
  { path: 'clientes', component: ClientesComponent, data: { title: 'Clientes'} },
  
	// { path: '**', component: ErrorPage }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
