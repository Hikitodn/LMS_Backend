import { HttpCode } from "@utils/instance";

export type ErrorArgs = {
  message: string;
  status: HttpCode;
  isPublic?: boolean;
};

/**
 * @extends Error
 */
export class ExtendableError extends Error {
  public status: HttpCode;
  public isPublic: boolean;
  public isOperational: boolean;

  constructor({ message, status, isPublic }: ErrorArgs) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;

    if (isPublic !== undefined) {
      this.isPublic = isPublic;
    }
    this.isOperational = true;

    Error.captureStackTrace(this);
  }
}
