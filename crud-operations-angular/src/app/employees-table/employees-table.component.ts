import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmployeeDetailsService } from '../shared/employee-details.service';
import { Employee } from '../shared/employee.model';

declare var M:any;

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss'],
  providers: [EmployeeDetailsService]
})
export class EmployeesTableComponent implements OnInit {

  constructor(private employeeService:EmployeeDetailsService ) { }

  ngOnInit() {
    this.resetForm();
    this.refreshEmployeeList();
  }
  
  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.employeeService.selectedEmployee = {
        _id: "",
        name: "",
        position: "",
        contactno: null
      }
    }
  }

  onSubmit(form: NgForm){
    if(form.value._id == ""){
      this.employeeService.postEmployee(form.value).subscribe((res) =>{
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({html: 'Saved Successfully', classes: 'rounded'});
      });
    }
    else {
      this.employeeService.putEmployee(form.value).subscribe((res) =>{
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({ html: 'Updated Successfully', classes: 'rounded'})
      })
    }
    
  }

  refreshEmployeeList(){
    this.resetForm();
    this.employeeService.getEmployeeList().subscribe((res) =>{
      this.employeeService.employees = res as Employee[];
    });
  }

  onEdit(emp: Employee){
    this.employeeService.selectedEmployee = emp;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }
}


