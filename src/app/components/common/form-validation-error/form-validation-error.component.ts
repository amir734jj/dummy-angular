import {Component, Input, OnInit} from '@angular/core';
import { FormErrorTable } from '../../../utilities/form.utility';
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import _ from "lodash";

@Component({
  standalone: true,
  selector: 'app-form-validation-error',
  templateUrl: './form-validation-error.component.html',
  imports: [
    NgForOf,
    KeyValuePipe,
    NgIf
  ],
  styleUrls: ['./form-validation-error.component.scss']
})
export class FormValidationErrorComponent {

  @Input('error-table')
  errorTable: FormErrorTable = [];

  protected readonly JSON = JSON;
  protected readonly _ = _;
}
