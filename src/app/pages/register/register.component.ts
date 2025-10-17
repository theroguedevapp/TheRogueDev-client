import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterRequest } from '../../interfaces/user/user.interface';
import { AuthService } from '../../services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  errorMessage = '';
  successMessage = '';


  constructor(private fb: FormBuilder, private UserService: UserService, private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
      confirmPassword: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(2)]],
    }, { validators: this.passwordMatchValidator });
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    }
    const { confirmPassword, ...userData } = this.registerForm.value;
    const requestData: RegisterRequest = userData; 

    this.authService.register(requestData).subscribe({
      next: () => {
        this.successMessage = 'Registrado com sucesso';
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = this.checkErrors(error);
      } 
    });
    
    
  }
  
  private checkErrors(error: HttpErrorResponse) {
    if(error.status == 400) {
      return 'Opa! Houve um problema com a solicitação. Por favor, tente novamente!';
    } else if(error.status == 409) {
      return 'Ops, ocorreu um conflito. Não foi possível salvar as alterações!';
    } else if(error.status == 500) {
      return 'Ocorreu um erro inesperado!';
    } else {
      return 'Erro desconhecido!'
    }
  } 

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } 

    return null;
  }

  get usernameControl() {
    return this.registerForm.get('username');
  }

  get emailControl() {
    return this.registerForm.get('email');
  }

  get passwordControl() {
    return this.registerForm.get('password');
  }

  get confirmPasswordControl() {
    return this.registerForm.get('confirmPassword');
  }

  get nameControl() {
    return this.registerForm.get('name');
  }

}
