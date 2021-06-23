import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriasComponent } from './categorias.component';
import { CategoriasNovoComponent } from './categorias-novo/categorias-novo.component';
import { CategoriasEditarComponent } from './categorias-editar/categorias-editar.component';

const routes: Routes = [
  { path: '', component: CategoriasComponent },
  { path: 'novo', component: CategoriasNovoComponent },
  { path: 'editar/:id', component: CategoriasEditarComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
