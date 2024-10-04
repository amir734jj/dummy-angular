import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Profile} from '../models/types/user';
import route from '../utilities/route.utility';
import {CachedAuthenticationService} from "./cached.authentication.service";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(
    private http: HttpClient,
    private cachedAuthenticationService: CachedAuthenticationService) {
  }

  get() {
    return firstValueFrom(this.http.get<Profile>(route('profile', this.cachedAuthenticationService.profile!.id)));
  }

  update(profile: Profile) {
    return firstValueFrom(this.http.post<Profile>(route('profile', this.cachedAuthenticationService.profile!.id), profile));
  }
}
