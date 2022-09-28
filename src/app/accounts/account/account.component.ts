import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Accounts } from 'src/app/models/accounts';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {
  form1: FormGroup;
  suscription?: Subscription;
  acc?: Accounts;
  account?= "";
  constructor(private formbuilder: FormBuilder,
    private accs: AccountsService) {
    this.form1 = this.formbuilder.group({
      account: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      accttype: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      deparment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      typicalBal: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      creditOffset: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      debitOffset: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      sts: [false],
    });
  }
  ngOnDestroy(): void {
    this.suscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.suscription = this.accs.obtenerCuenta().subscribe(data => {
      this.acc = data;
      this.form1?.patchValue({
        account: this.acc?.account,
        accttype: this.acc?.acctType,
        creditOffset: this.acc?.creditOffset,
        debitOffset: this.acc?.debitOffset,
        deparment: this.acc?.deparment,
        description: this.acc?.description,
        sts: this.acc?.sts,
        typicalBal: this.acc?.typicalBal
      });
      this.account = this.acc?.account;
    });
  }
  guardar() { 
    if (confirm("Estas Seguro de Guardar el Registro")) {
      const acc:Accounts={
        account: this.form1.get("account")?.value,
        acctType: this.form1.get("accttype")?.value,
        creditOffset: this.form1.get("creditOffset")?.value,
        debitOffset: this.form1.get("debitOffset")?.value,
        deparment: this.form1.get("deparment")?.value,
        description: this.form1.get("description")?.value,
        sts: this.form1.get("sts")?.value,
        typicalBal: this.form1.get("typicalBal")?.value
      }
      this.accs.actualizaCuenta(acc.account, acc).subscribe(data => {
        this.accs.obtenerCuentas();
        this.form1.reset();
      });
    }
  }
  limpiar() {
    this.form1.reset();
  }
}
