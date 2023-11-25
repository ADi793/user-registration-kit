export interface State {
  name: String;
  cities: String[];
}

export interface Country {
  name: String;
  states: State[];
}
