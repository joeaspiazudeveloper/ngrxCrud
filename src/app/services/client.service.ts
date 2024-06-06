import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../Store/Model/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  baseUrl = 'https://clientapijoudev.azurewebsites.net/Client';
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Client[]>(this.baseUrl);
  }

  getById(id:number) {
    return this.http.get<Client>(this.baseUrl + '/' + id);
  }

  update(data: Client) {
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
    return this.http.put<Client>(this.baseUrl + '/' + data.id, data, {headers})
  }

  delete(id:number) {
    return this.http.delete<Client>(this.baseUrl + '/' + id)
  }

  create(data: Client) {
    return this.http.post<Client>(this.baseUrl, data)
  }
}
