import {afterNextRender, Component, OnInit} from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {Profile} from "../../models/types/user";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FormErrorTable} from "../../utilities/form.utility";
import {HttpErrorResponse} from "@angular/common/http";
import {FormValidationErrorComponent} from "../common/form-validation-error/form-validation-error.component";
import {HttpResponseErrorComponent} from "../common/http-response-error/http-response-error.component";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormValidationErrorComponent,
    HttpResponseErrorComponent,
    ReactiveFormsModule,
    NgForOf,
    NgIf,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  formErrorTable: FormErrorTable = [];
  httpError: HttpErrorResponse | null = null;

  public profile: Profile | undefined;

  constructor(private profileService: ProfileService) {
    this.form = new FormGroup({
      name: new FormControl(''),
      email: new FormControl({
        value: '',
        disabled: true,
      }),
      description: new FormControl(''),
    });
  }

  public async handleSaveProfile(event: Event) {
    event.preventDefault();
    await this.profileService.update(this.form.value);
    await this.syncProfile();
  }

  ngOnInit() {
    afterNextRender(() => {
      this.syncProfile();
    });
  }

  private async syncProfile() {
    const profile = await this.profileService.get();
    this.profile = profile;

    // Update the form with profile data
    this.form.patchValue({
      name: profile.name,
      email: profile.email,
      description: profile.description
    });
  }
}
