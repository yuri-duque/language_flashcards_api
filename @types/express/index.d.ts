/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomError from '@utils/customError';
import type { Request } from 'express';

type ResponseType = {
  message?: string;
  data?: any;
};

type ResponseErrorType = {
  message?: string;
  data?: any;
  error?: CustomError | Error;
};

declare global {
  namespace Express {
    interface Response {
      /**
       * return response with status 200
       */
      success({ message, data }: ResponseType);

      /**
       * return response with status 201
       */
      created({ message, data }: ResponseType);

      /**
       * return response with status 500
       */
      error({ error, message, data }: ResponseErrorType): Response;

      /**
       * return response with status 400
       */
      badRequest({ error, message, data }: ResponseErrorType): Response;

      /**
       * return response with status 401
       */
      unauthorized({ message, data }: ResponseType): Response;

      /**
       * return response with status 404
       */
      notFound({ message, data }: ResponseType): Response;
    }
  }
}

type EmptyObject = Record<string, never>;

export type RequestWithBody<T> = Request<EmptyObject, EmptyObject, T, EmptyObject>;

export type RequestWithQuery<T> = Request<EmptyObject, EmptyObject, EmptyObject, T>;
