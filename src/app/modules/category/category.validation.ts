import { z } from 'zod';

const createCategoryValidationSchema = z.object({
  body: z.object({
    categoryName: z
      .string()
      .min(3, { message: 'Category name must be at least 3 characters long' })
      .max(100, { message: 'Category name must be at most 100 characters' }),
    isDeleted: z.boolean().default(false),
  }),
});

const updateCategoryValidationSchema = z.object({
  body: z.object({
    categoryName: z
      .string()
      .min(3, { message: 'Category name must be at least 3 characters long' })
      .max(100, { message: 'Category name must be at most 100 characters' })
      .optional(),
    isDeleted: z.boolean().default(false),
  }),
});


export const CategoryValidation = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};