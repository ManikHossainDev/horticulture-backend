import { Model, Types } from "mongoose";
import { PaginateOptions, PaginateResult } from "../../../types/paginate";

export interface IBannerImage {
    _id: Types.ObjectId;
    bannerImage: string;
    title: string;
    description: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IBannerImageModal extends Model<IBannerImage> {
    paginate: (
        filter: object,
        options: PaginateOptions
    ) => Promise<PaginateResult<IBannerImage>>;
}
