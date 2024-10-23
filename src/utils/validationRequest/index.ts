import CustomError from '@utils/customError';
import { Request } from 'express';
import { AnyObjectSchema } from 'yup';

export const validationQueryParams = async <T>(
  request: Request,
  validationSchema: AnyObjectSchema,
) => {
  try {
    const params = request.query as unknown as T;
    await validationSchema.validate(params);
    return params;
  } catch (error: any) {
    throw new CustomError(error.message);
  }
};
