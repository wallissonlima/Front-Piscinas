import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cliente } from '../clientes.model';
import { HttpClient } from '@angular/common/http';
import { AlertModalService } from 'src/app/share/alert-modal.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-clientes-novo',
  templateUrl: './clientes-novo.component.html',
  styleUrls: ['./clientes-novo.component.css']
})
export class ClientesNovoComponent implements OnInit {


  private URL_API = 'http://localhost:8000/api/clientes/';

  // celularMask= ['(', /[0-9]/, /\d/,')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  // cpfMask= [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  // cepMask= [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  formulario: FormGroup;

  constructor(
    private http: HttpClient,
    private formularioGroup: FormBuilder,
    private alertService: AlertModalService,
    private location: Location,
    ) { }

  ngOnInit(): void {
    this.createFormulario(new Cliente());
  }


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
    if(this.formulario.valid){
      // console.log(this.formulario.value);
      this.http.post(this.URL_API, this.formulario.value).subscribe(
        success => { this.handleSuccess() ;
          this.location.back();
        }, error => { this.handleError() },
      )
    } else {
      this.handleError()
    }
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
    this.alertService.showAlertDanger('Erro ao cadastrar cliente');
  }

  handleSuccess() {
    this.alertService.showAlertSuccess('Sucesso ao cadastrar cliente');
  }
}
