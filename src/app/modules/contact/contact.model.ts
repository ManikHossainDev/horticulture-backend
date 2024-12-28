import { model, Schema } from 'mongoose';
import { IContact, IContactModal } from './contact.interface';
import paginate from '../plugins/paginate';

const contactSchema = new Schema<IContact>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

contactSchema.plugin(paginate);

export const Contact = model<IContact, IContactModal>('Contact', contactSchema);
