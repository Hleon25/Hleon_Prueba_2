import { CanActivateFn } from '@angular/router';
import { Inject,inject} from '@angular/core'
import  {AuthService} from './../Servicio/auth/auth.service';
import {Router} from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const authIn = inject(AuthService) as AuthService;
  const routerin = inject(Router);
if (authIn.accesTokken == null ) {
  routerin.navigate(['./']);
  return false;
}
return true;
  
};
