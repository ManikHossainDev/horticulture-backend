import { model, Schema } from 'mongoose';
import { IPayment, IPaymentModal } from './payment.interface';
import paginate from '../plugins/paginate';

const paymentSchema = new Schema<IPayment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sessionId: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentHistory: {
      type: Object,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
    paymentType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

paymentSchema.plugin(paginate);

export const Payment = model<IPayment, IPaymentModal>('Payment', paymentSchema);
