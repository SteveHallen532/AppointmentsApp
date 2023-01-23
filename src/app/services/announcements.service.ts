import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Announcement } from '../models/Announcement';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService {

  constructor(private http: HttpClient) {}

  getAnnouncements(organizacion_id):Observable<Announcement[]>{
    return this.http.get<Announcement[]>(`${environment.apiUrl}/announcement/list/`+organizacion_id)
  }

  getAnnouncement(id:string):Observable<Announcement>{
    return this.http.get<Announcement>(`${environment.apiUrl}/announcement/`+id)
  }

  newAnnouncement(announcement:Announcement):Observable<any>{
    return this.http.post(`${environment.apiUrl}/announcement/`, announcement)
  }

  updateAnnouncement(id:string, announcement:Announcement):Observable<any>{
    return this.http.put(`${environment.apiUrl}/announcement/`+id, announcement)
  }

  deleteAnnouncement(id:string):Observable<any>{
    return this.http.delete(`${environment.apiUrl}/announcement/`+id)
  }

}
