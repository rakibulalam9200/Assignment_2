import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import {
  TAddress,
  TFullName,
  TProduct,
  TUser,
  UserModel,
} from './user.interface';

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

const productSchema = new Schema<TProduct>({
  productName: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
});

const userSchema = new Schema<TUser, UserModel>({
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
  password: {
    type: String,
    required: [true, 'Password is required.'],
    maxlength: [30, 'Password can not be more than 30 characters'],
  },
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
  isDeleted: {
    type: Boolean,
    default: false,
  },
  orders: { type: [productSchema], default: [] },
});

// hasing password before save // pre save middleware hook
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrpt_salt_rounds),
  );
  next();
});

userSchema.post('save', async function (doc, next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  doc.password = '';
  next();
});

// find data which are not deleted // Query middleware
userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);
