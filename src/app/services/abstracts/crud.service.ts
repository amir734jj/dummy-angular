import {HttpClient} from '@angular/common/http';
import route from '../../utilities/route.utility';
import _ from 'lodash';
import {firstValueFrom} from "rxjs";

export default abstract class CrudService<T> {

  abstract default(): T;

  abstract resolveRoute(): string;

  abstract resolveHttpClient(): HttpClient;

  async save(item: T) {
    return await firstValueFrom(this.resolveHttpClient()
      .post<T>(route(this.resolveRoute()), item));
  }

  async update(id: string, item: T) {
    return await firstValueFrom(this.resolveHttpClient()
      .put<T>(route(this.resolveRoute(), id), item));
  }

  async get(id: string) {
    const result = await firstValueFrom(this.resolveHttpClient().get<T>(route(this.resolveRoute(), id)));
    return _.merge(this.default(), result);
  }

  async getAll() {
    const result = await firstValueFrom(this.resolveHttpClient().get<T[]>(route(this.resolveRoute())));
    return result.map(x => _.merge(this.default(), x));
  }

  async delete(id: string) {
    return await firstValueFrom(this.resolveHttpClient()
      .delete<boolean>(route(this.resolveRoute(), id)));
  }
}
