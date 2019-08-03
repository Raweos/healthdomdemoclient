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
  submitted = false;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {
  }

  save() {
    this.employeeService.createEmployee(this.employee.toDto())
      .subscribe(data => console.log(data), error => console.log(error));
    this.employee = Employee.blankEmployee();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
