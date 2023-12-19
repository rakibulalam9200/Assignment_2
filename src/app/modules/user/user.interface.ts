export type IAddress = {
  street: string;
  city: string;
  country: string;
};

export type IFullName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  userId: number;
  username: string;
  password: string;
  fullName: IFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: IAddress;
};
