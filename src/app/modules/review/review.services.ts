import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import Product from '../product/product.model';
import { IReview } from './review.interface';
import Review from './review.model';

const addReview = async (reviewData: Partial<IReview>): Promise<IReview> => {
  const product = await Product.findById(reviewData?.productId);
  if (!product) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Product not found');
  }
  // Create the review
  const review = await Review.create(reviewData);
  // Calculate and update avgReview
  const reviews = await Review.find({ productId: review.productId });
  const totalRatings = reviews.reduce((sum, r) => sum + r.rating, 0);
  product.avgReview = reviews.length > 0 ? totalRatings / reviews.length : 0;
  await product.save();

  return review;
};

const updateReview = async (
  userId: string,
  reviewId: string,
  reviewData: Partial<IReview>
): Promise<IReview> => {
  const review = await Review.findOne({ userId: userId, _id: reviewId });
  if (!review) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Review not found');
  }

  // Check if the rating is being updated
  const isRatingUpdated =
    reviewData.rating && reviewData.rating !== review.rating;

  // Update the review with new data
  Object.assign(review, reviewData);
  await review.save();

  // If rating is updated, recalculate the product's avgReview
  if (isRatingUpdated) {
    const reviews = await Review.find({ productId: review.productId });
    const totalRatings = reviews.reduce((sum, r) => sum + r.rating, 0);

    const product = await Product.findById(review.productId);
    if (!product) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Product not found');
    }

    product.avgReview = reviews.length > 0 ? totalRatings / reviews.length : 0;
    await product.save();
  }

  return review;
};

const updateLikesDislikes = async (
  reviewId: string,
  type: 'like' | 'dislike'
): Promise<IReview> => {
  const review = await Review.findById(reviewId);
  if (!review) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Review not found');
  }

  if (type === 'like') review.likes++;
  if (type === 'dislike') review.dislikes++;

  await review.save();
  return review;
};

export const ReviewService = {
  addReview,
  updateReview,
  updateLikesDislikes,
};
