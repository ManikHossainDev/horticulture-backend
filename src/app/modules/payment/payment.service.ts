import { PaginateOptions, PaginateResult } from '../../../types/paginate';
import { IPayment } from './payment.interface';
import { Payment } from './payment.model';
const getAllPayments = async (
  filters: Partial<IPayment>,
  options: PaginateOptions
): Promise<PaginateResult<IPayment>> => {
  const sanitizedFilters = {
    ...filters,
    paymentStatus: 'succeeded',
  };
  options.sortBy = '-createdAt';
  options.populate = [{ path: 'userId' }];
  const payments = await Payment.paginate(sanitizedFilters, options);
  return payments;
};

export const PaymentService = {
  getAllPayments,
};
