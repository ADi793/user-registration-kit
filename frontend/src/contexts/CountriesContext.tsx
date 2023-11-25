import { createContext, useState, ReactNode } from "react";
import { Country } from "../interfaces/country";

interface CountriesContextProps {
  countries: Country[];
  setCountries: (countriesData: Country[]) => void;
}

export const CountriesContext = createContext<CountriesContextProps>({
  countries: [],
  setCountries: (countriesData: Country[]) =>
    console.log("Setting user: ", countriesData),
});

interface Props {
  children: ReactNode;
}

export const CountriesProvider = ({ children }: Props) => {
  const [countries, setCountries] = useState<Country[]>([]);

  return (
    <CountriesContext.Provider value={{ countries, setCountries }}>
      {children}
    </CountriesContext.Provider>
  );
};
