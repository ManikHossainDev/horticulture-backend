import { IAboutUs } from './aboutUs.interface';
import AboutUs from './aboutUs.model';

// Create or Update only one "About Us" entry
const createOrUpdateAboutUs = async (payload: Partial<IAboutUs>) => {
  const existingAboutUs = await AboutUs.findOne();

  if (existingAboutUs) {
    existingAboutUs.set(payload);
    await existingAboutUs.save();
    return existingAboutUs;
  } else {
    const newAboutUs = await AboutUs.create(payload);
    return newAboutUs;
  }
};

const getAboutUs = async () => {
  const aboutUs = await AboutUs.findOne().sort({ createdAt: -1 }); // Sort and pick only the most recent
  return aboutUs;
};

export const AboutUsService = {
  createOrUpdateAboutUs,
  getAboutUs,
};
