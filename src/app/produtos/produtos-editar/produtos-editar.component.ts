import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map, switchMap, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Produto } from '../produtos.model';
import { Location } from '@angular/common';
import { AlertModalService } from 'src/app/share/alert-modal.service';

@Component({
  selector: 'app-produtos-editar',
  templateUrl: './produtos-editar.component.html',
  styleUrls: ['./produtos-editar.component.css']
})
export class ProdutosEditarComponent implements OnInit {

  private URL_API = 'http://localhost:8000/api/produtos/';

  formulario: FormGroup;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private formularioGroup: FormBuilder,
    private location: Location,
    private alertService: AlertModalService,
  ) { }

  ngOnInit(): void {
    this.createFormulario(new Produto());
    this.popularDadosForm();
    // this.listarCategorias();
  }

  // ------------ATUALIZAR PRODUTO-----------
  public popularDadosForm(){
    this.route.params.pipe(
      map((params: any) => params.id),
      switchMap(id => this.loadById(id))
    )
    .subscribe(produto => this.editFormulario(produto));
  }

  private loadById(id) {
    return this.http.get(this.URL_API + id).pipe(take(1));
  }

  private editFormulario(produto) {
    this.formulario.patchValue({
      id: produto.id,
      nome: produto.nome,
      marca: produto.marca,
      categoria: produto.categoria,
      descricao: produto.descricao,
      valorCompra: produto.valorCompra,
      valorVenda: produto.valorVenda,
    });
  }
  // ----------------------------------------

  // ----------CRIAR NOVO CLIENTE------------
  private createFormulario(produto: Produto) {
    this.formulario = this.formularioGroup.group({
      id: produto.id,
      nome: [produto.nome, Validators.required],
      marca: [produto.marca, Validators.required],
      categoria: [produto.categoria, Validators.required],
      descricao: produto.descricao,
      valorCompra: [produto.valorCompra, Validators.required],
      valorVenda: [produto.valorVenda, Validators.required],
    })
  }
  // ----------------------------------------

  // ------------SALVAR GET E PUT------------
  public salvarProduto() {
    // console.log(this.formulario.value);
    if(this.formulario.invalid){
      this.handleError()
    } else {
      this.http.put(this.URL_API + this.formulario.value.id, this.formulario.value).pipe(take(1)).subscribe(
        success => { 
          this.handleSuccess(); 
          this.location.back();
        },
        error => { this.handleError() },
      )
    }

  }
  // ----------------------------------------

  public resetar(){
    this.formulario.reset();
  }

  public categoriasDaApi;
  public listarCategorias(){
    let url = 'http://localhost:8000/api/categorias/'
    
    this.http.get(url).subscribe(
      success => { this.categoriasDaApi = success },
      error => { console.log('Erro ao listar categorias') },
    )
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao atualizar produto');
  }

  handleSuccess() {
    this.alertService.showAlertSuccess('Sucesso ao atualizar produto');
  }

}
