import { model, Schema } from 'mongoose';
import INewsLetter from './newsLetter.interface';

const newsLetterSchema = new Schema<INewsLetter>({
  email: {
    type: String,
    required: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please enter a valid email address.',
    ],
  },
});

export const NewsLetter = model<INewsLetter>('NewsLetter', newsLetterSchema);
