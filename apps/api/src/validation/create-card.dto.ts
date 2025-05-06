import { IsString, IsNotEmpty, IsBoolean, Length, IsOptional } from "class-validator";

export class CreateCardDto {
  @IsString()
  @IsNotEmpty({ message: "Le titre ne peut pas être vide" })
  @Length(5, 20, {message: "La longeur du text doit être entre 5 et 20 caractères"})
  title: string;
  
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}

export class UpdateCardDto {
	@IsBoolean() completed: boolean;
}