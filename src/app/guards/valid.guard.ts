import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MasterService } from '../services/master.service';

@Injectable({
  providedIn: 'root',
})
export class ValidGuard implements CanActivate {
  constructor(private ms:MasterService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.ms.isAuthenticated$.pipe(
      take(1),
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true; // Allow access if authenticated
        } else {
          this.router.navigate(['/login']);
          return false; // Redirect to login and deny access
        }
      })
    );
  }
}
