import { model, Schema } from 'mongoose';
import { ICompanyReview } from './companyReview.interface';
import paginate from '../plugins/paginate';

const companyReviewSchema = new Schema<ICompanyReview>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


//apply paginate plugin
companyReviewSchema.plugin(paginate)

const CompanyReview = model<ICompanyReview>('CompanyReview', companyReviewSchema);
export default CompanyReview;