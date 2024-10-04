import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {Router} from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors, ValidatorFn,
  Validators
} from '@angular/forms';
import {FormErrorTable, resolveFormGroupErrors} from '../../../utilities/form.utility';
import {FormValidationErrorComponent} from "../../common/form-validation-error/form-validation-error.component";
import {passwordValidationPattern} from "../../../models/constants/validations";
import {HttpResponseErrorComponent} from "../../common/http-response-error/http-response-error.component";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    FormValidationErrorComponent,
    ReactiveFormsModule,
    HttpResponseErrorComponent
  ]
})
export class RegisterComponent {

  form: FormGroup;
  formErrorTable: FormErrorTable = [];
  httpError: HttpErrorResponse | null = null;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(passwordValidationPattern)
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.pattern(passwordValidationPattern),
        (formGroup: AbstractControl): ValidationErrors | null => {
          if (formGroup.value === this.form?.get("password")?.value) {
            return null;
          } else {
            return {PasswordsNoMatch: true };
          }
        }
      ])
    });
  }

  async handleRegister(event: Event) {
    event.preventDefault();

    if (this.form.invalid) {
      this.formErrorTable = resolveFormGroupErrors(this.form);
      return;
    } else {
      this.formErrorTable = [] as FormErrorTable;
    }

    const response = await this.authenticationService.register(this.form.value);

    if (response instanceof HttpErrorResponse) {
      this.httpError = response;
    } else {
      await this.router.navigate(['./login']);
    }
  }
}
