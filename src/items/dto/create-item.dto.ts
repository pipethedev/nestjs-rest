import { IsString, IsNotEmpty, Min } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @Min(5)
  readonly qty: number;
}
