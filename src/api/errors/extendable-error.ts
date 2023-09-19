export enum HttpCode {
  OK = 200,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
}

export interface ErrorArgs {
  message: string;
  errors: string;
  status: HttpCode;
  isPublic: boolean;
  isOperational?: boolean;
}

/**
 * @extends Error
 */
export class ExtendableError extends Error {
  public readonly errors: string;
  public readonly status: HttpCode;
  public readonly isPublic: boolean;
  public readonly isOperational: boolean = true;

  constructor({ message, errors, status, isPublic, isOperational }: ErrorArgs) {
    super(message);
    this.name = this.constructor.name;
    this.errors = errors;
    this.status = status;
    this.isPublic = isPublic;

    if (isOperational !== undefined) {
      this.isOperational = isOperational;
    }

    Error.captureStackTrace(this);
  }
}
