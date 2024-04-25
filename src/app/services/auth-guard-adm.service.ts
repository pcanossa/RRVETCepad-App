import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardADMService {

  isADMAutenthicated: any = JSON.parse(localStorage.getItem('isADMAuthenticated') ?? '{}');

  constructor( private router: Router) { }

  canActivate(): any {
    if(this.isADMAutenthicated==='true') {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
