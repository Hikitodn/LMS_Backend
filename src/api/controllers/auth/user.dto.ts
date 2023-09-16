import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  Max,
} from "class-validator";

export class UserDTO {
  id: number;

  @IsNotEmpty()
  @Max(254)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  @Matches(
    "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\\])$"
  )
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  name: string;

  is_verified: boolean;
}
