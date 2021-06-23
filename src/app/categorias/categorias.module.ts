import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriasComponent } from './categorias.component';
import { CategoriasNovoComponent } from './categorias-novo/categorias-novo.component';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import {MatCardModule} from '@angular/material/card';
import { CategoriasEditarComponent } from './categorias-editar/categorias-editar.component';

@NgModule({
  declarations: [
    CategoriasComponent, 
    CategoriasNovoComponent, 
    CategoriasEditarComponent,
  ],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
  ]
})
export class CategoriasModule { }
