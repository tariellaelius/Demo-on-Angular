import { UserCountry } from "./user-country.model";

export class User {
    _id: string | null = null;
    firstName = '';
    lastName = '';
    dateOfBirth: string | null = null;
    email = '';
    gender = '';
    country: UserCountry = new UserCountry();
    address = '';
    pinCode = '';
}