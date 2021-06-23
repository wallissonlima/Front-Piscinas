import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutosComponent } from './produtos.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule, matSelectAnimations} from '@angular/material/select';

import { ReactiveFormsModule } from '@angular/forms';
import { ProdutosNovoComponent } from './produtos-novo/produtos-novo.component';
import { ProdutosEditarComponent } from './produtos-editar/produtos-editar.component';


@NgModule({
  declarations: [
    ProdutosComponent, 
    ProdutosNovoComponent, 
    ProdutosEditarComponent
  ],
  imports: [
    CommonModule,
    ProdutosRoutingModule,

    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatSelectModule,

    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class ProdutosModule { }
