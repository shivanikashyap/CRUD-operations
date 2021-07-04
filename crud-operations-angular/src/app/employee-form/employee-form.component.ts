import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmployeeDetailsService } from '../shared/employee-details.service';
import { Employee } from '../shared/employee.model';

declare var M:any;

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
  providers: [EmployeeDetailsService]

})
export class EmployeeFormComponent implements OnInit {

  constructor(private employeeService:EmployeeDetailsService) { }

  ngOnInit(): void {
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
