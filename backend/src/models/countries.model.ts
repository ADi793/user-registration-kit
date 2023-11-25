import { model, Schema, Document } from 'mongoose';
import { Country } from '@/interfaces/countries.interface';

const countrySchema: Schema = new Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 255,
    trim: true,
    required: true,
    unique: true,
  },
  states: [{
    name: {
      type: String,
      minLength: 2,
      maxLength: 255,
      trim: true,
      required: true,
      unique: true,
    },
    cities: [String]
  }],
});

const countryModel = model<Country & Document>('Country', countrySchema);

export default countryModel;
