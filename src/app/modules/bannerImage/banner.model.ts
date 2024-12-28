import { model, Schema } from 'mongoose';
import { IBannerImage, IBannerImageModal } from './banner.interface';
import paginate from '../plugins/paginate';

const bannerImageSchema = new Schema<IBannerImage>(
  {
    bannerImage: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
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
bannerImageSchema.plugin(paginate);

const BannerImage = model<IBannerImage, IBannerImageModal>(
  'BannerImage',
  bannerImageSchema
);
export default BannerImage;
