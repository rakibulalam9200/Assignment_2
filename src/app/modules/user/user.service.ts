import { TProduct, TUser } from './user.interface';
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

const getSingleUserFromDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.aggregate([{ $match: { userId: userId } }]);
    return result;
  } else {
    throw new Error('User Not Found!');
  }
};

const getSingleUserAllOrdersFromDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.find({ userId }, { orders: 1 });
    return result;
  } else {
    throw new Error('User Not Found!');
  }
};

const deleteUserFromDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.updateOne({ userId }, { isDeleted: true });
    return result;
  } else {
    throw new Error('User Not Found!');
  }
};

const updateUserFromDB = async (userId: number, userData: TUser) => {
  if (await User.isUserExists(userId)) {
    const result = await User.updateOne({ userId }, userData, {
      new: true,
      runValidators: true,
    });
    return result;
  } else {
    throw new Error('User Not Found!');
  }
};

const updateUserOrder = async (userId: number, productData: TProduct) => {
  if (await User.isUserExists(userId)) {
    const result = await User.updateOne(
      { userId },
      {
        $push: {
          orders: productData,
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );
    return result;
  } else {
    throw new Error('User Not Found!');
  }
};

const getSingleUserAllOrdersTotalPriceFromDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.aggregate([
      { $match: { userId: userId } },
      {
        $unwind: '$orders',
      },

      {
        $group: {
          _id: '$Orders',
          totalPrice: {
            $sum: { $multiply: ['$orders.quantity', '$orders.price'] },
          },
          // count: { $sum: 1 },
        },
      },
    ]);
    return result;
  } else {
    throw new Error('User Not Found!');
  }
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSigleUserFromDB: getSingleUserFromDB,
  deleteUserFromDB,
  updateUserFromDB,
  updateUserOrder,
  getSingleUserAllOrdersFromDB,
  getSingleUserAllOrdersTotalPriceFromDB,
};
