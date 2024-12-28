import { z } from 'zod';

const createReviewValidationSchema = z.object({
  body: z.object({
    rating: z.number({
      required_error: 'Rating is required',
      invalid_type_error: 'Rating must be a number',
    }),
    comment: z.object({
      text: z.string({
        required_error: 'Comment is required',
      }),
      image: z.string().optional(),
    }),
    productId: z.string({
      required_error: 'Product id is required',
    }),
  }),
});

const updateReviewValidationSchema = z.object({
  body: z.object({
    rating: z.number({
      required_error: 'Rating is required',
      invalid_type_error: 'Rating must be a number',
    }).optional(),
    comment: z.object({
      text: z.string({
        required_error: 'Comment is required',
      }),
      image: z.string().optional(),
    }).optional(),
    productId: z.string({
      required_error: 'Product id is required',
    }).optional(),
  }),
});

export const ReviewValidation = {
  createReviewValidationSchema,
  updateReviewValidationSchema,
};
