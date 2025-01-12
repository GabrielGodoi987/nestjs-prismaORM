import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(5, {
    message: 'The title needs at least 5 characteres',
  })
  @MaxLength(15, {
    message: "You can't write a title bigger than 15 characters",
  })
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(10, {
    message: 'This field should have at least 10 characters',
  })
  content: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  authorEmail: string;
}
