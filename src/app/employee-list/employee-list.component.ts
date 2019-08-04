import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {EmployeeService} from '../employee.service';
import {map} from 'rxjs/operators';
import {Employee} from '../model/employee';
import {Router} from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Observable<Employee[]>;

  constructor(private employeeService: EmployeeService, private router: Router) {
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    console.log(this.employeeService.getEmployeesList());
    this.employees = this.employeeService.getEmployeesList().pipe(
      map(response => {
        return response.body.map(
          employeeDto => Employee.fromDto(employeeDto)
        );
      })
    );
  }

  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id)
      .subscribe(
        data => {
          this.reloadData();
        },
        error => console.log(error));
  }


  details(id: string) {
    this.router.navigate(['/details/' + id]);
  }
}
