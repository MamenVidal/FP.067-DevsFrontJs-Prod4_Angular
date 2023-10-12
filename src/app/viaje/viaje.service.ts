import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ViajeData } from './viaje-data';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {
  private dbJsonUrl = 'assets/database/db.json';

  constructor(private http: HttpClient) {}

  getViaje(): Observable<ViajeData> {
    return this.http.get<ViajeData>(this.dbJsonUrl);
  }
}
