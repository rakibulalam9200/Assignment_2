/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    // data validation using zod
    const zodParseData = userValidationSchema.parse(userData);

    const result = await UserServices.createUserIntoDB(zodParseData);

    res.status(201).json({
      success: true,
      message: 'User is created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || 'Something went wrong!',
      erorr: {
        code: '500',
        description: error?.issues || error?.message,
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Users are retrived successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || 'Something went wrong!',
      erorr: {
        code: '500',
        description: error?.issues || error?.message,
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSigleUserFromDB(Number(userId));

    res.status(200).json({
      success: true,
      message: 'User is retrived successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || 'Something went wrong!',
      erorr: {
        code: '500',
        description: error?.issues || error?.message,
      },
    });
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { user: userData } = req.body;

    await UserServices.updateUserFromDB(Number(userId), userData);

    userData.password = '';

    res.status(200).json({
      success: true,
      message: 'User is updated successfully',
      data: userData,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || 'Something went wrong!',
      erorr: {
        code: '500',
        description: error?.issues || error?.message,
      },
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await UserServices.deleteUserFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User is deleted successfully',
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || 'Something went wrong!',
      erorr: {
        code: '500',
        description: error?.issues || error?.message,
      },
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateSingleUser,
};
