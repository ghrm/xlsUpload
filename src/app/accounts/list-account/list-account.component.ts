import { Component, Input, OnInit } from '@angular/core';
import { Accounts } from 'src/app/models/accounts';
import { AccountsService } from 'src/app/services/accounts.service';
@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.css']
})
export class ListAccountComponent implements OnInit {
  @Input() listaAcc?: Accounts[];
  txtacc: string = "";
  txtacct: string = "";
  txtdesc: string = "";
  txtdep: string = "";
  constructor(public accountservice: AccountsService) { }

  ngOnInit(): void {
    this.accountservice.obtenerCuentas();
  }
  eliminar(id?: string) {
    if (confirm("Estas Seguro de Eliminar el Registro")) {
      this.accountservice.eliminar(id).subscribe(data => {
        console.log("cuenta borrada" + id);
        this.accountservice.obtenerCuentas();
      });
    }
  }
  editar(acc: Accounts) {
    this.accountservice.actualizar(acc);
  }
  filtro() { 
    this.accountservice.obtenerCuentasFiltradas(this.txtacc,this.txtacct,this.txtdesc,this.txtdep);
  }
}
