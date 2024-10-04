import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {CachedAuthenticationService} from '../../services/cached.authentication.service';
import {RouteDataStrictType} from "../../models/types/router";

@Injectable({
  providedIn: 'root'
})
export class CustomCanActivate implements CanActivate {

  constructor(
    private router: Router,
    private cachedAuthenticationService: CachedAuthenticationService) {
  }

  async canActivate(
    {data}: ActivatedRouteSnapshot
  ) {
    const {allowAnonymous = false, disallowAuthenticated = false, allowAdminOnly = false } = data as RouteDataStrictType;
    await this.cachedAuthenticationService.waitUntilTriedRefreshToken;
    const authenticated = this.cachedAuthenticationService.isAuthenticated;
    const isAdmin = this.cachedAuthenticationService.profile?.isAdmin;

    if (authenticated && allowAdminOnly && !isAdmin) {
      await this.router.navigate(['./board']);
      return false;
    }

    if (authenticated && disallowAuthenticated) {
      await this.router.navigate(['./board']);
      return false;
    }

    if (!authenticated && !allowAnonymous) {
      await this.router.navigate(['./login']);
      return false;
    }

    return true;
  }
}
