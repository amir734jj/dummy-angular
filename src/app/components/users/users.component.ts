import {afterNextRender, Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User, UserRole} from "../../models/types/user";
import {NgForOf, NgIf} from "@angular/common";
import {ButtonsModule} from "ngx-bootstrap/buttons";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {RouterLink} from "@angular/router";
import {CachedAuthenticationService} from "../../services/cached.authentication.service";
import { ManageAccountService } from '../../services/account.manage.service';
import {hasUserRole} from "../../utilities/user.utility";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    BsDropdownModule,
    ButtonsModule,
    RouterLink,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  public users: User[] = [];

  constructor(private userService: UserService,
              private manageAccountService: ManageAccountService,
              protected cachedAuthenticationService: CachedAuthenticationService) {
  }

  ngOnInit() {
    afterNextRender(() => {
      this.syncUsers();
    });
  }

  private async syncUsers() {
    this.users = await this.userService.getAll();
  }

  public async toggleActive(user: User, active: boolean) {
    await this.manageAccountService.setUserActive(user.id, active);
    await this.syncUsers();
  }

  public async toggleRole(user: User, role: string) {
    await this.manageAccountService.setUserRole(user.id, role);
    await this.syncUsers();
  }

  protected readonly UserRole = UserRole;
  protected readonly hasUserRole = hasUserRole;
}
