import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Announcement } from '../../models/Announcement';
import { AnnouncementsService } from '../../services/announcements.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-anouncements',
  templateUrl: './anouncements.component.html',
  styleUrls: ['./anouncements.component.css']
})
export class AnouncementsComponent implements OnInit {

  loading = true;
  announcements:Announcement[] = [];
  announcement:Announcement = new Announcement;

  currentUser: Usuario;

  constructor(private announcement_service:AnnouncementsService,
              private auth_service: AuthenticationService,
              private location:Location) { }

  ngOnInit(): void {
    this.auth_service.currentUser.subscribe(x => {this.currentUser = x});
    this.getAnnouncements(this.currentUser.organizacion._id);
  }

  getAnnouncements(organizacion_id) {
    this.announcement_service.getAnnouncements(organizacion_id)
      .subscribe(result=>{
        this.announcements = result;
        this.loading = false;
      }
    );
  }

  delete(id:string){
    Swal.fire({
      title: 'Seguro?',
      text: "Esta acción no se puede deshacer!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.announcement_service.deleteAnnouncement(id)
        .subscribe(() =>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Eliminado',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(() => window.location.reload(), 1000);
          }
        );
      }
    })
  }

  newAnnouncement() {
    if(this.announcement.body != '' && this.announcement.title != '') {
      this.announcement.date = Date.now();
      this.announcement.organizacion=this.currentUser.organizacion;
      this.announcement_service.newAnnouncement(this.announcement)
      .subscribe(() =>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Guardado',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => window.location.reload(), 1000);
        }
      );
    }
  }

  cancel(){
    this.announcement.title = '';
    this.announcement.body = '';
  }

  back() {
    this.location.back();
  }

}
