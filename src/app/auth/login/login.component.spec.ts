import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with valid initial state', () => {
    expect(component.loginForm.valid).toBeFalsy();
    // Add more expectations as needed
  });

  it('should disable the submit button initially', () => {
    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(submitButton.disabled).toBeTruthy();
  });

  it('should enable the submit button when the form is valid', () => {
    // Simulate filling out the form with valid data
    component.loginForm.setValue({
      email: 'test@example.com',
      pwd: 'password123',
    });
    fixture.detectChanges();

    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(submitButton.disabled).toBeFalsy();
  });

  // Add more tests for the component's behavior and interactions

});
