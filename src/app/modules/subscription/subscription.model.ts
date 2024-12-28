import { model, Schema } from 'mongoose';
import { ISubscription, ISubscriptionModal } from './subscription.interface';
import paginate from '../plugins/paginate';

const subscriptionSchema = new Schema<ISubscription>(
  {
    name: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxListings: {
      type: String,
      required: true,
    },
    benefits: {
      type: [String],
      required: true,
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

subscriptionSchema.plugin(paginate);

const Subscription = model<ISubscription, ISubscriptionModal>(
  'Subscription',
  subscriptionSchema
);
export default Subscription;
