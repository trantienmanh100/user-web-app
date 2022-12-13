import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import {Observable, throwError} from 'rxjs';
import {map, tap} from 'rxjs/operators';

type EntityResponseType = HttpResponse<any>;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser: any;
  private tokenPrivateKey?: string;

  constructor(
    protected http: HttpClient,
    private translateService: TranslateService,
    private router: Router,
    protected toast: ToastrService
  ) {
  }
  login(
    username: string,
    password: string,
    rememberMe = false
  ): Observable<any> {
    return this.http
      .post<any>(
        `http://localhost:8080/auth/login`,
        {
          username,
          password,
          rememberMe,
          loading:true
        },
      );
  }
}
