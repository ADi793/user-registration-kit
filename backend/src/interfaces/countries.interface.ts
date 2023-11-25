import { State } from "./states.interface";


export interface Country {
    _id: string;
    name: string;
    states: State[]
}
  