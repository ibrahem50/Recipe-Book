import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expirseIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new Subject<User>();

  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD2kVtXha9AdHa4rF8HC2Uuv9rGgIvcEEA',

        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expirseIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD2kVtXha9AdHa4rF8HC2Uuv9rGgIvcEEA',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expirseIn
          );
        })
      );
  }

  private handleAuthentication(
    email: string,
    token: string,
    userId: string,
    expirseIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expirseIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMesseage = 'an unkown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMesseage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMesseage = 'this email exists already';
        break;
      case 'USER_DISABLED':
        errorMesseage = 'this user is disabled';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMesseage = 'this email not found';
        break;
      case 'INVALID_PASSWORD':
        errorMesseage = 'this password is invalid';
        break;
    }
    return throwError(errorMesseage);
  }
}
