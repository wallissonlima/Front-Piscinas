import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesComponent } from './clientes.component';
import { ClientesNovoComponent } from './clientes-novo/clientes-novo.component';
import { ClientesEditarComponent } from './clientes-editar/clientes-editar.component';

const routes: Routes = [
  { path: '', component: ClientesComponent },
  { path: 'novo', component: ClientesNovoComponent},
  { path: 'editar/:id', component: ClientesEditarComponent},


  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
