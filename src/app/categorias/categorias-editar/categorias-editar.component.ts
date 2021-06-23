import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map, switchMap, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from '../categoria.model';
import { Location } from '@angular/common';
import { AlertModalService } from 'src/app/share/alert-modal.service';

@Component({
  selector: 'app-categorias-editar',
  templateUrl: './categorias-editar.component.html',
  styleUrls: ['./categorias-editar.component.css']
})
export class CategoriasEditarComponent implements OnInit {

  private URL_API = 'http://localhost:8000/api/categorias/';

  formulario: FormGroup;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private formularioGroup: FormBuilder,
    private location: Location,
    private alertService: AlertModalService,
  ) { }

  ngOnInit(): void {
    this.createFormulario(new Categoria());
    this.popularDadosForm();
  }

   // ------------ATUALIZAR CATEGORIA-----------
   public popularDadosForm(){
    this.route.params.pipe(
      map((params: any) => params.id),
      switchMap(id => this.loadById(id))
    )
    .subscribe(categoria => this.editFormulario(categoria));
  }

  private loadById(id) {
    return this.http.get(this.URL_API + id).pipe(take(1));
  }
  
  private editFormulario(categoria) {
    this.formulario.patchValue({
      id: categoria.id,
      categoria: categoria.categoria,
    });
  }
  // ----------------------------------------

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
      this.http.put(this.URL_API + this.formulario.value.id, this.formulario.value).pipe(take(1)).subscribe(
        success => { 
          this.handleSuccess(); 
          this.location.back();
        },
        error => { this.handleError() },
      )
  }
  // ----------------------------------------

  public resetar(){
    this.formulario.reset();
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao atualizar categoria');
  }

  handleSuccess() {
    this.alertService.showAlertSuccess('Sucesso ao atualizar categoria');
  }

}
