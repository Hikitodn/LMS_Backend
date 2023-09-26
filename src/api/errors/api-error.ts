import { ErrorArgs, ExtendableError } from "@errors/extendable-error";
import httpStatus from "http-status";

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
export class ApiError extends ExtendableError {
  constructor({
    message,
    status = httpStatus.INTERNAL_SERVER_ERROR,
    isPublic = false,
  }: ErrorArgs) {
    super({ message, status, isPublic });
  }
}
