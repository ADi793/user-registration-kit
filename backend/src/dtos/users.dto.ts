import Gender from '@/enums/gender';
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength, isNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsNotEmpty()
  public firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsNotEmpty()
  public lastName: string;

  @IsEmail()
  @MinLength(5)
  @MaxLength(255)
  @IsNotEmpty()
  public email: string;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsNotEmpty()
  public country: string;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsNotEmpty()
  public state: string;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsNotEmpty()
  public city: string;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @IsNotEmpty()
  @IsEnum(Gender)
  public gender: string;

  @IsNotEmpty()
  @IsString()
  public dateOfBirth: Date;
 
}

export class GetUserDto {
  @IsEmail()
  @MinLength(5)
  @MaxLength(255)
  @IsNotEmpty()
  public email: string;
}
