import { Country } from '@interfaces/countries.interface';
import countryModel from '@models/countries.model';

class CountryService {
  public countries = countryModel;

  public async findAll(): Promise<Country[]> {
    const users: Country[] = await this.countries.find();
    return users;
  }
  
}

export default CountryService;
