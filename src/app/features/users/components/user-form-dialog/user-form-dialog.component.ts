import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';

import { Country } from '../../interfaces/country';
import { State } from '../../interfaces/state';
import { City } from '../../interfaces/city';
import { User } from '../../models/user.model';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss']
})
export class UserFormDialogComponent implements OnInit {

  user: User;
  userForm!: FormGroup;

  countries!: Partial<Country>[];
  countryStates!: State[];
  stateCities!: City[];

  constructor(
    public dialogRef: MatDialogRef<UserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder,
    private countriesService: CountriesService,
  ) {
    this.user = new User();
  }

  ngOnInit(): void {
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
    
    this.countriesService.getCountries().subscribe(countries => this.countries = countries);
  }

  onCountrySelected(e: MatSelectChange) {
    this.countriesService.getCountryById(e.value).subscribe(c => this.countryStates = c.states);
    this.stateCities = [];
    this.userForm.get('country.state.id')?.setValue(null);
    this.userForm.get('country.state.city.id')?.setValue(null);
    console.log(this.userForm);
  }

  onStateSelected(e: MatSelectChange) {
    this.stateCities = this.countryStates.find(c => c.id === e.value)?.cities || [];
    this.userForm.get('country.state.city.id')?.setValue(null);
  }
}
