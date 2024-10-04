import {afterNextRender, AfterViewInit, Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  standalone: true,
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements AfterViewInit {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngAfterViewInit() {
    afterNextRender(() => {
      this.logout();
    });
  }

  async logout() {
    const response = await this.authenticationService.logout();

    if (response) {
      await this.router.navigate(['./login']);
    }
  }
}
