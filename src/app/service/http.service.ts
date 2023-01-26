import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EmployeDTO } from '../models/employe-dto';
import { Employe } from '../models/employe';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url : string = "http://localhost:8080/"

  constructor(private HttpClient : HttpClient ) { }

  getEmployes():Observable<any>{
    return this.HttpClient.get(this.url + "api/employee");
  }

  getEmployeById(id:string):Observable<any>{
    return this.HttpClient.get(this.url + "api/employee/" + id);
  }

  createEmploye(employe:EmployeDTO):Observable<any>{

    return this.HttpClient.post(this.url+"api/employee",employe)
  }

  deleteEmployeAll():Observable<any>{
    return this.HttpClient.delete(this.url+"api/employee")
  }

  deleteEmployebyId(id: string):Observable<any>{
    return this.HttpClient.delete(this.url+"api/employee/"+id)
  }

  update(employe:Employe):Observable<any>{
    console.log(employe)
    return this.HttpClient.put(this.url+"api/employee",employe)
  }

}
