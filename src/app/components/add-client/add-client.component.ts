import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addClient, loadClientbyId, updateClient } from 'src/app/Store/Client/client.action';
import { getClientById } from 'src/app/Store/Client/client.selector';
import { Client } from 'src/app/Store/Model/client.model';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
})
export class AddClientComponent implements OnInit {
  
  title="Create Client"
  isEdited = false;
  dialogData: any;

  clientForm = this.builder.group({
    id: this.builder.control(0),
    name: this.builder.control('', Validators.required),
    email: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    phone: this.builder.control('', Validators.required),
    address: this.builder.control('', Validators.required),
    status: this.builder.control(true),
  });


  constructor(private builder: FormBuilder, 
      private ref: MatDialogRef<AddClientComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, private store: Store) {}

  ngOnInit(): void {
    this.dialogData = this.data;
    this.title = this.dialogData.title;
    this.store.select(getClientById).subscribe(res => {
      this.clientForm.patchValue({
        id: res.id,
        name: res.name,
        email: res.email,
        phone: res.phone,
        address: res.address,
        status: res.status
      })
    })  
  }

  closePopup() {
    this.ref.close();
  }

  saveClient() {
    if (this.clientForm.valid) {
      const clientObj: Client = {
        id: this.clientForm.value.id as number,
        name: this.clientForm.value.name as string,
        email: this.clientForm.value.email as string,
        phone: this.clientForm.value.phone as string,
        address: this.clientForm.value.address as string,
        status: Boolean(this.clientForm.value.status)
      }
      if(clientObj.id === 0) {
        this.store.dispatch(addClient({inputData: clientObj}))
      } else {
        this.store.dispatch(updateClient({ inputData: clientObj }))
      }
      this.closePopup();
    }
  }
}
