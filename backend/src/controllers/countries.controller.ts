import { NextFunction, Request, Response } from 'express';
import { Country } from '@interfaces/countries.interface';
import CountryService from '@/services/countries.service';

class CountriesController {
  public countryService = new CountryService();

  public getCountries = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllCountriesData: Country[] = await this.countryService.findAll();

      res.status(200).json({ data: findAllCountriesData });
    } catch (error) {
      next(error);
    }
  };
}

export default CountriesController;
