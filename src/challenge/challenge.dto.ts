import { IsNotEmpty } from "class-validator";

export class ChallengeDto {
  @IsNotEmpty() id: string;
  @IsNotEmpty() title: string;
  @IsNotEmpty() img_path: string;
  @IsNotEmpty() langage: string;
  @IsNotEmpty() expected: string;
  @IsNotEmpty() description: string;
}
