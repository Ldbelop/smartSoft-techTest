import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, AfterViewInit{
  @ViewChild('passwordRef')
  inputElementRef!: ElementRef<HTMLInputElement>;
  showIcon: boolean = true;
  loginForm!: FormGroup;
  email: AbstractControl<any> | any;

  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService
  ){}

  ngOnInit(){
    this.loginForm = this.fb.group({
      email: new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      pwd: new FormControl('',[
        Validators.required
      ])
    })

    this.email = this.loginForm.get('email');
  }

  ngAfterViewInit(): void {
  }

  showPassword(truthy: boolean){
    this.showIcon = !truthy;
    if(truthy){
      this.inputElementRef.nativeElement.type = "text"
    } else{
      this.inputElementRef.nativeElement.type = "password"
    }
  }

  onSubmit(form: FormGroup){
    this.AuthService.login(form.value.email)
    console.log("Joined")
  }
}
