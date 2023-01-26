import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employe } from 'src/app/models/employe';
import { EmployeDTO } from 'src/app/models/employe-dto';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnInit {
employes: Employe[]
employeCreated: Employe
employeEdit: Employe= {
  id: "",
  firstname: "",
  lastname:"",
  poste:"",
  startDate:"",
  salary: 0
}
employeEdit2 : Employe
employeeDelete : Employe

form: FormGroup
  constructor(private http: HttpService,  private fb: FormBuilder) {

   }

getEmployes(){
  this.http.getEmployes().subscribe(x => {
    this.employes =  x
    console.log(this.employes)
  })
}

submit(){
  this.employeCreated =  this.form.value;
  console.log(this.employeCreated)
  this.http.createEmploye(this.employeCreated);
}

edit(){
  this.employeEdit2 =  this.form.value;
  if(this.employeEdit2.firstname != ""  && this.employeEdit2.firstname != this.employeEdit.firstname){
    this.employeEdit.firstname =  this.employeEdit2.firstname
  }
  if(this.employeEdit2.lastname != ""  && this.employeEdit2.lastname != this.employeEdit.lastname){
    this.employeEdit.lastname =  this.employeEdit2.lastname
  }

  if(this.employeEdit2.poste != "" &&  this.employeEdit2.poste != this.employeEdit.poste){
    this.employeEdit.poste =  this.employeEdit2.poste
  }

  if(this.employeEdit2.startDate != "" && this.employeEdit2.startDate != this.employeEdit.startDate){
    this.employeEdit.startDate = this.employeEdit2.startDate
  }
  if(this.employeEdit2.salary != 0 && this.employeEdit2.salary != this.employeEdit.salary){
    this.employeEdit.salary = this.employeEdit2.salary
  }

  console.log(this.employeEdit)
  this.http.update(this.employeEdit)
}

toEdit(id:string){
  this.http.getEmployeById(id).subscribe(x=>

    {
      console.log(x)
      this.employeEdit =  x
    }

    )
}

deleteId(id:string){
  this.http.deleteEmployebyId(id).subscribe(x=>{

  })
}

deleteAll(){
  this.http.deleteEmployeAll();
}



  ngOnInit(): void {
    this.getEmployes()
    this.form = this.fb.group({
      firstname: this.fb.control(''),
      lastname: this.fb.control(''),
      poste: this.fb.control(''),
      startDate:this.fb.control(''),
      salary:this.fb.control('')
   })
  }

  ngOnChanges(){
    this.getEmployes()
  }

}
