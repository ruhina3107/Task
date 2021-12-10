import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  url = "http://localhost:4000/api"
  constructor(private http: HttpClient) { }
  createAd(data:any)
  {
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
      });
     return  this.http.post(`${this.url}/login`,data,{
      headers: httpheaders,
      observe: 'response'
     
    });

  }
  country()
  {
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
      });
     return  this.http.get(`https://countriesnow.space/api/v0.1/countries`,{
      headers: httpheaders,
      observe: 'response'
     
    });

  }
}
