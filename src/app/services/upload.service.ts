import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient) { }

  //como guardo la url de los archivos en un modelo de Inbody
  public uploadFile(file: File): Promise<any> {
    let formParams = new FormData();
    formParams.append('file', file)
    //this url must change i think
    return this.httpClient.post('http://localhost:4000/uploadFile', formParams).toPromise();
  }

}
