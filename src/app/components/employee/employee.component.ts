import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employee } from 'src/app/models/employee';
import { RequestEmployee } from 'src/app/models/request-employee';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[]
  employeeCreated: RequestEmployee
  employeeEdit: Employee = {
    id: "",
    firstname: "",
    lastname: "",
    poste: "",
    startDate: new Date(),
    salary: 0
  }
  employeeEdit2: Employee
  employeeDelete: Employee
  form: FormGroup

  constructor(private http: HttpService, private fb: FormBuilder) { }

  getEmployees() {
    this.http.getEmployees().subscribe(x => {

      this.employees = x
      console.log(this.employees)
    })
  }

  submit() {
    this.employeeCreated = this.form.value;
    console.log( typeof this.employeeCreated.startDate)
    this.http.createEmployee(this.employeeCreated).subscribe(x=>{

    });
  }

  edit() {
    this.employeeEdit2 = this.form.value;
    if (this.employeeEdit2.firstname != "" && this.employeeEdit2.firstname != this.employeeEdit.firstname) {
      this.employeeEdit.firstname = this.employeeEdit2.firstname
    }
    if (this.employeeEdit2.lastname != "" && this.employeeEdit2.lastname != this.employeeEdit.lastname) {
      this.employeeEdit.lastname = this.employeeEdit2.lastname
    }

    if (this.employeeEdit2.poste != "" && this.employeeEdit2.poste != this.employeeEdit.poste) {
      this.employeeEdit.poste = this.employeeEdit2.poste
    }

    if (this.employeeEdit2.startDate != new Date() && this.employeeEdit2.startDate != this.employeeEdit.startDate) {
      this.employeeEdit.startDate = this.employeeEdit2.startDate
    }
    if (this.employeeEdit2.salary != 0 && this.employeeEdit2.salary != this.employeeEdit.salary) {
      this.employeeEdit.salary = this.employeeEdit2.salary
    }

    console.log(this.employeeEdit)
    this.http.update(this.employeeEdit).subscribe((x) =>{

    })
  }

  toEdit(id: string) {
    this.http.getEmployeeById(id).subscribe(x => {
      console.log(x)
      this.employeeEdit = x
    }

    )
  }

  deleteId(id: string) {
    this.http.deleteEmployeeById(id).subscribe(x => { })
  }

  deleteAll() {
    this.http.deleteAll().subscribe(x=>{

    })
    ;
  }

  ngOnInit(): void {
    this.getEmployees()
    this.form = this.fb.group({
      firstname: this.fb.control(''),
      lastname: this.fb.control(''),
      poste: this.fb.control(''),
      startDate: this.fb.control(''),
      salary: this.fb.control('')
    })
  }

  ngOnChanges() {
    this.getEmployees()
  }

}
