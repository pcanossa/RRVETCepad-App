import { Injectable } from '@angular/core';
import { ClientesAppService } from './clientes-app.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  isAutenthicated: any = JSON.parse(localStorage.getItem('isAuthenticated') ?? '{}');

  constructor(private router: Router) { }

  canActivate(): any {
    if(this.isAutenthicated==='true') {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
