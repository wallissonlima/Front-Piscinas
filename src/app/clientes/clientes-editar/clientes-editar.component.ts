import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cliente } from '../clientes.model';
import { map, switchMap, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AlertModalService } from 'src/app/share/alert-modal.service';

@Component({
  selector: 'app-clientes-editar',
  templateUrl: './clientes-editar.component.html',
  styleUrls: ['./clientes-editar.component.css']
})
export class ClientesEditarComponent implements OnInit {

  private URL_API = 'http://localhost:8000/api/clientes/';

  // celularMask= ['(', /[0-9]/, /\d/,')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  // cpfMask= [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
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
    this.createFormulario(new Cliente());
    this.popularDadosForm();
  }

  // ------------ATUALIZAR CLIENTE-----------
  public popularDadosForm(){
    this.route.params.pipe(
      map((params: any) => params.id),
      switchMap(id => this.loadById(id))
    )
    .subscribe(cliente => this.editFormulario(cliente));
  }

  private loadById(id) {
    return this.http.get(this.URL_API + id).pipe(take(1));
  }
  
  private editFormulario(cliente) {
    this.formulario.patchValue({
      id: cliente.id,
      nome: cliente.nome,
      email: cliente.email,
      cpf: cliente.cpf,
      celular: cliente.celular,
      cep: cliente.cep,
      logradouro: cliente.logradouro,
      bairro: cliente.bairro,
      cidade: cliente.cidade,
      uf: cliente.uf,
    });
  }
  // ----------------------------------------

  // ----------CRIAR NOVO CLIENTE------------
  private createFormulario(cliente: Cliente) {
    this.formulario = this.formularioGroup.group({
      id: cliente.id,
      nome: [cliente.nome, Validators.required],
      email: [cliente.email, [Validators.required, Validators.email]],
      cpf: [cliente.cpf, [Validators.minLength(11), Validators.maxLength(11)]],
      celular: [cliente.celular, [Validators.minLength(11), Validators.maxLength(11)]],
      cep: [cliente.cep, [Validators.minLength(9), Validators.maxLength(9)]],
      logradouro: [cliente.logradouro, Validators.required],
      bairro: [cliente.bairro, Validators.required],
      cidade: [cliente.cidade, Validators.required],
      uf: [cliente.uf, Validators.required],
    })
  }
  // ----------------------------------------
  
  // ------------SALVAR GET E PUT------------
  public salvarCliente() {
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
    this.alertService.showAlertDanger('Erro ao atualizar cliente');
  }

  handleSuccess() {
    this.alertService.showAlertSuccess('Sucesso ao atualizar cliente');
  }
}
