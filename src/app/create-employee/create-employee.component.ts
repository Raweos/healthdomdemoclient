import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../employee.service';
import {Employee} from '../model/employee';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee: Employee = Employee.blankEmployee();
  created = false;
  error = false;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {
  }

  save() {
    this.employeeService.createEmployee(this.employee.toDto())
      .subscribe(data => {
        if (data.status === 201) {
          this.created = true;
          this.error = false;
          this.employee = Employee.blankEmployee();
        }
      }, error => {
        this.error = true;
      });
  }

  onSubmit() {
    this.save();
  }
}
