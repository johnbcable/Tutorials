import { IsNotEmpty } from 'class-validator';

export class CreateRecipeDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  category: String;

  @IsNotEmpty()
  ingredients: Array<string>;

  @IsNotEmpty()
  instructions: string;
}