import CustomError from '@utils/customError';
import { AnyObjectSchema } from 'yup';

export const validationQueryParams = async (params: any, validationSchema: AnyObjectSchema) => {
  try {
    await validationSchema.validate(params);
  } catch (error: any) {
    throw new CustomError(error.message);
  }
};
