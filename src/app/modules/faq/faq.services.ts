import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { PaginateOptions, PaginateResult } from '../../../types/paginate';
import { IFaq } from './faq.interface';
import Faq from './faq.model';

const createFaq = async (payload: Partial<IFaq>): Promise<IFaq> => {
  const faq = new Faq(payload);
  await faq.save();
  return faq;
};

const getAllFaqs = async (
  filters: Partial<IFaq>,
  options: PaginateOptions
): Promise<PaginateResult<IFaq>> => {
  const sanitizedFilters = {
    ...filters,
    isDeleted: false,
  };

  const faqs = await Faq.paginate(sanitizedFilters, options);
  return faqs;
};

const getFaqById = async (id: string): Promise<IFaq | null> => {
  const faq = await Faq.findOne({ _id: id, isDeleted: false });
  if (!faq) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Faq not found');
  }
  return faq;
};

const updateFaq = async (
  id: string,
  payload: Partial<IFaq>
): Promise<IFaq | null> => {
  const faq = await Faq.findOne({ _id: id, isDeleted: false });
  if (!faq) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Faq not found');
  }
  Object.assign(faq, payload);
  await faq.save();
  return faq;
};

const deleteFaq = async (id: string): Promise<IFaq | null> => {
  const faq = await Faq.findOne({ _id: id, isDeleted: false });
  if (!faq) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Faq not found');
  }
  faq.isDeleted = true;
  await faq.save();
  return faq;
};

export const FaqService = {
  createFaq,
  getAllFaqs,
  getFaqById,
  updateFaq,
  deleteFaq,
};
