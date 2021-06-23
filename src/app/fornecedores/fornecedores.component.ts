import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Fornecedor } from './fornecedores.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalService } from '../share/alert-modal.service';


@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css']
})
export class FornecedoresComponent implements OnInit {

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;
  fornecedorSelecionado: Fornecedor;  

  private URL_API = 'http://localhost:8000/api/fornecedores/';

  colunasDaTabela: string[] = [
    'id', 
    'nomeEmpresa', 
    'email', 
    'cnpj', 
    'telefone', 
    'cep', 
    'logradouro',
    'bairro',
    'cidade',
    'uf',
    'edit',
    'delet',
  ]; 

  // COLOCAR ALGO COMO PARÂMETRO PRA FILTER FUNCIONAR
  fornecedoresDaAPI: any = new MatTableDataSource();

  // PAGINATOR
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // SORT
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  // FILTRO
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.fornecedoresDaAPI.filter = filterValue.trim().toLowerCase();
    // console.log('oi');
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private alertService: AlertModalService,
  ) { }

  ngOnInit(): void {
    this.listFornecedores();

    this.fornecedoresDaAPI.paginator = this.paginator;
    this.fornecedoresDaAPI.sort = this.sort;
  }

  private listFornecedores() {
    this.http.get(this.URL_API).subscribe(
      success => { this.fornecedoresDaAPI = success },
      error => { console.log('Erro ao carregar fornecedores') },
    )
  }

  public removeFornecedores(fornecedor) {
    this.http.delete(this.URL_API + fornecedor.id).subscribe(
      success => { 
        this.fornecedoresDaAPI = this.fornecedoresDaAPI.filter( 
          value => { return value.id != fornecedor.id; }
        );
      },
      error => { 
        this.handleError()
        this.onDeclineDelete()
      },
    )
  }


  public onEdit(id) {
    this.router.navigate(['editar', id], { relativeTo: this.route});
    // console.log('enviando id: ', id)
  }

  public onDelet(fornecedor) {
    this.fornecedorSelecionado = fornecedor;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
  }

  onConfirmDelete() {
    console.log(this.fornecedorSelecionado.id)
    this.removeFornecedores(this.fornecedorSelecionado)
    this.onDeclineDelete()
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar fornecedores');
  }

  handleSuccess() {
    this.alertService.showAlertSuccess('Sucesso ao excluir fornecedores');
  }

}
