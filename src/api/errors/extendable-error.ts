import { HttpStatus } from "http-status";

/**
 * @extends Error
 */
export class ExtendableError extends Error {
  public errors: string;
  public httpStatus: HttpStatus;
  public isPublic: boolean;
  constructor(
    msg: string,
    errors: string,
    httpStatus: HttpStatus,
    isPublic: boolean
  ) {
    super(msg);
    this.errors = errors;
    this.httpStatus = httpStatus;
    this.isPublic = isPublic;
    // this.stack =
  }
}
