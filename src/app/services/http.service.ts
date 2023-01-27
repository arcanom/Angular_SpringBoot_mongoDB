import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RequestEmployee } from '../models/request-employee';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class HttpService {

  url: string = "http://localhost:8080/api/employee"

  constructor(private HttpClient: HttpClient) { }

  createEmployee(employee: RequestEmployee): Observable<any> {
    return this.HttpClient.post(this.url, employee)
  }

  getEmployees(): Observable<any> {
    return this.HttpClient.get(this.url);
  }

  getEmployeeById(id: string): Observable<any> {
    return this.HttpClient.get(this.url + "/" + id);
  }

  update(employee: Employee): Observable<any> {
    return this.HttpClient.put(this.url, employee)
  }

  deleteAll(): Observable<any> {
    return this.HttpClient.delete(this.url)
  }

  deleteEmployeeById(id: string): Observable<any> {
    return this.HttpClient.delete(this.url + "/" + id)
  }

}
