import { Model } from 'mongoose';

export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TFullName = {
  firstName: string;
  lastName: string;
};

export type TProduct = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  isDeleted: boolean;
  orders?: TProduct[];
};

export interface UserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(userId: number): Promise<TUser | null>;
}
