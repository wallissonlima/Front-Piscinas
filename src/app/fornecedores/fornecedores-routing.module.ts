import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FornecedoresComponent } from './fornecedores.component';
import { FornecedoresNovoComponent } from './fornecedores-novo/fornecedores-novo.component';
import { FornecedoresEditarComponent } from './fornecedores-editar/fornecedores-editar.component';

const routes: Routes = [
  { path: '', component: FornecedoresComponent },
  { path: 'novo', component: FornecedoresNovoComponent},
  { path: 'editar/:id', component: FornecedoresEditarComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedoresRoutingModule { }
