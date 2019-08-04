import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateEmployeeComponent} from './create-employee.component';
import {EmployeeService} from '../employee.service';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {of, throwError} from 'rxjs';

describe('CreateEmployeeComponent', () => {
  let component: CreateEmployeeComponent;
  let fixture: ComponentFixture<CreateEmployeeComponent>;
  let employeeServiceMock: any;
  const responseCreated = of(new HttpResponse({
    body: null,
    headers: null,
    status: 201
  }));

  const responseError = throwError(new HttpErrorResponse({
    error: 'Error occurred',
    headers: null,
    status: 504
  }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEmployeeComponent],
      imports: [FormsModule, HttpClientModule],
      providers: [
        {provide: EmployeeService, useValue: jasmine.createSpyObj('EmployeeService', ['createEmployee'])}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEmployeeComponent);
    component = fixture.componentInstance;
    employeeServiceMock = TestBed.get(EmployeeService);
    fixture.detectChanges();
  });

  it('Form should be empty after component load', (call) => {
    fixture.whenStable().then(
      () => {
        expect(getNativeElement('#firstName').value).toBe('');
        expect(getNativeElement('#lastName').value).toBe('');
        expect(getNativeElement('#phoneNumber').value).toBe('');
      }
    );
    call();
  });

  it('Should show success message when employee created', () => {
    employeeServiceMock.createEmployee.and.returnValue(responseCreated);
    fixture.whenStable().then(
      () => {
        getNativeElement('#firstName').value = 'Marek';
        getNativeElement('#lastName').value = 'Kasztan';
        getNativeElement('#phoneNumber').value = '(521)-222-3121';
        getNativeElement('#submit_create_employee').click();
        fixture.detectChanges();
        expect(getNativeElement('#employee-created-message-box').hasAttribute('hidden')).toBe(false);
      }
    );
    expect(component).toBeTruthy();
  });

  it('Should show error message when backed respond with error', () => {
    employeeServiceMock.createEmployee.and.returnValue(responseError);
    fixture.whenStable().then(
      () => {
        getNativeElement('#firstName').value = 'Marek';
        getNativeElement('#lastName').value = 'Kasztan';
        getNativeElement('#phoneNumber').value = '(521)-222-3121';
        getNativeElement('#submit_create_employee').click();
        fixture.detectChanges();
        expect(getNativeElement('#employee-created-message-box').hasAttribute('hidden')).toBe(true);
        expect(getNativeElement('#employee-created-message-box-error').hasAttribute('hidden')).toBe(false);
      }
    );
    expect(component).toBeTruthy();
  });

  function getNativeElement(selector: string) {
    return fixture.debugElement.query(By.css(selector)).nativeElement;
  }
});

