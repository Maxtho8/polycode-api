import { IsEmail, IsNotEmpty } from "class-validator";

export class UpdateDto {
  @IsNotEmpty() @IsEmail() readonly oldEmail: string;
  @IsNotEmpty() @IsEmail() readonly newEmail: string;
}
