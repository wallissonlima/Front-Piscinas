import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FornecedoresRoutingModule } from './fornecedores-routing.module';
import { FornecedoresComponent } from './fornecedores.component';
import { HttpClientModule } from '@angular/common/http';

import { FornecedoresNovoComponent } from './fornecedores-novo/fornecedores-novo.component';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';

import { TextMaskModule } from 'angular2-text-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { FornecedoresEditarComponent } from './fornecedores-editar/fornecedores-editar.component';


@NgModule({
  declarations: [
    FornecedoresComponent, 
    FornecedoresNovoComponent, 
    FornecedoresEditarComponent
  ],
  imports: [
    CommonModule,
    FornecedoresRoutingModule,

    HttpClientModule,

    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,

    TextMaskModule,
    ReactiveFormsModule,
  ],
})
export class FornecedoresModule { }
