import {afterNextRender, Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {setTheme} from "ngx-bootstrap/utils";
import {CachedAuthenticationService} from "./services/cached.authentication.service";
import {NgIf, NgClass} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ilkbin';
  public navBarCollapsed = true;

  constructor(private router: Router,
              protected cachedAuthenticationService: CachedAuthenticationService) {
    setTheme('bs5');
  }

  ngOnInit() {
    afterNextRender(() => {
      this.cachedAuthenticationService.hardRefresh().then(async () => {
        if (!this.cachedAuthenticationService.isAuthenticated) {
          await this.router.navigate(['./login']);
        }
      });
    });
  }
}
