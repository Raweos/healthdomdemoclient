import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EmployeeListComponent} from './employee-list.component';
import {NgxMaskModule} from 'ngx-mask';
import {HttpClientModule, HttpResponse} from '@angular/common/http';
import {EmployeeService} from '../employee.service';
import {of} from 'rxjs';
import {Employee} from '../model/employee';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let employeeServiceMock: any;

  const employeeListResponse = of(new HttpResponse({
    body: [
      new Employee('1', 'Bogusław', 'Linda', '5004312431').toDto(),
      new Employee('2', 'Cezary', 'Pazura', '6004312432').toDto()
    ],
    headers: null,
    status: 200
  }));


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeListComponent],
      imports: [NgxMaskModule.forRoot(), HttpClientModule, RouterTestingModule],
      providers: [
        {provide: EmployeeService, useValue: jasmine.createSpyObj('EmployeeService', ['getEmployeesList'])}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    employeeServiceMock = TestBed.get(EmployeeService);
    employeeServiceMock.getEmployeesList.and.returnValue(employeeListResponse);
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should fill up table with objects from backend', () => {
    employeeServiceMock.getEmployeesList.and.returnValue(employeeListResponse);
    expect(getAllElements('tbody tr').length).toBe(2);
    expect(component).toBeTruthy();
  });

  function getAllElements(selector: string) {
    return fixture.debugElement.queryAll(By.css(selector));
  }

});
