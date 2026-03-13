import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { console } from 'inspector';




@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) { }

  loginForm!: FormGroup;
  errorMessage = '';

  ngOnInit() {
    this.initLoginForm();

    if (this.authService.userLogged) {
      const redirectUrl = this.authService.getRedirectUrl() || '/';
      this.authService.clearRedirectUrl();
      void this.router.navigate([redirectUrl]);
    }
  }

  private initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }


  onSubmit() {
    if (this.loginForm.valid) {
      this.errorMessage = '';

      const { email, password } = this.loginForm.value;

      this.authService.login({ email, password }).subscribe({
        next: () => {
          const redirectUrl = this.authService.getRedirectUrl() || '/';
          this.authService.clearRedirectUrl();
          void this.router.navigate([redirectUrl]);;
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage = this.checkError(error);
        }
      });
    }
  }

  private checkError(error: HttpErrorResponse) {
    if (error.status === 400) {
      return 'Credenciais inválidas!';
    } else if (error.status === 401) {
      return 'Credenciais inválidas!';
    } else if (error.status === 0) {
      return 'Erro de conexão. Verifique sua internet';
    } else {
      return 'Erro desconhecido!';
    }
  }

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

}
