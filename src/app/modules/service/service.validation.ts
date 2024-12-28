import { z } from 'zod';

const addServiceValidationSchema = z.object({
  body: z.object({
    serviceName: z.string({
      required_error: 'Service name is required',
    }),
    serviceDescription: z.string({
      required_error: 'Service description is required',
    }),
    serviceImage: z
      .string({
        required_error: 'Service image is required',
      })
      .optional(),
  }),
});

const updateServiceValidationSchema = z.object({
  body: z.object({
    serviceName: z
      .string({
        required_error: 'Service name is required',
      })
      .optional(),
    serviceDescription: z
      .string({
        required_error: 'Service description is required',
      })
      .optional(),
    serviceImage: z
      .string({
        required_error: 'Service image is required',
      })
      .optional(),
  }),
});

export const ServiceValidation = {
  addServiceValidationSchema,
  updateServiceValidationSchema,
};
