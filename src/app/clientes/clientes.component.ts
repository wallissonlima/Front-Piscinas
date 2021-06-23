import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertModalService } from '../share/alert-modal.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Cliente } from './clientes.model';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;
  clienteSelecionado: Cliente;  

  private URL_API = 'http://localhost:8000/api/clientes/';

  colunasDaTabela: string[] = [
    'id', 
    'nome', 
    'email', 
    'cpf', 
    'celular', 
    'cep', 
    'logradouro',
    'bairro',
    'cidade',
    'uf',
    'edit',
    'delet',
  ]; 

   // COLOCAR ALGO COMO PARÂMETRO PRA FILTER FUNCIONAR
   clientesDaAPI: any = new MatTableDataSource();

   // PAGINATOR
   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
   // SORT
   @ViewChild(MatSort, {static: true}) sort: MatSort;
 
   // FILTRO
   applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.clientesDaAPI.filter = filterValue.trim().toLowerCase();
    //  console.log('oi');
   }

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertModalService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.listClientes();

    this.clientesDaAPI.paginator = this.paginator;
    this.clientesDaAPI.sort = this.sort;
  }

  private listClientes() {
    this.http.get(this.URL_API).subscribe(
      success => { this.clientesDaAPI = success; },
      error => { this.handleError() },
    )
  }



  public removeClientes(cliente) {
    this.http.delete(this.URL_API + cliente.id).subscribe(
      success => { 
        this.clientesDaAPI = this.clientesDaAPI.filter( 
          value => { return value.id != cliente.id; }
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

  public onDelet(cliente) {
    this.clienteSelecionado = cliente;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
  }

  onConfirmDelete() {
    console.log(this.clienteSelecionado.id)
    this.removeClientes(this.clienteSelecionado)
    this.onDeclineDelete()
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar clientes');
  }

  handleSuccess() {
    this.alertService.showAlertSuccess('Sucesso ao excluir cliente');
  }

}
