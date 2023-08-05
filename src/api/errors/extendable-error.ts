import { TypeError } from "./types";

/**
 * @extends Error
 */
export class ExtendableError extends Error {
  public errors: string;
  public status: number;
  public isPublic: boolean;
  public stack?: string | undefined;

  constructor({ msg, errors, status, isPublic, stack }: TypeError) {
    super(msg);
    this.errors = errors;
    this.status = status;
    this.isPublic = isPublic;
    this.stack = stack;
  }
}
