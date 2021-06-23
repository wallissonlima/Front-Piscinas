import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Fornecedor } from '../fornecedores.model';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, take } from 'rxjs/operators';
import { Location } from '@angular/common';
import { AlertModalService } from 'src/app/share/alert-modal.service';



@Component({
  selector: 'app-fornecedores-editar',
  templateUrl: './fornecedores-editar.component.html',
  styleUrls: ['./fornecedores-editar.component.css']
})
export class FornecedoresEditarComponent implements OnInit {

  private URL_API = 'http://localhost:8000/api/fornecedores/';

  // telefoneMask= ['(', /[0-9]/, /\d/,')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  // cnpjMask= [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  // cepMask= [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  formulario: FormGroup;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private formularioGroup: FormBuilder,
    private location: Location,
    private alertService: AlertModalService,


  ) { }

  ngOnInit(): void {
    this.createFormulario(new Fornecedor());
    this.popularDadosForm();
  }

    // ------------ATUALIZAR FORNECEDOR-----------
    public popularDadosForm(){
      this.route.params.pipe(
        map((params: any) => params.id),
        switchMap(id => this.loadById(id))
      )
      .subscribe(fornecedor => this.editFormulario(fornecedor));
    }
  
    private loadById(id) {
      return this.http.get(this.URL_API + id).pipe(take(1));
    }
    
    private editFormulario(fornecedor) {
      this.formulario.patchValue({
        id: fornecedor.id,
        nomeEmpresa: fornecedor.nomeEmpresa,
        email: fornecedor.email,
        cnpj: fornecedor.cnpj,
        telefone: fornecedor.telefone,
        cep: fornecedor.cep,
        logradouro: fornecedor.logradouro,
        bairro: fornecedor.bairro,
        cidade: fornecedor.cidade,
        uf: fornecedor.uf,
      });
    }
    // ----------------------------------------

      // ----------CRIAR NOVO FORNECEDOR------------
  private createFormulario(fornecedor: Fornecedor) {
    this.formulario = this.formularioGroup.group({
      id: fornecedor.id,
      nomeEmpresa: [fornecedor.nomeEmpresa, Validators.required],
      email: [fornecedor.email, Validators.email],
      cnpj: [fornecedor.cnpj, [Validators.minLength(14), Validators.maxLength(14)]],
      telefone: [fornecedor.telefone, [Validators.minLength(10), Validators.maxLength(10)]],
      cep: [fornecedor.cep, [Validators.minLength(9), Validators.maxLength(9)]],
      logradouro: [fornecedor.logradouro, Validators.required],
      bairro: [fornecedor.bairro, Validators.required],
      cidade: [fornecedor.cidade, Validators.required],
      uf: [fornecedor.uf, Validators.required],
    })
  }
  // ----------------------------------------
  
  // ------------SALVAR GET E PUT------------
  public salvarFornecedor() {
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

  // -------------CONSULTAR CEP--------------
  public consultaCEP() {
    let cep = this.formulario.get('cep').value;
    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');
    //Verifica se campo ceppossui valor informado.
    if (cep != "") {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;
      //Valida o formato do CEP.
      if(validacep.test(cep)) {
        this.http.get(`//viacep.com.br/ws/${cep}/json`)
        .subscribe(dados => this.popularDadosFormCep(dados));
      }
    }
  }

  private popularDadosFormCep(dados) {
    this.formulario.patchValue({
      cep: dados.cep,
      logradouro: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
      uf: dados.uf
    })
  }
// ------------------------------------------

  handleError() {
    this.alertService.showAlertDanger('Erro ao atualizar fornecedor');
  }

  handleSuccess() {
    this.alertService.showAlertSuccess('Sucesso ao atualizar fornecedor');
  }
}
