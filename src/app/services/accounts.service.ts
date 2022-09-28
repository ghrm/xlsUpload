import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Accounts } from '../models/accounts';
@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  myAppUrl = 'http://localhost:32209';
  myApiUrl = '/api/Accounts/';
  lista?: Accounts[];
  cargado?: boolean;
  private actualizaFormulario = new BehaviorSubject<Accounts>({} as any);
  
  constructor(private http: HttpClient) { }

  obtenerCuentas() {
    this.cargado = false;
    this.http.get(this.myAppUrl + this.myApiUrl).toPromise()
      .then(data => {
        this.lista = data as Accounts[];
        //console.log(this.lista);
        this.cargado = true;
      })
      .catch((err: HttpErrorResponse) => {
        // simple logging, but you can do a lot more, see below
        console.error('An error occurred:', err.error);
      });
  }
  obtenerCuenta(): Observable<Accounts> {
    return this.actualizaFormulario.asObservable();
  }
  eliminar(id?: string): Observable<Accounts> {
    return this.http.delete<Accounts>(this.myAppUrl + this.myApiUrl + id);
  }
  actualizaCuenta(id?: string, acc?: Accounts): Observable<Accounts> {
    return this.http.put<Accounts>(this.myAppUrl + this.myApiUrl + id, acc);
  }
  actualizar(acc: Accounts) {
    this.actualizaFormulario.next(acc);
  }
}
