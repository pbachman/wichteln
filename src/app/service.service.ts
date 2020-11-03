import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private apiUrl = `${environment.BASE_URI}api`;
  constructor(private http: HttpClient) { }

  draw(email: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/account`, { email });
  }
}
