import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  progress: number=0;
  message: string="";
  title = 'xlsUpload';
  @Output() public onUploadFinished = new EventEmitter();
  afuConfig = {
    uploadAPI: {
      url:"http://localhost:32209/api/FileUpload"
      //"https://example-file-upload-api"
    }
  }
  constructor(private http: HttpClient) { }
  ngOnInit(): void {  }

  uploadFile = (files:any) => {
    console.log(files);
    if (files.length === 0) {
      return; 
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    
    this.http.post('https://localhost:34858/api/FileUpload', formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event:any) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }
}
