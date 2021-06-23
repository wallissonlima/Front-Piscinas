import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../categoria.model';
import { AlertModalService } from 'src/app/share/alert-modal.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-categorias-novo',
  templateUrl: './categorias-novo.component.html',
  styleUrls: ['./categorias-novo.component.css']
})
export class CategoriasNovoComponent implements OnInit {

  private URL_API = 'http://localhost:8000/api/categorias/';

  formulario: FormGroup;

  constructor(
    private http: HttpClient,
    private formularioGroup: FormBuilder,
    private alertService: AlertModalService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.createFormulario(new Categoria());
  }

  // ----------CRIAR NOVO CATEGORIA------------
  private createFormulario(categoria: Categoria) {
    this.formulario = this.formularioGroup.group({
      id: categoria.id,
      categoria: [categoria.categoria, Validators.required],
    })
  }
  // ----------------------------------------
  
  // ------------SALVAR GET E PUT------------
  public salvarCategoria() {
    // console.log(this.formulario.value);
      this.http.post(this.URL_API, this.formulario.value).subscribe(
        success => { this.handleSuccess();
          this.location.back();
        }, error => { this.handleError() },
      )
  }
  // ----------------------------------------

  public resetar(){
    this.formulario.reset();
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao cadastrar categoria');
  }

  handleSuccess() {
    this.alertService.showAlertSuccess('Sucesso ao cadastrar categoria');
  }

}
