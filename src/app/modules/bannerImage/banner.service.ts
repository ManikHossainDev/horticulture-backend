import { PaginateOptions, PaginateResult } from '../../../types/paginate';
import { IBannerImage } from './banner.interface';
import BannerImage from './banner.model';

const addBannerImage = async (payload: Partial<IBannerImage>) => {
  const newBannerImage = await BannerImage.create(payload);
  return newBannerImage;
};

const getBannerImages = async (
  filters: Partial<IBannerImage>,
  options: PaginateOptions
): Promise<PaginateResult<IBannerImage>> => {
  const sanitizedFilters = {
    ...filters,
    isDeleted: false,
  };
  const bannerImages = await BannerImage.paginate(sanitizedFilters, options);
  return bannerImages;
};

const getSingleBannerImage = async (id: string) => {
  const singleBannerImage = await BannerImage.findOne({
    _id: id,
    isDeleted: false,
  });
  return singleBannerImage;
};

const updateBannerImage = async (
  id: string,
  payload: Partial<IBannerImage>
) => {
  const updatedBannerImage = await BannerImage.findOneAndUpdate(
    { _id: id, isDeleted: false },
    payload,
    {
      new: true,
    }
  );
  return updatedBannerImage;
};

const deleteBannerImage = async (id: string) => {
  const deletedBannerImage = await BannerImage.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );
  return deletedBannerImage;
};

export const BannerImageService = {
  addBannerImage,
  getBannerImages,
  getSingleBannerImage,
  updateBannerImage,
  deleteBannerImage,
};

export default BannerImageService;
