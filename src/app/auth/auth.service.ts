import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expirseIn: string;
  localId: string;
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
      .pipe(
        catchError((errorRes) => {
          let errorMesseage = 'an unkown error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMesseage);
          }
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMesseage = 'this email exists already';
          }
          return throwError(errorMesseage);
        })
      );
  }
}
