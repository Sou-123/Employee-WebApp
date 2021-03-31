import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  //get all list
  getAllEmployees(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + "/api/employees");

  }

  //Insert
  insertEmployee(emp: Employee): Observable<any> {
    return this.httpClient.post(environment.apiUrl + "/api/employees/add", emp);

  }

  //Update
  updateEmployee(emp: Employee): Observable<any> {
    return this.httpClient.put(environment.apiUrl + "/api/employees/update", emp);

  }

  //Delete
  deleteEmployee(id: number): Observable<any> {
    return this.httpClient.delete(environment.apiUrl + "/api/employees/delete/" + id);

  }
}
