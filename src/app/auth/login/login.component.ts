import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, AfterViewInit{

  @ViewChild('passwordRef')
  inputElementRef!: ElementRef<HTMLInputElement>;
  showIcon: boolean = true;

  ngOnInit(){
    console.log(this.inputElementRef)
  }

  ngAfterViewInit(): void {
    console.log(this.inputElementRef)
  }

  showPassword(truthy: boolean){
    this.showIcon = !truthy;
    if(truthy){
      this.inputElementRef.nativeElement.type = "text"
    } else{
      this.inputElementRef.nativeElement.type = "password"
    }
  }
}
