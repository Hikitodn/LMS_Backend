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
  name?: string;
  message: string;
  status: HttpCode;
  isPublic?: boolean;
  isOperational?: boolean;
}

/**
 * @extends Error
 */
export class ExtendableError extends Error {
  public status: HttpCode;
  public isPublic: boolean;
  public isOperational: boolean = true;

  constructor({
    name = "ApiError",
    message,
    status,
    isPublic = false,
    isOperational,
  }: ErrorArgs) {
    super(message);
    this.name = name;
    this.status = status;
    this.isPublic = isPublic;

    if (isOperational !== undefined) {
      this.isOperational = isOperational;
    }

    Error.captureStackTrace(this);
  }
}
