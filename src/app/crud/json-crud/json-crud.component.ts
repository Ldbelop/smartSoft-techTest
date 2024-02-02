import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudMethodService, User } from '../services/crud-method.service';
import { SweetAlertService } from '../../services/sweet-alert.service';

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
  userArrayCopy!: User[];
  showSpinner: boolean = false;
  spinnerText: string = "Cargando";

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private crudService: CrudMethodService,
    private swalService: SweetAlertService
  ){}

  ngOnInit(){
    this.showSpinner = true;
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
      this.userArrayCopy = userArray;
      this.dataSource = new MatTableDataSource(userArray)
      this.dataSource.paginator = this.paginator;
      this.showSpinner = false;
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
    this.showSpinner = true;
    this.spinnerText = "Cerrando Sesión";
    setTimeout(() => {
      this.authService.logout()
      this.showSpinner = false
    },2000)
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

  renderTable(){
    this.dataSource = new MatTableDataSource(this.userArrayCopy)
    this.dataSource.paginator = this.paginator;
  }

  createUser(title: string, body: string){
    this.showSpinner = true;
    this.crudService.createUser(title,body).subscribe(response => {
      const parsedUser = JSON.parse(response.body)
      const newUser: User = {
        //@ts-ignore
        id: response.id,
        title: parsedUser.title,
        body: parsedUser.body,
        userId: parsedUser.userId
      }
      this.userArrayCopy.push(newUser)
      this.renderTable()
      this.swalService.showAlert('¡Se creo exitosamente el usuario!', `Quedó con un Id: ${newUser.id} y un Titulo: ${newUser.title}`, "success")
      this.showSpinner = false;
    }, error => {
      this.swalService.showAlert('Hubo un error creando el usuario', "Intentalo de nuevo", "error")
      this.showSpinner = false;
    })
  }

  editUser(title: string, body: string, id: number){
    this.showSpinner = true;
    this.crudService.editUser(title,body, id).subscribe(response => {
      const parsedUser = JSON.parse(response.body)
      const editedUser: User = {
        //@ts-ignore
        id: response.id,
        title: parsedUser.title,
        body: parsedUser.body,
        userId: parsedUser.userId
      }
      //@ts-ignore
      const indexOfUserToReplace: number = this.userArrayCopy.indexOf(this.userArrayCopy.find((user: User) => user.id == editedUser.id))
      this.userArrayCopy.splice(indexOfUserToReplace, 1, editedUser)
      this.renderTable()
      this.swalService.showAlert('¡Se edito exitosamente el usuario!', `Quedó con un Id: ${editedUser.id} y un Titulo: ${editedUser.title}`, "success")
      this.showSpinner = false;
    }, error => {
      this.swalService.showAlert('Hubo un error editando el usuario', "Intentalo de nuevo", "error")
      this.showSpinner = false;
    })
  }

  deleteUser(){
    this.showSpinner = true;
    this.toggleDelete = !this.toggleDelete
    this.crudService.deleteUser(this.userToPerform!.id).subscribe(response => {
      //@ts-ignore
      const indexOfUserToReplace: number = this.userArrayCopy.indexOf(this.userArrayCopy.find((user: User) => user.id == this.userToPerform.id))
      this.userArrayCopy.splice(indexOfUserToReplace, 1)
      this.renderTable()
      this.swalService.showAlert('¡Se borró exitosamente el usuario!', '', "success")
      this.showSpinner = false;
    }, error => {
      this.swalService.showAlert('Hubo un error borrando el usuario', "Intentalo de nuevo", "error")
      this.showSpinner = false;
    })
  }
}
