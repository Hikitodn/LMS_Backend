export enum UserRole {
  STUDENT = "student",
  TEACHER = "teacher",
  ADMIN = "admin",
}

export enum GenderType {
  MALE = "male",
  FEMALE = "female",
}

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

export enum ClassroomStatus {
  OPEN = "open",
  CLOSED = "closed",
}

export const ROLES = ["admin", "teacher", "student"];
export const LOGGED_USER = "_loggedUser";
