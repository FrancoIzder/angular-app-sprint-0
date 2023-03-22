import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserServices } from 'src/services/users.service';

export interface UserData {
  correo: string;
  estatus: boolean;
  fecha_activacion: string;
  fecha_registro: string;
  idUsuario: number;
  id_origen: number;
  nombre: string;
  origen: number;
  actions: Element;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements AfterViewInit {
  columns = [
    {
      columnDef: 'idUsuario',
      header: 'ID',
      cell: (element: UserData) => `${element.idUsuario}`,
    },
    {
      columnDef: 'nombre',
      header: 'Nombre',
      cell: (element: UserData) => `${element.nombre}`,
    },
    {
      columnDef: 'correo',
      header: 'Correo',
      cell: (element: UserData) => `${element.correo}`,
    },
    {
      columnDef: 'actions',
      header: 'Acciones',
      cell: (element: UserData) => `${element.actions}`,
    },
  ];

  displayedColumns = this.columns.map((c) => c.columnDef);
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userServices: UserServices, private router: Router) {
    this.dataSource = new MatTableDataSource();
  }

  getTableData = async () => {
    const list = await this.userServices.getList();
    const decryptedData: any = await this.userServices.decryptData(list);
    this.dataSource.data = decryptedData.body.data.items[0].usuariosLista;
  };

  ngOnInit() {
    this.getTableData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editUser = (id: number) => {
    console.log(id);
  };

  deleteUser = (id: number) => {
    console.log(id);
  };

  addUserButton = () => {
    this.router.navigate(['/form']);
  };
}
