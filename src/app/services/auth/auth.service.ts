import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest, User } from '../../interfaces/user/user.interface';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { BaseApiService } from '../base/base-api.service';
import { ENVIRONMENT } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  protected readonly apiUrl = ENVIRONMENT.apiUrl;

  constructor(private http: HttpClient) { }

  register(registerData: RegisterRequest): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/v1/auth/register`, registerData);
  }

}
