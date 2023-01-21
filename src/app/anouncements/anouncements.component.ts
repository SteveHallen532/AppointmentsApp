import { Component, OnInit } from '@angular/core';
import { Announcement } from '../models/Announcement';
import { AnnouncementsService } from '../services/announcements.service';

@Component({
  selector: 'app-anouncements',
  templateUrl: './anouncements.component.html',
  styleUrls: ['./anouncements.component.css']
})
export class AnouncementsComponent implements OnInit {

  loading = true;
  announcements:Announcement[] = [];
  announcement:Announcement = new Announcement;


  constructor(private announcement_service:AnnouncementsService) { }

  ngOnInit(): void {
    this.getAnnouncements();
  }

  getAnnouncements() {
    this.announcement_service.getAnnouncements()
      .subscribe(result=>{
        this.announcements = result;
        this.loading = false;
      }
    );
  }

  delete(id:string){
    this.announcement_service.deleteAnnouncement(id)
    .subscribe(() =>{
      window.location.reload();
      }
    );
  }

  newAnnouncement() {
    if(this.announcement.body != '' && this.announcement.title != '') {
      this.announcement.date = Date.now();
      this.announcement_service.newAnnouncement(this.announcement)
      .subscribe(() =>{
        window.location.reload();
        }
      );
    }
  }

  cancel(){
    this.announcement.title = '';
    this.announcement.body = '';
  }

}
