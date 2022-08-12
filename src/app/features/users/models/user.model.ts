import { UserCountry } from "./user-country.model";

export class User {
    firstName = '';
    lastName = '';
    dateOfBirth: string | null = null;
    email = '';
    gender = '';
    country: UserCountry = new UserCountry();
    address = '';
    pinCode = '';
}