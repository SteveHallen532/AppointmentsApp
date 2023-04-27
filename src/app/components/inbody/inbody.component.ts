import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Inbody } from 'src/app/models/inbody';
import { InbodyService } from 'src/app/services/inbody.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-inbody',
  templateUrl: './inbody.component.html',
  styleUrls: ['./inbody.component.css']
})
export class InbodyComponent implements OnInit {

  id = '';
  file: File | undefined;
  isDragOver = false;
  //inbodyList:Inbody[];
  inbodyList:Inbody[] = [
    {
      _id:'12',
      id_hc:'string',
      url:'string',
      name:'Un archivo pdf',
      fecha:'10/08'
    },
    {
      _id:'12',
      id_hc:'string',
      url:'string',
      name:'Otro archivo pdf',
      fecha:'12/10'
    },
    {
      _id:'12',
      id_hc:'string',
      url:'string',
      name:'Otro archivo...',
      fecha:'12/12'
    }
  ]

  constructor(private fileUploadService: UploadService, private activatedRoute:ActivatedRoute, private inbody_service:InbodyService) {}

  ngOnInit(): void { 
    this.id = this.activatedRoute.params['id'];
    //getInbodis();
  }

  @ViewChild('fileUpload') fileInput: File;

  getInbodis() {
    this.inbody_service.getInbodyList(this.id).subscribe(
      result => {
        this.inbodyList = result;
      }
    )
   }

  onFileDropped(file: File) {
    this.file = file;
  }

  onFileSelected(file:File) {
    this.file = file
  }

  uploadFile() {
    console.log(this.file)
    if (!this.file) {
      return;
    }

    // this.fileUploadService.uploadFile(this.file).then(() => {
    //   // Handle successful upload
    //   console.log('File uploaded successfully');
    //   this.file = undefined;
    // }).catch((error) => {
    //   // Handle upload error
    //   console.error(error);
    //   this.file = undefined;
    // });
  }

}
