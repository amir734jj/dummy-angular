import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormErrorTable, resolveFormGroupErrors} from '../../../utilities/form.utility';
import {FormValidationErrorComponent} from "../../common/form-validation-error/form-validation-error.component";
import {passwordValidationPattern} from "../../../models/constants/validations";
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import {HttpErrorResponse} from "@angular/common/http";
import {HttpResponseErrorComponent} from "../../common/http-response-error/http-response-error.component";

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    FormValidationErrorComponent,
    ReactiveFormsModule,
    ButtonsModule,
    HttpResponseErrorComponent
  ]
})
export class LoginComponent {

  form: FormGroup;
  formErrorTable: FormErrorTable = [];
  httpError: HttpErrorResponse | null = null;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(passwordValidationPattern)
      ])
    });
  }

  async handleLogIn(event: Event) {
    event.preventDefault();

    if (this.form.invalid) {
      this.formErrorTable = resolveFormGroupErrors(this.form);
      return;
    } else {
      this.formErrorTable = [] as FormErrorTable;
    }

    const response = await this.authenticationService.login(this.form.value);

    if (response instanceof HttpErrorResponse) {
      this.httpError = response;
    } else {
      await this.router.navigate(['./']);
    }
  }
}
