/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomError, { STATUS } from '@utils/customError';
import { NextFunction, Request, Response } from 'express';
import { ResponseErrorType, ResponseType } from '../../@types/express';

export default function responseMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  response.success = ({ message, data }: ResponseType) => {
    const body = {
      message,
      data,
    };
    return buildResponse(response, STATUS.success, body);
  };

  response.created = ({ message, data }: ResponseType) => {
    const body = {
      message,
      data,
    };
    return buildResponse(response, STATUS.created, body);
  };

  response.error = ({ error, message, data }: ResponseErrorType) => {
    if (error instanceof CustomError) {
      const body = {
        status: 'error',
        message: error.message || message,
        data,
      };
      return buildResponse(response, error.statusCode, body);
    }

    const body = {
      status: 'error',
      message,
      error: error?.message,
      data,
    };

    return buildResponse(response, STATUS.error, body);
  };

  response.badRequest = ({ error, message, data }: ResponseErrorType) => {
    const body = {
      message,
      data,
      error: error?.message,
    };
    return buildResponse(response, STATUS.badRequest, body);
  };

  response.unauthorized = ({ message, data }: ResponseType) => {
    const body = {
      message,
      data,
    };
    return buildResponse(response, STATUS.unauthorized, body);
  };

  response.notFound = ({ message }: ResponseType) => {
    const body = {
      message,
    };
    return buildResponse(response, STATUS.notFound, body);
  };

  next();
}

function buildResponse(response: Response, status: STATUS, body: any) {
  log(status, body);
  return response.status(status).send(body);
}

function log(status: STATUS, body: any) {
  const statusName = STATUS[status];

  const { message, error } = body;
  const logMessage = `[Response] - ${statusName}: ${JSON.stringify({
    message,
    error,
  })}`;

  if (status === STATUS.success) {
    console.log(logMessage);
  } else {
    console.error(logMessage);
  }
}
