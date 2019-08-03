import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EmployeeDto} from './dto/employee-dto';
import {EmployeeDetailsDto} from './dto/employee-details-dto';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = '/api/v1/employees';

  constructor(private http: HttpClient) {
  }

  getEmployee(id: number): Observable<HttpResponse<EmployeeDto>> {
    return this.http.get<EmployeeDto>(`${this.baseUrl}/${id}`, {observe: 'response'});
  }

  createEmployee(employee: EmployeeDto): Observable<HttpResponse<EmployeeDto>> {
    return this.http.post<EmployeeDto>(`${this.baseUrl}`, employee.employeeDetailsDto, {observe: 'response'});
  }

  updateEmployee(id: number, value: EmployeeDetailsDto): Observable<HttpResponse<EmployeeDto>> {
    return this.http.put<EmployeeDto>(`${this.baseUrl}/${id}`, value, {observe: 'response'});
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {responseType: 'text'});
  }

  getEmployeesList(): Observable<HttpResponse<EmployeeDto[]>> {
    return this.http.get<EmployeeDto[]>(`${this.baseUrl}`, {observe: 'response'});
  }
}
