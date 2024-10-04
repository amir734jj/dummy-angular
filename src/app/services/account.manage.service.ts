import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {User} from '../models/types/user';
import route from '../utilities/route.utility';
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ManageAccountService {
  constructor(private http: HttpClient) {
  }

  setUserRole(userId: number, role: string) {
    return firstValueFrom(this.http.post<User>(route('manage', 'account', userId, 'role', role), {}));
  }

  setUserActive(userId: number, active: boolean) {
    return firstValueFrom(this.http.post<User>(route('manage', 'account', userId, 'active', active), {}));
  }
}
