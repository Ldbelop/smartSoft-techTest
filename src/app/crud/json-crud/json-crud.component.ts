import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudMethodService, User } from '../services/crud-method.service';

@Component({
  selector: 'app-json-crud',
  templateUrl: './json-crud.component.html',
  styleUrl: './json-crud.component.css'
})
export class JsonCrudComponent implements OnInit{
  buttonForm!: FormGroup;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  showHamburguer: boolean = false;
  dataSource!: MatTableDataSource<any>;
  launchModal: boolean = false;
  toggleDelete: boolean = false;
  title: AbstractControl<any> | any;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private crudService: CrudMethodService
  ){}

  ngOnInit(){
    this.buttonForm = this.fb.group({
      title: new FormControl('',[
        Validators.required,
      ]),
      body: new FormControl('',[
        Validators.required,
      ])
    });

    this.crudService.getUsers().subscribe(userArray => {
      userArray.forEach((element: User) => {
        element.body = this.trimBody(element.body)
      });
      this.dataSource = new MatTableDataSource(userArray)
      this.dataSource.paginator = this.paginator;
    })
  }

  trimBody(string: string): string{
    const arrayedString: string[] = string.split(' ')
    for(let i = 0; arrayedString.length > 10; i++){
      arrayedString.pop()
    }
    return arrayedString.join(' ')
  }

  logout(){
    this.authService.logout()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  checkedRadio: HTMLInputElement | null = null;
  userToPerform: User | null = null;

  setUser(user: User, event: Event){
    if(this.checkedRadio == event.target){
      //@ts-ignore
      event.target.checked = false;
      this.checkedRadio = null;
      this.userToPerform = null;
    } else{
      //@ts-ignore
      this.checkedRadio = event.target;
      this.userToPerform = user;
      this.buttonForm.value.title = user.title;
      this.buttonForm.value.body = user.body;
      this.buttonForm.patchValue({
        title: user.title,
        body: user.body
      });
    }
  }

  actionOnUser(){
    this.launchModal = !this.launchModal
    if(this.checkedRadio == null){
      this.createUser(this.buttonForm.value.title, this.buttonForm.value.body)
    } else{
      this.editUser(this.buttonForm.value.title, this.buttonForm.value.body, this.userToPerform!.id)
    }
  }

  createUser(title: string, body: string){
    this.crudService.createUser(title,body).subscribe(response => {
      console.log(response)
      alert(response.id)
    })
  }

  editUser(title: string, body: string, id: number){
    this.crudService.editUser(title,body, id).subscribe(response => {
      console.log(response)
      alert(response.id)
    })
  }

  deleteUser(){
    this.toggleDelete = !this.toggleDelete
    this.crudService.deleteUser(this.userToPerform!.id).subscribe(response => {
      alert(`Se borró exitosamente el usuario con el id ${this.userToPerform!.id}`)
    })
  }
}
