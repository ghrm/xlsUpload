import { AngularFileUploaderComponent, AngularFileUploaderModule } from "angular-file-uploader";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountComponent } from './accounts/account/account.component';
import { ListAccountComponent } from './accounts/list-account/list-account.component';
import { RouterModule } from "@angular/router";
import { UploadfileComponent } from "./uploadfile/uploadfile.component";

@NgModule({
  declarations: [
    AppComponent,
    AccountsComponent,
    AccountComponent,
    ListAccountComponent,
    AccountComponent,
    AccountsComponent,
    ListAccountComponent,
    UploadfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFileUploaderModule,
    RouterModule.forRoot([
      {path:'',component:AppComponent},
      {path:'Uploadfile',component:UploadfileComponent},
      {path:'accounts',component:AccountsComponent}, 
      {path:'**',component:AppComponent},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
