import { model, Schema } from 'mongoose';
import { CompanyModal, ICompany } from './company.interface';
import paginate from '../plugins/paginate';

const companySchema = new Schema<ICompany>(
  {
    companyName: {
      type: String,
      required: true,
    },
    companyLocation: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    companyAbout: {
      type: String,
      required: true,
    },
    companyImages: {
      type: [String],
      required: true,
    },
    companyType: {
      type: String,
      required: false,
    },
    companyInformation: {
      companyDescription: {
        type: String,
        required: true,
      },
      contactNumber: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      website: {
        type: String,
        required: false,
      },
      address: {
        type: String,
        required: false,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: false,
      },
    },
    avgRating: {
      type: Number,
      required: true,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//apply paginate plugin
companySchema.plugin(paginate);

const Company = model<ICompany, CompanyModal>('Company', companySchema);
export default Company;
