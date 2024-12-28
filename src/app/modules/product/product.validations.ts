import { z } from 'zod';

const SizeSchema = z.object({
  size: z.string({
    required_error: 'Size is required',
  }).min(1, 'Size is required'),
  price: z.number({
    required_error: 'Price is required',
  }).min(0, 'Price must be a positive number'),
  colors: z
    .array(z.string({
      required_error: 'Color is required',
    }).min(1, 'Color must not be empty'))
    .min(1, 'At least one color is required'),
  quantity: z
    .number({
      required_error: 'Quantity is required',
    })
});

export const CreateProductValidationSchema = z.object({
  body: z.object({
    productName: z.string({
      required_error: 'Product name is required',
    }).min(1, 'Product name is required').trim(),
    productDescription: z.string({
      required_error: 'Product description is required',
    }),
    productImages: z
      .array(
        z.string({
          required_error: 'Product image is required',
        })
      )
      .min(1, 'At least one image is required').optional(),
    category: z.string({
      required_error: 'Category is required',
    }).min(1, 'Category is required'),
    avgReview: z.number().min(0).max(5).default(0).optional(),
    isDeleted: z.boolean().default(false),
  }),
});
export const UpdateProductValidationSchema = z.object({
  body: z.object({
    productName: z
      .string()
      .min(1, 'Product name is required')
      .trim()
      .optional(),
    productDescription: z.string().optional(),
    productImages: z
      .array(
        z.string({
          required_error: 'Product image is required',
        })
      )
      .min(1, 'At least one image is required').optional(),
    category: z.string().min(1, 'Category is required').optional(),
    avgReview: z.number().min(0).max(5).default(0).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const ProductValidation = {
  CreateProductValidationSchema,
  UpdateProductValidationSchema,
};