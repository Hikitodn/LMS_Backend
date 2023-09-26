import { ErrorArgs, ExtendableError } from "@errors/extendable-error";
import httpStatus from "http-status";

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
export class ApiError extends ExtendableError {
  constructor({
    name,
    message,
    status = httpStatus.INTERNAL_SERVER_ERROR,
    isPublic,
    isOperational = true,
  }: ErrorArgs) {
    super({ name, message, status, isPublic, isOperational });
  }
}
