import { sendContactUsEmail } from '../../../helpers/emailHelper';
import { IContact } from './contact.interface';
import { Contact } from './contact.model';

const createContactToAdmin = async (payload: IContact) => {
  const result = await Contact.create(payload);
  await sendContactUsEmail(payload);
  return result;
};

export const ContactService = {
  createContactToAdmin,
};
