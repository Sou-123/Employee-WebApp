import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../shared/employee';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employees!: Employee[];
  employee: Employee = new Employee;

  page: number = 1;
  deleteForm!: FormGroup;



  constructor(private employeeService: EmployeeService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllEmployees();
    this.deleteForm = this.fb.group({
      id: ['']
    })
  }




  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe(
      (response) => {
        this.employees = response;
      }
    );
  }


  openDelete(targetModal: any, empId: number) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'sm'
    });

    this.deleteForm.patchValue({
      id: empId
    })
  }

  onDelete() {

    this.employeeService.deleteEmployee(this.deleteForm.value['id']).subscribe(
      (result) => {
        console.log(result);
        this.ngOnInit();
        //reload
      });
    this.modalService.dismissAll();

  }
}
