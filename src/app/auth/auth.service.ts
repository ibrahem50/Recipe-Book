import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
      .pipe(catchError(this.handleError));
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
      .pipe(catchError(this.handleError));
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
