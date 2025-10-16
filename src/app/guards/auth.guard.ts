import { inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { map, Observable, of } from 'rxjs';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {

  const router = inject(Router);
  const authService = inject(AuthService);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return of(true);
  }

  const redirectToLogin = () => {
    let redirectUrl = state.url;
    const editUrlMatch = state.url.match(/^\/projects\/(\d+)\/edit$/);
    if (editUrlMatch) {
      const projectId = editUrlMatch[1];
      redirectUrl = `/projects/${projectId}`;
    }

    authService.setRedirectUrl(redirectUrl);
    void router.navigate(['/login']);
    return false;
  }

  if(!isPlatformBrowser(platformId)) {
      if (!authService.isInitialized) {
    return authService.initAuth().pipe(
      map((user) => {
        if (user) {
          return true;
        } else {
          return redirectToLogin();
        }
      })
    );
  }
  }

  if(authService.userLogged) {
    return of(true);
  } else {
    return of(redirectToLogin());
  }
};
