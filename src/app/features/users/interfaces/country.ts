import { State } from './state';

export interface Country {
    _id: string;
    name: string;
    states: State[];
}