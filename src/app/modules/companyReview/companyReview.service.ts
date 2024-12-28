import { StatusCodes } from 'http-status-codes';
import Company from '../company/company.model';
import { ICompanyReview } from './companyReview.interface';
import CompanyReview from './companyReview.model';
import ApiError from '../../../errors/ApiError';

const addCompanyReview = async (payload: Partial<ICompanyReview>) => {
  const company = await Company.findById(payload?.companyId);
  if (!company) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Company not found');
  }
  if (!payload.userId) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'User not found');
  }
  if (payload.userId.toString() === company.authorId.toString()) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'You cannot review your own company'
    );
  }

  // Create the review
  const review = await CompanyReview.create(payload);
  // Calculate and update avgReview
  const reviews = await CompanyReview.find({ companyId: review.companyId });
  const totalRatings = reviews.reduce((sum, r) => sum + r.rating, 0);

  // Calculate the average rating and clamp it between 1 and 5
  let avgRating = reviews.length > 0 ? totalRatings / reviews.length : 0;
  avgRating = Math.max(1, Math.min(avgRating, 5)); // Ensure the rating is between 1 and 5
  company.avgRating = parseFloat(avgRating.toFixed(1)); // Round to 1 decimal place
  await company.save();

  return review;
};

const updateCompanyReview = async (
  userId: string,
  companyReviewId: string,
  updateReviewData: Partial<ICompanyReview>
): Promise<ICompanyReview> => {
  const companyReview = await CompanyReview.findOne({
    _id: companyReviewId,
    userId: userId,
  });
  if (!companyReview) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Company Review not found');
  }

  // Check if the rating is being updated
  const isRatingUpdated =
    updateReviewData.rating &&
    updateReviewData.rating !== companyReview?.rating;

  // Update the review with new data
  Object.assign(companyReview, updateReviewData);
  await companyReview.save();

  if (isRatingUpdated) {
    const reviews = await CompanyReview.find({
      companyId: companyReview.companyId,
    });
    const totalRatings = reviews.reduce((sum, r) => sum + r.rating, 0);

    const company = await Company.findById(companyReview.companyId);
    if (!company) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Company not found');
    }

    // Calculate the average rating and clamp it between 1 and 5
    let avgRating = reviews.length > 0 ? totalRatings / reviews.length : 0;
    avgRating = Math.max(1, Math.min(avgRating, 5)); // Ensure the rating is between 1 and 5
    company.avgRating = parseFloat(avgRating.toFixed(1)); // Round to 1 decimal place
    await company.save();
  }

  return companyReview;
};

export const CompanyReviewService = {
  addCompanyReview,
  updateCompanyReview,
};
