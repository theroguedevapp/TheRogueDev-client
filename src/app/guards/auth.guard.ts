import { inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { map, Observable, of } from 'rxjs';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  console.log('Executando auth guard')
  const router = inject(Router);
  const authService = inject(AuthService);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return of(true);
  }

  const redirectToLogin = () => {
    const redirectUrl = state.url;
    authService.setRedirectUrl(redirectUrl);
    return router.createUrlTree(['/login']);
  }

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

  if (authService.userLogged) {
    return of(true);
  } else {
    return of(redirectToLogin());
  }
};
