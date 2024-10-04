import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {LoginRequest} from '../models/authentication.service/login/login.request';
import {RegisterRequest} from '../models/authentication.service/register/register.request';
import route from '../utilities/route.utility';
import {CachedAuthenticationService} from './cached.authentication.service';
import {RouteStoreUtility} from '../utilities/injectables/store/route.store.utility';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient,
              private routeStoreUtility: RouteStoreUtility,
              private cachedAuthenticationService: CachedAuthenticationService) {
  }

  async login(loginRequest: LoginRequest) {
    try {
      const token = await firstValueFrom(this.http.post(route('account', 'login'), loginRequest, {responseType: 'text'}));
      this.cachedAuthenticationService.setAuthInfo({ token });
      await this.cachedAuthenticationService.updateProfile();
      return token;
    } catch (error) {
      return error as HttpErrorResponse;
    }
  }

  async register(registerRequest: RegisterRequest) {
    try {
      return await firstValueFrom(this.http.post(route('account', 'register'), registerRequest));
    } catch (e) {
      return e as HttpErrorResponse;
    }
  }

  async logout() {
    try {
      this.routeStoreUtility.store = this.routeStoreUtility.store.clear();
      return await firstValueFrom(this.http.get(route('account', 'logout')));
    } catch (e) {
      return e as HttpErrorResponse;
    } finally {
      this.cachedAuthenticationService.clearAuthInfo();
    }
  }
}
