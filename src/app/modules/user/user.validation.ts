import { z } from 'zod';
import { Role, roles } from '../../middlewares/roles';

const createUserValidationSchema = z.object({
  body: z.object({
    fullName: z
      .string({
        required_error: 'Full name is required.',
        invalid_type_error: 'Full name must be string',
      })
      .min(1, 'Full name cannot be empty.'),
    email: z
      .string({
        required_error: 'Email is required.',
      })
      .email('Invalid email address.'),
    password: z
      .string({
        required_error: 'Password is required.',
      })
      .min(8, 'Password must be at least 8 characters long.'),
    role: z
      .string({
        required_error: 'Role is required.',
      })
      .optional()
      .default('user')
      .refine(role => roles.includes(role as Role), {
        message: `Role must be one of the following: ${roles.join(', ')}`,
      }),
    address: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    postalCode: z.string().optional(),
    image: z.string().url().optional(),
    status: z.enum(['Active', 'Blocked', 'Delete']).default('Active'),
    isEmailVerified: z.boolean().optional().default(false),
    isResetPassword: z.boolean().optional().default(false),
    oneTimeCode: z.string().optional(),
  }),
});
const updateUserValidationSchema = z.object({
  body: z.object({
    fullName: z
      .string({
        invalid_type_error: 'Full name must be a string',
      })
      .min(1, 'Full name cannot be empty.')
      .optional(),
    email: z
      .string({
        invalid_type_error: 'Email must be a string',
      })
      .email('Invalid email address.')
      .optional(),
    password: z
      .string({
        invalid_type_error: 'Password must be a string',
      })
      .min(8, 'Password must be at least 8 characters long.')
      .optional(),
    role: z
      .string({
        invalid_type_error: 'Role must be a string',
      })
      .optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    postalCode: z.string().optional(),
    image: z.string().url().optional(),
    status: z.enum(['Active', 'Blocked', 'Delete']).optional(),
    isEmailVerified: z.boolean().optional(),
    isResetPassword: z.boolean().optional(),
    oneTimeCode: z.string().optional(),
  }),
});

const changeUserStatusValidationSchema = z.object({
  body: z.object({
    action: z.enum(['block', 'unblock', 'delete', 'active']),
  }),
});
export const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
  changeUserStatusValidationSchema
};
