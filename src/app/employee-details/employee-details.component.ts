import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../employee.service';
import {Employee} from '../model/employee';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  employee: Employee;
  updated = false;
  error = false;

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.employeeService.getEmployee(id)
      .subscribe(
        response => this.employee = Employee.fromDto(response.body)
      );
  }

  onSubmit() {
    this.employeeService.updateEmployee(this.employee.id, this.employee.toDto().employeeDetailsDto)
      .subscribe(data => {
        if (data.status === 200) {
          this.updated = true;
          this.error = false;
        }
      }, error => this.error = true);
  }
}
