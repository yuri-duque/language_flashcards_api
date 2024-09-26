import { AnyObjectSchema } from 'yup';
import CustomError from '../customError';

export const validationQueryParams = async (params: any, validationSchema: AnyObjectSchema) => {
  try {
    await validationSchema.validate(params);
  } catch (error: any) {
    throw new CustomError(error.message, 400);
  }
};
