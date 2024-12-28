import { model, Schema, Types } from 'mongoose';
import { IReview, IReviewModal } from './review.interface';
import paginate from '../plugins/paginate';

const reviewSchema = new Schema<IReview>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    userId: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      text: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: false,
      },
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

reviewSchema.plugin(paginate);

const Review = model<IReview, IReviewModal>('Review', reviewSchema);
export default Review;
