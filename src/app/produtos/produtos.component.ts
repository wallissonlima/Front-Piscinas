import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalService } from '../share/alert-modal.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Produto } from './produtos.model';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;
  produtoSelecionado: Produto;  

  private URL_API = 'http://localhost:8000/api/produtos/';

  colunasDaTabela: string[] = [
    'id', 
    'nome', 
    'marca',
    'categoria',
    'descricao',
    'valorCompra',
    'valorVenda',
    'edit',
    'delet',
  ]; 

    // COLOCAR ALGO COMO PARÂMETRO PRA FILTER FUNCIONAR
    produtosDaAPI: any = new MatTableDataSource();

    // PAGINATOR
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    // SORT
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    // FILTRO
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.produtosDaAPI.filter = filterValue.trim().toLowerCase();
      // console.log('oi');
  
    }

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertModalService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.listProdutos();

    this.produtosDaAPI.paginator = this.paginator;
    this.produtosDaAPI.sort = this.sort;
  }

  private listProdutos() {
    this.http.get(this.URL_API).subscribe(
      success => { this.produtosDaAPI = success },
      error => { console.log('Erro ao carregar produtos')},
    )
  }

  public removeProdutos(produto) {
    this.http.delete(this.URL_API + produto.id).subscribe(
      success => { 
        this.produtosDaAPI = this.produtosDaAPI.filter( 
          value => { return value.id != produto.id; }
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

  public onDelet(produto) {
    this.produtoSelecionado = produto;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
  }

  onConfirmDelete() {
    console.log(this.produtoSelecionado.id)
    this.removeProdutos(this.produtoSelecionado)
    this.onDeclineDelete()
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar produtos');
  }

  handleSuccess() {
    this.alertService.showAlertSuccess('Sucesso ao excluir produtos');
  }

}
