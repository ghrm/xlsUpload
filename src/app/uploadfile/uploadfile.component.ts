import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent implements OnInit {
  progress: number=0;
  message: string="";
  title = 'xlsUpload';
  @Output() public onUploadFinished = new EventEmitter();
  afuConfig = {
    uploadAPI: {
      url:"http://localhost:32209/api/FileUpload"
     }
  }
  constructor() { }

  ngOnInit(): void {
  }

}
