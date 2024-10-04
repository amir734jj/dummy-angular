import {RegisterComponent} from './components/account/register/register.component';
import {LoginComponent} from './components/account/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {LogoutComponent} from './components/account/logout/logout.component';
import {AboutComponent} from "./components/about/about.component";
import {CustomCanActivate} from "./utilities/injectables/custom.can.activate";
import {RouteDataStrictType} from "./models/types/router";
import {Route} from "@angular/router";
import {BoardComponent} from "./components/board/board.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {UsersComponent} from "./components/users/users.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";

type ExtendedRouteTypes = Route | { data: RouteDataStrictType };

const definedRoutes: ExtendedRouteTypes[] = [
  {path: '', component: HomeComponent, data: {allowAnonymous: true, disallowAuthenticated: false}},
  {path: 'board', component: BoardComponent, data: {allowAnonymous: false}},
  {path: 'users', component: UsersComponent, data: {allowAnonymous: false, allowAdminOnly: true }},
  {path: 'login', component: LoginComponent, data: {disallowAuthenticated: true}},
  {path: 'register', component: RegisterComponent, data: {disallowAuthenticated: true}},
  {path: 'logout', component: LogoutComponent, data: {allowAnonymous: false}},
  {path: 'about', component: AboutComponent, data: {allowAnonymous: true}},
  {path: 'profile', component: ProfileComponent, data: {allowAnonymous: false}},
  {path: '**', component: NotFoundComponent, data: {allowAnonymous: false} },
];

const appRoutes = definedRoutes.map(x => ({
  ...x,
  canActivate: [CustomCanActivate]
}));

export { appRoutes };
