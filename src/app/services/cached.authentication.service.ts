import {LOCAL_STORAGE_TOKEN} from '../models/constants/store';
import {DateTime} from 'luxon';
import store from 'store';
import {afterNextRender, Injectable} from '@angular/core';
import _ from 'lodash';
import {HttpClient} from '@angular/common/http';
import route from '../utilities/route.utility';
import {jwtDecode} from 'jwt-decode';
import {firstValueFrom} from 'rxjs';
import {jwtExpToDate} from "../utilities/jwt.utility";
import {StoredProfileType, User, UserRole} from "../models/types/user";
import {hasUserRole} from "../utilities/user.utility";

@Injectable({
  providedIn: 'root'
})
export class CachedAuthenticationService {

  public profile: StoredProfileType | undefined;
  private triedRefreshToken: boolean = false;
  public waitUntilTriedRefreshToken: Promise<boolean> = Promise.resolve(false);

  constructor(private http: HttpClient) {
    afterNextRender(() => {
      this.waitUntilTriedRefreshToken = new Promise<boolean>((resolve) => {
        const refreshInterval = setInterval(() => {
          if (this.triedRefreshToken) {
            // If the token has been refreshed, resolve the promise and clear the interval
            resolve(this.triedRefreshToken);
            clearInterval(refreshInterval); // Clean up the interval after the token is refreshed
          }
        }, 100);
      });
      this.scheduleHardRefresh();
    });
  }

  public get isAuthenticated(): boolean {
    return !!this.profile;
  };

  public scheduleHardRefresh() {
    setInterval(async () => {
      await this.hardRefresh();
    }, 60 * 1000 /* check for token expiration every minute */);
  }

  public async updateProfile() {
    this.setAuthInfo(await firstValueFrom(this.http.get<StoredProfileType>(route('account', 'profile'))));
  }

  public async hardRefresh() {
    try {
      const token = store.get(LOCAL_STORAGE_TOKEN);
      if (!token) {
        return;
      }

      const jwtPayload = jwtDecode(token);
      const expires = jwtExpToDate(jwtPayload!.exp!);
      const tokenIsValid = !!token && DateTime.fromJSDate(expires) > DateTime.now();

      if (!tokenIsValid) {
        return;
      }

      const minutesUntilTokenExpires = DateTime.fromJSDate(expires).diffNow('minutes').minutes;

      // if its first time recovering profile info or token is about to expire, refresh the token
      if (_.isUndefined(this.profile) || (minutesUntilTokenExpires > 0 && minutesUntilTokenExpires < 5)) {
        await this.refreshToken();
        await this.updateProfile();
      }
    } finally {
      this.triedRefreshToken = true;
    }
  }

  private refreshToken = _.throttle(async () => {
    const token = await firstValueFrom(this.http.get(route('account', 'refresh'), {responseType: 'text'}));
    this.setAuthInfo({ token });
  }, 60 * 1000, { leading: true, trailing: false });

  clearAuthInfo() {
    store.remove(LOCAL_STORAGE_TOKEN);
    this.profile = undefined;
  }

  setAuthInfo(info: Partial<User & StoredProfileType>) {
    this.profile = {
      ...this.profile,
      ...info,
      isAdmin: hasUserRole(info, UserRole.ADMIN) ?? this.profile?.isAdmin,
    } as StoredProfileType;

    store.set(LOCAL_STORAGE_TOKEN, this.profile.token);
  }
}
