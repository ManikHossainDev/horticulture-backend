import { model, Schema } from 'mongoose';
import paginate from '../plugins/paginate';
import { CategoryModal, ICategory } from './category.interface';

const categorySchema = new Schema<ICategory>(
  {
    categoryName: {
      type: String,
      required: true,
    },
    categoryImage: {
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
categorySchema.plugin(paginate);

const Category = model<ICategory,CategoryModal>('Category', categorySchema);
export default Category;
