import { Schema, model } from 'mongoose';
import { IProduct, ISize, ProductModal } from './product.interface';
import paginate from '../plugins/paginate';

// Define the Size Schema
const SizeSchema = new Schema<ISize>({
  size: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  colors: [
    {
      type: String,
      required: false,
    },
  ],
  // quantity: {
  //   type: Number,
  //   required: true,
  // },
});

// Define the Product Schema
const ProductSchema = new Schema<IProduct>(
  {
    productName: {
      type: String,
      trim: true,
      required: true,
    },
    productDescription: {
      type: String,
    },
    productImages: {
      type: [String],
      required: true,
    },
    sizes: [SizeSchema],
    // inStock: {
    //   type: Boolean,
    //   default: true,
    // },
    category: {
      type: String,
      required: true,
    },
    avgReview: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Apply paginate plugin
ProductSchema.plugin(paginate);

// Create and export the Product model
const Product = model<IProduct, ProductModal>('Product', ProductSchema);

export default Product;
