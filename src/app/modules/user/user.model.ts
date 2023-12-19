import { Schema, model } from 'mongoose';
import { IAddress, IFullName, IUser } from './user.interface';

const fullNameSchema = new Schema<IFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const addressSchema = new Schema<IAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const userSchema = new Schema<IUser>({
  userId: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: fullNameSchema,
  age: { type: Number },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String] },
  address: addressSchema,
});

export const UserModel = model<IUser>('User', userSchema);
