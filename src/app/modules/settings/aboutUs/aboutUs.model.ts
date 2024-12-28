import { model, Schema } from 'mongoose';
import { IAboutUs } from './aboutUs.interface';
const aboutUsSchema = new Schema<IAboutUs>({
  aboutUs: {
    type: String,
    required: true,
  },
});

const AboutUs = model<IAboutUs>('AboutUs', aboutUsSchema);
export default AboutUs;