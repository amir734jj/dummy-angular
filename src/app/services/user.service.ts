import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import CrudService from './abstracts/crud.service';
import {User} from "../models/types/user";

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<User> {
  constructor(private http: HttpClient) {
    super();
  }

  resolveHttpClient(): HttpClient {
    return this.http;
  }

  resolveRoute(): string {
    return 'user';
  }

  default(): User {
    return {
      name: '',
      email: '',
      id: 0,
      roles: [],
      active: false,
      description: ''
    };
  }
}
