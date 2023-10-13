import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticated.asObservable();

  constructor(private http: HttpClient) {}

  // Update the authentication status directly
  setAuthenticated(status: boolean) {
    this.isAuthenticated.next(status);
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<any>('http://localhost:3000/signupData').pipe(
      map((users) => {
        const user = users.find(
          (a: any) => a.Email === email && a.Password === password
        );
        const loggedIn = user !== undefined;
        this.setAuthenticated(loggedIn); // Update authentication status
        return loggedIn;
      })
    );
  }

  logout() {
    this.setAuthenticated(false); // Update authentication status
  }
}