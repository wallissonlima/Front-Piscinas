import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdutosComponent } from './produtos.component';
import { ProdutosNovoComponent } from './produtos-novo/produtos-novo.component';
import { ProdutosEditarComponent } from './produtos-editar/produtos-editar.component';

const routes: Routes = [
  { path: '', component: ProdutosComponent },
  { path: 'novo', component: ProdutosNovoComponent },
  { path: 'editar/:id', component: ProdutosEditarComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }
