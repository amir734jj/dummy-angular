import {Component, Input} from '@angular/core';
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-http-response-error',
  standalone: true,
  imports: [
    KeyValuePipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './http-response-error.component.html',
  styleUrl: './http-response-error.component.scss'
})
export class HttpResponseErrorComponent {

  @Input('error')
  httpErrorResponse: HttpErrorResponse | null = null;

  public get error(): any {
    try {
     return JSON.parse(this.httpErrorResponse?.error);
    } catch (_) {
      return this.httpErrorResponse?.error;
    }
  }
}
