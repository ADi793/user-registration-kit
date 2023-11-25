import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import CountriesController from '@/controllers/countries.controller';


class CountriesRoute implements Routes {
  public path = '/countries';
  public router = Router();
  public countriesController = new CountriesController();
  
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.countriesController.getCountries);
  }
}

export default CountriesRoute;
