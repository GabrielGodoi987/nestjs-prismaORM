import { IsInt, IsNotEmpty, isNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class PostQuery {
  @IsString()
  @IsOptional()
  name?: string;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  item_quantity: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  page?: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  limit?: number;
}
