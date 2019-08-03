import {EmployeeDto} from '../dto/employee-dto';

export class Employee {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  active: boolean;

  constructor(id: string, firstName: string, lastName: string, phoneNumber: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
  }

  static blankEmployee(): Employee {
    return new Employee('', '', '', '');
  }

  static fromDto(employeeDto: EmployeeDto): Employee {
    return new Employee(employeeDto.id, employeeDto.employeeDetailsDto.firstName,
      employeeDto.employeeDetailsDto.lastName, employeeDto.employeeDetailsDto.phoneNumber);
  }

  public toDto(): EmployeeDto {
    return {
      id: this.id,
      employeeDetailsDto: {
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber
      }
    } as EmployeeDto;
  }
}
