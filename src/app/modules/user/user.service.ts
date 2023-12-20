import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User already exists');
  }
  const result = await User.create(userData);

  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSigleUserFromDB = async (userId: number) => {
  const result = await User.find({ userId });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSigleUserFromDB,
};
