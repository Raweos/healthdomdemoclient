import {Component, Input, OnInit} from '@angular/core';
import {EmployeeService} from '../employee.service';
import {EmployeeListComponent} from '../employee-list/employee-list.component';
import {Employee} from '../model/employee';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  @Input() employee: Employee;

  constructor(private employeeService: EmployeeService, private listComponent: EmployeeListComponent) { }

  ngOnInit() {
  }
}