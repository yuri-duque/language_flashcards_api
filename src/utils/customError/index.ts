export enum STATUS {
  success = 200,
  created = 201,
  error = 500,
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
}

class CustomError extends Error {
  statusCode: STATUS;

  constructor(message: string, statusCode: STATUS = STATUS.badRequest) {
    super(message);
    Error.captureStackTrace(this, this.constructor);

    this.statusCode = statusCode;
  }
}

export default CustomError;
