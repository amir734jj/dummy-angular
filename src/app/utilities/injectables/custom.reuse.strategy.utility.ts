// This impl. bases upon one that can be found in the router's test cases.
import {ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy} from '@angular/router';
import {Injectable} from '@angular/core';
import {RouteStoreUtility} from './store/route.store.utility';
import {RouteDataStrictType} from "../../models/types/router";

@Injectable({
  providedIn: 'root'
})
export class CustomReuseStrategy implements RouteReuseStrategy {

  constructor(private routeStoreUtility: RouteStoreUtility) {
  }

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const { shouldReuse = false } = route.data as RouteDataStrictType;
    return shouldReuse;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    if (route.data['shouldReuse'] && handle) {
      this.routeStoreUtility.store = this.routeStoreUtility.store.set(route.routeConfig!.path!, handle);
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!route.routeConfig && !!this.routeStoreUtility.store.get(route.routeConfig!.path!);
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    if (!route.routeConfig) { return null; }
    return this.routeStoreUtility.store.get(route.routeConfig!.path!) ?? null;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot): boolean {
    const { shouldReuse = false } = future.data as RouteDataStrictType;
    return shouldReuse;
  }
}
