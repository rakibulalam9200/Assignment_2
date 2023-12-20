import { z } from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
});

const addressValidationSchema = z.object({
  street: z.string().min(1).max(100),
  city: z.string().min(1).max(100),
  country: z.string().min(1).max(100),
});

export const userValidationSchema = z.object({
  userId: z.number().positive(),
  username: z.string().min(1),
  password: z.string().min(1),
  fullName: fullNameValidationSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
});

export default userValidationSchema;

