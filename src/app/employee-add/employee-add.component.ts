import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../shared/employee';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit {


  employee: Employee = new Employee();
  empForm!: FormGroup;

  constructor(private employeeService: EmployeeService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.employeeForm();
  }

  employeeForm() {
    this.empForm = this.fb.group(
      {
        empId: [''],
        firstName: [''],
        lastName: [''],
        email: [''],
        password: [''],
        confirmPassword: [''],
        dob: [''],
        gender: ['']
      }
    );
  }

  onSave() {

    if (this.empForm.valid) {

      this.employee = this.empForm.value;

      let emp: Employee = new Employee();

      // emp.firstName = this.empForm.value['firstName'];
      // emp.lastName = this.empForm.value['lastName'];
      // emp.dob = this.empForm.value['dob'];
      // emp

      if (this.empForm.value['password'] === this.empForm.value['confirmPassword']) {


        //call service for update
        this.employeeService.insertEmployee(this.employee).subscribe(
          (result) => {
            console.log(result);

            this.router.navigateByUrl('/employees');
            this.toastr.success('Record has been inserted');
          });
      } else {
        this.toastr.warning('Password not matching');
      }
    }



  }


}
