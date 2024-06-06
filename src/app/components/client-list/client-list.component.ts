import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddClientComponent } from '../add-client/add-client.component';
import { Store } from '@ngrx/store';
import { Client } from 'src/app/Store/Model/client.model';
import { getClientList } from 'src/app/Store/Client/client.selector';
import { deleteClient, loadClient, loadClientbyId, openPopup } from 'src/app/Store/Client/client.action';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent implements OnInit {
  clientList!: Client[];
  dataSource: any;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  
  displayedColumns: string[] = ["id", "name", "email", "phone", "address", "status", "action"]

  constructor(private dialog: MatDialog, private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadClient());
    this.store.select(getClientList).subscribe((data) => {
      this.clientList = data;
      this.dataSource = new MatTableDataSource<Client>(this.clientList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  addClient() {
    this.openPopUp(0, 'Create Client');
  }

  openPopUp(code: number, title: string) {
    this.store.dispatch(openPopup());
    this.dialog.open(AddClientComponent, {
      width: '50%',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '1000ms',
      data: {
        code: code,
        title: title,
      },
    });
  }

  editClient(id: number) {
    this.openPopUp(id, 'Edit Client');
    this.store.dispatch(loadClientbyId({id: id}))
  }

  removeClient(id: number) {
    if(confirm('Do you want to remove the client with id:' + id)) {
      this.store.dispatch(deleteClient({id: id}))
    }
  }
}
