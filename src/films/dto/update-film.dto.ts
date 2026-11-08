import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateFilmDto {
  @IsOptional()
  @IsBoolean({ message: 'sudah Ditonton harus berupa boolean' })
  sudahDitonton?: boolean;
}