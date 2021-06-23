import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertModalService } from '../share/alert-modal.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Categoria } from './categoria.model';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;
  categoriaSelecionado: Categoria;  

  private URL_API = 'http://localhost:8000/api/categorias/';



  colunasDaTabela: string[] = [
    'id', 
    'categoria',
    'edit',
    'delet',
  ]; 

    // COLOCAR ALGO COMO PARÂMETRO PRA FILTER FUNCIONAR
    categoriasDaAPI: any = new MatTableDataSource();

    // PAGINATOR
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    // SORT
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    // FILTRO
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.categoriasDaAPI.filter = filterValue.trim().toLowerCase();
      console.log('oi');
    }

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertModalService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.listCategorias();

    this.categoriasDaAPI.paginator = this.paginator;
    this.categoriasDaAPI.sort = this.sort;

  }
  private listCategorias() {
    this.http.get(this.URL_API).subscribe(
      success => { this.categoriasDaAPI = success; },
      error => { console.log('Erro ao carregar categorias'); },
    )
  }

  public removeCategorias(categoria) {
    this.http.delete(this.URL_API + categoria.id).subscribe(
      success => { 
        this.categoriasDaAPI = this.categoriasDaAPI.filter( 
          value => { return value.id != categoria.id; }
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
    this.categoriaSelecionado = cliente;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
  }

  onConfirmDelete() {
    console.log(this.categoriaSelecionado.id)
    this.removeCategorias(this.categoriaSelecionado)
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
