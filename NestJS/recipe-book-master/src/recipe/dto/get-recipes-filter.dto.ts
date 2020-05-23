import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetRecipesFilterDTO {
  @IsOptional()
  @IsNotEmpty()
  search: string;

  @IsOptional()
  category: string;
}