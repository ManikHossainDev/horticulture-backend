import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { PaginateOptions, PaginateResult } from '../../../types/paginate';
import { ICompany } from './company.interface';
import Company from './company.model';
import CompanyReview from '../companyReview/companyReview.model';
import { User } from '../user/user.model';
import Subscription from '../subscription/subscription.model';

interface ISanitizedFilters {
  [key: string]: any;
}
const addedCompany = async (payload: Partial<ICompany>) => {
  const user = await User.findById(payload.authorId);
  if (!user) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'User not found.');
  }

  if (!user.isSubscribed) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'You do not have a subscription. please purchase a subscription.'
    );
  }

  const subscription = await Subscription.findById(user.subscription);
  if (!subscription) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Subscription not found.');
  }
  // Check if the subscription has expired
  const currentDate = new Date();
  if (
    user.subscriptionExpiryDate &&
    user.subscriptionExpiryDate < currentDate
  ) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Your subscription has expired. Please renew your subscription.'
    );
  }

  // Handle maxListings, checking for 'unlimited' value
  if (subscription.maxListings !== 'unlimited') {
    const companyCount = await Company.countDocuments({
      authorId: payload.authorId,
      isDeleted: false,
    });
    if (companyCount >= parseInt(subscription.maxListings)) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        `You have reached the maximum number of companies allowed. Please upgrade your subscription.`
      );
    }
  }

  // Proceed to create the company
  const newCompany = await Company.create(payload);
  return newCompany;
};

const getAllCompanies = async (
  filters: Record<string, any>,
  options: PaginateOptions
): Promise<PaginateResult<ICompany>> => {
  const sanitizedFilters: ISanitizedFilters = {
    isDeleted: false,
  };

  // If searchTerm is provided, filter by companyName, companyInformation fields (zipCode, city, state, address, description)
  if (filters?.searchTerm) {
    const searchRegex = {
      $regex: filters.searchTerm,
      $options: 'i', // Case-insensitive search
    };
    sanitizedFilters['$or'] = [
      { companyName: searchRegex },
      { 'companyInformation.zipCode': searchRegex },
      { 'companyInformation.city': searchRegex },
      { 'companyInformation.state': searchRegex },
      { 'companyInformation.address': searchRegex },
      { 'companyInformation.companyDescription': searchRegex },
    ];
  }
  if (filters?.city) {
    sanitizedFilters['companyInformation.city'] = filters.city;
  }
  if (filters?.zipCode) {
    sanitizedFilters['companyInformation.zipCode'] = filters.zipCode;
  }
  if (filters?.state) {
    sanitizedFilters['companyInformation.state'] = filters.state;
  }
  if (filters?.country) {
    sanitizedFilters['companyInformation.country'] = filters.country;
  }
  if (filters?.companyType) {
    sanitizedFilters['companyType'] = {
      $regex: filters.companyType,
      $options: 'i',
    };
  }
  // Set the sort order based on createdAt field (descending)
  options.sortBy = '-createdAt';

  // Set the population options
  options.populate = [
    {
      path: 'authorId',
    },
  ];

  // Apply the filters and pagination, then return the result
  return Company.paginate(sanitizedFilters, options);
};

const getMyCompanies = async (
  filters: Partial<ICompany>,
  options: PaginateOptions,
  authorId: string
): Promise<PaginateResult<ICompany>> => {
  const sanitizedFilters = {
    ...filters,
    authorId,
    isDeleted: false,
  };

  options.populate = [
    {
      path: 'authorId',
    },
  ];

  return Company.paginate(sanitizedFilters, options);
};
const getSingleCompany = async (id: string) => {
  const company = await Company.findOne({ _id: id, isDeleted: false }).populate(
    'authorId'
  );
  if (!company) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Company not found');
  }
  const reviews = await CompanyReview.find({ companyId: company._id })
    .populate('userId')
    .sort({ createdAt: -1 });
  return {
    company: {
      ...company.toObject(),
      reviews,
    },
  };
};

const uploadCompanyImages = async (id: string, newImages: string[]) => {
  const company = await Company.findById(id);
  if (!company) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Company Not Found');
  }
  if (newImages.length > 0) {
    company.companyImages = [...company.companyImages, ...newImages];
  }
  await company.save();
  return company;
};
const singeCompanyImageDelete = async (id: string, imageName: string) => {
  const company = await Company.findById(id);
  if (!company) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found');
  }
  company.companyImages = company.companyImages.filter(
    img => img !== imageName
  );
  await company.save();
  return company;
};
const updateCompany = async (
  id: string,
  authorId: string,
  payload: Partial<ICompany>
): Promise<ICompany> => {
  const company = await Company.findOneAndUpdate(
    {
      _id: id,
      authorId,
      isDeleted: false,
    },
    payload,
    { new: true, runValidators: true }
  );
  if (!company) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Company not found');
  }
  return company;
};

const deleteCompany = async (
  id: string,
  authorId: string
): Promise<ICompany> => {
  const company = await Company.findOne({
    _id: id,
    authorId,
    isDeleted: false,
  });
  if (!company) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Company not found');
  }
  company.isDeleted = true;
  await company.save();
  return company;
};

export const CompanyService = {
  addedCompany,
  getAllCompanies,
  getMyCompanies,
  getSingleCompany,
  updateCompany,
  uploadCompanyImages,
  singeCompanyImageDelete,
  deleteCompany,
};
