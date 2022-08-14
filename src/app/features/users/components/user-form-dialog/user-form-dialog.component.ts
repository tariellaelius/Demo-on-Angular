import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Country } from '../../interfaces/country';
import { State } from '../../interfaces/state';
import { City } from '../../interfaces/city';
import { User } from '../../models/user.model';
import { CountriesService } from '../../services/countries.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss']
})
export class UserFormDialogComponent implements OnInit {

  user: User;
  userForm!: FormGroup;

  countries!: Partial<Country>[];
  countryStates: State[] = [];
  stateCities!: City[];

  constructor(
    public dialogRef: MatDialogRef<UserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder,
    private countriesService: CountriesService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
  ) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.user = this.data ?? this.user;
    this.userForm = this.fb.group({
      ...this.user,
      country: this.fb.group({
        ...this.user.country,
        state: this.fb.group({
          ...this.user.country.state,
          city: this.fb.group({
            ...this.user.country.state.city
          })
        })
      })
    });

    this.countriesService.getCountries().subscribe(countries => {
      this.countries = countries;
      this.setCountryStates();
    });
  }

  onCountrySelected() {
    this.userForm.get('country.state.id')?.setValue(null);
    this.userForm.get('country.state.city.id')?.setValue(null);
    this.setCountryStates();
    this.stateCities = [];
  }

  setCountryStates() {
    const countryId = this.userForm.get('country._id')?.value;
    if (!countryId) return;
    this.countriesService.getCountryById(countryId).subscribe(c => {
      this.countryStates = c.states;
      this.setStateCities();
    });
  }

  onStateSelected() {
    this.userForm.get('country.state.city.id')?.setValue(null);
    this.setStateCities();
  }

  setStateCities() {
    const stateId = this.userForm.get('country.state.id')?.value;
    this.stateCities = this.countryStates.find(c => c.id === stateId)?.cities || [];
  }

  submit() {
    const method = this.data ? 'update' : 'create';

    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched();
      this._snackBar.open('Please fill all required fields',
        'OK', {
          "duration": 3000
      });
      return;
    }
    this.userService[`${method}User`](this.userForm.value).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
