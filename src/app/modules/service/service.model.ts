import { model, Schema } from 'mongoose';
import { IService, IServiceModal } from './service.interface';
import paginate from '../plugins/paginate';

const serviceSchema = new Schema<IService>(
  {
    serviceName: {
      type: String,
      required: true,
      trim: true,
    },
    serviceDescription: {
      type: String,
      required: true,
    },
    serviceImage: {
      type: String,
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

//apply paginate plugin
serviceSchema.plugin(paginate);

const Service = model<IService, IServiceModal>('Service', serviceSchema);
export default Service;