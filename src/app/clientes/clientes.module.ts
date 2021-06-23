import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes.component';
import { HttpClientModule } from '@angular/common/http';


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

import { ClientesNovoComponent } from './clientes-novo/clientes-novo.component';
import { ClientesEditarComponent } from './clientes-editar/clientes-editar.component';






@NgModule({
  declarations: [
    ClientesComponent,
    ClientesNovoComponent,
    ClientesEditarComponent,
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
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
export class ClientesModule { }
