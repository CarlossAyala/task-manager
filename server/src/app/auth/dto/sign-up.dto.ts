import { IsEmail, IsString, Length } from "class-validator";

export class SignUpDto {
  @IsString()
  @Length(2, 60)
  firstName: string;

  @IsString()
  @Length(2, 60)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 255)
  password: string;
}
