import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseDataService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  private constructUrl(path: string) {
    return this.baseUrl + path;
  }

  makeGetCall(path: string): Observable<any> {
    return this.http.get(this.constructUrl(path));
  }

  makePostCall(path: string, body?: any): Observable<any> {
    let bodyJson = JSON.stringify(body);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    });
    return this.http.post(this.constructUrl(path), bodyJson, {
      headers: headers,
    });
  }

  makePutCall(path: string, body: any): Observable<any> {
    let bodyJson = JSON.stringify(body);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    });
    return this.http.put(this.constructUrl(path), bodyJson, {
      headers: headers,
    });
  }

  makeDeleteCall(path: string): Observable<any> {
    return this.http.delete(this.constructUrl(path));
  }


  makeImageUploadCall(path: string, body?: any): Observable<any> {
    return this.http.post(this.constructUrl(path), body, {
    });
  }

}
