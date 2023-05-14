import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inbody } from 'src/app/models/inbody';
import { InbodyService } from 'src/app/services/inbody.service';
import { UploadService } from 'src/app/services/upload.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { MedicalHistoryService } from 'src/app/services/medical-history.service';
import { HistoriaClinica } from 'src/app/models/HistoriaClinica';
import * as moment from 'moment';

@Component({
  selector: 'app-inbody',
  templateUrl: './inbody.component.html',
  styleUrls: ['./inbody.component.css']
})
export class InbodyComponent implements OnInit {

  downloadURL: string;
  progress : number;
  isUploading = false;
  id = '';
  hc:HistoriaClinica;
  file: File | undefined;
  isDragOver = false;
  inbody = new Inbody;
  inbodyList:Inbody[];
  date = '';
  date2 = '';

  constructor(private medicalHistoryService:MedicalHistoryService, private router:Router, private fileUploadService: UploadService, private activatedRoute:ActivatedRoute, private inbody_service:InbodyService, private location:Location) {}

  ngOnInit(): void { 
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getMedicalHistory();
    this.getInbodys();
  }

  @ViewChild('fileUpload') fileInput: File;

  getInbodys() {
    this.inbody_service.getInbodyList(this.id).subscribe(
      result => {
        this.inbodyList = result;
        console.log(this.inbodyList)
      }
    )
   }

   getMedicalHistory() {
    this.medicalHistoryService.getMedicalHistoryFromId(this.id).subscribe(
      result => {this.hc = result;}
    )
   }

   newInbody() {
    let today = moment().format('YYYY-MM-DD');
    this.inbody.fecha = today;
    this.inbody.historia_clinica = this.hc;
    this.inbody.url = this.downloadURL;
    this.inbody.name = this.file.name;
    console.log(this.inbody)
    this.file = undefined;
    console.log('File uploaded successfully');
    this.inbody_service.saveInbody(this.inbody).subscribe(
      () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Guardado',
          showConfirmButton: false,
          timer: 1500
        }).then(
          ()=> {
            console.log('Inbody saved')
            this.getInbodys();
          }
        )
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
    if (!this.file) {
      return;
    }

    this.isUploading = true;
    this.fileUploadService.uploadFile(this.file).then(() => {
      // Handle successful upload
      this.fileUploadService.percentage.subscribe(
        progress => {
          this.progress = progress;
        }
      )
      this.fileUploadService.downloadURL.subscribe(
        url => {
      this.downloadURL = url;
      this.isUploading = false;
      this.newInbody();
      });
    }).catch((error) => {
      // Handle upload error
      console.error(error);
      this.file = undefined;
    });
  }

  deleteInbody(event: Event, id:string, filePath:string) {
    event.preventDefault();
    Swal.fire({
      title: 'Estás seguro?',
      text: "Esta acción no se puede deshacer!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.inbody_service.deleteInbody(id).subscribe(
            () =>{
              this.fileUploadService.deletePdf(filePath).then(
                () => {
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Eliminado',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  setTimeout(() => window.location.reload(), 1000)
                }
              )  
            }
          );
        }
      }
    )
  }

  showList = false;
  show() {
    if(this.showList == false) {
      this.showList = true;
    } else {
      this.showList = false;
    }
  }

  showInpPdf = false;
  showInp() {
    if(this.showInpPdf == false) {
      this.showInpPdf = true;
    } else {
      this.showInpPdf = false;
    }
  }

  back() {
    this.location.back();
  }

  datePipe(fecha:string) {
    return moment(fecha, 'YYYY-MM-DD').format('DD/MM/YYYY')
  }

}
