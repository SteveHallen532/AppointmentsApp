import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, Subject } from 'rxjs';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  private downloadURLSubject = new Subject<string>();
  downloadURL: Observable<string> = this.downloadURLSubject.asObservable();
  isUploading = false;


  constructor(private httpClient: HttpClient, private storage: AngularFireStorage) { }

  //como guardo la url de los archivos en un modelo de Inbody
  // public uploadFile(file: File, id:string): Promise<any> {
  //   let formParams = new FormData();
  //   formParams.append('file', file)
  //   //change url
  //   return this.httpClient.post('http://localhost:4000/uploadFile' + id, formParams).toPromise();
  // }

  async uploadFile(file: File): Promise<any> {
    if (file.type !== 'application/pdf') {
      console.error('Only PDF files are allowed');
      return;
    }

    const filePath = `pdfs/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    this.task = this.storage.upload(filePath, file);
    this.percentage = this.task.percentageChanges();

    this.task.snapshotChanges().pipe(
      finalize(() => {
        from(fileRef.getDownloadURL()).subscribe(url => {
          this.downloadURLSubject.next(url);
        });
      })
    ).subscribe();
  }

  deletePdf(filePath:string):Promise<any>{
    return this.storage.storage.refFromURL(filePath).delete();
  }


}
