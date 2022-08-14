import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  static readonly url = environment.backendUrl;

  countries!: Country[];

  constructor(private http: HttpClient) { }

  getCountries() {
    if (!this.countries) {
      return this.http.get<Country[]>(`${CountriesService.url}/countries`)
        .pipe(
          tap((currencies: Country[]) => {
            this.countries = currencies;
          })
        );
    }
    return of(this.countries);
  }

  getCountryById(id: string) {
    return this.http.get<Country>(`${CountriesService.url}/countries/${id}`);
  }
}
