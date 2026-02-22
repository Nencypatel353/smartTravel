import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Trip {

    private baseUrl = 'http://localhost:8080/api/travels';

  constructor(private http: HttpClient) {}

  createTrip(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }
  
}
