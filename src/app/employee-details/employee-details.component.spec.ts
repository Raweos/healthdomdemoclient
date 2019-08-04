import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EmployeeDetailsComponent} from './employee-details.component';
import {EmployeeService} from '../employee.service';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {of} from 'rxjs';
import {Employee} from '../model/employee';
import {By} from '@angular/platform-browser';
import {NgxMaskModule} from 'ngx-mask';

describe('EmployeeDetailsComponent', () => {
  let component: EmployeeDetailsComponent;
  let fixture: ComponentFixture<EmployeeDetailsComponent>;
  let employeeServiceMock: any;
  const employeeResponse = of(new HttpResponse({
    body: new Employee('efx-ddc-12c-ddd', 'Stefan', 'Nowak', '5004312431').toDto(),
    headers: null,
    status: 200
  }));


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeDetailsComponent],
      imports: [FormsModule, HttpClientModule, NgxMaskModule.forRoot()],
      providers: [
        {provide: EmployeeService, useValue: jasmine.createSpyObj('EmployeeService', ['getEmployee', 'updateEmployee'])},
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: 'efx-ddc-12c-ddd'
              })
            }
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    employeeServiceMock = TestBed.get(EmployeeService);
    employeeServiceMock.getEmployee.and.returnValue(employeeResponse);
    employeeServiceMock.updateEmployee.and.returnValue(employeeResponse);
    fixture = TestBed.createComponent(EmployeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should load employee', () => {
    fixture.whenStable().then(
      () => {
        expect(getNativeElement('#firstName').value).toBe('Stefan');
        expect(getNativeElement('#lastName').value).toBe('Nowak');
        expect(getNativeElement('#phoneNumber').value).toBe('(500) 431-2431');
      }
    );
    expect(component).toBeTruthy();
  });

  it('Show hide form and show update message when employee updated', () => {
    fixture.whenStable().then(
      () => {
        getNativeElement('#submit_update_employee').click();
        fixture.detectChanges();
        expect(getNativeElement('#employee-updated-message-box').hasAttribute('hidden')).toBe(false);
        expect(getNativeElement('#update-employee-container').hasAttribute('hidden')).toBe(true);
      }
    );
    expect(component).toBeTruthy();
  });

  function getNativeElement(selector: string) {
    return fixture.debugElement.query(By.css(selector)).nativeElement;
  }


});
