import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Accounts } from '../models/accounts';
import { from } from "linq-to-typescript";
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
        this.lista = from(data as Accounts[]).take(1000).toArray();
        //console.log(this.lista);
        this.cargado = true;
      })
      .catch((err: HttpErrorResponse) => {
        // simple logging, but you can do a lot more, see below
        console.error('An error occurred:', err.error);
      });
  }
  obtenerCuentasFiltradas(acc: string, acct: string, des: string, dep: string) {
    this.cargado = false;
    this.http.get(this.myAppUrl + this.myApiUrl).toPromise()
      .then(data => {
        this.lista = from(data as Accounts[])
          .where(t => t.account?.trim() == acc.trim() || acc.trim() == "")
          .where(t => t.acctType?.trim() == acct.trim() || acct.trim() == "")
          .where(t => t.deparment?.trim() == dep.trim() || dep.trim() == "")
          .where(t => t.description?.trim() == des.trim() || des.trim() == "")
          .take(1000).toArray();
        //console.log(this.lista);
        this.cargado = true;
      })
      .catch((err: HttpErrorResponse) => {
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
