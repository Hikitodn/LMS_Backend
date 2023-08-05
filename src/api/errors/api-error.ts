import httpStatus from "http-status";
import { ExtendableError } from "@errors/extendable-error";

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
export class ApiError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} msg - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(
    msg: string,
    errors: string,
    status: number = httpStatus.INTERNAL_SERVER_ERROR,
    isPublic: boolean = false,
    stack: string | undefined
  ) {
    super({ msg, errors, status, isPublic, stack });
  }
}
