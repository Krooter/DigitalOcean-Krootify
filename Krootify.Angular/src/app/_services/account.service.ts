import { IRegisterUser } from './../_models/User/registeruser';
import { IUser } from './../_models/User/user';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IPasswordUpdate } from '../_models/User/passwordupdate';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  public currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  loadCurrentUser() {
    return this.http.get<IUser>(this.baseUrl + 'account').pipe(
      map((user: IUser) => {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
      })
    );
  }

  login(values: IUser) {
    return this.http.post<IUser>(this.baseUrl + 'account/login', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(values: IRegisterUser) {
    return this.http
      .post<IUser>(this.baseUrl + 'account/register', values)
      .pipe(
        map((user: IUser) => {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        })
      );
  }

  updatePassword(values: IPasswordUpdate): Observable<IUser> {
    return this.http.post<IUser>(
      this.baseUrl + 'account/update-password',
      values
    );
  }

  updateEmail(values: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.baseUrl + 'account/update-email', values);
  }

  updatePhoto(values: any): Observable<IUser> {
    return this.http.post<IUser>(this.baseUrl + 'account/update-photo', values);
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(undefined);
    this.router.navigateByUrl('/account/login');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }

  isAdmin(): boolean {
    let token = localStorage.getItem('token');
    let decodedJWT = JSON.parse(window.atob(token!.split('.')[1]));
    return decodedJWT.role == 'Admin' ? true : false;
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(
      this.baseUrl + 'account/emailexists?email=' + email
    );
  }
}
