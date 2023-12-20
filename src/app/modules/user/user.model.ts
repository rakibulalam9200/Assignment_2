import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TUser } from './user.interface';

const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required.'],
    trim: true,
    maxlength: [50, 'First Name can not be more than 50 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required.'],
    trim: true,
    maxlength: [50, 'Last Name can not be more than 50 characters'],
  },
});

const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: [true, 'Street is required.'],
    maxlength: [100, 'Street can not be more than 100 characters'],
  },
  city: {
    type: String,
    required: [true, 'City is required.'],
    maxlength: [100, 'City can not be more than 100 characters'],
  },
  country: {
    type: String,
    required: [true, 'Country is required.'],
    maxlength: [100, 'Country can not be more than 100 characters'],
  },
});

const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    required: [true, 'User Id is required.'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'User Name is required.'],
    trim: true,
    unique: true,
  },
  password: { type: String, required: [true, 'Password is required.'] },
  fullName: {
    type: fullNameSchema,
    required: true,
  },
  age: { type: Number, required: [true, 'Age is required'] },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
  },
  isActive: {
    type: Boolean,
    required: [true, 'isActive is required'],
    default: true,
  },
  hobbies: { type: [String], required: true },
  address: {
    type: addressSchema,
    required: true,
  },
});

export const User = model<TUser>('User', userSchema);
