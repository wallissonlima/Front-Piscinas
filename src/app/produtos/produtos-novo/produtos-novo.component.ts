import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../produtos.model';
import { AlertModalService } from 'src/app/share/alert-modal.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-produtos-novo',
  templateUrl: './produtos-novo.component.html',
  styleUrls: ['./produtos-novo.component.css']
})
export class ProdutosNovoComponent implements OnInit {

  private URL_API = 'http://localhost:8000/api/produtos/';

  formulario: FormGroup;

  constructor(
    private http: HttpClient,
    private formularioGroup: FormBuilder,
    private alertService: AlertModalService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.createFormulario(new Produto());
    // this.listarCategorias();
  }

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
      this.http.post(this.URL_API, this.formulario.value).subscribe(
        success => { this.handleSuccess()
          this.location.back();
        }, error => { this.handleError() },
      )
    }
      // this.http.post(this.URL_API, this.formulario.value).subscribe(
      //   success => { this.handleSuccess()
      //     this.resetar();
      //   }, error => { this.handleError() },
      // )
  }
  // ----------------------------------------

  public resetar(){
    this.formulario.reset();
  }

  // public categoriasDaApi;
  // public listarCategorias(){
  //   let url = 'http://localhost:8000/api/categorias/'
    
  //   this.http.get(url).subscribe(
  //     success => { this.categoriasDaApi = success },
  //     error => { console.log('Erro ao listar categorias') },
  //   )
  // }

  handleError() {
    this.alertService.showAlertDanger('Erro ao cadastrar produto');
  }

  handleSuccess() {
    this.alertService.showAlertSuccess('Sucesso ao cadastrar produto');
  }

}
