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
  // const result = await User.find({ userId });
  const result = await User.aggregate([{ $match: { userId: userId } }]);
  return result;
};

const deleteUserFromDB = async (userId: number) => {
  const result = await User.updateOne({ userId }, { isDeleted: true });
  return result;
};

const updateUserFromDB = async (userId: number, userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    const result = await User.updateOne({ userId }, userData, {
      new: true,
    });
    return result;
  } else {
    throw new Error('User already exists');
  }
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSigleUserFromDB,
  deleteUserFromDB,
  updateUserFromDB,
};
