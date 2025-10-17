import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LoginRequest, LoginResponse, RegisterRequest, User } from '../../interfaces/user/user.interface';
import { BehaviorSubject, catchError, Observable, tap, of } from 'rxjs';
import { ENVIRONMENT } from '../../enviroments/enviroment';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  protected readonly apiUrl = ENVIRONMENT.apiUrl;
  private userSubject = new BehaviorSubject(<User | null>(null));
  public user$ = this.userSubject.asObservable();
  private _isInitialized = false;
  private redirecUrl: string | null = null;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  register(registerData: RegisterRequest): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/v1/auth/register`, registerData);
  }

  login(loginData: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/v1/auth/login`, loginData).pipe(
      tap(response => {
        this.userSubject.next(response.user);
      })
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/v1/auth/logout`, {}).pipe(
      tap(() => this.userSubject.next(null)));
  }

  loadUser(): Observable<User | null> {
    if (!isPlatformBrowser(this.platformId)) {
      return of(null);
    }

    return this.http.get<User>(`${this.apiUrl}/api/v1/user`).pipe(
      tap((user) => {
        this.userSubject.next(user);
        
      }),
      catchError(() => {
        this.userSubject.next(null);
        return of(null);
      })
    );
  }

  initAuth(): Observable<User | null | undefined> {
    if (!isPlatformBrowser(this.platformId) || this._isInitialized) {
      return of(this.userSubject.value);
    }

    this._isInitialized = true;
    
    return this.loadUser();
  }

  get isInitialized() {
    return this._isInitialized;
  }

  get userLogged(): boolean {
    return !!this.userSubject.value;
  }

  get currentUser(): User | null | undefined {
    return this.userSubject.value;
  }

  setRedirectUrl(url: string): void{
    this.redirecUrl = url;
  }

  getRedirectUrl(): string | null {
    return this.redirecUrl;
  }

  clearRedirectUrl(): void {
    this.redirecUrl = null;
  }
}
