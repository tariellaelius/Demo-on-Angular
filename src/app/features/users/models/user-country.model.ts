export class UserCountry {
    _id: string | null = null;
    name: string = '';
    state: UserState = new UserState();
}

class UserState {
    id: number | null = null;
    name: string = '';
    city: UserCity = new UserCity();
}

class UserCity {
    id: number | null = null;
    name: string = '';
}

