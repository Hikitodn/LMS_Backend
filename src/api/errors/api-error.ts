import { ErrorArgs, ExtendableError } from "@errors/extendable-error";
import httpStatus from "http-status";

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
export class ApiError extends ExtendableError {
  constructor({
    message,
    errors,
    status = httpStatus.INTERNAL_SERVER_ERROR,
    isPublic = false,
    isOperational,
  }: ErrorArgs) {
    super({ message, errors, status, isPublic, isOperational });
  }
}
